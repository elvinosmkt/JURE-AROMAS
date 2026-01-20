import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/constants';
import { Product } from '../../types';

const ProductList = ({ addToCart }: { addToCart?: (p: Product) => void }) => (
    <div className="bg-background-light min-h-screen py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Catálogo Completo</span>
                <h2 className="text-6xl font-display italic text-olive">Nossas Coleções</h2>
            </div>

            {/* Filters (Mock) */}
            <div className="flex justify-center gap-4 mb-16 flex-wrap">
                {['Todos', 'Terroso', 'Floral', 'Fresco', 'Cítrico', 'Especiarias'].map((filter, i) => (
                    <button key={filter} className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border ${i === 0 ? 'bg-olive text-white border-olive' : 'bg-transparent text-olive/60 border-olive/20 hover:border-olive hover:text-olive'} transition-all`}>
                        {filter}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                {MOCK_PRODUCTS.map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="group animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-olive/5 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 relative">
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" alt={p.name} />
                            {/* Quick Add Button overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <button className="w-full bg-white/95 backdrop-blur text-olive py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-olive hover:text-white transition-colors">
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                        <div className="text-center px-4">
                            <span className="text-[9px] text-primary font-black uppercase tracking-[0.4em] mb-3 block">{p.profile}</span>
                            <h3 className="text-xl font-display italic text-olive mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                            <p className="text-sm font-bold text-olive/40 tracking-widest">R$ {p.price.toFixed(2)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default ProductList;
