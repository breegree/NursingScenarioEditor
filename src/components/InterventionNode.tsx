import * as React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export type InterventionData = {
  title: string;
  actions: string[];
  expectedOutcome: string;
  priority: 'High' | 'Medium' | 'Low';
};

const getPriorityColor = (priority: InterventionData['priority']) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 border-red-500';
    case 'Medium':
      return 'bg-yellow-100 border-yellow-500';
    case 'Low':
      return 'bg-green-100 border-green-500';
    default:
      return 'bg-gray-100 border-gray-500';
  }
};

const InterventionNode = ({ data }: NodeProps<InterventionData>) => {
  const priorityColor = getPriorityColor(data.priority);

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 min-w-[200px] ${priorityColor}`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="font-bold text-lg">{data.title}</div>
        <div className="mt-2">
          <div className="font-semibold">수행할 작업:</div>
          <ul className="list-disc list-inside">
            {data.actions.map((action, index) => (
              <li key={index} className="text-sm">{action}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <div className="font-semibold">기대 결과:</div>
          <div className="text-sm">{data.expectedOutcome}</div>
        </div>
        <div className="mt-2 text-sm font-semibold">
          우선순위: {data.priority}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default React.memo(InterventionNode); 