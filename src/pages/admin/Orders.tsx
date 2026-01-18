import React, { useState } from 'react';
import { MOCK_ORDERS } from '../../utils/constants';
import NewOrderModal from '../../components/admin/NewOrderModal';

const TABS = ['Todos', 'Aguardando Pagamento', 'Preparando', 'Em Trânsito', 'Entregue', 'Cancelado'];

const Orders = () => {
    const [activeTab, setActiveTab] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'Todos' || order.status === activeTab || (activeTab === 'Aguardando Pagamento' && order.status === 'Pendente');
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleNewOrder = (newOrder: any) => {
        setOrders([newOrder, ...orders]);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-2">
                        <span>Admin</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span>Pedidos</span>
                    </div>
                    <h2 className="text-4xl font-display italic text-[#0f281e]">Gestão de Pedidos</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Visualize, gerencie e acompanhe vendas.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-[#0f281e]/10 text-[#0f281e] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#f8f9fa] transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span> Exportar CSV
                    </button>
                    <button
                        onClick={() => setIsNewOrderModalOpen(true)}
                        className="bg-[#50b83c] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#45a034] transition-colors shadow-lg shadow-green-500/20"
                    >
                        <span className="material-symbols-outlined text-lg">add</span> Novo Pedido
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-[#0f281e]/5 overflow-hidden">
                {/* Filters & Search */}
                <div className="p-8 border-b border-[#0f281e]/5 space-y-6">
                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-[#0f281e] text-white shadow-lg'
                                    : 'bg-[#f8f9fa] text-[#0f281e]/40 hover:bg-[#0f281e]/5 hover:text-[#0f281e]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                            <input
                                type="text"
                                placeholder="Buscar por nome, ID do pedido ou CPF..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] rounded-xl text-xs font-medium text-[#0f281e] placeholder:text-[#0f281e]/30 focus:outline-none focus:ring-1 focus:ring-[#0f281e]"
                            />
                        </div>
                        <button className="px-6 py-4 bg-white border border-[#0f281e]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] hover:bg-[#f8f9fa] flex items-center gap-2">
                            <span className="material-symbols-outlined">filter_list</span> Filtros Avançados
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#f8f9fa] border-b border-[#0f281e]/5">
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">ID</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Data</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Cliente</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Valor Total</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Método</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Status</th>
                                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0f281e]/5">
                            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#f8f9fa]/50 transition-colors cursor-pointer group">
                                    <td className="px-8 py-6 text-sm font-bold text-[#0f281e]">{order.id}</td>
                                    <td className="px-8 py-6 text-xs text-[#0f281e]/60">
                                        <div className="font-bold text-[#0f281e]">{order.date.split(',')[0]}</div>
                                        <div className="text-[10px]">{order.date.split(',')[1]}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-[#0f281e]/5 flex items-center justify-center text-[10px] font-black text-[#d4a351]">
                                                {order.customerName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#0f281e]">{order.customerName}</div>
                                                <div className="text-[10px] text-[#0f281e]/40 uppercase tracking-widest">VIP Member</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-[#0f281e]">R$ {order.total.toFixed(2)}</td>
                                    <td className="px-8 py-6 text-xs text-[#0f281e]/60 font-medium">{order.shippingMethod}</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                               ${order.status === 'Entregue' ? 'bg-[#50b83c]/10 text-[#50b83c] border-[#50b83c]/20' :
                                                order.status === 'Cancelado' ? 'bg-red-50 text-red-500 border-red-100' :
                                                    order.status === 'Preparando' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-[#d4a351]/10 text-[#d4a351] border-[#d4a351]/20'
                                            }
                            `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="w-8 h-8 rounded-full hover:bg-[#0f281e]/5 flex items-center justify-center transition-colors text-[#0f281e]/40 hover:text-[#0f281e]">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-20">
                                        <span className="material-symbols-outlined text-4xl text-[#0f281e]/10 mb-4">search_off</span>
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#0f281e]/40">Nenhum pedido encontrado com este filtro.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Static) */}
                <div className="p-6 border-t border-[#0f281e]/5 flex justify-between items-center bg-[#f8f9fa]">
                    <span className="text-[10px] text-[#0f281e]/40 font-bold uppercase tracking-widest">Mostrando {filteredOrders.length} pedidos</span>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg border border-[#0f281e]/10 bg-white flex items-center justify-center hover:bg-[#0f281e] hover:text-white transition-colors disabled:opacity-50" disabled>
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#0f281e] text-white flex items-center justify-center text-xs font-bold">1</button>
                        <button className="w-8 h-8 rounded-lg border border-[#0f281e]/10 bg-white flex items-center justify-center hover:bg-[#0f281e] hover:text-white transition-colors text-xs font-bold">2</button>
                        <button className="w-8 h-8 rounded-lg border border-[#0f281e]/10 bg-white flex items-center justify-center hover:bg-[#0f281e] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            <NewOrderModal
                isOpen={isNewOrderModalOpen}
                onClose={() => setIsNewOrderModalOpen(false)}
                onSave={handleNewOrder}
            />
        </div>
    );
};

export default Orders;
