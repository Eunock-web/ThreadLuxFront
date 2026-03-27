import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { USPBar } from "../components/new-arrivals/USPBar";
import { Hero } from "../components/new-arrivals/Hero";
import { CategoryGrid } from "../components/new-arrivals/CategoryGrid";
import { FlashSale } from "../components/new-arrivals/FlashSale";
import { Testimonials } from "../components/new-arrivals/Testimonials";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product";
import { ProductCard } from "../components/shop/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Home: React.FC = () => {
  const { data: featuredProductsData, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productService.getProducts(),
  });

  const featuredProducts = featuredProductsData?.data?.slice(0, 4) || [];

  return (
    <MainLayout>
      <USPBar />
      <Hero />
      <CategoryGrid />
      
      {/* Featured Products Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic" style={{ fontFamily: "var(--font-headline)" }}>
              Dernières <span className="text-[var(--color-pink)]">Arrivées</span>
            </h2>
            <Link to="/shop" className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
              Explorer le catalogue <ArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  variantId={product.variants?.[0]?.id}
                  image={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} 
                  title={product.name}
                  category={product.category?.name || "ARCHIVE"}
                  price={`${product.prix}€`}
                  colors={[]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FlashSale />
      <Testimonials />
    </MainLayout>
  );
};

export default Home;
