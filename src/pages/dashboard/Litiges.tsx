import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { escrowService } from "../../services/escrowService";
import { AlertOctagon, Search, Clock, MessageSquare, User, Package, ChevronRight, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

const Litiges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: litiges, isLoading } = useQuery({
    queryKey: ['seller-litiges'],
    queryFn: () => escrowService.getLitiges(),
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ouverte':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase tracking-widest">Ouverte</span>;
      case 'en_cours':
        return <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[9px] font-black uppercase tracking-widest">En cours</span>;
      case 'resolue_vendeur':
        return <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[9px] font-black uppercase tracking-widest">Résolue (Vendeur)</span>;
      case 'resolue_acheteur':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase tracking-widest">Remboursée</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">{status}</span>;
    }
  };

  const filteredLitiges = litiges?.data?.filter((l: any) => 
    l.transaction?.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <DashboardLayout>
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-3">
           <AlertOctagon className="text-[var(--color-pink)]" size={32} />
           <h1 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-tight">
            Gestion des <span className="text-[var(--color-pink)]">Litiges</span>
          </h1>
        </div>
        <p className="text-sm font-bold text-slate-400 max-w-lg">
          Suivez et répondez aux réclamations de vos clients pour garantir une expérience premium.
        </p>
      </div>

      <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Historique des Litiges</h3>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Rechercher un litige..." 
              className="pl-12 pr-6 py-3 rounded-full bg-slate-50 border-none text-xs font-bold focus:ring-2 focus:ring-[var(--color-pink)]/20 transition-all w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-20 text-center text-slate-400 font-bold italic">Chargement des litiges...</div>
          ) : filteredLitiges.length === 0 ? (
            <div className="py-20 text-center text-slate-400 font-bold italic">Aucun litige trouvé.</div>
          ) : (
            filteredLitiges.map((litige: any) => (
              <div key={litige.id} className="p-8 rounded-[35px] bg-slate-50 border border-slate-100 hover:border-[var(--color-pink)]/30 transition-all group">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                        #{litige.transaction?.reference}
                      </span>
                      {getStatusBadge(litige.status)}
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {format(new Date(litige.created_at), "dd MMMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-black text-slate-900 italic tracking-tight mb-2 flex items-center gap-2">
                        <MessageSquare className="text-slate-400" size={18} />
                        {litige.raison.replace('_', ' ')}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 max-w-2xl leading-relaxed">
                        {litige.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-8 pt-2">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200">
                             <User size={14} className="text-slate-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-900 leading-none mb-1">Initié par</p>
                             <p className="text-[9px] font-bold text-slate-400">{litige.initiateur?.firstname} {litige.initiateur?.lastname}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200">
                             <Package size={14} className="text-slate-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-900 leading-none mb-1">Commande</p>
                             <p className="text-[9px] font-bold text-slate-400">{litige.commande?.reference}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                      Détails <ChevronRight size={14} />
                    </button>
                    {litige.status === 'ouverte' && (
                      <button className="px-6 py-3 rounded-2xl bg-[var(--color-pink)]/10 text-[var(--color-pink)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-pink)] hover:text-white transition-all">
                        Répondre
                      </button>
                    )}
                  </div>
                </div>

                {litige.admin_id && (
                  <div className="mt-6 pt-6 border-t border-slate-200/50">
                    <div className="flex items-start gap-3 bg-white p-4 rounded-2xl">
                       <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={16} />
                       <div>
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Note de résolution Admin</p>
                          <p className="text-[11px] font-medium text-slate-500 italic">"{litige.resolution_note}"</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-10 p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-md">
            <h4 className="text-xl font-black italic tracking-tighter mb-2">Besoin d'aide pour résoudre un litige ?</h4>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">
              Consultez notre guide de résolution des litiges ou contactez l'assistance admin pour une médiation.
            </p>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-white text-slate-900 text-[11px] font-heavy uppercase tracking-[0.2em] hover:bg-[var(--color-pink)] hover:text-white transition-all shadow-xl shadow-white/5">
            Guide Vendeur
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-pink)]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[var(--color-pink)]/20 transition-all duration-700" />
      </div>
    </DashboardLayout>
  );
};

export default Litiges;
