import React from 'react';
import { Trash2, Plus, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Subtask } from '../../firebase/firestore';

interface SubtaskEditorProps {
  subtasks: Subtask[];
  onChange: (subtasks: Subtask[]) => void;
}

export function SubtaskEditor({ subtasks, onChange }: SubtaskEditorProps) {
  
  const handleAdd = () => {
    const newSubtask: Subtask = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      estimatedMinutes: 30,
      done: false
    };
    onChange([...subtasks, newSubtask]);
  };

  const handleDelete = (id: string) => {
    onChange(subtasks.filter(s => s.id !== id));
  };

  const handleFieldChange = (id: string, field: keyof Subtask, value: any) => {
    onChange(
      subtasks.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= subtasks.length) return;

    const updated = [...subtasks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-text-secondary">Subtasks Breakdown</label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center space-x-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
        >
          <Plus className="h-3 w-3" />
          <span>Add Subtask</span>
        </button>
      </div>

      {subtasks.length === 0 ? (
        <div className="bg-surface-alt border border-border border-dashed rounded-lg p-4 text-center text-xs text-text-muted">
          No subtasks defined. Use the "Analyse with AI" button above to break down this task, or add subtasks manually.
        </div>
      ) : (
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {subtasks.map((sub, index) => (
            <div
              key={sub.id}
              className="flex items-center space-x-2 bg-surface-alt p-2 rounded-lg border border-border border-0.5"
            >
              {/* Drag Handle Mock / Move controls */}
              <div className="flex items-center space-x-0.5 text-text-muted">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-0.5 hover:text-text-primary disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === subtasks.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-0.5 hover:text-text-primary disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={sub.done}
                onChange={(e) => handleFieldChange(sub.id, 'done', e.target.checked)}
                className="h-3.5 w-3.5 rounded text-primary focus:ring-primary cursor-pointer"
              />

              {/* Name Input */}
              <input
                type="text"
                value={sub.name}
                onChange={(e) => handleFieldChange(sub.id, 'name', e.target.value)}
                placeholder="Subtask name"
                className="flex-1 input-field h-[28px] text-xs px-2"
                required
              />

              {/* Minutes Input */}
              <div className="flex items-center space-x-1 flex-shrink-0">
                <input
                  type="number"
                  value={sub.estimatedMinutes}
                  onChange={(e) => handleFieldChange(sub.id, 'estimatedMinutes', parseInt(e.target.value) || 0)}
                  placeholder="Mins"
                  min="1"
                  className="w-14 input-field h-[28px] text-xs px-2 text-center"
                  required
                />
                <span className="text-[10px] text-text-muted">m</span>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDelete(sub.id)}
                className="text-text-muted hover:text-danger p-1 rounded hover:bg-black/5 cursor-pointer"
                title="Delete subtask"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SubtaskEditor;
