import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Hero } from "../components/new-arrivals/Hero";
import { USPBar } from "../components/new-arrivals/USPBar";
import { CategoryGrid } from "../components/new-arrivals/CategoryGrid";
import { FlashSale } from "../components/new-arrivals/FlashSale";
import { Testimonials } from "../components/new-arrivals/Testimonials";
import { ProductCard } from "../components/shop/ProductCard";
import { Button } from "../components/ui/Button";

const trendingProducts = [
  {
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    category: "ROBE EN SOIE",
    title: "Linen Essentials",
    price: "159.00€",
    colors: ["#D01374"],
  },
  {
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1000&auto=format&fit=crop",
    category: "VESTE SATIN",
    title: "Eco Green Tee",
    price: "45.00€",
    colors: ["#4C1D95"],
  },
  {
    image: "https://images.unsplash.com/photo-1584273204192-35327ec29505?q=80&w=1000&auto=format&fit=crop",
    category: "TOP ORGANZA",
    title: "Summer Gaiter",
    price: "120.00€",
    colors: ["#B45309"],
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
    category: "JEAN LARGE",
    title: "Clay Trousers",
    price: "95.00€",
    colors: ["#3B82F6"],
  },
];

const NewArrivals: React.FC = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                 <div className="relative aspect-[3/4] rounded-[40px] bg-slate-100 overflow-hidden mb-6">
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                      <span className="text-[8px] font-black tracking-widest uppercase">Bestseller</span>
                    </div>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                      <Button variant="primary" size="sm" className="rounded-full shadow-xl">Quick View</Button>
                    </div>
                 </div>
                 <h3 className="font-bold text-slate-900 mb-1">{product.title}</h3>
                 <p className="text-[var(--color-pink)] font-black">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </MainLayout>
  );
};

export default NewArrivals;
