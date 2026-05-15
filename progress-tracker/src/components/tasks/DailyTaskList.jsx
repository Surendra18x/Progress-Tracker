import React from "react";
import TaskCard from "./TaskCard";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import useTaskStore from "../../store/useTaskStore";

function DailyTaskList({ date }) {
  const { tasks, toggleTaskStatus, deleteTask } = useTaskStore();
  
  const filteredTasks = tasks.filter(task => task.date === date);

  if (filteredTasks.length === 0) {
    return (
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center p-12 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-[2.5rem] bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm shadow-xl max-w-sm mx-auto transition-colors"
      >
        <div className="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Sparkles className="text-primary-500 w-8 h-8" />
        </div>
        <p className="text-slate-800 dark:text-white font-black text-xl mb-2">No Tasks for Today</p>
        <p className="text-slate-400 dark:text-slate-500 font-medium text-sm leading-relaxed">
          Your journey of a thousand miles begins with a single step.
        </p>
      </Motion.div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-lg mx-auto px-2">
      <ul className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <Motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <TaskCard
                task={task}
                onToggle={() => toggleTaskStatus(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            </Motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default DailyTaskList;
