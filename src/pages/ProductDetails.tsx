import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/product";
import { favorisService } from "../services/favoris";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Route } from "../routes/product.$id";
import { Heart, Star, Truck, RotateCcw } from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = Route.useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const queryClient = useQueryClient();

  // Fetch product
  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id as string),
  });

  const product = productData?.data;
  const variantId = product?.variants?.[0]?.id;

  // Fetch related products
  const { data: allProductsData } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });
  const relatedProducts = allProductsData?.data?.filter((p: any) => p.id !== Number(id)).slice(0, 4) || [];

  // Fetch favoris
  const { data: favorisData } = useQuery({
    queryKey: ['favoris'],
    queryFn: () => favorisService.getFavoris(),
    enabled: isAuthenticated,
  });

  const favoris = favorisData?.data?.data || [];
  const isFavorited = variantId ? favoris.some((f: any) => f.variant_id === variantId) : false;

  const toggleFavorisMutation = useMutation({
    mutationFn: () => {
      if (!variantId) throw new Error("Variant ID missing");
      return isFavorited ? favorisService.removeFavoris(variantId) : favorisService.addFavoris(variantId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favoris'] }),
  });

  const handleToggleFavoris = () => {
    if (!isAuthenticated) return alert("Veuillez vous connecter pour ajouter aux favoris.");
    if (variantId) toggleFavorisMutation.mutate();
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--color-pink)] rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!product) return <MainLayout><div className="text-center py-20 font-bold text-red-500">Produit introuvable</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="mb-8 text-[10px] uppercase font-mono tracking-widest text-slate-400">
           <span className="hover:text-slate-900 cursor-pointer transition-colors">Accueil</span>
           <span className="mx-2">/</span>
           <span className="hover:text-slate-900 cursor-pointer transition-colors">{product.category?.name || 'Vêtements'}</span>
           <span className="mx-2">/</span>
           <span className="text-[var(--color-pink)]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Section */}
          <div className="flex gap-4">
             <div className="hidden sm:flex flex-col gap-4">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className={`w-20 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-[var(--color-pink)] p-0.5' : 'border-transparent'}`}>
                    <div className="w-full h-full rounded-xl overflow-hidden">
                       <img src={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} className="w-full h-full object-cover" alt="thumbnail" />
                    </div>
                  </div>
                ))}
             </div>
             <div className="relative flex-1 aspect-[3/4] bg-slate-50 rounded-[40px] overflow-hidden">
                <div className="absolute top-6 left-6 bg-[var(--color-pink)] text-white text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-lg z-10">
                  -20%
                </div>
                <img src={product.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" alt={product.name} />
             </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col py-6">
             <div className="mb-6 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-4 mb-4">
                   <span className="text-[9px] font-black text-[var(--color-pink)] tracking-widest uppercase bg-[var(--color-pink-dim)] px-2 py-1 rounded-md">Article Luxe</span>
                   <div className="flex items-center text-xs text-slate-500 font-bold">
                      <Star size={12} className="fill-orange-400 text-orange-400 mr-1" />
                      4.90 <span className="underline ml-2 cursor-pointer">{product.reviews?.length || 128} Avis clients</span>
                   </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-6" style={{ fontFamily: "var(--font-headline)" }}>
                  {product.name}
                </h1>
                <div className="flex items-end gap-3 mb-2">
                   <span className="text-4xl text-[var(--color-pink)] font-black tracking-tighter">{product.prix}€</span>
                   <span className="text-lg text-slate-400 font-bold line-through mb-1">{Number(product.prix) + 81}€</span>
                   <span className="text-[10px] font-black text-[var(--color-pink)] tracking-widest uppercase bg-[var(--color-pink-dim)] px-2 py-1 mb-1.5 rounded-sm">Économisez 81€</span>
                </div>
             </div>

             {/* Colors */}
             <div className="mb-8">
                <div className="text-[10px] font-black text-slate-900 tracking-widest uppercase mb-3 text-left w-full block">Couleur: Rose Grenat</div>
                <div className="flex gap-3">
                   {['#D01374', '#4C1D95', '#1E293B'].map((color, idx) => (
                      <button key={idx} className={`w-10 h-10 rounded-full border-2 transition-all ${idx === 0 ? 'border-[var(--color-pink)] p-1' : 'border-slate-200 hover:border-slate-300'}`}>
                         <div className="w-full h-full rounded-full" style={{ backgroundColor: color }}></div>
                      </button>
                   ))}
                </div>
             </div>

             {/* Sizes */}
             <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                   <div className="text-[10px] font-black text-slate-900 tracking-widest uppercase">Taille</div>
                   <div className="text-[9px] font-bold text-slate-500 tracking-widest uppercase cursor-pointer hover:text-slate-900 transition-colors">📏 Guide des tailles</div>
                </div>
                <div className="flex gap-3 flex-wrap relative">
                   {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`w-14 h-14 rounded-full border-2 flex justify-center items-center text-xs font-bold transition-all relative ${selectedSize === size ? 'border-[var(--color-pink)] text-[var(--color-pink)] shadow-md bg-white' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                         {size}
                         {size === 'M' && <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[8px] font-black rounded-sm px-1.5 py-0.5 shadow-sm transform rotate-6">Plus que 2!</span>}
                      </button>
                   ))}
                </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center justify-between border-2 border-slate-200 rounded-full px-6 py-4 w-full sm:w-40 shrink-0">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-slate-900 font-black text-xl leading-none">-</button>
                   <span className="font-bold text-slate-900 text-lg leading-none">{quantity}</span>
                   <button onClick={() => setQuantity(quantity + 1)} className="text-slate-400 hover:text-slate-900 font-black text-xl leading-none">+</button>
                </div>
                <button 
                  onClick={() => addToCart({ id: Number(id), name: product.name, price: Number(product.prix), image: product.images?.[0]?.url_image || '', quantity, size: selectedSize })}
                  className="flex-1 bg-[var(--color-pink)] hover:bg-[#A90F5E] shadow-xl shadow-[var(--color-pink-dim)] text-white rounded-full flex items-center justify-center font-bold tracking-wide transition-all transform hover:-translate-y-1 py-4 sm:py-0"
                >
                  Ajouter au panier
                </button>
             </div>
             
             <button 
                onClick={handleToggleFavoris}
                disabled={toggleFavorisMutation.isPending}
                className="w-full py-4 rounded-full border-2 border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors mb-10"
             >
                <Heart size={18} className={`mr-2 transition-colors ${isFavorited ? "fill-[var(--color-pink)] text-[var(--color-pink)]" : ""}`} /> 
                {isFavorited ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
             </button>

             {/* Features */}
             <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-8">
                <div className="flex items-center gap-3"><Truck size={16}/> Livraison express offerte</div>
                <div className="flex items-center gap-3"><RotateCcw size={16}/> Retours gratuits 30j</div>
             </div>
          </div>
        </div>

        {/* Tabs & Description */}
        <div className="mt-28">
           <div className="flex border-b border-slate-200 gap-10 mb-16 overflow-x-auto no-scrollbar">
              {['description', 'composition & entretien', 'avis'].map((tab) => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`pb-5 text-[11px] font-black tracking-widest uppercase transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-[var(--color-pink)]' : 'text-slate-400 hover:text-slate-900'}`}
                 >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-pink)] rounded-t-full"></div>}
                 </button>
              ))}
           </div>
           
           {activeTab === 'description' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                <div>
                   <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-8" style={{ fontFamily: "var(--font-headline)" }}>
                     L'élégance redéfinie.
                   </h3>
                   <p className="text-slate-600 leading-relaxed font-medium text-lg">
                     {product.description || "Inspirée par les reflets de l'aurore boréale, la robe Aura est une pièce maîtresse de notre collection Capsule. Confectionnée dans une soie de mûrier 19 mommes, elle drape le corps avec une fluidité exceptionnelle. Sa coupe asymétrique et son dos nu architectural en font le choix idéal pour vos événements les plus prestigieux."}
                   </p>
                </div>
                <div className="bg-slate-50 rounded-[40px] p-10 mt-8 md:mt-0">
                   <h4 className="text-[10px] font-black text-[var(--color-pink)] uppercase tracking-widest mb-8">Détails techniques</h4>
                   <div className="space-y-6 text-sm font-medium">
                      <div className="flex justify-between border-b pb-4 border-slate-200">
                         <span className="text-slate-400">SKU</span>
                         <span className="text-slate-900 font-mono tracking-widest">{product.variants?.[0]?.sku || 'TL-DR-001-02'}</span>
                      </div>
                      <div className="flex justify-between border-b pb-4 border-slate-200">
                         <span className="text-slate-400">Coupe</span>
                         <span className="text-slate-900">{product.coupe || 'Ajustée / Fluide'}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                         <span className="text-slate-400">Origine</span>
                         <span className="text-slate-900">{product.origine ? `Atelier ${product.origine}` : 'Atelier Lyon, France'}</span>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Complétez votre look placeholder */}
        <div className="mt-32">
          <div className="flex justify-between items-end mb-12">
             <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black text-[var(--color-pink)] tracking-widest">Vous aimerez aussi</span>
                <h3 className="text-4xl font-black tracking-tighter text-slate-900" style={{ fontFamily: "var(--font-headline)" }}>
                   Complétez votre look
                </h3>
             </div>
             <div className="hidden sm:flex gap-2 pb-2">
                <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50">←</button>
                <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50">→</button>
             </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {relatedProducts.map((relProduct: any) => (
                <div key={relProduct.id} className="group cursor-pointer" onClick={() => window.location.href = `/product/${relProduct.id}`}>
                   <div className="aspect-[3/4] bg-slate-50 rounded-3xl overflow-hidden mb-4 relative">
                      <div className="absolute top-2 left-2 bg-[var(--color-pink)] text-white text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded-full shadow-lg z-10">
                        Top {relProduct.category?.name || "Tendances"}
                      </div>
                      <img 
                        src={relProduct.images?.[0]?.url_image || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt={relProduct.name}
                      />
                   </div>
                   <h5 className="font-bold text-slate-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{relProduct.name}</h5>
                   <p className="font-black text-[var(--color-pink)] text-xs mt-1">{relProduct.prix}€</p>
                </div>
             ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default ProductDetails;
