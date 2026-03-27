import React from "react";
import { DollarSign } from "lucide-react";

interface PricingProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const Pricing: React.FC<PricingProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
          <DollarSign size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Prix & Stock</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Prix de vente (€)</label>
          <div className="relative">
            <input 
              type="number"
              step="0.01"
              placeholder="0.00"
              value={data.prix}
              onChange={(e) => onChange('prix', parseFloat(e.target.value))}
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-black focus:ring-2 focus:ring-[var(--color-pink)] focus:bg-white transition-all outline-none"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">EUR</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Prix d'origine (Optionnel)</label>
          <input 
            type="number"
            step="0.01"
            placeholder="0.00"
            value={data.promo}
            onChange={(e) => onChange('promo', parseFloat(e.target.value))}
            className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-black focus:ring-2 focus:ring-[var(--color-pink)] focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Stock Total</label>
            <input 
              type="number"
              placeholder="0"
              value={data.stock_global}
              onChange={(e) => onChange('stock_global', parseInt(e.target.value))}
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">SKU Initial</label>
            <input 
              type="text"
              placeholder="TL-001"
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
