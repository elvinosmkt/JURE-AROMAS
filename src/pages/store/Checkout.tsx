import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Product, User, Order, OrderItem } from '../../types';

const Checkout = ({ cart, updateCart, onComplete }: { cart: Product[], updateCart: (c: Product[]) => void, onComplete: (user: User, order: Order) => void }) => {
    const navigate = useNavigate();
    const [shippingZip, setShippingZip] = useState('');
    const [shippingCost, setShippingCost] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // Payment Method State
    const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');
    const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: 'Alameda Santos, 1200 - São Paulo, SP',
        zip: ''
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const tax = 0; // Removing tax for simplicity/Brazilian context usually includes tax
    const total = subtotal + (shippingCost || 0);

    const handleCalculateShipping = () => {
        if (shippingZip.length < 8) return;
        setIsCalculating(true);
        // Simulate API call
        setTimeout(() => {
            setShippingCost(shippingZip.startsWith('01') ? 0 : 25.00);
            setIsCalculating(false);
        }, 1200);
    };

    const handleCompletePurchase = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Por favor, preencha seus dados pessoais.");
            return;
        }

        if (paymentMethod === 'credit_card' && (!cardData.number || !cardData.cvv)) {
            alert("Por favor, preencha os dados do cartão.");
            return;
        }

        setIsProcessingPayment(true);

        // Simulate Payment Processing
        setTimeout(() => {
            const orderItems: OrderItem[] = cart.map(p => ({
                productId: p.id,
                name: p.name,
                quantity: 1,
                price: p.price,
                image: p.image
            }));

            const newOrder: Order = {
                id: `#JB-${Math.floor(Math.random() * 90000) + 10000}`,
                date: new Date().toLocaleDateString('pt-BR'),
                customerId: 'user-' + Date.now(),
                customerName: formData.name,
                items: orderItems,
                subtotal,
                shipping: shippingCost || 0,
                tax,
                total,
                status: 'Preparando',
                timeline: [
                    { status: 'Confirmado', date: new Date().toLocaleString('pt-BR'), description: 'Pagamento aprovado com sucesso.' }
                ],
                trackingCode: 'BR' + Math.random().toString(36).substring(2, 11).toUpperCase(),
                shippingMethod: shippingCost === 0 ? 'Sedex Grátis' : 'Transportadora Express',
                shippingAddress: `${formData.address} - ${formData.zip || shippingZip}`
            };

            const newUser: User = {
                id: 'user-' + Date.now(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: {
                    street: formData.address,
                    zip: formData.zip || shippingZip,
                    city: 'São Paulo',
                    state: 'SP'
                },
                preferences: [],
                orders: [newOrder]
            };

            onComplete(newUser, newOrder);
            updateCart([]);
            setIsProcessingPayment(false);
            navigate(`/tracking/${newOrder.id}`);
        }, 2500);
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen py-20 animate-in fade-in duration-700">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-5xl font-display italic text-olive mb-4">Finalizar Pedido</h2>
                <p className="text-[13px] text-olive/40 italic mb-16">Checkout seguro. Seus dados criarão automaticamente sua conta JURÊ.</p>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Form & Cart */}
                    <div className="flex-1 space-y-8">
                        {/* Cart Summary */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-10">Sua Sacola ({cart.length})</h3>
                            <div className="divide-y divide-olive/5">
                                {cart.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p className="text-olive/40 italic">Sua sacola está vazia.</p>
                                        <Link to="/products" className="text-primary font-bold uppercase tracking-widest text-[10px] mt-4 inline-block underline">Voltar para a loja</Link>
                                    </div>
                                ) : cart.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="py-8 flex gap-8">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-olive/5 flex-shrink-0 shadow-sm border border-white">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-base font-display italic text-olive">{item.name}</h4>
                                                <p className="text-sm font-bold text-olive">R$ {item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-olive/40 uppercase tracking-widest italic">{item.category}</span>
                                                <button onClick={() => updateCart(cart.filter((_, i) => i !== idx))} className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1 hover:text-red-600">
                                                    <span className="material-symbols-outlined text-base">delete</span> Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping & Personal Data */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-8">Informações de Entrega</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-olive/5 pb-8">
                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">CEP para Cálculo</label>
                                    <div className="flex gap-4 mt-2">
                                        <input
                                            type="text"
                                            placeholder="00000-000"
                                            value={shippingZip}
                                            onChange={(e) => setShippingZip(e.target.value)}
                                            className="flex-1 bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic focus:ring-1 focus:ring-primary outline-none"
                                        />
                                        <button
                                            onClick={handleCalculateShipping}
                                            disabled={isCalculating}
                                            className="bg-olive text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all disabled:opacity-50 min-w-[120px]"
                                        >
                                            {isCalculating ? '...' : 'Calcular'}
                                        </button>
                                    </div>
                                </div>
                                {shippingCost !== null && (
                                    <div className="md:col-span-2 bg-green-50 p-6 rounded-2xl border border-green-100 animate-fade-in flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-600">local_shipping</span>
                                            <div>
                                                <p className="text-[11px] font-bold text-olive">Frete Normal</p>
                                                <p className="text-[9px] text-olive/60 italic">Entrega em até 5 dias úteis</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-green-600">{shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">Seus Dados (Criação Automática de Conta)</label>
                                <input
                                    type="text"
                                    placeholder="Nome Completo"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none focus:ring-1 focus:ring-primary"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="email"
                                        placeholder="E-mail"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="WhatsApp"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Endereço Completo (Rua, Número, Bairro)"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment */}
                    <div className="w-full lg:w-[450px] space-y-8">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-8">Pagamento</h3>

                            {/* Tabs */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('credit_card')}
                                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit_card' ? 'bg-olive text-white shadow-lg' : 'bg-gray-50 text-olive/40 hover:bg-gray-100'}`}
                                >
                                    <span className="material-symbols-outlined text-2xl">credit_card</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest">Cartão</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('pix')}
                                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${paymentMethod === 'pix' ? 'bg-olive text-white shadow-lg' : 'bg-gray-50 text-olive/40 hover:bg-gray-100'}`}
                                >
                                    <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest">Pix</span>
                                </button>
                            </div>

                            {/* Payment Forms */}
                            {paymentMethod === 'credit_card' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-olive/30">credit_card</span>
                                        <input type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                                            value={cardData.number} onChange={e => setCardData({ ...cardData, number: e.target.value })}
                                            className="w-full bg-[#F8F9FA] pl-12 pr-4 py-4 rounded-xl text-xs outline-none focus:ring-1 focus:ring-olive"
                                        />
                                    </div>
                                    <input type="text" placeholder="Nome no Cartão"
                                        value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value })}
                                        className="w-full bg-[#F8F9FA] px-6 py-4 rounded-xl text-xs outline-none focus:ring-1 focus:ring-olive"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM/AA" maxLength={5}
                                            value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                                            className="bg-[#F8F9FA] px-6 py-4 rounded-xl text-xs outline-none focus:ring-1 focus:ring-olive"
                                        />
                                        <input type="text" placeholder="CVV" maxLength={3}
                                            value={cardData.cvv} onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                                            className="bg-[#F8F9FA] px-6 py-4 rounded-xl text-xs outline-none focus:ring-1 focus:ring-olive"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'pix' && (
                                <div className="text-center py-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="bg-white p-4 inline-block rounded-xl shadow-inner border border-olive/10 mb-4">
                                        {/* Mock QR Code */}
                                        <div className="w-40 h-40 bg-olive flex items-center justify-center text-white/20">
                                            <span className="material-symbols-outlined text-6xl">qr_code_2</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-widest text-olive/60 mb-2">Pague com Pix para aprovação imediata</p>
                                    <button className="text-primary text-xs font-bold underline">Copiar Código Pix</button>
                                </div>
                            )}
                        </div>

                        {/* Total Block */}
                        <div className="bg-olive text-white p-10 rounded-3xl shadow-2xl">
                            <div className="space-y-5 mb-10 text-[11px] uppercase tracking-[0.2em] opacity-50">
                                <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Frete</span><span className={shippingCost === 0 ? "text-primary font-black" : ""}>{shippingCost === null ? '...' : (shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`)}</span></div>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/10 pt-8 mb-12">
                                <span className="text-2xl font-display italic">Total</span>
                                <span className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCompletePurchase}
                                disabled={cart.length === 0 || shippingCost === null || isProcessingPayment}
                                className="w-full bg-primary text-olive py-6 font-black uppercase tracking-[0.4em] text-[12px] rounded-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessingPayment ? (
                                    <span className="animate-pulse">PROCESSANDO...</span>
                                ) : (
                                    <>FINALIZAR COMPRA <span className="material-symbols-outlined text-xl">verified</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
