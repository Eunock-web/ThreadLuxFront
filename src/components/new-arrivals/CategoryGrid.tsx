import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product";

export const CategoryGrid: React.FC = () => {
  const { data: categoriesResponse, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories()
  });

  const categories = categoriesResponse?.data || [];
  
  const layoutClasses = [
    { cols: "col-span-1", rows: "row-span-2" },
    { cols: "col-span-1", rows: "row-span-2" },
    { cols: "col-span-1", rows: "row-span-1" },
    { cols: "col-span-1", rows: "row-span-1" },
    { cols: "col-span-1", rows: "row-span-1" },
    { cols: "col-span-1", rows: "row-span-1" },
  ];

  const defaultImages = [
    "https://images.unsplash.com/photo-1595777457583-91e0533bb991?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539533113208-f6df8144e5b6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-black text-slate-900 tracking-tighter mb-16 text-center uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Nos Catégories
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {isLoading ? (
            <div className="col-span-full h-40 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
            </div>
          ) : (
            categories.slice(0, 6).map((cat: any, index: number) => {
              const layout = layoutClasses[index % 6];
              const image = cat.imageUrl.includes('photo-1441986300917-64674bd600d8') ? defaultImages[index % 6] : cat.imageUrl;
              
              return (
                <div 
                  key={cat.id}
                  className={`group relative overflow-hidden rounded-[40px] shadow-lg cursor-pointer ${layout.cols} ${layout.rows}`}
                >
                  <img 
                    src={image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-white text-xl font-bold tracking-tight mb-1 group-hover:translate-x-2 transition-transform uppercase">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-1 bg-[var(--color-pink)] rounded-full group-hover:w-12 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
