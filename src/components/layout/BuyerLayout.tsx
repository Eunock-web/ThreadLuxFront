import React from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export const BuyerLayout: React.FC<BuyerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <ShoppingBag size={20} />, label: "Orders", href: "/dashboard/orders" },
    { icon: <Heart size={20} />, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: <Settings size={20} />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFD]">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col px-8 py-10 z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <div>
            <h2 className="font-black text-sm text-slate-900 tracking-tight">ThreadLux <span className="text-slate-400">HQ</span></h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Tier</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mb-10 p-5 rounded-[30px] bg-slate-50/50 border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer">
           <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstname || 'Guest'}`} alt="avatar" />
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{user?.firstname} {user?.lastname}</h3>
              <p className="text-[9px] font-black text-[var(--color-pink)] uppercase tracking-tighter">Premium Member</p>
           </div>
        </div>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/dashboard/');
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-[22px] transition-all font-black text-xs tracking-tight ${
                  isActive 
                  ? "bg-[var(--color-pink)] text-white shadow-xl shadow-pink-200 neon-glow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.icon}
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4 pt-8">
           <Link to="/dashboard" className="w-full py-4 rounded-2xl signature-gradient text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-pink-100">
             New Drop
           </Link>
           
           <div className="space-y-1">
              <button className="flex items-center gap-4 px-5 py-3 w-full text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs">
                <HelpCircle size={18} />
                Support
              </button>
              <button 
                onClick={logout}
                className="flex items-center gap-4 px-5 py-3 w-full text-slate-400 hover:text-red-500 transition-colors font-bold text-xs"
              >
                <LogOut size={18} />
                Logout
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FDFCFD] relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] opacity-50 -z-10" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-purple-50 rounded-full blur-[100px] opacity-50 -z-10" />

        {/* Header */}
        <header className="h-24 px-12 flex items-center justify-between z-10">
           <div className="flex items-center gap-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dashboard Acheteur</p>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                 <Search size={16} className="text-slate-400" />
                 <input 
                   placeholder="Rechercher..." 
                   className="bg-transparent border-none text-[11px] font-bold outline-none w-40 placeholder:text-slate-300"
                 />
              </div>
              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                <Bell size={20} />
              </button>
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstname || 'Felix'}`} alt="avatar" />
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-12 pb-12 custom-scrollbar z-10">
          <div className="max-w-6xl mx-auto pt-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
