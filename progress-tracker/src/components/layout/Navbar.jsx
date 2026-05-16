import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import Logo from "../ui/Logo";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-surface-50 border-b border-surface-100 px-4 py-3 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-3">
        <Logo className="w-10 h-10 text-primary-500 shadow-lg shadow-primary-500/10" />
        <div>
          <h1 className="font-black text-xl tracking-tight text-slate-800 leading-none">
            Day<span className="text-primary-500">Forge</span>
          </h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: Operational</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link 
          to="/settings"
          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 transition-all cursor-pointer active:scale-90"
        >
          <Settings size={18} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
