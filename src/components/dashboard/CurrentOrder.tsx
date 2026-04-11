import React from "react";
import { ChevronRight } from "lucide-react";

export const CurrentOrder: React.FC = () => {
  const steps = [
    { label: "ORDER PLACED", status: "completed" },
    { label: "PROCESSING", status: "completed" },
    { label: "SHIPPED", status: "current" },
    { label: "OUT FOR DELIVERY", status: "pending" },
  ];

  return (
    <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50 mb-10 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50/30 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-pink-100/40 transition-colors" />
      
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-1">Current Order</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID : TLX-99284-B</p>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black text-[var(--color-pink)] uppercase tracking-widest hover:gap-3 transition-all">
          Track Package <ChevronRight size={14} />
        </button>
      </div>

      <div className="mb-14 px-4 relative z-10">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0">
             <div className="h-full bg-[var(--color-pink)] w-[66%]" />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all ${
                step.status === 'completed' ? "bg-[var(--color-pink)]" : 
                step.status === 'current' ? "bg-white border-[var(--color-pink)]" : "bg-slate-100"
              }`}>
                {step.status === 'completed' && <div className="w-2 h-2 rounded-full bg-white" />}
                {step.status === 'current' && <div className="w-2 h-2 rounded-full bg-[var(--color-pink)] animate-pulse" />}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${
                step.status === 'pending' ? "text-slate-300" : "text-slate-900"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50/80 backdrop-blur-sm p-6 rounded-3xl flex items-center gap-6 border border-white">
         <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=200&auto=format&fit=crop" 
              className="w-full h-full object-cover rounded-xl"
              alt="Product"
            />
         </div>
         <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Asymmetric Biker Jacket</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Size: L • Color: Midnight Onyx</p>
         </div>
         <div className="text-right">
            <p className="text-lg font-black text-slate-900 italic tracking-tighter">$249.00</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: 1</p>
         </div>
      </div>
    </div>
  );
};
