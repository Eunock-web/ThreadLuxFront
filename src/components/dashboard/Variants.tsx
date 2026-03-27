import React from "react";
import { Layers, Plus, X } from "lucide-react";

interface VariantsProps {
  variants: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
}

export const Variants: React.FC<VariantsProps> = ({ variants, onAdd, onRemove, onChange }) => {
  const sizesList = ["XS", "S", "M", "L", "XL"];

  const handleSizeToggle = (size: string) => {
    const exists = variants.some(v => v.taille === size);
    if (!exists) {
      // In a real app, we might want to pass the size to onAdd
      // For now, onAdd is generic, but I've updated handleAddVariant in AddProduct.tsx 
      // to be a bit more flexible or I can just call it and then user edits.
      onAdd(); 
    }
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
          <Layers size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Variantes</h3>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tailles disponibles</label>
          <div className="flex flex-wrap gap-3">
            {sizesList.map(size => {
              const isSelected = variants.some(v => v.taille === size);
              return (
                <button 
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`w-12 h-12 rounded-full border-2 text-xs flex items-center justify-center transition-all font-bold ${
                    isSelected 
                      ? "border-[var(--color-pink)] bg-[var(--color-pink)] text-white" 
                      : "border-slate-100 text-slate-400 hover:border-[var(--color-pink)] hover:text-[var(--color-pink)]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
            <button 
              onClick={onAdd}
              className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all font-bold"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Combinaisons actives</label>
          <div className="flex flex-col gap-4">
             {variants.length > 0 ? (
               variants.map((variant, index) => (
                 <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-6 rounded-[30px] border border-slate-100 group hover:border-[var(--color-pink)] transition-all">
                    <div className="flex items-center gap-3 flex-1">
                       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[var(--color-pink)] font-black text-xs">
                         {variant.taille}
                       </div>
                       <div className="flex flex-col">
                          <input 
                            value={variant.couleur}
                            onChange={(e) => onChange(index, 'couleur', e.target.value)}
                            className="bg-transparent border-none p-0 text-xs font-black text-slate-900 uppercase tracking-tight focus:ring-0 w-32"
                            placeholder="COULEUR"
                          />
                          <input 
                            value={variant.sku}
                            onChange={(e) => onChange(index, 'sku', e.target.value)}
                            className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 uppercase tracking-widest focus:ring-0 w-32"
                            placeholder="SKU"
                          />
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col items-end">
                          <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock</label>
                          <input 
                            type="number"
                            value={variant.stock}
                            onChange={(e) => onChange(index, 'stock', parseInt(e.target.value))}
                            className="w-16 bg-white border-transparent rounded-xl px-3 py-2 text-center text-xs font-black transition-all outline-none shadow-sm"
                          />
                       </div>
                       <button 
                        onClick={() => onRemove(index)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                       >
                        <X size={18} />
                       </button>
                    </div>
                 </div>
               ))
             ) : (
               <div className="text-[11px] text-slate-400 font-bold bg-slate-50 p-8 rounded-[30px] border border-dashed border-slate-200 text-center italic">
                 Aucune variante ajoutée. Sélectionnez une taille ou cliquez sur + pour commencer.
               </div>
             )}
             <button 
              onClick={onAdd}
              className="w-full h-14 rounded-[25px] border-2 border-dashed border-slate-100 text-slate-400 flex items-center justify-center gap-2 hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] hover:bg-pink-50/30 transition-all font-black text-[10px] uppercase tracking-widest"
             >
              <Plus size={16} />
              Ajouter une variante manuellement
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
