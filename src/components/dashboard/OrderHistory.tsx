import React from "react";
import { MoreVertical } from "lucide-react";

export const OrderHistory: React.FC = () => {
  const orders = [
    { id: "#TLX-8832", date: "Oct 14, 2023", items: 3, price: "$185.00", status: "DELIVERED" },
    { id: "#TLX-7590", date: "Sep 28, 2023", items: 1, price: "$312.00", status: "RETURNED" },
    { id: "#TLX-6221", date: "Aug 05, 2023", items: 2, price: "$120.50", status: "DELIVERED" },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'DELIVERED': return 'bg-green-50 text-green-600';
      case 'RETURNED': return 'bg-orange-50 text-orange-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="bg-white p-10 rounded-[45px] shadow-xl shadow-slate-100/50 border border-slate-50">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Order History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
              <th className="pb-6 px-4">Order ID</th>
              <th className="pb-6 px-4">Date</th>
              <th className="pb-6 px-4">Items</th>
              <th className="pb-6 px-4">Total Price</th>
              <th className="pb-6 px-4">Status</th>
              <th className="pb-6 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/50">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-6 px-4">
                  <span className="text-xs font-black text-slate-900 tracking-tight">{order.id}</span>
                </td>
                <td className="py-6 px-4">
                  <span className="text-xs font-bold text-slate-400">{order.date}</span>
                </td>
                <td className="py-6 px-4">
                   <div className="flex items-center -space-x-3">
                      {[...Array(Math.min(order.items, 3))].map((_, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                           <img 
                             src={`https://images.unsplash.com/photo-${1591300000000 + idx}?q=80&w=100&auto=format&fit=crop`} 
                             className="w-full h-full object-cover"
                           />
                        </div>
                      ))}
                      {order.items > 3 && (
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                           +{order.items - 3}
                        </div>
                      )}
                   </div>
                </td>
                <td className="py-6 px-4">
                  <span className="text-sm font-black text-slate-900 italic tracking-tighter">{order.price}</span>
                </td>
                <td className="py-6 px-4">
                  <div className={`inline-flex px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-tighter shadow-sm ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </div>
                </td>
                <td className="py-6 px-4 text-center">
                   <button className="p-2 text-slate-300 hover:text-slate-900 transition-all">
                      <MoreVertical size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
