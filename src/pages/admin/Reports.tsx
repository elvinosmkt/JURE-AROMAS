import React, { useState } from 'react';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../../utils/constants';

const Reports = () => {
    const [dateRange, setDateRange] = useState('30days');
    const [reportType, setReportType] = useState<'vendas' | 'produtos' | 'clientes'>('vendas');

    // Cálculos
    const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = MOCK_ORDERS.length;
    const avgOrderValue = totalRevenue / totalOrders;
    const topProducts = MOCK_PRODUCTS.slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-2">
                        <span>Admin</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span>Relatórios</span>
                    </div>
                    <h2 className="text-4xl font-display italic text-[#0f281e]">Relatórios e Análises</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Insights detalhados sobre o desempenho da loja</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-6 py-3 bg-white border border-[#0f281e]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                    >
                        <option value="7days">Últimos 7 dias</option>
                        <option value="30days">Últimos 30 dias</option>
                        <option value="90days">Últimos 90 dias</option>
                        <option value="year">Este ano</option>
                    </select>
                    <button className="px-6 py-3 bg-[#50b83c] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#45a034] transition-all shadow-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">download</span>
                        Exportar PDF
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2)}`, icon: 'payments', color: 'green', trend: '+12%' },
                    { label: 'Total de Pedidos', value: totalOrders, icon: 'shopping_cart', color: 'blue', trend: '+8%' },
                    { label: 'Ticket Médio', value: `R$ ${avgOrderValue.toFixed(2)}`, icon: 'receipt_long', color: 'purple', trend: '+5%' },
                    { label: 'Novos Clientes', value: MOCK_CUSTOMERS.length, icon: 'person_add', color: 'orange', trend: '+15%' }
                ].map((kpi, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-[#0f281e]/5 relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-8xl">{kpi.icon}</span>
                        </div>
                        <div className="relative">
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3">{kpi.label}</p>
                            <p className="text-3xl font-black text-[#0f281e] mb-2">{kpi.value}</p>
                            <span className="text-[10px] font-bold text-green-600">{kpi.trend} vs mês anterior</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-3">
                {[
                    { id: 'vendas', label: 'Vendas', icon: 'trending_up' },
                    { id: 'produtos', label: 'Produtos', icon: 'inventory' },
                    { id: 'clientes', label: 'Clientes', icon: 'group' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setReportType(tab.id as any)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${reportType === tab.id
                                ? 'bg-[#0f281e] text-white shadow-lg'
                                : 'bg-white text-[#0f281e]/60 hover:bg-[#0f281e]/5 border border-[#0f281e]/10'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Vendas */}
                    {reportType === 'vendas' && (
                        <>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Evolução de Vendas</h3>
                                <div className="h-64 bg-gradient-to-br from-[#0f281e]/5 to-[#D4A351]/5 rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="material-symbols-outlined text-6xl text-[#0f281e]/20 mb-4">show_chart</span>
                                        <p className="text-sm text-[#0f281e]/40">Gráfico de vendas por período</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Pedidos Recentes</h3>
                                <div className="space-y-4">
                                    {MOCK_ORDERS.slice(0, 5).map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                                            <div>
                                                <p className="text-sm font-bold text-[#0f281e]">{order.id}</p>
                                                <p className="text-[10px] text-[#0f281e]/50">{order.customerName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-[#0f281e]">R$ {order.total.toFixed(2)}</p>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${order.status === 'Entregue' ? 'text-green-600' : 'text-[#D4A351]'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Produtos */}
                    {reportType === 'produtos' && (
                        <>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Produtos Mais Vendidos</h3>
                                <div className="space-y-4">
                                    {topProducts.map((product, i) => (
                                        <div key={product.id} className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-xl">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#D4A351] font-black text-lg">
                                                #{i + 1}
                                            </div>
                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-[#0f281e]">{product.name}</p>
                                                <p className="text-[10px] text-[#0f281e]/50">{product.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-[#0f281e]">R$ {product.price.toFixed(2)}</p>
                                                <p className="text-[10px] text-green-600 font-bold">156 vendas</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Estoque Crítico</h3>
                                <div className="space-y-3">
                                    {MOCK_PRODUCTS.filter(p => p.stock < 20).map(product => (
                                        <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-red-500">warning</span>
                                                <div>
                                                    <p className="text-sm font-bold text-[#0f281e]">{product.name}</p>
                                                    <p className="text-[10px] text-[#0f281e]/50">SKU: {product.sku}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-red-600">{product.stock} unidades</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Clientes */}
                    {reportType === 'clientes' && (
                        <>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Top Clientes</h3>
                                <div className="space-y-4">
                                    {MOCK_CUSTOMERS.map((customer, i) => (
                                        <div key={customer.id} className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-xl">
                                            <div className="w-12 h-12 bg-[#D4A351]/10 rounded-full flex items-center justify-center text-[#D4A351] font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-[#0f281e]">{customer.name}</p>
                                                <p className="text-[10px] text-[#0f281e]/50">{customer.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-[#0f281e]">R$ {customer.totalSpent.toFixed(2)}</p>
                                                <p className="text-[10px] text-[#0f281e]/50">{customer.ordersCount} pedidos</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Distribuição por Status</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Ativos', count: MOCK_CUSTOMERS.filter(c => c.status === 'Ativo').length, color: 'green' },
                                        { label: 'Inativos', count: MOCK_CUSTOMERS.filter(c => c.status === 'Inativo').length, color: 'gray' }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                                            <span className="text-sm text-[#0f281e]">{stat.label}</span>
                                            <span className={`text-lg font-black text-${stat.color}-600`}>{stat.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0f281e] to-[#0f281e]/90 text-white p-8 rounded-3xl shadow-2xl">
                        <span className="material-symbols-outlined text-5xl mb-4">insights</span>
                        <h3 className="text-lg font-bold mb-3">Insights Rápidos</h3>
                        <div className="space-y-4 mt-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-2">Melhor dia de vendas</p>
                                <p className="text-lg font-bold">Segunda-feira</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-2">Horário de pico</p>
                                <p className="text-lg font-bold">14h - 18h</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-2">Taxa de conversão</p>
                                <p className="text-lg font-bold">3.2%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#0f281e]/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#0f281e] mb-6">Ações Rápidas</h3>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-[#f8f9fa] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between">
                                <span>Exportar Excel</span>
                                <span className="material-symbols-outlined">table_chart</span>
                            </button>
                            <button className="w-full px-4 py-3 bg-[#f8f9fa] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between">
                                <span>Enviar por Email</span>
                                <span className="material-symbols-outlined">email</span>
                            </button>
                            <button className="w-full px-4 py-3 bg-[#f8f9fa] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between">
                                <span>Agendar Relatório</span>
                                <span className="material-symbols-outlined">schedule</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
