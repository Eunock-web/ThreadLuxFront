import React from "react";
import { Award, FileText, CreditCard, Users, ChevronRight } from "lucide-react";

export const EliteCard: React.FC = () => {
  return (
    <div className="p-8 rounded-[45px] bg-[var(--color-pink)] text-white shadow-2xl shadow-pink-200 relative overflow-hidden group mb-8">
      {/* Abstract Shapes */}
      <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-purple-400/20 rounded-full blur-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">
            Premium Level
          </div>
          <Award size={24} className="opacity-50" />
        </div>
        
        <h3 className="text-3xl font-black italic tracking-tighter mb-10">ThreadLux Elite</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">Total Orders</p>
            <p className="text-4xl font-black tracking-tighter">24</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">Active Coupons</p>
            <p className="text-4xl font-black tracking-tighter">03</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuickActions: React.FC = () => {
  const actions = [
    { icon: <FileText size={18} />, label: "Download Invoices", color: "bg-purple-50 text-purple-600" },
    { icon: <CreditCard size={18} />, label: "Payment Methods", color: "bg-pink-50 text-pink-600" },
    { icon: <Users size={18} />, label: "Refer a Friend", color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50 mb-8">
      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">Quick Actions</h3>
      <div className="space-y-4">
        {actions.map((action, idx) => (
          <button key={idx} className="w-full group flex items-center justify-between p-2 hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${action.color} group-hover:scale-110`}>
                {action.icon}
              </div>
              <span className="text-xs font-black text-slate-900 tracking-tight">{action.label}</span>
            </div>
            <ChevronRight size={16} className="text-slate-300 transition-all group-hover:text-slate-900 group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const PromoCard: React.FC = () => {
  return (
    <div className="p-8 rounded-[45px] bg-[#6347f3] text-white shadow-2xl shadow-purple-200 relative overflow-hidden group h-64">
       <img 
         src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=400&auto=format&fit=crop" 
         className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
       />
       <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-black italic tracking-tighter mb-3">Master the Layering Look</h3>
          <p className="text-[10px] font-bold text-white/70 leading-relaxed mb-auto max-w-[180px]">
            Combine our Asymmetric Jacket with a heavy knit hoodie for this season's essential streetwear style.
          </p>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
            Shop Collection <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
       </div>
    </div>
  );
};
