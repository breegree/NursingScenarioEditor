import * as React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export type PatientData = {
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
  };
};

const PatientNode = ({ data }: NodeProps<PatientData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">{data.name}</div>
          <div className="text-gray-500">
            {data.age}세 / {data.gender}
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold">증상:</div>
          <ul className="list-disc list-inside">
            {data.symptoms.map((symptom, index) => (
              <li key={index} className="text-sm">{symptom}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <div className="font-semibold">활력징후:</div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>혈압: {data.vitalSigns.bloodPressure}</div>
            <div>심박수: {data.vitalSigns.heartRate}</div>
            <div>체온: {data.vitalSigns.temperature}°C</div>
            <div>호흡수: {data.vitalSigns.respiratoryRate}</div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default React.memo(PatientNode); 