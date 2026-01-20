import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_ORDERS, MOCK_CUSTOMERS } from '../../utils/constants';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [customer, setCustomer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular fetch
        const foundOrder = MOCK_ORDERS.find(o => o.id === id);
        if (foundOrder) {
            setOrder(foundOrder);
            // Tentar achar cliente pelo nome (mock limitado) ou pegar o primeiro mock
            const foundCustomer = MOCK_CUSTOMERS.find(c => c.name === foundOrder.customerName) || MOCK_CUSTOMERS[0];
            setCustomer(foundCustomer);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="p-8 text-center text-[#0f281e]/40 font-bold">Carregando pedido...</div>;

    if (!order) return (
        <div className="p-8 text-center">
            <h2 className="text-2xl font-display text-[#0f281e] mb-2">Pedido não encontrado</h2>
            <Link to="/admin/orders" className="text-[#50b83c] hover:underline font-bold text-xs uppercase tracking-widest">Voltar para Pedidos</Link>
        </div>
    );

    const handleStatusUpdate = (newStatus: string) => {
        setOrder({ ...order, status: newStatus });
        // Aqui chamaria API para atualizar
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-7xl mx-auto pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex justify-between items-start">
                <div>
                    <button onClick={() => navigate('/admin/orders')} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 hover:text-[#0f281e] mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Voltar
                    </button>
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-display italic text-[#0f281e]">Pedido #{order.id}</h1>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.status === 'Entregue' ? 'bg-green-50 text-green-700 border-green-200' :
                                order.status === 'Enviado' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    order.status === 'Processando' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                        'bg-gray-50 text-gray-600 border-gray-200'
                            }`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-xs text-[#0f281e]/50 mt-1">Realizado em {order.date}</p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-[#0f281e]/10 hover:border-[#0f281e]/30 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#0f281e] flex items-center gap-2 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-base">print</span>
                        Imprimir Pedido
                    </button>
                    <button className="px-4 py-2 bg-[#0f281e] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 flex items-center gap-2 transition-all shadow-lg">
                        <span className="material-symbols-outlined text-base">edit</span>
                        Editar Pedido
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#0f281e]/5">
                        <h3 className="text-lg font-display italic text-[#0f281e] mb-6">Itens do Pedido</h3>
                        <table className="w-full">
                            <thead className="border-b border-[#0f281e]/5">
                                <tr>
                                    <th className="text-left py-3 text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Produto</th>
                                    <th className="text-right py-3 text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Preço</th>
                                    <th className="text-right py-3 text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Qtd</th>
                                    <th className="text-right py-3 text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#0f281e]/5">
                                {/* Simular itens do pedido (usando dados mockados genéricos pois Order não tem itens detalhados no mock atual) */}
                                <tr className="group">
                                    <td className="py-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#f8f9fa] rounded-lg overflow-hidden border border-[#0f281e]/5">
                                            <img src="/img/bambu.jpg" alt="Product" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#0f281e] group-hover:text-[#50b83c] transition-colors">Vela Aromática - Bambu & Chá Branco</p>
                                            <p className="text-[10px] text-[#0f281e]/40">SKU: VEL-BAM-01</p>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right text-sm text-[#0f281e]/70">R$ 50,00</td>
                                    <td className="py-4 text-right text-sm font-bold text-[#0f281e]">x{order.items}</td>
                                    <td className="py-4 text-right text-sm font-bold text-[#0f281e]">R$ {order.total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tfoot className="border-t border-[#0f281e]/5">
                                <tr>
                                    <td colSpan={3} className="pt-4 text-right text-[10px] uppercase tracking-widest text-[#0f281e]/40">Subtotal</td>
                                    <td className="pt-4 text-right text-sm font-bold text-[#0f281e]">R$ {(order.total - 15).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-2 text-right text-[10px] uppercase tracking-widest text-[#0f281e]/40">Frete (Sedex)</td>
                                    <td className="py-2 text-right text-sm font-bold text-[#0f281e]">R$ 15,00</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="pt-2 text-right text-xs font-black uppercase tracking-widest text-[#0f281e]">Total</td>
                                    <td className="pt-2 text-right text-lg font-display italic text-[#0f281e]">R$ {order.total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#0f281e]/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-display italic text-[#0f281e]">Status e Rastreamento</h3>
                            <button className="text-[10px] font-bold text-[#50b83c] uppercase tracking-widest hover:underline">Atualizar Rastreio</button>
                        </div>

                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-[#50b83c] before:to-[#0f281e]/10">
                            {[
                                { status: 'Pedido Entregue', date: 'Hoje, 14:30', completed: order.status === 'Entregue', icon: 'check_circle' },
                                { status: 'Saiu para Entrega', date: 'Hoje, 08:15', completed: order.status === 'Entregue', icon: 'local_shipping' },
                                { status: 'Em Trânsito', date: 'Ontem, 18:40', completed: true, icon: 'swap_horiz' },
                                { status: 'Pagamento Aprovado', date: order.date, completed: true, icon: 'credit_card' },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${step.completed ? 'bg-[#50b83c] text-white' : 'bg-[#0f281e] text-white opacity-20'
                                        }`}>
                                        <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${step.completed ? 'text-[#0f281e]' : 'text-[#0f281e]/40'}`}>{step.status}</p>
                                        <p className="text-[10px] font-mono text-[#0f281e]/50 mt-1">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Update Actions */}
                        <div className="mt-8 pt-8 border-t border-[#0f281e]/5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {['Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(status)}
                                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${order.status === status
                                            ? 'bg-[#0f281e] text-white border-[#0f281e]'
                                            : 'bg-white text-[#0f281e]/60 border-[#0f281e]/10 hover:border-[#0f281e]/30'
                                        }`}
                                >
                                    Marcar {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#0f281e]/5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#0f281e]">Cliente</h3>
                            <Link to="/admin/customers" className="text-[10px] text-[#50b83c] font-bold hover:underline">Ver Perfil</Link>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#d4a351]/10 text-[#d4a351] font-display italic text-xl flex items-center justify-center">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#0f281e]">{customer.name}</p>
                                <p className="text-[10px] text-[#0f281e]/50">{customer.ordersCount} pedidos anteriores</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#0f281e]/30 text-lg">mail</span>
                                <a href={`mailto:${customer.email}`} className="text-xs text-[#0f281e]/80 hover:text-[#50b83c] transition-colors truncate">{customer.email}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#0f281e]/30 text-lg">call</span>
                                <p className="text-xs text-[#0f281e]/80 text-mono">{customer.phone || '(11) 99999-9999'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#0f281e]/5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#0f281e]">Entrega</h3>
                            <button className="text-[#0f281e]/30 hover:text-[#0f281e] material-symbols-outlined text-sm">content_copy</button>
                        </div>
                        <p className="text-xs text-[#0f281e]/70 leading-relaxed font-medium">
                            Rua das Flores, 123, Apt 402<br />
                            Jardins, São Paulo - SP<br />
                            CEP 01234-567<br />
                            Brasil
                        </p>
                        <div className="mt-4 pt-4 border-t border-[#0f281e]/5">
                            <p className="text-[10px] uppercase tracking-widest text-[#0f281e]/40 mb-1">Método de Envio</p>
                            <p className="text-xs font-bold text-[#0f281e]">PAC - Correios</p>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="bg-[#f8f9fa] rounded-3xl p-6 shadow-inner border border-[#0f281e]/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#0f281e] mb-4">Notas Internas</h3>
                        <textarea
                            className="w-full bg-white rounded-xl border border-[#0f281e]/10 p-3 text-xs text-[#0f281e] placeholder:text-[#0f281e]/30 focus:outline-none focus:ring-1 focus:ring-[#50b83c] resize-none h-24"
                            placeholder="Adicione uma nota privada sobre este pedido..."
                        ></textarea>
                        <button className="mt-3 w-full py-2 bg-[#0f281e]/5 hover:bg-[#0f281e]/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#0f281e] transition-colors">
                            Salvar Nota
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
