import * as React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export type AssessmentData = {
  title: string;
  findings: string[];
  recommendations: string[];
  timestamp: string;
};

const AssessmentNode = ({ data }: NodeProps<AssessmentData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 border-blue-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">{data.title}</div>
          <div className="text-sm text-gray-500">{data.timestamp}</div>
        </div>
        <div className="mt-2">
          <div className="font-semibold">관찰 결과:</div>
          <ul className="list-disc list-inside">
            {data.findings.map((finding, index) => (
              <li key={index} className="text-sm">{finding}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <div className="font-semibold">권장 사항:</div>
          <ul className="list-disc list-inside">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="text-sm">{rec}</li>
            ))}
          </ul>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default React.memo(AssessmentNode); 