import React from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface MediaUploadProps {
  images: any[];
  onAdd: (url: string) => void;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ images, onAdd }) => {
  const handleAdd = () => {
    const url = prompt("Entrez l'URL de l'image :");
    if (url) onAdd(url);
  };

  return (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <ImageIcon size={20} />
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Médias</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min. 3 photos conseillées</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={handleAdd}
          className="col-span-2 aspect-square rounded-[30px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[var(--color-pink)] hover:bg-[var(--color-pink)]/5 transition-all group"
        >
           <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-400 group-hover:text-[var(--color-pink)] transition-all">
             <Upload size={24} />
           </div>
           <div className="text-center">
             <p className="text-xs font-black text-slate-900 mb-1">Ajouter Image</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Cliquer pour uploader</p>
           </div>
        </div>

        {images.map((img, idx) => (
          <div key={idx} className="aspect-square rounded-[30px] overflow-hidden group relative border border-slate-100">
            <img 
              src={img.url_image} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt={`Produit ${idx}`}
            />
            {img.is_principal && (
              <div className="absolute top-3 left-3 bg-[var(--color-pink)] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Principal</div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button className="p-2 bg-white rounded-xl text-red-500 shadow-sm hover:scale-110 transition-transform">
                 <X size={16} />
               </button>
            </div>
          </div>
        ))}

        {images.length < 2 && (
          <>
            <div className="aspect-square rounded-[30px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
               <ImageIcon size={24} />
            </div>
            <div className="aspect-square rounded-[30px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
               <ImageIcon size={24} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
