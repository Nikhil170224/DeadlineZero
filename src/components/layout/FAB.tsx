import React from 'react';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-light"
      title="Add Task"
    >
      <Plus className="h-6 w-6 stroke-[2.5]" />
    </button>
  );
}
export default FAB;
