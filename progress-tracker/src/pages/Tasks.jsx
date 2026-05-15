import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import DailyTaskList from '../components/tasks/DailyTaskList';
import DailyProgressBar from '../components/tasks/DailyProgressBar';
import AddTaskModal from '../components/tasks/AddTaskModal';
import Heatmap from '../components/tasks/Heatmap';
import { Plus, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const allTasks = useTaskStore((state) => state.tasks);
  const todayTasks = useTaskStore((state) => state.getTasksByDate(today));

  return (
    <div className="px-4 py-8 max-w-lg mx-auto min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Daily Tasks</h1>
          <div className="flex items-center gap-2 mt-1 text-slate-400">
            <CalendarIcon size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">{format(new Date(), 'EEEE, MMM do')}</span>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 bg-primary-500 text-white rounded-2xl shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </header>

      <section className="space-y-8">
        <DailyProgressBar tasks={todayTasks} />
        
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary-500" />
            Consistency
          </h2>
          <Heatmap tasks={allTasks} />
        </div>

        <DailyTaskList date={today} />
      </section>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Tasks;
