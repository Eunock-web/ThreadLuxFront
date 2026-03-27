import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { ShopSidebar } from "../components/shop/ShopSidebar";
import { ProductCard } from "../components/shop/ProductCard";
import { Pagination } from "../components/shop/Pagination";
import { Grid, List, ChevronDown } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => productService.getProducts(selectedCategory || undefined),
  });

  const products = productsData?.data || [];
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-[10px] font-bold tracking-widest uppercase text-slate-400" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Accueil</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-pink)]">Femme</span>
        </nav>

        {/* Title and Sort Info */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4" style={{ fontFamily: "var(--font-headline)" }}>
              FEMME
            </h1>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400" style={{ fontFamily: "var(--font-mono)" }}>
              247 items / Printemps-Été 2024
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex border border-slate-100 rounded-xl p-1 shadow-sm">
              <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-lg text-slate-800">
                <Grid size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600">
                <List size={18} />
              </button>
            </div>
            
            <button className="flex items-center gap-10 border border-slate-100 rounded-2xl px-6 py-3 bg-slate-50/50 hover:bg-slate-50 transition-all text-xs font-bold text-slate-900 shadow-sm min-w-[180px]">
              Pertinence
              <ChevronDown size={14} className="ml-auto" />
            </button>
          </div>
        </header>

        <div className="flex gap-16">
          {/* Sidebar */}
          <ShopSidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-500 font-bold">
                Erreur lors du chargement des produits.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product: any) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    variantId={product.variants?.[0]?.id}
                    image={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} 
                    title={product.name}
                    category={product.category?.name || "ARCHIVE"}
                    price={`${product.prix}€`}
                    colors={[]} // We can add colors mapping later from variants
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
