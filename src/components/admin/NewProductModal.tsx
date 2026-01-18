import React, { useState } from 'react';
import { Product } from '../../types';

interface NewProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

const NewProductModal: React.FC<NewProductModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Home Spray',
        price: 0,
        description: '',
        notesTop: '',
        notesHeart: '',
        notesBase: '',
        intensity: 3,
        stock: 0,
        sku: '',
        profile: 'Fresco',
        tags: '',
        image: ''
    });

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!formData.name || !formData.price || !formData.sku) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        const newProduct: Product = {
            id: `prod-${Date.now()}`,
            name: formData.name,
            category: formData.category,
            price: formData.price,
            image: formData.image || '/img/placeholder.png',
            description: formData.description,
            notes: {
                top: formData.notesTop,
                heart: formData.notesHeart,
                base: formData.notesBase
            },
            intensity: formData.intensity,
            stock: formData.stock,
            sku: formData.sku,
            profile: formData.profile as any,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        };

        onSave(newProduct);
        setFormData({
            name: '',
            category: 'Home Spray',
            price: 0,
            description: '',
            notesTop: '',
            notesHeart: '',
            notesBase: '',
            intensity: 3,
            stock: 0,
            sku: '',
            profile: 'Fresco',
            tags: '',
            image: ''
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-[#0f281e]/5 bg-gradient-to-r from-[#0f281e] to-[#0f281e]/90">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-display italic text-white">Novo Produto</h3>
                            <p className="text-xs uppercase tracking-widest text-white/60 mt-2">Adicionar produto ao catálogo</p>
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
                    {/* Informações Básicas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Nome do Produto *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Figo do Oriente"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                SKU *
                            </label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                placeholder="Ex: SPR-FIG-150"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Categoria *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            >
                                <option value="Home Spray">Home Spray</option>
                                <option value="Difusores">Difusores</option>
                                <option value="Velas">Velas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Preço (R$) *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Estoque
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Descrição
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Descrição detalhada do produto..."
                            className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e] resize-none"
                        />
                    </div>

                    {/* Notas Olfativas */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                            Notas Olfativas
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <input
                                    type="text"
                                    value={formData.notesTop}
                                    onChange={(e) => setFormData({ ...formData, notesTop: e.target.value })}
                                    placeholder="Notas de Topo"
                                    className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.notesHeart}
                                    onChange={(e) => setFormData({ ...formData, notesHeart: e.target.value })}
                                    placeholder="Notas de Coração"
                                    className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.notesBase}
                                    onChange={(e) => setFormData({ ...formData, notesBase: e.target.value })}
                                    placeholder="Notas de Base"
                                    className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Perfil e Intensidade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Perfil Aromático
                            </label>
                            <select
                                value={formData.profile}
                                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            >
                                <option value="Fresco">Fresco</option>
                                <option value="Floral">Floral</option>
                                <option value="Terroso">Terroso</option>
                                <option value="Cítrico">Cítrico</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Intensidade (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={formData.intensity}
                                onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                                className="w-full h-2 bg-[#f8f9fa] rounded-lg appearance-none cursor-pointer accent-[#0f281e]"
                            />
                            <div className="text-center mt-2 text-sm font-bold text-[#0f281e]">{formData.intensity}</div>
                        </div>
                    </div>

                    {/* Tags e Imagem */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                Tags (separadas por vírgula)
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Ex: Best Seller, Verão"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f281e]/60 mb-3">
                                URL da Imagem
                            </label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="/img/produto.png"
                                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm font-medium text-[#0f281e] border border-[#0f281e]/5 focus:outline-none focus:ring-2 focus:ring-[#0f281e]"
                            />
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
                        className="flex-1 px-6 py-3 bg-[#0f281e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0f281e]/90 transition-colors shadow-lg"
                    >
                        Adicionar Produto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductModal;
