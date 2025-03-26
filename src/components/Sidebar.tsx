import React from 'react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="fixed left-0 top-0 p-4 w-64 h-screen bg-white border-r border-gray-200">
      <div className="font-bold text-lg mb-4">노드 추가</div>
      <div className="space-y-2">
        <div
          className="p-2 border-2 border-gray-200 rounded cursor-move bg-white"
          onDragStart={(e) => onDragStart(e, 'patient')}
          draggable
        >
          환자 정보
        </div>
        <div
          className="p-2 border-2 border-gray-200 rounded cursor-move bg-white"
          onDragStart={(e) => onDragStart(e, 'intervention')}
          draggable
        >
          간호 중재
        </div>
        <div
          className="p-2 border-2 border-blue-200 rounded cursor-move bg-blue-50"
          onDragStart={(e) => onDragStart(e, 'assessment')}
          draggable
        >
          평가
        </div>
        <div
          className="p-2 border-2 border-green-200 rounded cursor-move bg-green-50"
          onDragStart={(e) => onDragStart(e, 'outcome')}
          draggable
        >
          결과
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 