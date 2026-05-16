import React from "react";
import { Trash, CheckCircle2 } from "lucide-react";

function TaskCard({ task, onToggle, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`group bg-white/80 backdrop-blur-md shadow-lg border border-surface-100 p-4 rounded-2xl transition-all flex gap-3 justify-between items-center ${isCompleted ? 'opacity-60 bg-surface-50/50' : 'opacity-100'}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <label className="relative flex items-center justify-center cursor-pointer">
          <input
            checked={isCompleted}
            onChange={onToggle}
            className="peer appearance-none w-7 h-7 rounded-full border-2 border-primary-200 checked:bg-primary-500 checked:border-primary-500 transition-all cursor-pointer"
            type="checkbox"
          />
          <CheckCircle2 
            size={16} 
            className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
          />
        </label>
        <div className="flex flex-col">
          <span
            className={`font-bold text-lg break-words transition-all ${isCompleted ? "line-through text-slate-400 italic" : "text-slate-700"}`}
          >
            {task.title}
          </span>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{task.effort} effort</span>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
      >
        <Trash size={18} />
      </button>
    </div>
  );
}

export default TaskCard;
