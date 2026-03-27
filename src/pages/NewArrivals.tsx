import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Hero } from "../components/new-arrivals/Hero";
import { USPBar } from "../components/new-arrivals/USPBar";
import { CategoryGrid } from "../components/new-arrivals/CategoryGrid";
import { FlashSale } from "../components/new-arrivals/FlashSale";
import { Testimonials } from "../components/new-arrivals/Testimonials";
import { ProductCard } from "../components/shop/ProductCard";
import { Button } from "../components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product";

const NewArrivals: React.FC = () => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });

  const products = productsData?.data || [];
  const trendingProducts = products.slice(0, 4);
  const bestsellers = products.slice(4, 8); // Just taking the next 4 for demo

  return (
    <MainLayout>
      <Hero />
      <USPBar />
      <CategoryGrid />

      {/* Trending Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 
              className="text-4xl font-black text-slate-900 tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              New Arrivals
            </h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <span className="sr-only">Previous</span>
                ←
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <span className="sr-only">Next</span>
                →
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.map((product: any) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  variantId={product.variants?.[0]?.id}
                  title={product.name}
                  category={product.category?.name || "ARCHIVE"}
                  image={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop"}
                  price={`${product.prix}€`}
                  colors={[]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FlashSale />

      {/* Bestsellers Section (Mocked with some visuals) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-black text-slate-900 tracking-tighter mb-16 uppercase text-center"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Nos Bestsellers
          </h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellers.length > 0 ? bestsellers.map((product: any) => (
                <div key={product.id} className="group cursor-pointer">
                   <div className="relative aspect-[3/4] rounded-[40px] bg-slate-100 overflow-hidden mb-6">
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                        <span className="text-[8px] font-black tracking-widest uppercase">Bestseller</span>
                      </div>
                      <img 
                        src={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                        <Button variant="primary" size="sm" className="rounded-full shadow-xl">Quick View</Button>
                      </div>
                   </div>
                   <h3 className="font-bold text-slate-900 mb-1">{product.name}</h3>
                   <p className="text-[var(--color-pink)] font-black">{product.prix}€</p>
                </div>
              )) : (
                <p className="col-span-4 text-center text-slate-500">Aucun produit trouvé.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <Testimonials />
    </MainLayout>
  );
};

export default NewArrivals;
