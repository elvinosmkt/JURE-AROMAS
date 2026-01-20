import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/constants';

const Home = () => {
    return (
        <div className="bg-background-light animate-in fade-in duration-700">
            {/* Sub-header Navigation */}
            <div className="bg-olive text-white/80 sticky top-20 z-40 border-b border-white/10 overflow-x-auto no-scrollbar shadow-lg backdrop-blur-md bg-olive/95">
                <div className="container mx-auto px-6 h-12 flex items-center justify-center gap-12 min-w-max">
                    {['Coleção Terrosa', 'Coleção Floral', 'Coleção Fresca', 'Coleção Cítrica', 'Todos os Aromas'].map(item => (
                        <Link key={item} to="/products" className="text-[9px] font-bold uppercase tracking-[0.4em] hover:text-primary transition-all whitespace-nowrap">
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/img/hero_banner.png" className="w-full h-full object-cover scale-105 animate-zoom-in" alt="Jurê Aromas Luxury" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
                </div>
                <div className="container relative z-10 px-6 text-center text-white">
                    <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-primary mb-6 block drop-shadow-lg animate-fade-in-up">A essência da alma brasileira</span>
                    <h2 className="text-6xl md:text-[8rem] font-display italic leading-[0.9] mb-12 drop-shadow-2xl animate-fade-in-up delay-100">Jornada Olfativa</h2>
                    <Link to="/products" className="bg-primary text-olive px-16 py-4 font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all shadow-2xl hover:scale-105 inline-block animate-fade-in-up delay-200">
                        INICIAR DESCOBERTA
                    </Link>
                </div>
            </section>

            {/* Scent Profiles Categories */}
            <section className="py-32 container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display italic text-olive mb-4">Escolha sua Vibe</h2>
                    <p className="text-[11px] text-olive/40 uppercase tracking-[0.5em] italic">Fragrâncias curadas por famílias olfativas</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { id: 'terroso', title: 'Terroso & Amadeirado', icon: 'park', img: '/img/cat_terroso.png' },
                        { id: 'floral', title: 'Floral & Delicado', icon: 'local_florist', img: '/img/cat_floral.png' },
                        { id: 'fresco', title: 'Fresco & Cítrico', icon: 'waves', img: '/img/cat_fresco.png' },
                    ].map((cat) => (
                        <Link key={cat.id} to="/products" className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl block">
                            <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={cat.title} />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
                            <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center text-white transation-opacity">
                                <span className="material-symbols-outlined text-4xl mb-6 text-primary group-hover:scale-110 transition-transform">{cat.icon}</span>
                                <h3 className="text-2xl font-display italic mb-8">{cat.title}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] border border-white/50 px-10 py-4 group-hover:bg-white group-hover:text-olive transition-all">Explorar</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Collection with Descriptions */}
            <section className="py-32 bg-[#F9F7F2]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center text-center mb-20">
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block italic">Curadoria da Semana</span>
                        <h2 className="text-5xl font-display italic text-olive">Destaques da Coleção</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                        {MOCK_PRODUCTS.slice(0, 3).map(product => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all border border-olive/5">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-olive/5 mb-6 relative">
                                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-olive px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-display italic text-olive mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined text-[14px] ${i < product.intensity ? 'text-primary' : 'text-gray-200'}`}>star</span>
                                    ))}
                                </div>
                                <p className="text-xs text-olive/60 leading-relaxed mb-6 line-clamp-2 h-[2.5em]">{product.description}</p>
                                <div className="flex justify-between items-center pt-6 border-t border-olive/5">
                                    <p className="text-lg font-bold text-olive">R$ {product.price.toFixed(2)}</p>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 group-hover:underline">
                                        Comprar <span className="material-symbols-outlined text-sm">east</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link to="/products" className="bg-olive text-white px-12 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-lg inline-flex items-center gap-3">
                            Ver Todos os Produtos <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sensory Journey (Notes) */}
            <section className="py-32 container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-display italic text-olive mb-4">A Jornada Sensorial</h2>
                    <p className="text-[11px] text-olive/40 uppercase tracking-[0.5em] mb-20 italic">Botânicos brasileiros em harmonia</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { label: 'NOTAS DE TOPO', desc: 'A primeira impressão: Cítricos e Frescor', img: '/img/cat_fresco.png' }, // Reusing fresh for top notes
                            { label: 'NOTAS DE CORAÇÃO', desc: 'A alma do perfume: Florais e Frutas', img: '/img/cat_floral.png' }, // Reusing floral for heart
                            { label: 'NOTAS DE FUNDO', desc: 'O rastro duradouro: Madeiras e Âmbar', img: '/img/cat_terroso.png' } // Reusing earthy for base
                        ].map((note, i) => (
                            <div key={i} className="group cursor-default">
                                <div className="aspect-[4/5] rounded-full overflow-hidden mb-8 shadow-lg sepia group-hover:sepia-0 transition-all duration-700 mx-auto w-3/4 border-4 border-white/50">
                                    <img src={note.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={note.label} />
                                </div>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-primary">{note.label}</h4>
                                <p className="text-sm font-display italic text-olive">{note.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
