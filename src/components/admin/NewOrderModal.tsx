import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../../utils/constants';
import { OrderItem } from '../../types';

interface NewOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (orderData: any) => void;
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({ isOpen, onClose, onSave }) => {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [shippingMethod, setShippingMethod] = useState('PAC');
    const [shippingCost, setShippingCost] = useState(25.00);
    const [notes, setNotes] = useState('');
    const [searchProduct, setSearchProduct] = useState('');

    if (!isOpen) return null;

    const addProduct = (productId: string) => {
        const product = MOCK_PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const existingItem = orderItems.find(item => item.productId === productId);
        if (existingItem) {
            setOrderItems(orderItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setOrderItems([...orderItems, {
                productId: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                image: product.image
            }]);
        }
        setSearchProduct('');
    };

    const removeProduct = (productId: string) => {
        setOrderItems(orderItems.filter(item => item.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setOrderItems(orderItems.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        ));
    };

    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;

    const handleSubmit = () => {
        const customer = MOCK_CUSTOMERS.find(c => c.id === selectedCustomer);
        if (!customer || orderItems.length === 0) {
            alert('Selecione um cliente e adicione pelo menos um produto');
            return;
        }

        const newOrder = {
            id: `#JR-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleString('pt-BR'),
            status: 'Pendente',
            customerName: customer.name,
            customerId: customer.id,
            items: orderItems,
            subtotal,
            shipping: shippingCost,
            tax: 0,
            total,
            shippingMethod,
            shippingAddress: 'Endereço do cliente',
            notes,
            timeline: [
                { date: new Date().toLocaleString('pt-BR'), status: 'Pedido Criado', completed: true },
                { date: '-', status: 'Pagamento', completed: false }
            ]
        };

        onSave(newOrder);
        onClose();
    };

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-[#0f281e]/5 bg-gradient-to-r from-[#0f281e] to-[#0f281e]/90">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-display italic text-white">Novo Pedido</h3>
                            <p className="text-xs uppercase tracking-widest text-white/60 mt-2">Criar pedido manualmente</p>
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
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {/* Cliente */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Cliente *
                        </label>
                        <select
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                        >
                            <option value="">Selecione um cliente</option>
                            {MOCK_CUSTOMERS.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name} - {customer.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Produtos */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Adicionar Produtos *
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                            <input
                                type="text"
                                placeholder="Buscar produto..."
                                value={searchProduct}
                                onChange={(e) => setSearchProduct(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>

                        {searchProduct && filteredProducts.length > 0 && (
                            <div className="mt-2 bg-white border border-[#0f281e]/10 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                {filteredProducts.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => addProduct(product.id)}
                                        className="w-full px-4 py-3 hover:bg-[#f8f9fa] flex items-center gap-3 text-left transition-colors"
                                    >
                                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-[#0f281e]">{product.name}</div>
                                            <div className="text-xs text-[#0f281e]/60">R$ {product.price.toFixed(2)}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Lista de Produtos Adicionados */}
                    {orderItems.length > 0 && (
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60">
                                Produtos no Pedido
                            </label>
                            {orderItems.map(item => (
                                <div key={item.productId} className="bg-[#f8f9fa] rounded-xl p-4 flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-[#0f281e]">{item.name}</div>
                                        <div className="text-xs text-[#0f281e]/60">R$ {item.price.toFixed(2)}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className="w-8 h-8 rounded-lg bg-white border border-[#0f281e]/10 flex items-center justify-center hover:bg-[#0f281e] hover:text-white transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">remove</span>
                                        </button>
                                        <span className="w-12 text-center font-bold text-[#0f281e]">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg bg-white border border-[#0f281e]/10 flex items-center justify-center hover:bg-[#0f281e] hover:text-white transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeProduct(item.productId)}
                                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Método de Envio */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Método de Envio
                            </label>
                            <select
                                value={shippingMethod}
                                onChange={(e) => {
                                    setShippingMethod(e.target.value);
                                    setShippingCost(e.target.value === 'Sedex Grátis' ? 0 : 25);
                                }}
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            >
                                <option value="PAC">PAC - R$ 25,00</option>
                                <option value="Sedex">Sedex - R$ 35,00</option>
                                <option value="Sedex Grátis">Sedex Grátis</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Custo de Envio
                            </label>
                            <input
                                type="number"
                                value={shippingCost}
                                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Observações
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Adicione observações sobre o pedido..."
                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e] resize-none"
                        />
                    </div>

                    {/* Resumo */}
                    <div className="bg-gradient-to-br from-[#0f281e] to-[#0f281e]/90 rounded-2xl p-6 text-white">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4">Resumo do Pedido</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/80">Subtotal</span>
                                <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/80">Frete</span>
                                <span className="font-bold">{shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="border-t border-white/10 pt-2 mt-2">
                                <div className="flex justify-between text-lg">
                                    <span className="font-display italic">Total</span>
                                    <span className="font-black">R$ {total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
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
                        className="flex-1 px-6 py-3 bg-[#50b83c] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#45a034] transition-colors shadow-lg shadow-green-500/20"
                    >
                        Criar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewOrderModal;
