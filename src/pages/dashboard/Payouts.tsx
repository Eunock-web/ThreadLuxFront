import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { escrowService } from "../../services/escrowService";
import type { Payout } from "../../services/escrowService";
import { Wallet, ArrowRight, CheckCircle2, AlertCircle, Clock, Search } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

const Payouts: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: payouts, isLoading } = useQuery({
    queryKey: ['pending-payouts'],
    queryFn: () => escrowService.getPendingPayouts(),
  });

  const releaseMutation = useMutation({
    mutationFn: (id: number) => escrowService.releaseFunds(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-payouts'] });
    },
  });

  const handleRelease = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment débloquer les fonds pour cette commande ?")) {
      await releaseMutation.mutateAsync(id);
    }
  };

  const filteredPayouts = payouts?.data?.filter((p: Payout) => 
    p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.acheteur?.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalAmount = filteredPayouts.reduce((acc: number, curr: Payout) => acc + parseFloat(curr.amount), 0);

  return (
    <DashboardLayout>
      <div className="mb-14">
        <h1 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-tight mb-3">
          Vos <span className="text-[var(--color-pink)]">Paiements</span>
        </h1>
        <p className="text-sm font-bold text-slate-400 max-w-sm">
          Gérez vos fonds en attente et déclenchez vos reversements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Bar */}
          <div className="p-8 rounded-[45px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60 text-slate-400">Total en attente</p>
                <p className="text-5xl font-black tracking-tighter italic">{totalAmount.toLocaleString()} <span className="text-sm not-italic opacity-50 ml-1">XOF</span></p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Wallet className="text-[var(--color-pink)]" size={32} />
              </div>
            </div>
          </div>

          {/* List Table */}
          <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Transactions en Escrow</h3>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-12 pr-6 py-3 rounded-full bg-slate-50 border-none text-xs font-bold focus:ring-2 focus:ring-[var(--color-pink)]/20 transition-all w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                    <th className="pb-6 px-4 text-center">Réf</th>
                    <th className="pb-6 px-4">Client</th>
                    <th className="pb-6 px-4">Montant</th>
                    <th className="pb-6 px-4">Date</th>
                    <th className="pb-6 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                  {isLoading ? (
                    <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">Récupération des données...</td></tr>
                  ) : filteredPayouts.length === 0 ? (
                    <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">Aucun paiement en attente.</td></tr>
                  ) : (
                    filteredPayouts.map((p: Payout) => (
                      <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-4">
                          <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-600 block text-center">
                            {p.reference}
                          </span>
                        </td>
                        <td className="py-6 px-4">
                          <p className="text-xs font-black text-slate-900 leading-none mb-1">{p.acheteur?.firstname} {p.acheteur?.lastname}</p>
                          <p className="text-[9px] font-bold text-slate-400">{p.acheteur?.email}</p>
                        </td>
                        <td className="py-6 px-4">
                          <span className="text-sm font-black text-slate-900 italic tracking-tighter">
                            {parseInt(p.amount).toLocaleString()} {p.currency}
                          </span>
                        </td>
                        <td className="py-6 px-4">
                          <span className="text-[10px] font-bold text-slate-400">
                            {format(new Date(p.created_at), "dd MMM yyyy", { locale: fr })}
                          </span>
                        </td>
                        <td className="py-6 px-4 text-center">
                          <button 
                            onClick={() => handleRelease(p.id)}
                            disabled={releaseMutation.isPending}
                            className="px-6 py-3 rounded-full bg-[var(--color-pink)] text-white text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-pink-200 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
                          >
                            {releaseMutation.isPending ? "..." : "Libérer"}
                            <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Help / Info */}
        <div className="lg:col-span-1 space-y-8">
           <div className="p-10 rounded-[45px] bg-white border border-slate-100 shadow-xl shadow-slate-100/50">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                <Clock className="text-slate-400" size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-900 italic tracking-tighter mb-4">Comment ça marche ?</h4>
              <ul className="space-y-4">
                {[
                  "Les fonds sont bloqués en escrow jusqu'à votre action.",
                  "Dès que vous cliquez sur Libérer, le transfert FedaPay est initié.",
                  "Les fonds arrivent sur votre compte sous 24-48h.",
                  "En cas de litige, l'acheteur peut demander un remboursement."
                ].map((text, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 size={14} className="text-[var(--color-pink)] shrink-0 mt-1" />
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
           </div>

           <div className="p-10 rounded-[45px] bg-red-50 border border-red-100/50">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-500" size={18} />
                <h4 className="text-xs font-black text-red-900 uppercase tracking-widest">Aide Litige</h4>
              </div>
              <p className="text-xs font-bold text-red-700/70 leading-relaxed mb-6">
                Si un client signale un problème avec sa commande, ne libérez pas les fonds avant résolution.
              </p>
              <button className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Voir les litiges
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payouts;
