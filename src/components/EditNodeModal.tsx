import React, { useState, useEffect, memo } from 'react';
import { Node } from 'reactflow';
import { PatientData } from './PatientNode';
import { InterventionData } from './InterventionNode';
import { AssessmentData } from './AssessmentNode';
import { OutcomeData } from './OutcomeNode';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    }
  }
}

type EditNodeModalProps = {
  node: Node | null;
  onClose: () => void;
  onSave: (nodeId: string, data: any) => void;
};

const EditNodeModal = ({ node, onClose, onSave }: EditNodeModalProps) => {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (node) {
      setFormData({ ...node.data });
    }
  }, [node]);

  if (!node || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleVitalSignChange = (key: string, value: string | number) => {
    setFormData((prev: PatientData) => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [key]: value
      }
    }));
  };

  const renderPatientForm = (data: PatientData) => (
    <>
      <div className="mb-4">
        <label className="block mb-2">이름</label>
        <input
          type="text"
          value={formData?.name || ''}
          onChange={handleInputChange}
          name="name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">나이</label>
          <input
            type="number"
            value={formData?.age || 0}
            onChange={handleInputChange}
            name="age"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">성별</label>
          <select
            value={formData?.gender || ''}
            onChange={handleInputChange}
            name="gender"
            className="w-full p-2 border rounded"
          >
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">증상 (쉼표로 구분)</label>
        <input
          type="text"
          value={formData?.symptoms?.join(', ') || ''}
          onChange={(e) => {
            const symptoms = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            setFormData((prev: PatientData) => ({ ...prev, symptoms }));
          }}
          name="symptoms"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">활력징후</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="혈압"
            value={formData?.vitalSigns?.bloodPressure || ''}
            onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="심박수"
            value={formData?.vitalSigns?.heartRate || 0}
            onChange={(e) => handleVitalSignChange('heartRate', Number(e.target.value))}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="체온"
            value={formData?.vitalSigns?.temperature || 0}
            onChange={(e) => handleVitalSignChange('temperature', Number(e.target.value))}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="호흡수"
            value={formData?.vitalSigns?.respiratoryRate || 0}
            onChange={(e) => handleVitalSignChange('respiratoryRate', Number(e.target.value))}
            className="p-2 border rounded"
          />
        </div>
      </div>
    </>
  );

  const renderInterventionForm = (data: InterventionData) => (
    <>
      <div className="mb-4">
        <label className="block mb-2">제목</label>
        <input
          type="text"
          value={formData?.title || ''}
          onChange={handleInputChange}
          name="title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">작업 (쉼표로 구분)</label>
        <textarea
          value={formData?.actions?.join('\n') || ''}
          onChange={(e) => {
            const actions = e.target.value.split('\n').filter(Boolean);
            setFormData((prev: InterventionData) => ({ ...prev, actions }));
          }}
          name="actions"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">기대 결과</label>
        <input
          type="text"
          value={formData?.expectedOutcome || ''}
          onChange={handleInputChange}
          name="expectedOutcome"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">우선순위</label>
        <select
          value={formData?.priority || 'Medium'}
          onChange={handleInputChange}
          name="priority"
          className="w-full p-2 border rounded"
        >
          <option value="High">높음</option>
          <option value="Medium">중간</option>
          <option value="Low">낮음</option>
        </select>
      </div>
    </>
  );

  const renderAssessmentForm = (data: AssessmentData) => (
    <>
      <div className="mb-4">
        <label className="block mb-2">제목</label>
        <input
          type="text"
          value={formData?.title || ''}
          onChange={handleInputChange}
          name="title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">관찰 결과 (줄바꿈으로 구분)</label>
        <textarea
          value={formData?.findings?.join('\n') || ''}
          onChange={(e) => {
            const findings = e.target.value.split('\n').filter(Boolean);
            setFormData((prev: AssessmentData) => ({ ...prev, findings }));
          }}
          name="findings"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">권장 사항 (줄바꿈으로 구분)</label>
        <textarea
          value={formData?.recommendations?.join('\n') || ''}
          onChange={(e) => {
            const recommendations = e.target.value.split('\n').filter(Boolean);
            setFormData((prev: AssessmentData) => ({ ...prev, recommendations }));
          }}
          name="recommendations"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
    </>
  );

  const renderOutcomeForm = (data: OutcomeData) => (
    <>
      <div className="mb-4">
        <label className="block mb-2">제목</label>
        <input
          type="text"
          value={formData?.title || ''}
          onChange={handleInputChange}
          name="title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">상태</label>
        <select
          value={formData?.status || 'Stable'}
          onChange={handleInputChange}
          name="status"
          className="w-full p-2 border rounded"
        >
          <option value="Improved">호전됨</option>
          <option value="Stable">안정적</option>
          <option value="Deteriorated">악화됨</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">세부사항 (줄바꿈으로 구분)</label>
        <textarea
          value={formData?.details?.join('\n') || ''}
          onChange={(e) => {
            const details = e.target.value.split('\n').filter(Boolean);
            setFormData((prev: OutcomeData) => ({ ...prev, details }));
          }}
          name="details"
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
    </>
  );

  const renderForm = () => {
    switch (node.type) {
      case 'patient':
        return renderPatientForm(formData as PatientData);
      case 'intervention':
        return renderInterventionForm(formData as InterventionData);
      case 'assessment':
        return renderAssessmentForm(formData as AssessmentData);
      case 'outcome':
        return renderOutcomeForm(formData as OutcomeData);
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">노드 편집</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {renderForm()}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={() => {
              onSave(node.id, formData);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EditNodeModal); 