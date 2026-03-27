import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    author: "Sarah L.",
    role: "Acheteuse vérifiée",
    content: "Qualité exceptionnelle. J'ai commandé la manteau et la coupe est absolument parfaite. Livraison ultra rapide ! ",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    author: "Marc R.",
    role: "Acheteur vérifié",
    content: "Enfin une marque qui allie style et confort. Les sneakers sont mes nouveaux basiques favoris, je recommande.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    author: "Julie D.",
    role: "Acheteuse vérifiée",
    content: "Le service client est au top. J'ai dû échanger une taille et tout s'est fait en 48h. Je recommanderai !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-black text-slate-900 tracking-tighter mb-16 text-center uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Ce que nos clients disent
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-orange-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
