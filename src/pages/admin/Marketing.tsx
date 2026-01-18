import React, { useState } from 'react';
import { MOCK_COUPONS } from '../../utils/constants';

const Marketing = () => {
    const [isNewCouponModalOpen, setIsNewCouponModalOpen] = useState(false);
    const [coupons, setCoupons] = useState(MOCK_COUPONS);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleCoupon = (id: string) => {
        setCoupons(coupons.map(c =>
            c.id === id ? { ...c, status: c.status === 'Ativo' ? 'Inativo' : 'Ativo' } : c
        ));
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-2">
                        <span>Marketing</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span>Gestão de Cupons</span>
                    </div>
                    <h2 className="text-4xl font-display italic text-[#0f281e]">Gestão de Cupons e Promoções</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Controle suas campanhas promocionais e ofertas exclusivas.</p>
                </div>
                <button
                    onClick={() => setIsNewCouponModalOpen(true)}
                    className="bg-[#0f281e] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0f281e]/90 transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined text-lg">add</span> Criar Novo Cupom
                </button>
            </div>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border-l-4 border-[#50b83c] relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-8xl text-[#50b83c]">local_offer</span>
                    </div>
                    <span className="bg-[#50b83c]/10 text-[#50b83c] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Campanha Sazonal</span>
                    <h3 className="text-2xl font-display italic text-[#0f281e] mt-4 mb-2">Semana da Primavera</h3>
                    <p className="text-xs text-[#0f281e]/60 leading-relaxed mb-6">20% OFF em toda a linha floral e essências de campo.</p>
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] text-[#0f281e]/40">Expira em 4 dias</span>
                        <span className="text-lg font-bold text-[#0f281e]">782 Vendas</span>
                    </div>
                </div>

                <div className="bg-[#0f281e] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="material-symbols-outlined text-8xl text-[#d4a351]">diamond</span>
                    </div>
                    <span className="bg-[#d4a351]/20 text-[#d4a351] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border border-[#d4a351]/20">VIP Jurê</span>
                    <h3 className="text-2xl font-display italic text-white mt-4 mb-2">Welcome Members</h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-6">Frete Grátis Vitalício para membros do clube de fidelidade.</p>
                    <div className="flex justify-between items-end text-white/40 text-[10px] font-bold uppercase tracking-widest">
                        <span>Ativa Permanente</span>
                        <span className="text-[#d4a351]">Status: Ativo</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#D4A351]/10 to-[#D4A351]/5 p-8 rounded-[2rem] border-2 border-dashed border-[#D4A351]/30 relative overflow-hidden group hover:border-[#D4A351]/50 transition-all cursor-pointer">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="material-symbols-outlined text-8xl text-[#D4A351]">campaign</span>
                    </div>
                    <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-[#D4A351] mb-4">add_circle</span>
                        <h3 className="text-xl font-display italic text-[#0f281e] mb-2">Nova Campanha</h3>
                        <p className="text-xs text-[#0f281e]/60">Crie uma nova campanha promocional</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-[#0f281e]/5 overflow-hidden">
                <div className="p-8 border-b border-[#0f281e]/5 flex justify-between items-center bg-[#f8f9fa]">
                    <h3 className="text-xl font-display italic text-[#0f281e]">Cupons Registrados</h3>
                    <div className="relative w-64">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                        <input
                            type="text"
                            placeholder="Buscar código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 bg-white border border-[#0f281e]/5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0f281e]"
                        />
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="bg-white border-b border-[#0f281e]/5">
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Código</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Tipo</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Valor</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Uso</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Expira em</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Status</th>
                            <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0f281e]/5 text-sm">
                        {filteredCoupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-[#f8f9fa]/50 transition-colors">
                                <td className="px-8 py-6 font-black text-[#0f281e]">{coupon.code}</td>
                                <td className="px-8 py-6 text-[#0f281e]/70">{coupon.type}</td>
                                <td className="px-8 py-6 font-bold text-[#0f281e]">
                                    {coupon.type === 'Percentage' ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`}
                                </td>
                                <td className="px-8 py-6 w-48">
                                    <div className="flex justify-between text-[10px] mb-1 font-bold text-[#0f281e]/60">
                                        <span>{coupon.usageCount}</span>
                                        <span>{coupon.usageLimit}</span>
                                    </div>
                                    <div className="w-full bg-[#f8f9fa] h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#50b83c] h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                                        ></div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-[#0f281e]/70 font-mono text-xs">{coupon.expiryDate}</td>
                                <td className="px-8 py-6">
                                    <button
                                        onClick={() => handleToggleCoupon(coupon.id)}
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border cursor-pointer transition-all ${coupon.status === 'Ativo' ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                                            }`}
                                    >
                                        {coupon.status}
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="text-[#0f281e]/20 hover:text-[#0f281e] transition-colors" title="Editar">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="text-[#0f281e]/20 hover:text-red-500 transition-colors" title="Excluir">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* New Coupon Modal */}
            {isNewCouponModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-[#0f281e]/5 p-8 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-display italic text-[#0f281e]">Criar Novo Cupom</h3>
                                <p className="text-[10px] uppercase tracking-widest text-[#0f281e]/40 mt-1">Configure os detalhes do cupom promocional</p>
                            </div>
                            <button
                                onClick={() => setIsNewCouponModalOpen(false)}
                                className="w-10 h-10 rounded-full bg-[#f8f9fa] hover:bg-[#0f281e] hover:text-white transition-all flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Código do Cupom</label>
                                    <input
                                        type="text"
                                        placeholder="VERAO2024"
                                        className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-mono font-bold text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e] uppercase"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Tipo de Desconto</label>
                                    <select className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]">
                                        <option>Porcentagem</option>
                                        <option>Valor Fixo</option>
                                        <option>Frete Grátis</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Valor do Desconto</label>
                                    <input
                                        type="number"
                                        placeholder="20"
                                        className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Limite de Uso</label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Data de Expiração</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Descrição (Opcional)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Descrição da campanha..."
                                    className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e] resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsNewCouponModalOpen(false)}
                                    className="flex-1 px-6 py-3 bg-[#f8f9fa] text-[#0f281e] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/10 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        // Aqui você adicionaria a lógica para salvar o cupom
                                        setIsNewCouponModalOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-[#50b83c] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#45a034] transition-all shadow-lg"
                                >
                                    Criar Cupom
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketing;
