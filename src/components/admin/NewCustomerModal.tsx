import React, { useState } from 'react';
import { Customer } from '../../types';

interface NewCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customer: Customer) => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tier: 'Standard'
    });

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            alert('Preencha nome e email');
            return;
        }

        const newCustomer: Customer = {
            id: `cust-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            ordersCount: 0,
            totalSpent: 0,
            status: 'Ativo',
            lastPurchase: '-',
            tier: formData.tier as any
        };

        onSave(newCustomer);
        setFormData({ name: '', email: '', phone: '', tier: 'Standard' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-[#0f281e]/5 bg-gradient-to-r from-[#0f281e] to-[#0f281e]/90">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-display italic text-white">Novo Cliente</h3>
                            <p className="text-xs uppercase tracking-widest text-white/60 mt-2">Adicionar cliente manualmente</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <span className="material-symbols-outlined text-white">close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Maria Silva"
                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@exemplo.com"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Telefone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(11) 99999-9999"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Nível de Fidelidade
                        </label>
                        <select
                            value={formData.tier}
                            onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                        >
                            <option value="Standard">Standard</option>
                            <option value="VIP Gold">VIP Gold</option>
                            <option value="VIP Platinum">VIP Platinum</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#0f281e]/5 bg-[#f8f9fa] flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-white border border-[#0f281e]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f281e] hover:bg-[#f8f9fa] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-colors shadow-lg"
                    >
                        Adicionar Cliente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewCustomerModal;
