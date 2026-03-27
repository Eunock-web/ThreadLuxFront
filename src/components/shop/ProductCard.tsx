import React from "react";
import { Heart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favorisService } from "../../services/favoris";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

interface ProductCardProps {
  id?: number;
  variantId?: number;
  image: string;
  category: string;
  title: string;
  price: string;
  colors?: string[];
  badge?: "NOUVEAUTÉ" | "ÉDITION LIMITÉE";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  variantId,
  image,
  category,
  title,
  price,
  colors = [],
  badge,
}) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch all favoris to check if this item is favorited
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoris'] });
    },
  });

  const handleToggleFavoris = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return alert("Veuillez vous connecter pour ajouter aux favoris.");
    if (variantId) {
      toggleFavorisMutation.mutate();
    }
  };

  const handleCardClick = () => {
    if (id) {
      navigate({ to: '/product/$id', params: { id: id.toString() } });
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-slate-50 mb-4 transition-all duration-500 group-hover:shadow-xl">
        {/* Product Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-[var(--color-pink)] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
            {badge === "NOUVEAUTÉ" ? "NOUVEAUTÉ" : "ÉDITION LIMITÉE"}
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={handleToggleFavoris}
          disabled={toggleFavorisMutation.isPending}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all transform hover:scale-110"
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isFavorited ? "fill-[var(--color-pink)] text-[var(--color-pink)]" : "text-slate-800"}`} 
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start mb-2 px-1">
        <div>
          <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "var(--font-headline)" }}>
            {title}
          </h3>
          <p className="text-slate-400 text-[10px] uppercase font-mono tracking-widest mt-0.5">
            {category}
          </p>
        </div>
        <span className="font-bold text-[var(--color-pink)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          {price}
        </span>
      </div>

      {/* Colors Swatches */}
      {colors.length > 0 && (
        <div className="flex gap-2 px-1 mt-3">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="w-2.5 h-2.5 rounded-full border border-slate-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
