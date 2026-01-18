import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '../../utils/constants';
import NewCustomerModal from '../../components/admin/NewCustomerModal';
import { Customer } from '../../types';

const Customers = () => {
    const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
    const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

    const handleNewCustomer = (newCustomer: Customer) => {
        setCustomers([...customers, newCustomer]);
    };
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-display italic text-[#0f281e]">Base de Clientes</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Gerencie relacionamento e fidelidade.</p>
                </div>
                <button
                    onClick={() => setIsNewCustomerModalOpen(true)}
                    className="bg-[#0f281e] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0f281e]/90 transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined text-lg">person_add</span> Adicionar Cliente
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-[#0f281e]/5 overflow-hidden">
                <div className="p-8 border-b border-[#0f281e]/5 flex justify-between items-center bg-[#f8f9fa]">
                    <div className="relative w-96">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#0f281e]/5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0f281e]"
                        />
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="bg-white border-b border-[#0f281e]/5">
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Cliente</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Contato</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Pedidos</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Total Gasto</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Status</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Última Compra</th>
                            <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0f281e]/5 text-sm">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-[#f8f9fa]/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#d4a351]/10 text-[#d4a351] flex items-center justify-center font-bold">
                                            {customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#0f281e]">{customer.name}</div>
                                            {customer.tier !== 'Standard' && (
                                                <div className="text-[9px] font-black uppercase tracking-widest text-[#d4a351] mt-1">{customer.tier}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-[#0f281e]">{customer.email}</div>
                                    <div className="text-xs text-[#0f281e]/40">{customer.phone}</div>
                                </td>
                                <td className="px-8 py-6 font-medium text-[#0f281e]">{customer.ordersCount} pedidos</td>
                                <td className="px-8 py-6 font-bold text-[#0f281e]">R$ {customer.totalSpent.toFixed(2)}</td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${customer.status === 'Ativo' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                                        }`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-[#0f281e]/60 text-xs">{customer.lastPurchase}</td>
                                <td className="px-8 py-6 text-right">
                                    <button className="text-[#0f281e]/20 hover:text-[#0f281e] transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <NewCustomerModal
                isOpen={isNewCustomerModalOpen}
                onClose={() => setIsNewCustomerModalOpen(false)}
                onSave={handleNewCustomer}
            />
        </div>
    );
};

export default Customers;
