import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/constants';
import { Product } from '../../types';

const ProductDetail = ({ addToCart }: { addToCart: (p: Product) => void }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = MOCK_PRODUCTS.find(p => p.id === id);

    // Suggest related products (excluding current one)
    const relatedProducts = useMemo(() => {
        return MOCK_PRODUCTS
            .filter(p => p.id !== id)
            .sort(() => 0.5 - Math.random()) // Simple shuffle
            .slice(0, 3);
    }, [id]);

    if (!product) return (
        <div className="py-40 text-center container mx-auto px-6">
            <span className="material-symbols-outlined text-6xl text-olive/10 mb-8">error</span>
            <h2 className="text-3xl font-display italic text-olive mb-4">Produto não encontrado</h2>
            <Link to="/products" className="text-primary font-bold uppercase tracking-widest text-[10px] underline">Voltar para a Loja</Link>
        </div>
    );

    return (
        <div className="bg-background-light min-h-screen py-24 animate-in fade-in duration-500">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    <div className="flex-1 w-full">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" alt={product.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-10">
                        <div>
                            <span className="text-primary font-bold tracking-[0.6em] uppercase text-[11px] mb-4 block flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-primary"></span> {product.category}
                            </span>
                            <h2 className="text-7xl font-display italic text-olive mb-6 leading-tight">{product.name}</h2>
                            <p className="text-3xl font-bold text-olive">R$ {product.price.toFixed(2)}</p>
                        </div>

                        <p className="text-base text-olive/70 leading-loose italic border-l-2 border-primary/20 pl-6">
                            "{product.description}"
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-y border-olive/10 py-10 bg-[#Fdfdfd] rounded-2xl p-6 shadow-sm">
                            <div className="text-center">
                                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Topo</p>
                                <p className="text-[11px] font-bold text-olive">{product.notes.top}</p>
                            </div>
                            <div className="text-center border-x border-olive/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Coração</p>
                                <p className="text-[11px] font-bold text-olive">{product.notes.heart}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Base</p>
                                <p className="text-[11px] font-bold text-olive">{product.notes.base}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-olive/40 w-24">Intensidade</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= product.intensity ? 'bg-primary' : 'bg-olive/10'} w-8 transition-all`}></div>
                                    ))}
                                </div>
                                <span className="text-[10px] text-olive font-bold ml-2">{product.intensity}/5</span>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-olive/40 w-24">Fixação</span>
                                <div className="flex gap-1 items-center">
                                    <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                    <span className="text-[11px] text-olive font-bold">12 a 14 horas</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    addToCart(product);
                                    navigate('/checkout');
                                }}
                                className="w-full bg-olive text-white py-6 font-black uppercase tracking-[0.4em] text-[12px] rounded-2xl hover:bg-primary hover:scale-[1.01] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95"
                            >
                                ADICIONAR À SACOLA
                            </button>

                            <p className="text-center text-[10px] text-olive/40 uppercase tracking-widest flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified_user</span> Garantia de Satisfação de 30 dias
                            </p>
                        </div>
                    </div>
                </div>

                {/* Suggested Included Products */}
                <div className="border-t border-olive/10 pt-20">
                    <h3 className="text-4xl font-display italic text-olive text-center mb-12">Você Também Pode Amar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {relatedProducts.map(p => (
                            <Link key={p.id} to={`/product/${p.id}`} className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-olive/5 flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-olive/5">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={p.name} />
                                </div>
                                <h4 className="text-xl font-display italic text-olive mb-2">{p.name}</h4>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4">{p.profile}</p>
                                <span className="text-sm font-bold text-olive/60">Ver Detalhes</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
