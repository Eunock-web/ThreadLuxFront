import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useCart } from "../contexts/CartContext";
import { Minus, Plus, X, ArrowRight, ShieldCheck, RotateCcw } from "lucide-react";
import { ProductCard } from "../components/shop/ProductCard";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, total } = useCart();

  const suggestedProducts = [
    {
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop",
      title: "Tactical Cargo V2",
      category: "Technical Bottoms",
      price: "110.00€",
      badge: "NEW IN" as any,
    },
    {
      image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=500&auto=format&fit=crop",
      title: "Biker Moto Jacket",
      category: "Outerwear",
      price: "295.00€",
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop",
      title: "Signature Tee Pack",
      category: "Essentials",
      price: "65.00€",
      badge: "ESSENTIAL" as any,
    },
    {
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop",
      title: "Orbit Crossbody",
      category: "Accessories",
      price: "85.00€",
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-2" style={{ fontFamily: "var(--font-headline)" }}>
            Your <span className="text-[var(--color-pink)]">Cart.</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cart.length} items awaiting your final touch.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 flex gap-10 items-center group hover:shadow-xl hover:shadow-slate-100 transition-all">
                <div className="w-32 h-40 rounded-[30px] overflow-hidden bg-slate-100 shadow-inner">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                </div>
                
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">{item.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU : {item.sku}</p>
                      </div>
                      <span className="text-xl font-black text-slate-900 italic tracking-tighter">€{item.price.toFixed(2)}</span>
                   </div>

                   <div className="flex items-center gap-4 mb-8">
                      {item.size && (
                        <div className="bg-slate-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase text-slate-500 border border-slate-100">Size: {item.size}</div>
                      )}
                      {item.color && (
                        <div className="bg-slate-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase text-slate-500 border border-slate-100">Color: {item.color}</div>
                      )}
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-[9px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                      >
                        <X size={14} /> Remove
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[50px] shadow-2xl shadow-slate-100 border border-slate-50">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-10">Order Summary</h3>
              
              <div className="space-y-6 mb-10 pb-10 border-b border-slate-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xs font-black text-slate-900">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <div className="text-right">
                    <span className="text-xs font-black text-[var(--color-pink)]">Free</span>
                    <p className="text-[8px] font-bold text-slate-300 line-through">OVER €100</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Tax</span>
                  <span className="text-xs font-black text-slate-900">€31.45</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total</span>
                <span className="text-4xl font-black text-[var(--color-pink)] italic tracking-tighter">€{total.toFixed(2)}</span>
              </div>

              <button className="w-full h-16 rounded-3xl signature-gradient text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-pink-100 neon-glow-btn hover:scale-[1.02] transition-transform">
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <div className="mt-8 space-y-3">
                 <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400">
                    <ShieldCheck size={14} className="text-green-500" />
                    SECURE CHECKOUT POWERED BY THREADPAY
                 </div>
                 <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400">
                    <RotateCcw size={14} className="text-blue-500" />
                    FREE 30-DAY RETURNS FOR ELITE MEMBERS
                 </div>
              </div>
            </div>

            <div className="p-8 rounded-[40px] bg-slate-50 border border-white shadow-sm">
               <span className="text-[9px] font-black text-[var(--color-pink)] uppercase tracking-widest mb-2 block">Member Perk</span>
               <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                 You're earning <span className="text-slate-900">4,014 Threads</span> with this order.
               </p>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter" style={{ fontFamily: "var(--font-headline)" }}>
              You Might <span className="text-[var(--color-pink)]">Also Like</span>
            </h2>
            <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
              View Catalog <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {suggestedProducts.map((p, idx) => (
              <ProductCard key={idx} {...p} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Cart;
