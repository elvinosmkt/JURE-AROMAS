import React, { useState } from 'react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState<'loja' | 'pagamento' | 'envio' | 'notificacoes' | 'seguranca'>('loja');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 mb-2">
                    <span>Admin</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span>Configurações</span>
                </div>
                <h2 className="text-4xl font-display italic text-[#0f281e]">Configurações da Loja</h2>
                <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Gerencie as configurações gerais do sistema</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                    { id: 'loja', label: 'Informações da Loja', icon: 'store' },
                    { id: 'pagamento', label: 'Pagamento', icon: 'payment' },
                    { id: 'envio', label: 'Envio e Entrega', icon: 'local_shipping' },
                    { id: 'notificacoes', label: 'Notificações', icon: 'notifications' },
                    { id: 'seguranca', label: 'Segurança', icon: 'shield' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === tab.id
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
                <div className="lg:col-span-2">
                    {/* Loja Tab */}
                    {activeTab === 'loja' && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Informações Básicas</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Nome da Loja</label>
                                        <input
                                            type="text"
                                            defaultValue="JURÊ - Aromas do Brasil"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Descrição</label>
                                        <textarea
                                            rows={4}
                                            defaultValue="Fragrâncias artesanais inspiradas na natureza brasileira. Cada essência conta uma história."
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e] resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Email de Contato</label>
                                            <input
                                                type="email"
                                                defaultValue="contato@jurearomas.com.br"
                                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Telefone</label>
                                            <input
                                                type="tel"
                                                defaultValue="(11) 99999-9999"
                                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Endereço Completo</label>
                                        <input
                                            type="text"
                                            defaultValue="Rua das Flores, 123 - Jardins, São Paulo - SP, 01234-567"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                </div>
                                <button className="mt-8 px-8 py-3 bg-[#50b83c] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#45a034] transition-all shadow-lg">
                                    Salvar Alterações
                                </button>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Redes Sociais</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Instagram', icon: 'photo_camera', placeholder: '@jurearomas' },
                                        { label: 'Facebook', icon: 'thumb_up', placeholder: 'facebook.com/jurearomas' },
                                        { label: 'WhatsApp Business', icon: 'chat', placeholder: '(11) 99999-9999' }
                                    ].map((social, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[#0f281e]/60">{social.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-2">{social.label}</label>
                                                <input
                                                    type="text"
                                                    placeholder={social.placeholder}
                                                    className="w-full px-4 py-2 bg-[#f8f9fa] rounded-lg text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagamento Tab */}
                    {activeTab === 'pagamento' && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Métodos de Pagamento</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Cartão de Crédito', enabled: true, icon: 'credit_card', desc: 'Visa, Mastercard, Elo' },
                                        { name: 'Pix', enabled: true, icon: 'qr_code', desc: 'Pagamento instantâneo' },
                                        { name: 'Boleto Bancário', enabled: false, icon: 'receipt', desc: 'Vencimento em 3 dias' },
                                        { name: 'PayPal', enabled: false, icon: 'account_balance', desc: 'Pagamento internacional' }
                                    ].map((method, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-[#f8f9fa] rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-[#0f281e]">{method.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#0f281e]">{method.name}</p>
                                                    <p className="text-[10px] text-[#0f281e]/50">{method.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-12 h-6 rounded-full transition-all ${method.enabled ? 'bg-[#50B83C]' : 'bg-[#0f281e]/20'} relative cursor-pointer`}>
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${method.enabled ? 'right-0.5' : 'left-0.5'} shadow-lg`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Chaves de API</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Mercado Pago - Public Key</label>
                                        <input
                                            type="password"
                                            defaultValue="APP_USR_xxxxxxxxxxxxxxxx"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-mono text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Mercado Pago - Access Token</label>
                                        <input
                                            type="password"
                                            defaultValue="APP_USR_xxxxxxxxxxxxxxxx"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-mono text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                </div>
                                <button className="mt-6 px-8 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-all">
                                    Atualizar Chaves
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Envio Tab */}
                    {activeTab === 'envio' && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Opções de Envio</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'PAC', price: 'R$ 25,00', days: '7-10 dias úteis', enabled: true },
                                        { name: 'Sedex', price: 'R$ 35,00', days: '2-4 dias úteis', enabled: true },
                                        { name: 'Frete Grátis', price: 'Grátis', days: 'Compras acima de R$ 150', enabled: true },
                                        { name: 'Retirada na Loja', price: 'Grátis', days: 'Imediato', enabled: false }
                                    ].map((shipping, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-[#f8f9fa] rounded-2xl">
                                            <div>
                                                <p className="text-sm font-bold text-[#0f281e] mb-1">{shipping.name}</p>
                                                <p className="text-[10px] text-[#0f281e]/50">{shipping.days}</p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-sm font-bold text-[#50B83C]">{shipping.price}</span>
                                                <div className={`w-12 h-6 rounded-full transition-all ${shipping.enabled ? 'bg-[#50B83C]' : 'bg-[#0f281e]/20'} relative cursor-pointer`}>
                                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${shipping.enabled ? 'right-0.5' : 'left-0.5'} shadow-lg`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Configurações de Entrega</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Prazo de Processamento</label>
                                        <select className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]">
                                            <option>1 dia útil</option>
                                            <option>2 dias úteis</option>
                                            <option>3 dias úteis</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Peso Médio do Pacote (kg)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            defaultValue="0.5"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notificações Tab */}
                    {activeTab === 'notificacoes' && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Notificações por Email</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Novo pedido recebido', enabled: true },
                                        { label: 'Pagamento confirmado', enabled: true },
                                        { label: 'Produto com estoque baixo', enabled: true },
                                        { label: 'Novo cliente cadastrado', enabled: false },
                                        { label: 'Relatório diário de vendas', enabled: true }
                                    ].map((notif, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                                            <span className="text-sm text-[#0f281e]">{notif.label}</span>
                                            <div className={`w-12 h-6 rounded-full transition-all ${notif.enabled ? 'bg-[#50B83C]' : 'bg-[#0f281e]/20'} relative cursor-pointer`}>
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${notif.enabled ? 'right-0.5' : 'left-0.5'} shadow-lg`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Segurança Tab */}
                    {activeTab === 'seguranca' && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#0f281e]/5">
                                <h3 className="text-2xl font-display italic text-[#0f281e] mb-8">Alterar Senha</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Senha Atual</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Nova Senha</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                        />
                                    </div>
                                </div>
                                <button className="mt-6 px-8 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-all">
                                    Atualizar Senha
                                </button>
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-10 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
                                    <div>
                                        <h4 className="text-lg font-bold text-red-900 mb-2">Zona de Perigo</h4>
                                        <p className="text-sm text-red-700 mb-6">Ações irreversíveis que afetam permanentemente sua loja.</p>
                                        <button className="px-6 py-3 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all">
                                            Resetar Todas as Configurações
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0f281e] to-[#0f281e]/90 text-white p-8 rounded-3xl shadow-2xl">
                        <span className="material-symbols-outlined text-5xl mb-4">info</span>
                        <h3 className="text-lg font-bold mb-3">Dicas de Configuração</h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Mantenha suas informações sempre atualizadas para garantir a melhor experiência aos seus clientes.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#0f281e]/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#0f281e] mb-6">Status do Sistema</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Servidor', status: 'Online', color: 'green' },
                                { label: 'Banco de Dados', status: 'Online', color: 'green' },
                                { label: 'Gateway de Pagamento', status: 'Online', color: 'green' },
                                { label: 'Email', status: 'Online', color: 'green' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-xs text-[#0f281e]/60">{item.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`}></div>
                                        <span className="text-xs font-bold text-green-600">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
