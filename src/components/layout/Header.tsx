import React from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1
            className="font-black text-2xl text-slate-900 italic tracking-tighter"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            ThreadLux
          </h1>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/new"
            href="/new"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-pink)] [&.active]:text-[var(--color-pink)] [&.active]:border-b-2 [&.active]:border-[var(--color-pink)] [&.active]:pb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Nouveautés
          </Link>
          <Link
            to="/shop"
            href="/shop"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-pink)] [&.active]:text-[var(--color-pink)] [&.active]:border-b-2 [&.active]:border-[var(--color-pink)] [&.active]:pb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Femme
          </Link>
          <Link
            to="/shop"
            href="/shop"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-pink)] [&.active]:text-[var(--color-pink)] [&.active]:border-b-2 [&.active]:border-[var(--color-pink)] [&.active]:pb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Homme
          </Link>
          <Link
            to="/shop"
            href="/shop"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-pink)] [&.active]:text-[var(--color-pink)] [&.active]:border-b-2 [&.active]:border-[var(--color-pink)] [&.active]:pb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Soldes
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-slate-700">
          <button className="hover:text-[var(--color-pink)] transition-colors">
            <Heart size={20} />
          </button>
          {(!user || user.role === 'client') && (
            <Link to="/cart" className="hover:text-[var(--color-pink)] transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-pink)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/account" className="flex flex-col items-end hidden sm:flex cursor-pointer group">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover:text-[var(--color-pink)] transition-colors">Mon Espace</span>
                <span className="text-xs font-black text-slate-900 uppercase tracking-tighter leading-none group-hover:text-[var(--color-pink)] transition-colors">{user?.firstname}</span>
              </Link>
              <Link to="/account" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-[var(--color-pink-dim)] hover:text-[var(--color-pink)] transition-all border border-slate-100 sm:hidden">
                <User size={18} />
              </Link>
              <button 
                onClick={() => logout()}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                title="Déconnexion"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-[var(--color-pink-dim)] hover:text-[var(--color-pink)] transition-all border border-slate-100">
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
