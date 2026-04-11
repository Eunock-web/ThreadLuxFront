import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9F9F9] pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="z-10">
            <h1 
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Redéfinissez <br />
              <span className="text-[var(--color-pink)] italic">Votre Style</span> <br />
              Unique
            </h1>
            <p className="text-slate-500 text-lg max-w-md mb-10 font-medium leading-relaxed">
              Découvrez une collection éditée où le luxe rencontre l'audace urbaine. Des pièces exclusives conçues pour ceux qui osent.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 py-6 text-base font-bold">
                Découvrir la collection
              </Button>
              <Button variant="secondary" size="lg" className="rounded-full px-8 py-6 text-base font-bold bg-white border-slate-200">
                Voir les soldes
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" 
                alt="New Collection Model" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              {/* Floating badges from screenshot */}
              <div className="absolute top-8 right-[-20px] bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/20 transform -rotate-12">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-900">Nouveau</span>
              </div>
              <div className="absolute bottom-12 left-[-20px] bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/20 transform rotate-12">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-900">Tendance</span>
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-pink)] opacity-10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
