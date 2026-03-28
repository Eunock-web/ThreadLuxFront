import React, { useState, useEffect } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useCart } from "../contexts/CartContext";
import { ShieldCheck, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";

declare global {
  interface Window {
    FedaPay: any;
  }
}

const Checkout: React.FC = () => {
  const { cart, subtotal, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Bénin",
    phone: "",
  });

  // 1. CHARGEMENT DU SDK FEDAPAY
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.fedapay.com/checkout.js?v=1.1.7";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. VÉRIFICATION CÔTÉ LARAVEL
  const verifyOnBackend = async (transactionId: number) => {
    try {
      const response = await fetch("http://localhost:8000/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            transaction_id: transactionId,
            customer_email: form.email,
            cart: cart.map(item => ({ id: item.id, quantity: item.quantity })),
            amount: Math.round(total)
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        clearCart?.();
      } else {
        alert("Le serveur n'a pas pu valider le paiement.");
      }
    } catch (error) {
      console.error("Erreur Backend:", error);
      alert("Une erreur est survenue lors de la vérification du paiement.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!window.FedaPay) {
        alert("Le système de paiement charge encore, réessayez dans un instant.");
        return;
    }

    setLoading(true);

    const checkout = window.FedaPay.init({
      public_key: "pk_sandbox_8yGPFrhSX24bjZbcgIGuBhKc",
      transaction: {
        amount: Math.round(total),
        description: `Commande de ${form.firstName} ${form.lastName}`,
      },
      customer: {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        phone_number: {
            number: form.phone,
            country: 'BJ'
        }
      },
      onComplete: (data: any) => {
        const transaction = data.transaction ?? data;
        const status      = transaction?.status;

        console.log('[FedaPay] onComplete raw data:', data);

        // In sandbox or some mobile money cases, status can be 'pending' or 'initiated' 
        // but the payment flow is considered "done" by the widget.
        // We verify on backend to get the formal status.
        if (status === "approved" || status === "pending" || status === "initiated" || data.reason === "checkout_completed") {
           verifyOnBackend(transaction.id ?? data.id);
        } else {
           setLoading(false);
           alert(`Fin de transaction (statut: ${status ?? data.reason ?? 'inconnu'}).`);
        }
      },
      onClose: () => setLoading(false)
    });

    checkout.open();
  };

  if (cart.length === 0 && !success) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic mb-4">
            Your Cart is <span className="text-[var(--color-pink)]">Empty.</span>
          </h1>
          <p className="text-slate-500 mb-8">Add some items before proceeding to checkout.</p>
          <a href="/shop" className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-black text-white hover:bg-slate-800 transition-colors">
            Return to Shop
          </a>
        </div>
      </MainLayout>
    );
  }

  if (success) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic mb-4">
            Order <span className="text-green-500">Confirmed.</span>
          </h1>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Thank you for your purchase. We've sent a confirmation email to {form.email} with your order details.
          </p>
          <a href="/shop" className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-black text-white hover:bg-slate-800 transition-colors">
            Continue Shopping
          </a>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-2" style={{ fontFamily: "var(--font-headline)" }}>
            Secure <span className="text-[var(--color-pink)]">Checkout.</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete your shipping details below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Shipping Form */}
          <div className="bg-white p-10 rounded-[50px] shadow-xl shadow-slate-100/50 border border-slate-50">
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-50">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900">
                <Truck size={18} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Shipping Information</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Where should we send your order?</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">First Name *</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="John" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">Last Name *</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">Email Address *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="john.doe@example.com" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">Street Address *</label>
                <input required name="address" value={form.address} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="123 Luxury Ave" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">City *</label>
                  <input required name="city" value={form.city} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="Cotonou" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">ZIP Code *</label>
                  <input required name="zipCode" value={form.zipCode} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="00000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">Country *</label>
                  <input readOnly name="country" value={form.country} className="w-full h-12 px-4 rounded-xl bg-slate-100 border border-slate-200 text-sm focus:outline-none text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2">Phone Number *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all text-slate-900" placeholder="60 00 00 00" />
                </div>
              </div>

              <div className="pt-8">
                <Button type="submit" disabled={loading} className="w-full h-16 rounded-3xl signature-gradient text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-pink-100 neon-glow-btn hover:scale-[1.02] transition-transform">
                  {loading ? "Processing..." : "Payer avec FedaPay"} <ArrowRight size={16} />
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400">
                  <ShieldCheck size={14} className="text-green-500" />
                  PAYEMENT SÉCURISÉ PAR FEDAPAY
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 p-10 rounded-[50px] border border-white shadow-inner">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Order Summary</h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black text-slate-900 mb-1">{item.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">
                       {item.size ? `Sz: ${item.size}` : ''} {item.color ? `• Col: ${item.color}` : ''} • Qty: {item.quantity}
                    </p>
                    <span className="text-sm font-black text-slate-900 italic">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 pt-6 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subtotal</span>
                <span className="text-xs font-black text-slate-900">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Shipping</span>
                <span className="text-xs font-black text-[var(--color-pink)]">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimated Tax</span>
                <span className="text-xs font-black text-slate-900">€31.45</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-8 border-t border-slate-200">
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total</span>
              <span className="text-4xl font-black text-[var(--color-pink)] italic tracking-tighter">€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
