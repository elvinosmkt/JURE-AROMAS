import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../utils/constants';
import NewProductModal from '../../components/admin/NewProductModal';
import { Product } from '../../types';

const Products = () => {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

    const handleNewProduct = (newProduct: Product) => {
        setProducts([...products, newProduct]);
    };
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-display italic text-[#0f281e]">Gestão de Inventário</h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#0f281e]/40 mt-2">Visualize e gerencie seu catálogo de fragrâncias.</p>
                </div>
                <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="bg-[#0f281e] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0f281e]/90 transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined text-lg">add</span> Adicionar Novo Produto
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-[#0f281e]/5 overflow-hidden">
                {/* Filter Bar */}
                <div className="p-8 border-b border-[#0f281e]/5 flex justify-between items-center bg-[#f8f9fa]">
                    <div className="relative w-96">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                        <input
                            type="text"
                            placeholder="Buscar produto por nome..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#0f281e]/5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0f281e]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0f281e]/40 flex items-center mr-2">Filtrar:</span>
                        {['Todos', 'Velas', 'Difusores', 'Home Spray'].map(cat => (
                            <button key={cat} className="px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-[#0f281e]/5 transition-colors border border-transparent hover:border-[#0f281e]/10">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Table */}
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#f8f9fa] border-b border-[#0f281e]/5">
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Imagem</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Produto</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Categoria</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Estoque</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Preço</th>
                            <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Status</th>
                            <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-[#0f281e]/40">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0f281e]/5">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-[#f8f9fa]/50 transition-colors group">
                                <td className="px-8 py-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f8f9fa]">
                                        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <div className="text-sm font-bold text-[#0f281e]">{product.name}</div>
                                    <div className="text-[10px] text-[#0f281e]/40 uppercase tracking-widest font-mono">REF: {product.sku}</div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className="bg-[#f8f9fa] border border-[#0f281e]/5 px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-[#0f281e]/60">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-8 py-4">
                                    <div className={product.stock < 10 ? 'text-red-500 font-bold' : 'text-[#0f281e]'}>
                                        {product.stock} unidades
                                        {product.stock < 10 && <span className="block text-[8px] uppercase tracking-widest text-red-400 mt-1">Estoque Baixo</span>}
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-sm font-medium text-[#0f281e]">R$ {product.price.toFixed(2)}</td>
                                <td className="px-8 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${product.stock > 0 ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                                        }`}>
                                        {product.stock > 0 ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <button className="text-[#0f281e]/20 hover:text-[#0f281e] transition-colors">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <NewProductModal
                isOpen={isNewProductModalOpen}
                onClose={() => setIsNewProductModalOpen(false)}
                onSave={handleNewProduct}
            />
        </div>
    );
};

export default Products;
