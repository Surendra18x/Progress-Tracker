import { useRouteError, Link } from "react-router-dom";
import { Home } from "lucide-react";

const Error = () => {
  const err = useRouteError();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-950 px-4 transition-colors">
      <div className="text-[12rem] font-black text-primary-500/10 dark:text-primary-500/5 absolute select-none pointer-events-none">
        {err?.status || "ERR"}
      </div>
      
      <div className="z-10 text-center">
        <div className="text-8xl mb-8 animate-bounce-slow">🚀</div>
        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter">Mission Critical Error</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-md mx-auto leading-relaxed">
          {err?.statusText || err?.message || "We've drifted off course. The requested module could not be found in the current roadmap."}
        </p>
        
        <Link 
          to="/" 
          className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20 transition-all active:scale-95 inline-flex items-center gap-3"
        >
          <Home size={18} />
          Return to Base
        </Link>
      </div>
    </div>
  );
};

export default Error;
