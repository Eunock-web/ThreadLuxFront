import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { productService } from "../../services/product";

interface BaseInfoProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const BaseInfo: React.FC<BaseInfoProps> = ({ data, onChange }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await productService.getCategories();
        if (res.success) setCategories(res.data);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
          <Info size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Informations de base</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nom du produit</label>
          <input 
            type="text"
            placeholder="Ex: Veste Oversize 'Neon Pulse'"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-[var(--color-pink)] focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Catégorie</label>
            <select 
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-pink)] focus:bg-white transition-all outline-none"
              value={data.categorie_id}
              onChange={(e) => onChange('categorie_id', parseInt(e.target.value))}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Origine / Marque</label>
            <input 
              type="text"
              placeholder="Ex: Portugal, Italy..."
              value={data.origine}
              onChange={(e) => onChange('origine', e.target.value)}
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Coupe / Fit</label>
            <input 
              type="text"
              placeholder="Ex: Oversize, Slim Fit..."
              value={data.coupe}
              onChange={(e) => onChange('coupe', e.target.value)}
              className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Description</label>
          <textarea 
            rows={4}
            placeholder="Racontez l'histoire de cette pièce..."
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-[var(--color-pink)] focus:bg-white transition-all outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
