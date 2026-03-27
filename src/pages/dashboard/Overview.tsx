import React from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { QuickActions, PromoCard } from "../../components/dashboard/DashboardStats";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product";
import { Award, Edit, Trash2 } from "lucide-react";

const Overview: React.FC = () => {
  const { user } = useAuth();

  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productService.getProducts(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => productService.getCategories(),
  });

  const products = productsData?.data || [];
  const categoriesCount = categoriesData?.data?.length || 0;

  return (
    <DashboardLayout>
      <div className="mb-14">
        <h1 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-tight mb-3">
          Welcome back, <span className="text-[var(--color-pink)]">{user?.firstname || 'Admin'}!</span>
        </h1>
        <p className="text-sm font-bold text-slate-400 max-w-sm">
          Here is the overview of your boutique's catalog and stats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Big Cards (Product List) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Admin Stats Card */}
          <div className="p-8 rounded-[45px] bg-[var(--color-pink)] text-white shadow-2xl shadow-pink-200 relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-purple-400/20 rounded-full blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">
                  Admin Overview
                </div>
                <Award size={24} className="opacity-50" />
              </div>
              
              <h3 className="text-3xl font-black italic tracking-tighter mb-10">Catalog Stats</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">Total Products</p>
                  <p className="text-4xl font-black tracking-tighter">{loadingProducts ? '...' : products.length}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">Categories</p>
                  <p className="text-4xl font-black tracking-tighter">{categoriesCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product List Table */}
          <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic mb-8">Registered Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                    <th className="pb-6 px-4">Product</th>
                    <th className="pb-6 px-4">Category</th>
                    <th className="pb-6 px-4">Price</th>
                    <th className="pb-6 px-4">Stock</th>
                    <th className="pb-6 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                  {loadingProducts ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400">Chargement...</td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400">Aucun produit trouvé.</td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                      <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-4">
                          <img 
                            src={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} 
                            className="w-10 h-10 rounded-xl object-cover" 
                            alt={product.name} 
                          />
                          <span className="text-xs font-black text-slate-900 tracking-tight">{product.name}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-bold text-slate-400">{product.category?.name || '-'}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-black text-slate-900 italic tracking-tighter">{product.prix}€</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-bold text-slate-400">{product.stock_global}</span>
                        </td>
                        <td className="py-4 px-4 text-center flex justify-center gap-2">
                           <button className="p-2 text-slate-300 hover:text-[var(--color-pink)] transition-all">
                              <Edit size={16} />
                           </button>
                           <button className="p-2 text-slate-300 hover:text-red-500 transition-all">
                              <Trash2 size={16} />
                           </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
          <PromoCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
