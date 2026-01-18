import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_ORDERS } from '../../utils/constants';

const SALES_DATA = [
    { name: 'Jan', value: 12500 },
    { name: 'Fev', value: 18000 },
    { name: 'Mar', value: 15400 },
    { name: 'Abr', value: 22000 },
    { name: 'Mai', value: 35000 }, // Current uptick
    { name: 'Jun', value: 42850 }, // Projected/Current
];

const StatCard = ({ title, value, trend, icon, isCurrency = false }: any) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#0f281e]/5 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-2">{title}</h3>
                <p className="text-3xl font-display italic text-[#0f281e]">
                    {isCurrency ? `R$ ${value}` : value}
                </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${icon.bg || 'bg-[#d4a351]/10'}`}>
                <span className={`material-symbols-outlined text-xl ${icon.color || 'text-[#d4a351]'}`}>{icon.name}</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold ${trend > 0 ? 'text-green-600' : 'text-red-500'} flex items-center`}>
                <span className="material-symbols-outlined text-sm mr-0.5">{trend > 0 ? 'trending_up' : 'trending_down'}</span>
                {Math.abs(trend)}%
            </span>
            <span className="text-[9px] text-[#0f281e]/40 uppercase tracking-widest">vs mês anterior</span>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-display italic text-[#0f281e] mb-2">Visão Geral</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40">Bem-vindo de volta ao seu painel administrativo.</p>
                </div>
                <button className="bg-[#0f281e] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0f281e]/90 transition-colors">
                    <span className="material-symbols-outlined text-lg">download</span> Exportar Relatório
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total de Vendas" value="42.850,00" trend={12.5} isCurrency icon={{ name: 'payments', bg: 'bg-[#d4a351]/10', color: 'text-[#d4a351]' }} />
                <StatCard title="Pedidos Hoje" value="28" trend={4} icon={{ name: 'shopping_bag', bg: 'bg-[#d4a351]/10', color: 'text-[#d4a351]' }} />
                <StatCard title="Taxa de Conversão" value="3.4%" trend={-0.2} icon={{ name: 'ads_click', bg: 'bg-[#d4a351]/10', color: 'text-[#d4a351]' }} />
                <StatCard title="Visitantes Online" value="142" trend={1.2} icon={{ name: 'group', bg: 'bg-[#50b83c]/10', color: 'text-[#50b83c]' }} />
            </div>

            {/* Charts & Content */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#0f281e]/5">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-display italic text-[#0f281e]">Desempenho de Vendas Mensais</h3>
                    <select className="bg-[#f8f9fa] border-none rounded-lg text-[10px] font-bold uppercase tracking-widest p-2 px-4 focus:ring-0 cursor-pointer">
                        <option>Últimos 6 meses</option>
                        <option>Último ano</option>
                    </select>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={SALES_DATA}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#0f281e', opacity: 0.4, fontSize: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }}
                                dy={10}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8f9fa' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                {SALES_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === SALES_DATA.length - 1 ? '#d4a351' : '#f0f0f0'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-[#0f281e]/5 overflow-hidden">
                <div className="p-8 border-b border-[#0f281e]/5 flex justify-between items-center">
                    <h3 className="text-xl font-display italic text-[#0f281e]">Pedidos Recentes</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#d4a351] hover:text-[#0f281e] transition-colors">Ver Todos</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#f8f9fa] border-b border-[#0f281e]/5">
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">ID Pedido</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Cliente</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Valor</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Data</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Status</th>
                                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0f281e]/5">
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-[#f8f9fa]/50 transition-colors cursor-pointer group">
                                    <td className="px-8 py-6 text-sm font-bold text-[#0f281e]">{order.id}</td>
                                    <td className="px-8 py-6 text-sm text-[#0f281e]/80 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#d4a351]/20 text-[#d4a351] flex items-center justify-center text-[10px] font-black">
                                            {order.customerName.charAt(0)}
                                        </div>
                                        {order.customerName}
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-[#0f281e]">R$ {order.total.toFixed(2)}</td>
                                    <td className="px-8 py-6 text-xs text-[#0f281e]/60">{order.date}</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                               ${order.status === 'Entregue' ? 'bg-green-50 text-green-600 border-green-100' :
                                                order.status === 'Cancelado' ? 'bg-red-50 text-red-500 border-red-100' :
                                                    order.status === 'Preparando' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-yellow-50 text-yellow-600 border-yellow-100'
                                            }
                            `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-[#0f281e]/20 hover:text-[#0f281e] transition-colors">
                                            <span className="material-symbols-outlined">more_horiz</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
