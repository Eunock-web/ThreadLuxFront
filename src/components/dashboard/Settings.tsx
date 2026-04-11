import React from "react";
import { Settings as SettingsIcon, X } from "lucide-react";

interface SettingsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const SettingsSection: React.FC<SettingsProps> = ({ data, onChange: _onChange }) => {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
          <SettingsIcon size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Paramètres</h3>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tight">Visibilité</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En ligne sur la boutique</p>
          </div>
          <button className="w-12 h-6 bg-[var(--color-pink)] rounded-full relative p-1 shadow-inner">
             <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-all" />
          </button>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tags de recherche</label>
          <div className="flex flex-wrap gap-2 mb-4">
             {["#Winter24", "#Streetstyle"].map(tag => (
               <div key={tag} className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {tag}
                 <button className="hover:text-red-500"><X size={12} /></button>
               </div>
             ))}
          </div>
          <input 
            type="text"
            placeholder="Ajouter un tag..."
            className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-xs font-bold transition-all outline-none"
          />
        </div>

        <div className="p-6 rounded-[30px] bg-slate-50/50 border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">SEO Preview</p>
           <h4 className="text-sm font-bold text-blue-600 mb-1">{data.name || "Titre du produit"}</h4>
           <p className="text-xs text-green-700 mb-2">threadlux.com/products/{data.slug || "url-du-produit"}</p>
           <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
             {data.description || "Découvrez la nouvelle pièce maîtresse de notre collection..."}
           </p>
        </div>
      </div>
    </div>
  );
};
