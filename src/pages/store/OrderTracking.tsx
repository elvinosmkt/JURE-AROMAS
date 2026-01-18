import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User } from '../../types';

const OrderTracking = ({ user }: { user: User | null }) => {
    const { id } = useParams();
    const order = user?.orders.find(o => o.id === id) || user?.orders[0];

    if (!user || !order) return (
        <div className="py-40 text-center container mx-auto px-6">
            <span className="material-symbols-outlined text-6xl text-olive/10 mb-8">search</span>
            <h2 className="text-3xl font-display italic text-olive mb-4">Pedido não encontrado</h2>
            <Link to="/" className="text-primary font-bold uppercase tracking-widest text-[10px] underline">Voltar ao Início</Link>
        </div>
    );

    const statusSteps = [
        { label: 'Confirmado', date: '24 Out, 12:30', icon: 'check_circle', completed: true },
        { label: 'Preparação', date: '25 Out, 14:15', icon: 'inventory_2', completed: true },
        { label: 'Enviado', date: '26 Out, 09:45', icon: 'local_shipping', completed: true },
        { label: 'Entregue', date: 'Previsão: 28 Out', icon: 'home', completed: false }
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen py-16">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
                    <span className="text-[#D4A351] font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">STATUS DO PEDIDO</span>
                    <h1 className="text-5xl md:text-6xl font-display italic text-[#0f281e] mb-4">Rastreando sua Essência</h1>
                    <p className="text-[11px] text-[#0f281e]/50 uppercase tracking-widest mt-2">Pedido {order.id} • Realizado em {order.date}</p>
                </div>

                {/* Progress Stepper */}
                <div className="bg-white rounded-3xl shadow-sm border border-[#0f281e]/5 p-8 md:p-12 mb-8 animate-in slide-in-from-top duration-700">
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-8 left-0 w-full h-[2px] bg-[#0f281e]/10 hidden md:block">
                            <div className="h-full bg-[#50B83C] transition-all duration-1000" style={{ width: '66%' }}></div>
                        </div>

                        {/* Steps */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative">
                            {statusSteps.map((step, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 transition-all duration-700 mb-4 ${step.completed
                                        ? 'bg-[#50B83C] border-white text-white scale-110'
                                        : 'bg-white border-[#0f281e]/10 text-[#0f281e]/30'
                                        }`}>
                                        <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                                    </div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.completed ? 'text-[#0f281e]' : 'text-[#0f281e]/30'}`}>
                                        {step.label}
                                    </p>
                                    <p className={`text-[9px] ${step.completed ? 'text-[#0f281e]/60' : 'text-[#0f281e]/30'}`}>
                                        {step.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Map & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map */}
                        <div className="bg-white rounded-3xl shadow-sm border border-[#0f281e]/5 p-8 animate-in slide-in-from-left duration-700">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[#D4A351]">location_on</span>
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0f281e]">Localização em Tempo Real</h3>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-[#0f281e]/5 to-[#D4A351]/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                                    alt="Map"
                                />
                                <div className="relative z-10 text-center">
                                    <div className="w-20 h-20 bg-[#50B83C] rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse shadow-2xl">
                                        <span className="material-symbols-outlined text-white text-4xl">local_shipping</span>
                                    </div>
                                    <p className="text-[12px] font-bold text-[#0f281e] uppercase tracking-[0.2em] mb-2">Seu pedido está em trânsito</p>
                                    <p className="text-[10px] text-[#0f281e]/60">Previsão de entrega: Segunda, 28 Out</p>
                                    <button className="mt-6 px-6 py-3 bg-[#0f281e] text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-all shadow-lg">
                                        Ver ao Vivo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Delivery Address */}
                            <div className="bg-white rounded-2xl shadow-sm border border-[#0f281e]/5 p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[#D4A351] text-xl">home</span>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60">Endereço de Entrega</h4>
                                </div>
                                <p className="text-[13px] text-[#0f281e] leading-relaxed">{order.shippingAddress}</p>
                            </div>

                            {/* Carrier Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-[#0f281e]/5 p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[#D4A351] text-xl">package</span>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60">Dados da Transportadora</h4>
                                </div>
                                <p className="text-[13px] text-[#0f281e] font-bold mb-2">{order.shippingMethod}</p>
                                <p className="text-[10px] text-[#D4A351] font-mono font-bold tracking-wider">Rastreio: {order.trackingCode}</p>
                                <p className="text-[9px] text-[#0f281e]/50 mt-3">Última atualização: Chegou ao centro de distribuição - 26/Out/2024</p>
                            </div>
                        </div>

                        {/* Sustainability Message */}
                        <div className="bg-gradient-to-r from-[#50B83C]/10 to-[#D4A351]/10 rounded-2xl p-8 border border-[#50B83C]/20">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-[#50B83C] text-3xl">eco</span>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#0f281e] mb-2">Seu pedido está sendo enviado em embalagens sustentáveis</h4>
                                    <p className="text-[11px] text-[#0f281e]/70 leading-relaxed italic">
                                        Utilizamos materiais 100% recicláveis e biodegradáveis, protegendo suas fragrâncias e o planeta.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-6 animate-in slide-in-from-right duration-700">
                        {/* Items */}
                        <div className="bg-white rounded-3xl shadow-sm border border-[#0f281e]/5 p-8">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0f281e] mb-6 pb-4 border-b border-[#0f281e]/5">
                                Itens na Entrega
                            </h3>
                            <div className="space-y-6">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F9F9F9] flex-shrink-0 border border-[#0f281e]/5">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-[13px] font-display italic text-[#0f281e] mb-1">{item.name}</h5>
                                            <p className="text-[10px] text-[#0f281e]/50 font-medium">{item.quantity}x • R$ {item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-8 pt-6 border-t border-[#0f281e]/10 space-y-2">
                                <div className="flex justify-between text-[11px] text-[#0f281e]/60">
                                    <span>Subtotal</span>
                                    <span>R$ {order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-[#0f281e]/60">
                                    <span>Frete</span>
                                    <span className="text-[#50B83C] font-bold">{order.shipping === 0 ? 'GRÁTIS' : `R$ ${order.shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-[15px] font-bold text-[#0f281e] pt-3 border-t border-[#0f281e]/10">
                                    <span className="font-display italic">Total Pago</span>
                                    <span>R$ {order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-[#0f281e] text-white rounded-2xl p-8 text-center">
                            <span className="material-symbols-outlined text-4xl text-[#D4A351] mb-4">support_agent</span>
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">Precisa de ajuda com sua entrega?</h4>
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

export default OrderTracking;
