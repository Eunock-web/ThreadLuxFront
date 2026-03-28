import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Users, 
  BarChart3, 
  Plus, 
  HelpCircle, 
  LogOut,
  Bell
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", href: "/dashboard" },
    { icon: <BarChart3 size={20} />, label: "Payouts", href: "/dashboard/payouts" },
    { icon: <Package size={20} />, label: "Products", href: "/dashboard/products", active: true },
    { icon: <Layers size={20} />, label: "Collections", href: "/dashboard/collections" },
    { icon: <Users size={20} />, label: "Customers", href: "/dashboard/customers" },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFD]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col px-6 py-8">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-full bg-[var(--color-pink-dim)] flex items-center justify-center text-white font-black text-xs">
            TL
          </div>
          <div>
            <h2 className="font-black text-sm text-slate-900 leading-tight">ThreadLux HQ</h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Tier</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-xs tracking-tight ${
                  isActive 
                  ? "bg-[var(--color-pink)]/5 text-[var(--color-pink)] shadow-sm border border-[var(--color-pink)]/10" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className={isActive ? "text-[var(--color-pink)]" : "text-slate-400 group-hover:text-slate-900"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-[var(--color-pink)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6">
          <button className="w-full py-4 rounded-2xl signature-gradient neon-glow-btn text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <Plus size={16} />
            New Drop
          </button>

          <div className="space-y-1">
            <button className="flex items-center gap-4 px-4 py-2 w-full text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs">
              <HelpCircle size={18} />
              Support
            </button>
            <button 
              onClick={() => logout()}
              className="flex items-center gap-4 px-4 py-2 w-full text-slate-400 hover:text-red-500 transition-colors font-bold text-xs"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/50 backdrop-blur-sm px-10 flex items-center justify-between border-b border-slate-50">
           <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-slate-400">
             PRODUCTS <span className="text-slate-300">›</span> <span className="text-slate-900">AJOUTER UN PRODUIT</span>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                <Bell size={18} />
              </button>
              <div className="h-8 w-px bg-slate-100" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900 leading-none mb-1">{user?.firstname}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
