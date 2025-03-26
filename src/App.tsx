import { useRef, useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  NodeTypes,
  Node,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css';

import PatientNode, { PatientData } from './components/PatientNode';
import InterventionNode, { InterventionData } from './components/InterventionNode';
import AssessmentNode, { AssessmentData } from './components/AssessmentNode';
import OutcomeNode, { OutcomeData } from './components/OutcomeNode';
import Sidebar from './components/Sidebar';
import EditNodeModal from './components/EditNodeModal';

type NodeData = PatientData | InterventionData | AssessmentData | OutcomeData;

const nodeTypes: NodeTypes = {
  patient: PatientNode,
  intervention: InterventionNode,
  assessment: AssessmentNode,
  outcome: OutcomeNode,
};

const getCurrentTimestamp = () => {
  return new Date().toLocaleTimeString();
};

const sampleScenario = {
  nodes: [
    {
      id: 'patient_1',
      type: 'patient',
      position: { x: 250, y: 50 },
      data: {
        name: '김환자',
        age: 65,
        gender: '남',
        symptoms: ['호흡 곤란', '가슴 통증', '기침'],
        vitalSigns: {
          bloodPressure: '140/90',
          heartRate: 88,
          temperature: 37.2,
          respiratoryRate: 22,
        },
      },
    },
    {
      id: 'assessment_1',
      type: 'assessment',
      position: { x: 250, y: 250 },
      data: {
        title: '초기 평가',
        findings: ['호흡음 감소', '산소포화도 92%', '기침 시 통증 호소'],
        recommendations: ['산소 공급 필요', '통증 관리 필요'],
        timestamp: getCurrentTimestamp(),
      },
    },
    {
      id: 'intervention_1',
      type: 'intervention',
      position: { x: 250, y: 450 },
      data: {
        title: '산소 요법',
        actions: ['산소 공급 (2L/min)', '산소포화도 모니터링', '호흡 운동 교육'],
        expectedOutcome: '산소포화도 95% 이상 유지',
        priority: 'High',
      },
    },
    {
      id: 'outcome_1',
      type: 'outcome',
      position: { x: 250, y: 650 },
      data: {
        title: '산소 요법 결과',
        status: 'Improved',
        details: ['산소포화도 96%로 상승', '호흡 곤란 감소', '기침 빈도 감소'],
        timestamp: getCurrentTimestamp(),
      },
    },
  ] as Node<NodeData>[],
  edges: [
    { id: 'e1-2', source: 'patient_1', target: 'assessment_1' },
    { id: 'e2-3', source: 'assessment_1', target: 'intervention_1' },
    { id: 'e3-4', source: 'intervention_1', target: 'outcome_1' },
  ],
};

const getNewNodeData = (type: string): NodeData => {
  switch (type) {
    case 'patient':
      return {
        name: '새 환자',
        age: 0,
        gender: '미지정',
        symptoms: ['증상 입력'],
        vitalSigns: {
          bloodPressure: '측정 필요',
          heartRate: 0,
          temperature: 0,
          respiratoryRate: 0,
        },
      };
    case 'intervention':
      return {
        title: '새 중재',
        actions: ['작업 입력'],
        expectedOutcome: '기대 결과 입력',
        priority: 'Medium' as const,
      };
    case 'assessment':
      return {
        title: '새 평가',
        findings: ['관찰 결과 입력'],
        recommendations: ['권장 사항 입력'],
        timestamp: getCurrentTimestamp(),
      };
    case 'outcome':
      return {
        title: '새 결과',
        status: 'Stable' as const,
        details: ['세부사항 입력'],
        timestamp: getCurrentTimestamp(),
      };
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(sampleScenario.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(sampleScenario.edges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);

  useEffect(() => {
    // 초기 노드와 엣지 설정
    setNodes(sampleScenario.nodes);
    setEdges(sampleScenario.edges);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node<NodeData> = {
        id: `${type}_${nodes.length + 1}`,
        type,
        position,
        data: getNewNodeData(type),
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes],
  );

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onUpdateNode = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: newData,
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 relative w-full h-full">
        <div ref={reactFlowWrapper} className="w-full h-full">
          <ReactFlow
            style={{ width: '100%', height: '100%' }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            deleteKeyCode="Delete"
            defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
      <EditNodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSave={onUpdateNode}
      />
    </div>
  );
}

export default App; 