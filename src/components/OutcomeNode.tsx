import * as React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export type OutcomeData = {
  title: string;
  status: 'Improved' | 'Stable' | 'Deteriorated';
  details: string[];
  timestamp: string;
};

const getStatusColor = (status: OutcomeData['status']) => {
  switch (status) {
    case 'Improved':
      return 'bg-green-50 border-green-200';
    case 'Stable':
      return 'bg-yellow-50 border-yellow-200';
    case 'Deteriorated':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const OutcomeNode = ({ data }: NodeProps<OutcomeData>) => {
  const statusColor = getStatusColor(data.status);

  return (
    <div className={`px-4 py-2 shadow-md rounded-md min-w-[200px] ${statusColor}`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">{data.title}</div>
          <div className="text-sm text-gray-500">{data.timestamp}</div>
        </div>
        <div className="mt-2">
          <div className="font-semibold">상태: {data.status}</div>
          <div className="mt-1">
            <div className="font-semibold">세부사항:</div>
            <ul className="list-disc list-inside">
              {data.details.map((detail, index) => (
                <li key={index} className="text-sm">{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default React.memo(OutcomeNode); 