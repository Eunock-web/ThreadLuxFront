import React from "react";
import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

export const USPBar: React.FC = () => {
  const usps = [
    { icon: <Truck size={18} />, label: "Truck Delivery" },
    { icon: <RotateCcw size={18} />, label: "30d Returns" },
    { icon: <ShieldCheck size={18} />, label: "Secure Payment" },
    { icon: <Star size={18} />, label: "4.8/5 Reviews" },
  ];

  return (
    <div className="bg-white py-6 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {usps.map((usp, index) => (
            <div key={index} className="flex items-center gap-3 text-slate-500 hover:text-[var(--color-pink)] transition-colors cursor-default">
              <div className="p-2 rounded-full bg-slate-50 text-[var(--color-pink)]">
                {usp.icon}
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                {usp.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
