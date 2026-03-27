import React from "react";
import { Link } from "@tanstack/react-router";
import { Share2, Camera, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2
              className="font-black text-2xl text-slate-900 italic tracking-tighter mb-6"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              ThreadLux
            </h2>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Réinventer le luxe urbain à travers l'expression de soi. Chaque pièce est une histoire que vous portez.
            </p>
            <div className="flex space-x-4 text-slate-400">
              <Share2 size={18} className="cursor-pointer hover:text-[var(--color-pink)]" />
              <Camera size={18} className="cursor-pointer hover:text-[var(--color-pink)]" />
              <MessageCircle size={18} className="cursor-pointer hover:text-[var(--color-pink)]" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}> Explorer </h3>
            <ul className="space-y-4 text-slate-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">À propos</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">Nouveautés</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">Collections</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}> Service Client </h3>
            <ul className="space-y-4 text-slate-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">FAQ</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">Retours</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-pink)]">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}> Newsletter </h3>
            <p className="text-slate-500 text-xs mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Soyez les premiers informés de nos prochains drops exclusifs.
            </p>
            <div className="flex bg-slate-100 rounded-full p-1 pl-4 items-center overflow-hidden border border-transparent focus-within:border-[var(--color-pink)] transition-all">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent text-xs w-full outline-none py-2 text-slate-700 placeholder:text-slate-400"
              />
              <button className="bg-[var(--color-pink)] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-[var(--color-pink-dim)] transition-colors">
                Rejoindre
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-mono tracking-widest uppercase gap-4">
          <span>© 2024 THREADLUX. WEAR YOUR STORY.</span>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-[var(--color-pink)]">MENTIONS LÉGALES</Link>
            <Link to="/" className="hover:text-[var(--color-pink)]">CONFIDENTIALITÉ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
