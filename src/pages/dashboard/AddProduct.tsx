import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { BaseInfo } from "../../components/dashboard/BaseInfo";
import { Variants } from "../../components/dashboard/Variants";
import { MediaUpload } from "../../components/dashboard/MediaUpload";
import { Pricing } from "../../components/dashboard/Pricing";
import { SettingsSection } from "../../components/dashboard/Settings";
import { Button } from "../../components/ui/Button";
import { Sparkles } from "lucide-react";
import { productService, type ProductData } from "../../services/product";

const AddProduct: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProductData>({
    categorie_id: 0,
    name: "",
    description: "",
    slug: "",
    prix: 0,
    promo: undefined,
    origine: "Portugal",
    coupe: "Oversize",
    stock_global: 0,
    variants: [],
    images: [],
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from name
      if (field === 'name') {
        updated.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }
      return updated;
    });
  };

  const handleAddVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { taille: "M", couleur: "Default", sku: `SKU-${Date.now()}`, stock: 0 }]
    }));
  };

  const handleRemoveVariant = (index: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => i === index ? { ...v, [field]: value } : v)
    }));
  };

  const handlePublish = async () => {
    if (form.categorie_id === 0) {
      setError("Veuillez sélectionner une catégorie.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Ensure numeric values are numbers
      const payload = {
        ...form,
        prix: Number(form.prix),
        promo: form.promo ? Number(form.promo) : undefined,
        stock_global: Number(form.stock_global),
        hasVariants: form.variants.length > 0
      };

      const response = await productService.createProduct(payload);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message || "Echec de creation du produit");
      }
    } catch (err: any) {
      setError("Une erreur est survenue lors de la communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-12">
        <h2 
          className="text-5xl font-black text-slate-900 italic tracking-tighter"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Nouveau <span className="text-[var(--color-pink)]">Produit.</span>
        </h2>
        
        <div className="flex gap-4">
          <Button variant="secondary" className="rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-widest border-slate-100 bg-white">
            Enregistrer Brouillon
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={loading}
            className="rounded-2xl px-10 py-4 text-xs font-black uppercase tracking-widest signature-gradient neon-glow-btn flex items-center gap-2"
          >
            {loading ? "Chargement..." : "Publier le produit"}
            {!loading && <Sparkles size={16} />}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-[30px] flex items-center gap-4 text-red-600 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">⚠️</div>
           <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 rounded-[30px] flex items-center gap-4 text-green-600 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">✅</div>
           <p className="text-xs font-bold uppercase tracking-tight">Le produit a été publié avec succès !</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BaseInfo data={form} onChange={handleChange} />
          <Variants 
            variants={form.variants} 
            onAdd={handleAddVariant} 
            onRemove={handleRemoveVariant} 
            onChange={handleVariantChange} 
          />
          <MediaUpload 
            images={form.images} 
            onAdd={(url) => setForm(prev => ({ ...prev, images: [...prev.images, { url_image: url, is_principal: prev.images.length === 0 }] }))} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <Pricing data={form} onChange={handleChange} />
          <SettingsSection data={form} onChange={handleChange} />
          
          {/* Guide box */}
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-purple-50 to-pink-50 border border-white shadow-sm relative overflow-hidden">
             <div className="absolute top-[-10px] right-[-10px] w-24 h-24 bg-white/20 rounded-full blur-2xl" />
             <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-white shadow-sm text-[var(--color-pink)]">
                  <Sparkles size={18} />
                </div>
                <div>
                   <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-tight">Guide de Vente ThreadLux</h4>
                   <p className="text-[11px] text-slate-500 leading-relaxed">
                     Les produits avec au moins 5 photos haute définition convertissent 40% mieux sur notre plateforme. Pensez au SEO !
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
