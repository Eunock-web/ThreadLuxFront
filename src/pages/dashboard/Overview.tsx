import React from "react";
import { BuyerLayout } from "../../components/layout/BuyerLayout";
import { CurrentOrder } from "../../components/dashboard/CurrentOrder";
import { EliteCard, QuickActions, PromoCard } from "../../components/dashboard/DashboardStats";
import { OrderHistory } from "../../components/dashboard/OrderHistory";
import { useAuth } from "../../contexts/AuthContext";

const Overview: React.FC = () => {
  const { user } = useAuth();

  return (
    <BuyerLayout>
      <div className="mb-14">
        <h1 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-tight mb-3">
          Welcome back, <span className="text-[var(--color-pink)]">{user?.firstname}!</span>
        </h1>
        <p className="text-sm font-bold text-slate-400 max-w-sm">
          Your style is evolving. Here's what's happening with your latest drops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Big Cards */}
        <div className="lg:col-span-2">
          <CurrentOrder />
          <OrderHistory />
        </div>

        {/* Right Column: Stats & Actions */}
        <div className="lg:col-span-1">
          <EliteCard />
          <QuickActions />
          <PromoCard />
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Overview;
