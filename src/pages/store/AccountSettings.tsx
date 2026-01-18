import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User } from '../../types';

const AccountSettings = ({ user }: { user: User | null }) => {
    const [activeTab, setActiveTab] = useState<'pedidos' | 'dados' | 'preferencias'>('pedidos');

    if (!user) return <Navigate to="/login" />;

    const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);
    const completedOrders = user.orders.filter(o => o.status === 'Entregue').length;

    return (
        <div className="bg-[#FAFAFA] min-h-screen py-16 animate-in fade-in duration-700">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header Profile */}
                <div className="bg-gradient-to-r from-[#0f281e] to-[#0f281e]/90 rounded-3xl p-12 mb-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A351]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#50B83C]/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-[#D4A351]/20 flex-shrink-0">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&size=200&background=D4A351&color=fff&bold=true`}
                                className="w-full h-full object-cover"
                                alt="Profile"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-display italic text-white mb-3">
                                Olá, {user.name.split(' ')[0]} 👋
                            </h1>
                            <p className="text-[11px] text-white/60 uppercase tracking-widest mb-6">
                                Membro desde Outubro 2024 • {user.email}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-8 max-w-2xl">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                    <p className="text-3xl font-black text-white mb-2">{user.orders.length}</p>
                                    <p className="text-[9px] uppercase tracking-widest text-white/70">Pedidos</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                    <p className="text-3xl font-black text-[#D4A351] mb-2">R$ {totalSpent.toFixed(0)}</p>
                                    <p className="text-[9px] uppercase tracking-widest text-white/70">Investido</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                                    <p className="text-3xl font-black text-[#50B83C] mb-2">{completedOrders}</p>
                                    <p className="text-[9px] uppercase tracking-widest text-white/70">Entregues</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {[
                        { id: 'pedidos', label: 'Meus Pedidos', icon: 'shopping_bag' },
                        { id: 'dados', label: 'Dados Cadastrais', icon: 'person' },
                        { id: 'preferencias', label: 'Preferências', icon: 'favorite' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-[#0f281e] text-white shadow-lg'
                                    : 'bg-white text-[#0f281e]/60 hover:bg-[#0f281e]/5'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Pedidos Tab */}
                        {activeTab === 'pedidos' && (
                            <div className="space-y-6 animate-in slide-in-from-left duration-500">
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                    <h2 className="text-2xl font-display italic text-[#0f281e] mb-8">Histórico de Compras</h2>
                                    <div className="space-y-4">
                                        {user.orders.map(order => (
                                            <Link
                                                key={order.id}
                                                to={`/tracking/${order.id}`}
                                                className="flex items-center justify-between p-6 bg-[#FAFAFA] rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all group border border-[#0f281e]/5"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#D4A351] shadow-sm group-hover:scale-110 transition-transform">
                                                        <span className="material-symbols-outlined text-2xl">shopping_basket</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-bold text-[#0f281e] uppercase tracking-widest mb-1">{order.id}</p>
                                                        <p className="text-[10px] text-[#0f281e]/50">{order.date} • {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            {order.items.slice(0, 3).map((item, i) => (
                                                                <div key={i} className="w-8 h-8 rounded-lg overflow-hidden border border-[#0f281e]/10">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ))}
                                                            {order.items.length > 3 && (
                                                                <div className="w-8 h-8 rounded-lg bg-[#0f281e]/10 flex items-center justify-center text-[8px] font-bold text-[#0f281e]">
                                                                    +{order.items.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[14px] font-bold text-[#0f281e] mb-2">R$ {order.total.toFixed(2)}</p>
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Entregue' ? 'bg-[#50B83C]/10 text-[#50B83C] border border-[#50B83C]/20' :
                                                            order.status === 'Em Trânsito' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                                'bg-[#D4A351]/10 text-[#D4A351] border border-[#D4A351]/20'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    <span className="material-symbols-outlined text-[#0f281e]/20 ml-4 group-hover:text-[#D4A351] transition-colors">east</span>
                                                </div>
                                            </Link>
                                        ))}
                                        {user.orders.length === 0 && (
                                            <div className="text-center py-20">
                                                <span className="material-symbols-outlined text-6xl text-[#0f281e]/10 mb-4">shopping_cart</span>
                                                <p className="text-[#0f281e]/40 italic">Nenhum pedido ainda.</p>
                                                <Link to="/products" className="inline-block mt-6 px-8 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-all">
                                                    Explorar Produtos
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dados Tab */}
                        {activeTab === 'dados' && (
                            <div className="space-y-6 animate-in slide-in-from-left duration-500">
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                    <h2 className="text-2xl font-display italic text-[#0f281e] mb-8">Informações Pessoais</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3 block">Nome Completo</label>
                                            <p className="text-[14px] font-medium text-[#0f281e]">{user.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3 block">E-mail</label>
                                            <p className="text-[14px] font-medium text-[#0f281e]">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3 block">WhatsApp</label>
                                            <p className="text-[14px] font-medium text-[#0f281e]">{user.phone}</p>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3 block">CPF</label>
                                            <p className="text-[14px] font-medium text-[#0f281e]">***.***.***-**</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-3 block">Endereço Principal</label>
                                            <p className="text-[14px] font-medium text-[#0f281e] leading-relaxed">
                                                {user.address.street}<br />
                                                CEP: {user.address.zip}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="mt-8 px-8 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-all">
                                        Editar Informações
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Preferências Tab */}
                        {activeTab === 'preferencias' && (
                            <div className="space-y-6 animate-in slide-in-from-left duration-500">
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                    <h2 className="text-2xl font-display italic text-[#0f281e] mb-8">Perfil Aromático</h2>
                                    <p className="text-[12px] text-[#0f281e]/60 mb-6 leading-relaxed">
                                        Baseado nas suas compras e preferências, identificamos seu perfil aromático único.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {user.preferences.map(p => (
                                            <span key={p} className="bg-gradient-to-r from-[#0f281e] to-[#0f281e]/90 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="px-8 py-3 bg-[#D4A351] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D4A351]/90 transition-all shadow-lg">
                                        Refazer Quiz de Preferências
                                    </button>
                                </div>

                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                    <h2 className="text-2xl font-display italic text-[#0f281e] mb-8">Notificações</h2>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Novos lançamentos e coleções', enabled: true },
                                            { label: 'Ofertas e promoções exclusivas', enabled: true },
                                            { label: 'Atualizações de pedidos', enabled: true },
                                            { label: 'Newsletter mensal', enabled: false }
                                        ].map((notif, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl">
                                                <span className="text-[12px] text-[#0f281e]">{notif.label}</span>
                                                <div className={`w-12 h-6 rounded-full transition-all ${notif.enabled ? 'bg-[#50B83C]' : 'bg-[#0f281e]/20'} relative cursor-pointer`}>
                                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${notif.enabled ? 'right-0.5' : 'left-0.5'} shadow-lg`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Loyalty Card */}
                        <div className="bg-gradient-to-br from-[#50B83C] to-[#50B83C]/80 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                            <span className="material-symbols-outlined text-5xl mb-4 relative">loyalty</span>
                            <h3 className="text-[11px] font-black uppercase tracking-widest mb-3 relative">Membro Select</h3>
                            <p className="text-[13px] leading-relaxed mb-6 relative">
                                Você já economizou <span className="font-black text-xl">R$ 145,90</span> este ano com benefícios exclusivos!
                            </p>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 relative">
                                <p className="text-[9px] uppercase tracking-widest mb-2">Próximo Benefício</p>
                                <p className="text-[11px] font-bold">Frete grátis em compras acima de R$ 150</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#0f281e]/5">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0f281e] mb-6">Ações Rápidas</h3>
                            <div className="space-y-3">
                                <button className="w-full px-6 py-4 bg-[#FAFAFA] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between group">
                                    <span>Rastrear Pedido</span>
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                </button>
                                <button className="w-full px-6 py-4 bg-[#FAFAFA] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between group">
                                    <span>Suporte</span>
                                    <span className="material-symbols-outlined text-lg">support_agent</span>
                                </button>
                                <button className="w-full px-6 py-4 bg-[#FAFAFA] hover:bg-[#0f281e] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] transition-all flex items-center justify-between group">
                                    <span>Favoritos</span>
                                    <span className="material-symbols-outlined text-lg">favorite</span>
                                </button>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-[#0f281e] text-white p-8 rounded-2xl text-center">
                            <span className="material-symbols-outlined text-4xl text-[#D4A351] mb-4">help</span>
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">Precisa de Ajuda?</h4>
                            <p className="text-[11px] opacity-80 mb-6 leading-relaxed">Nossa equipe está pronta para te atender</p>
                            <button className="w-full px-6 py-3 bg-white text-[#0f281e] rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#D4A351] hover:text-white transition-all">
                                Falar com Suporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
