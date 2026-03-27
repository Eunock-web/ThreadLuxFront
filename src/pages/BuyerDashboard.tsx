import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { favorisService } from "../services/favoris";
import { ProductCard } from "../components/shop/ProductCard";
import { User, Heart, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const BuyerDashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favoris'>('favoris');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  const { data: favorisData, isLoading } = useQuery({
    queryKey: ['favoris'],
    queryFn: () => favorisService.getFavoris(),
    enabled: isAuthenticated,
  });

  const favoris = favorisData?.data?.data || [];

  if (!isAuthenticated) return null;

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "var(--font-headline)" }}>
              Mon Espace <span className="text-[var(--color-pink)] italic">Client</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Gérez vos commandes, vos favoris et vos informations personnelles.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl font-black text-[var(--color-pink)]">
                    {user?.firstname?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{user?.firstname} {user?.lastname}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Acheteur</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-3 w-full p-3 rounded-2xl transition-all text-sm font-bold ${activeTab === 'profile' ? 'bg-[var(--color-pink)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <User size={18} /> Mon Profil
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3 w-full p-3 rounded-2xl transition-all text-sm font-bold ${activeTab === 'orders' ? 'bg-[var(--color-pink)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <ShoppingBag size={18} /> Mes Commandes
                  </button>
                  <button 
                    onClick={() => setActiveTab('favoris')}
                    className={`flex items-center gap-3 w-full p-3 rounded-2xl transition-all text-sm font-bold ${activeTab === 'favoris' ? 'bg-[var(--color-pink)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <Heart size={18} /> Mes Favoris
                    {favoris.length > 0 && (
                      <span className={`ml-auto text-[10px] py-0.5 px-2 rounded-full ${activeTab === 'favoris' ? 'bg-white text-[var(--color-pink)]' : 'bg-slate-200 text-slate-600'}`}>
                        {favoris.length}
                      </span>
                    )}
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full p-3 rounded-2xl transition-all text-sm font-bold text-slate-600 hover:bg-slate-50 mt-4 border border-transparent"
                  >
                    <Settings size={18} /> Paramètres
                  </button>
                  <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full p-3 rounded-2xl transition-all text-sm font-bold text-red-500 hover:bg-red-50 mt-2"
                  >
                    <LogOut size={18} /> Déconnexion
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[600px]">
                
                {/* Favoris Tab */}
                {activeTab === 'favoris' && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8" style={{ fontFamily: "var(--font-headline)" }}>
                      Ma Liste de Souhaits
                    </h2>
                    
                    {isLoading ? (
                      <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
                      </div>
                    ) : favoris.length === 0 ? (
                      <div className="text-center py-20">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                          <Heart size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Votre liste est vide</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Explorez nos collections et sauvegardez vos pièces préférées pour les retrouver plus tard.</p>
                        <button onClick={() => navigate({ to: '/shop' })} className="bg-slate-900 text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--color-pink)] transition-colors">
                          Explorer le catalogue
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoris.map((fav: any) => {
                          const product = fav.variant?.product;
                          const image = fav.variant?.images?.[0]?.url_image || product?.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1";
                          
                          if (!product) return null;
                          
                          return (
                            <ProductCard 
                              key={fav.id}
                              id={product.id}
                              variantId={fav.variant_id}
                              image={image}
                              title={product.name}
                              price={`${product.prix}€`}
                              category={product.category?.name || "ARCHIVE"}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab (Placeholder) */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8" style={{ fontFamily: "var(--font-headline)" }}>
                      Historique des Commandes
                    </h2>
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center">
                      <ShoppingBag size={32} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="font-bold text-slate-900 mb-2">Aucune commande</h3>
                      <p className="text-slate-500 text-sm">Vous n'avez pas encore passé de commande, ou l'historique est en cours de synchronisation.</p>
                    </div>
                  </div>
                )}

                {/* Profile Tab (Placeholder) */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8" style={{ fontFamily: "var(--font-headline)" }}>
                      Informations Personnelles
                    </h2>
                    <div className="space-y-6 max-w-lg">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Nom & Prénom</span>
                        <div className="font-bold text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">{user?.firstname} {user?.lastname}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Email</span>
                        <div className="font-bold text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">{user?.email}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Membre depuis</span>
                        <div className="font-bold text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Non renseigné"}</div>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerDashboard;
