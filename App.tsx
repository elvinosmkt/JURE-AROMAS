
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Product, ScentProfile, User, Order, OrderItem } from './types';
import { MOCK_PRODUCTS } from './constants';

// --- Helper for scroll restoration ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Shared UI Components ---

const Header = ({ cartCount, user }: { cartCount: number, user: User | null }) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-olive/5">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex-1 hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-olive/60">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Coleções</Link>
          <Link to="/discover" className="hover:text-primary transition-colors">Diário</Link>
        </nav>
      </div>
      
      <Link to="/" className="flex-none flex flex-col items-center">
        <h1 className="text-2xl font-bold tracking-[0.4em] text-olive italic uppercase leading-none">JURÊ</h1>
      </Link>
      
      <div className="flex-1 flex justify-end items-center gap-6">
        <Link to="/favorites" className="relative group">
          <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-red-400 transition-colors">favorite</span>
        </Link>
        <Link to="/checkout" className="relative group">
          <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-primary transition-colors">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-black">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 group">
          {user ? (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs overflow-hidden border border-primary/10 hover:border-primary transition-all">
              <img src={`https://ui-avatars.com/api/?name=${user.name}&background=D4A351&color=fff`} className="w-full h-full object-cover" alt="User" />
            </div>
          ) : (
            <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-primary">person</span>
          )}
        </Link>
      </div>
    </div>
  </header>
);

// --- Page Components ---

const Home = () => {
  return (
    <div className="bg-background-light">
      {/* Sub-header Navigation */}
      <div className="bg-olive text-white/80 sticky top-20 z-40 border-b border-white/10 overflow-x-auto no-scrollbar shadow-lg">
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
           <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000" className="w-full h-full object-cover scale-105" alt="Nature" />
           <div className="absolute inset-0 bg-olive/30"></div>
        </div>
        <div className="container relative z-10 px-6 text-center text-white">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-primary/80 mb-6 block drop-shadow-lg">A essência da alma brasileira em cada gota</span>
          <h2 className="text-6xl md:text-[9rem] font-display italic leading-[0.9] mb-12 drop-shadow-2xl">Sua Jornada Olfativa</h2>
          <Link to="/products" className="bg-primary text-olive px-16 py-4 font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all shadow-2xl">INICIAR DESCOBERTA</Link>
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
              { id: 'terroso', title: 'Terroso & Amadeirado', icon: 'park', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000' },
              { id: 'floral', title: 'Floral & Delicado', icon: 'local_florist', img: 'https://images.unsplash.com/photo-1620610509141-94578b943261?q=80&w=1000' },
              { id: 'fresco', title: 'Fresco & Cítrico', icon: 'waves', img: 'https://images.unsplash.com/photo-1596435767170-87428867a5b3?q=80&w=1000' },
            ].map((cat) => (
              <Link key={cat.id} to="/products" className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={cat.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center text-white">
                  <span className="material-symbols-outlined text-4xl mb-6 text-primary">{cat.icon}</span>
                  <h3 className="text-2xl font-display italic mb-8">{cat.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] border border-white/50 px-10 py-4 group-hover:bg-white group-hover:text-olive transition-all">Explorar Coleção</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Sensory Journey (Notes) */}
      <section className="py-32 bg-[#F9F7F2]">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-4xl md:text-5xl font-display italic text-olive mb-4">A Sensory Journey</h2>
           <p className="text-[11px] text-olive/40 uppercase tracking-[0.5em] mb-20 italic">Nossas fragrâncias são criadas com técnicas ancestrais e os melhores botânicos brasileiros.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { label: 'TOP NOTES', desc: 'Bruma Cítrica & Bergamota', img: 'https://images.unsplash.com/photo-1542361345-89e5824b9923?q=80&w=800' },
                { label: 'HEART NOTES', desc: 'Orquídea Selvagem Brasileira', img: 'https://images.unsplash.com/photo-1620610509141-94578b943261?q=80&w=800' },
                { label: 'BASE NOTES', desc: 'Sândalo & Âmbar Dourado', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800' }
              ].map((note, i) => (
                <div key={i}>
                   <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
                      <img src={note.img} className="w-full h-full object-cover" alt={note.label} />
                   </div>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">{note.label}</h4>
                   <p className="text-[11px] italic opacity-50">{note.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Collection Rituals */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block italic">COMPLETE A COLEÇÃO</span>
            <h2 className="text-5xl font-display italic text-olive">Matching Scent Rituals</h2>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-olive/10 flex items-center justify-center hover:bg-olive hover:text-white transition-all">
              <span className="material-symbols-outlined">west</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-olive/10 flex items-center justify-center hover:bg-olive hover:text-white transition-all">
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
           {MOCK_PRODUCTS.slice(0, 4).map(product => (
             <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-olive/5 mb-6 shadow-sm group-hover:shadow-xl transition-all">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-olive mb-1">{product.name}</h3>
                <p className="text-[9px] text-olive/40 uppercase tracking-widest mb-3 italic">{product.category}</p>
                <p className="text-xs font-bold text-olive">R$ {product.price.toFixed(2)}</p>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
};

const Checkout = ({ cart, updateCart, onComplete }: { cart: Product[], updateCart: (c: Product[]) => void, onComplete: (user: User, order: Order) => void }) => {
  const navigate = useNavigate();
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: 'Alameda Santos, 1200 - São Paulo, SP',
    zip: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = 12.50;
  const total = subtotal + (shippingCost || 0) + tax;

  const handleCalculateShipping = () => {
    if (shippingZip.length < 8) return;
    setIsCalculating(true);
    setTimeout(() => {
      setShippingCost(shippingZip.startsWith('01') ? 0 : 25.00);
      setIsCalculating(false);
    }, 1200);
  };

  const handleCompletePurchase = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha seus dados de identificação.");
      return;
    }

    const orderItems: OrderItem[] = cart.map(p => ({
      productId: p.id,
      name: p.name,
      quantity: 1,
      price: p.price,
      image: p.image
    }));

    const newOrder: Order = {
      id: `#EB-${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      customerId: 'user-123',
      customerName: formData.name,
      items: orderItems,
      subtotal,
      shipping: shippingCost || 0,
      tax,
      total,
      status: 'Preparando',
      trackingCode: 'BR' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      shippingMethod: shippingCost === 0 ? 'Sedex Grátis' : 'Transportadora Express',
      shippingAddress: formData.address
    };

    const newUser: User = {
      id: 'user-123',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.address,
        zip: formData.zip || shippingZip,
        city: 'São Paulo',
        state: 'SP'
      },
      preferences: ['Floral', 'Fresco'],
      orders: [newOrder]
    };

    onComplete(newUser, newOrder);
    updateCart([]);
    navigate(`/tracking/${newOrder.id}`);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-5xl font-display italic text-olive mb-4">Checkout</h2>
        <p className="text-[13px] text-olive/40 italic mb-16">Finalize sua compra. Uma conta será criada automaticamente para você acompanhar seu pedido.</p>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-8">
             <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-10">Sua Sacola</h3>
                <div className="divide-y divide-olive/5">
                   {cart.length === 0 ? (
                     <div className="py-12 text-center">
                        <p className="text-olive/40 italic">Sua sacola está vazia.</p>
                        <Link to="/products" className="text-primary font-bold uppercase tracking-widest text-[10px] mt-4 inline-block underline">Voltar para a loja</Link>
                     </div>
                   ) : cart.map((item, idx) => (
                     <div key={`${item.id}-${idx}`} className="py-8 flex gap-8">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-olive/5 flex-shrink-0 shadow-sm">
                           <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                           <div className="flex justify-between items-start">
                              <h4 className="text-base font-display italic text-olive">{item.name}</h4>
                              <p className="text-sm font-bold text-olive">R$ {item.price.toFixed(2)}</p>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-olive/40 uppercase tracking-widest italic">{item.category}</span>
                              <button onClick={() => updateCart(cart.filter((_, i) => i !== idx))} className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                                 <span className="material-symbols-outlined text-base">delete</span> Remover
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-8">Informações de Envio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="md:col-span-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">Cálculo de Frete (CEP)</label>
                      <div className="flex gap-4 mt-2">
                         <input 
                            type="text" 
                            placeholder="00000-000" 
                            value={shippingZip}
                            onChange={(e) => setShippingZip(e.target.value)}
                            className="flex-1 bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic focus:ring-1 focus:ring-primary" 
                         />
                         <button 
                            onClick={handleCalculateShipping}
                            disabled={isCalculating}
                            className="bg-olive text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all disabled:opacity-50"
                         >
                            {isCalculating ? 'Calculando...' : 'Calcular'}
                         </button>
                      </div>
                   </div>
                   {shippingCost !== null && (
                      <div className="md:col-span-2 bg-green-50 p-6 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-top duration-500">
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                               <span className="material-symbols-outlined text-green-600">local_shipping</span>
                               <div>
                                  <p className="text-[11px] font-bold text-olive">Opção disponível para {shippingZip}</p>
                                  <p className="text-[9px] text-olive/60 italic">Entrega em até 3 dias úteis</p>
                               </div>
                            </div>
                            <span className="text-sm font-bold text-green-600">{shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}</span>
                         </div>
                      </div>
                   )}
                </div>
                
                <div className="space-y-4">
                   <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">Dados para sua Nova Conta</label>
                   <input 
                      type="text" 
                      placeholder="Seu Nome Completo" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none" 
                   />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none" 
                      />
                      <input 
                        type="tel" 
                        placeholder="Telefone / WhatsApp" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none" 
                      />
                   </div>
                   <input 
                      type="text" 
                      placeholder="Endereço de Entrega (Rua, Número, Complemento)" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-[#F8F9FA] border-none rounded-xl text-xs px-8 py-4 italic outline-none" 
                   />
                </div>
             </div>
          </div>

          <div className="w-full lg:w-[450px] space-y-8">
             <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-olive/30 mb-8">Método de Pagamento</h3>
                <div className="grid grid-cols-3 gap-3 mb-8">
                   <button className="border-2 border-[#50B83C] bg-green-50 p-6 rounded-2xl flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-[#50B83C] text-2xl">credit_card</span>
                      <span className="text-[8px] font-black uppercase tracking-widest">Cartão</span>
                   </button>
                   <button className="border border-olive/5 bg-gray-50 p-6 rounded-2xl flex flex-col items-center gap-3 opacity-40">
                      <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                      <span className="text-[8px] font-black uppercase tracking-widest">Pix</span>
                   </button>
                   <button className="border border-olive/5 bg-gray-50 p-6 rounded-2xl flex flex-col items-center gap-3 opacity-40">
                      <span className="material-symbols-outlined text-2xl">description</span>
                      <span className="text-[8px] font-black uppercase tracking-widest">Boleto</span>
                   </button>
                </div>
             </div>

             <div className="bg-olive text-white p-10 rounded-3xl shadow-2xl">
                <div className="space-y-5 mb-10 text-[11px] uppercase tracking-[0.2em] opacity-50">
                   <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                   <div className="flex justify-between"><span>Frete</span><span className={shippingCost === 0 ? "text-primary font-black" : ""}>{shippingCost === null ? 'Calcule acima' : (shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`)}</span></div>
                   <div className="flex justify-between"><span>Taxas</span><span>R$ {tax.toFixed(2)}</span></div>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-8 mb-12">
                   <span className="text-2xl font-display italic">Total</span>
                   <span className="text-3xl font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCompletePurchase}
                  disabled={cart.length === 0 || shippingCost === null}
                  className="w-full bg-primary text-olive py-6 font-black uppercase tracking-[0.4em] text-[12px] rounded-2xl hover:scale-[1.03] transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                >
                   FINALIZAR COMPRA <span className="material-symbols-outlined text-xl">east</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderTracking = ({ user }: { user: User | null }) => {
  const { id } = useParams();
  const order = user?.orders.find(o => o.id === id) || user?.orders[0];

  if (!user || !order) return (
    <div className="py-40 text-center container mx-auto px-6">
       <span className="material-symbols-outlined text-6xl text-olive/10 mb-8">search</span>
       <h2 className="text-3xl font-display italic text-olive mb-4">Pedido não encontrado</h2>
       <Link to="/" className="text-primary font-bold uppercase tracking-widest text-[10px] underline">Voltar ao Início</Link>
    </div>
  );

  return (
    <div className="bg-background-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
           <span className="text-primary font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block">RASTREAMENTO EM TEMPO REAL</span>
           <h2 className="text-6xl font-display italic text-olive">Sua Essência está a Caminho</h2>
           <p className="text-[12px] text-olive/40 uppercase tracking-widest mt-4 italic">Pedido {order.id} • {order.shippingMethod}</p>
        </div>

        {/* Dynamic Stepper */}
        <div className="relative mb-24 px-10">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-olive/10 -translate-y-1/2 -z-10"></div>
           <div className="flex justify-between items-center max-w-4xl mx-auto">
              {[
                { label: 'Confirmado', icon: 'check_circle', active: true },
                { label: 'Preparação', icon: 'conveyor_belt', active: true },
                { label: 'Em Trânsito', icon: 'local_shipping', active: false },
                { label: 'Entregue', icon: 'package_2', active: false },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-6 relative">
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 transition-all duration-700 ${
                     step.active ? 'bg-[#50B83C] border-[#50B83C] text-white scale-110' : 'bg-white border-olive/10 text-olive/20'
                   }`}>
                      <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                   </div>
                   <p className={`text-[9px] font-black uppercase tracking-widest ${step.active ? 'text-olive' : 'opacity-30'}`}>{step.label}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                 <div className="flex items-center gap-4 mb-10">
                    <span className="material-symbols-outlined text-primary">pin_drop</span>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-olive">Trajeto do Pedido</h4>
                 </div>
                 <div className="aspect-video bg-olive/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Map" />
                    <div className="relative z-10 text-center">
                       <span className="material-symbols-outlined text-primary text-5xl mb-4 animate-bounce">location_on</span>
                       <p className="text-[11px] font-bold text-olive uppercase tracking-[0.2em]">O entregador está saindo do centro regional</p>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-olive/40 mb-6">Endereço de Entrega</h4>
                    <p className="text-[13px] text-olive font-medium leading-relaxed italic">{order.shippingAddress}</p>
                 </div>
                 <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-olive/40 mb-6">Transportadora</h4>
                    <p className="text-[13px] text-olive font-bold">{order.shippingMethod}</p>
                    <p className="text-[11px] text-primary font-bold mt-2 uppercase tracking-widest">{order.trackingCode}</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-10 rounded-3xl shadow-sm border border-olive/5 h-fit">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-olive mb-10 border-b border-olive/5 pb-4">Detalhes do Pedido</h4>
              <div className="space-y-6">
                 {order.items.map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-olive/5 flex-shrink-0">
                         <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1">
                         <h5 className="text-[12px] font-display italic text-olive">{item.name}</h5>
                         <p className="text-[9px] text-olive/40 font-bold uppercase">Qtd: {item.quantity}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-10 pt-6 border-t border-olive/5 text-[11px] font-bold text-olive flex justify-between">
                 <span className="uppercase tracking-widest opacity-40">Total</span>
                 <span>R$ {order.total.toFixed(2)}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = ({ user }: { user: User | null }) => {
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-[#F9F9F9] min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-10 mb-20">
           <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-primary/10">
              <img src={`https://ui-avatars.com/api/?name=${user.name}&size=200&background=D4A351&color=fff`} className="w-full h-full object-cover" alt="Profile" />
           </div>
           <div>
              <h2 className="text-5xl font-display italic text-olive">Olá, {user.name.split(' ')[0]}</h2>
              <p className="text-[11px] text-olive/40 uppercase tracking-widest mt-2 italic">Membro desde Outubro 2024 • {user.email}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-olive/5">
                 <h3 className="text-2xl font-display italic text-olive mb-10">Meus Pedidos Recentes</h3>
                 <div className="space-y-6">
                    {user.orders.map(order => (
                      <Link key={order.id} to={`/tracking/${order.id}`} className="flex items-center justify-between p-6 bg-[#F9F9F9] rounded-2xl hover:shadow-lg transition-all group">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                               <span className="material-symbols-outlined">shopping_basket</span>
                            </div>
                            <div>
                               <p className="text-[11px] font-bold text-olive uppercase tracking-widest">{order.id}</p>
                               <p className="text-[9px] text-olive/40 italic">{order.date} • {order.items.length} itens</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#50B83C] bg-green-50 px-4 py-1.5 rounded-full">{order.status}</span>
                            <span className="material-symbols-outlined text-olive/20 ml-4 group-hover:text-primary transition-colors">east</span>
                         </div>
                      </Link>
                    ))}
                 </div>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-olive/5">
                 <h3 className="text-2xl font-display italic text-olive mb-10">Dados Cadastrais</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">E-mail de Contato</label>
                       <p className="mt-2 text-sm font-medium text-olive">{user.email}</p>
                    </div>
                    <div>
                       <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">WhatsApp</label>
                       <p className="mt-2 text-sm font-medium text-olive">{user.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-1">Endereço Principal</label>
                       <p className="mt-2 text-sm font-medium text-olive">{user.address.street}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-olive text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                 <h4 className="text-xl font-display italic mb-6">Perfil Aromático</h4>
                 <div className="flex flex-wrap gap-3">
                    {user.preferences.map(p => (
                      <span key={p} className="bg-white/10 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">{p}</span>
                    ))}
                 </div>
                 <button className="text-[10px] font-bold text-primary mt-10 uppercase tracking-widest underline italic">Refazer Quiz</button>
              </div>

              <div className="bg-[#50B83C]/5 border border-[#50B83C]/10 p-10 rounded-[2.5rem] text-center">
                 <span className="material-symbols-outlined text-[#50B83C] text-4xl mb-4">loyalty</span>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#50B83C] mb-4">Membro Select</p>
                 <p className="text-[12px] italic text-olive leading-relaxed">Você já economizou <span className="font-bold text-[#50B83C]">R$ 145,90</span> este ano com benefícios exclusivos.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Componente Detalhe do Produto
const ProductDetail = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) return (
    <div className="py-40 text-center container mx-auto px-6">
       <span className="material-symbols-outlined text-6xl text-olive/10 mb-8">error</span>
       <h2 className="text-3xl font-display italic text-olive mb-4">Produto não encontrado</h2>
       <Link to="/products" className="text-primary font-bold uppercase tracking-widest text-[10px] underline">Voltar para a Loja</Link>
    </div>
  );

  return (
    <div className="bg-background-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 w-full">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
            </div>
          </div>
          
          <div className="flex-1 space-y-10">
            <div>
              <span className="text-primary font-bold tracking-[0.6em] uppercase text-[11px] mb-4 block">{product.category} • {product.profile}</span>
              <h2 className="text-7xl font-display italic text-olive mb-6">{product.name}</h2>
              <p className="text-2xl font-bold text-olive">R$ {product.price.toFixed(2)}</p>
            </div>

            <p className="text-base text-olive/60 leading-loose italic">{product.description}</p>

            <div className="grid grid-cols-3 gap-4 border-y border-olive/5 py-10">
              <div className="text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Topo</p>
                <p className="text-[11px] font-bold text-olive">{product.notes.top}</p>
              </div>
              <div className="text-center border-x border-olive/5">
                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Coração</p>
                <p className="text-[11px] font-bold text-olive">{product.notes.heart}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-olive/30 mb-2">Base</p>
                <p className="text-[11px] font-bold text-olive">{product.notes.base}</p>
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-olive/30">Intensidade</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i <= product.intensity ? 'bg-primary' : 'bg-olive/10'}`}></div>
                    ))}
                  </div>
               </div>
               
               <button 
                 onClick={() => {
                   addToCart(product);
                   navigate('/checkout');
                 }}
                 className="w-full bg-olive text-white py-6 font-black uppercase tracking-[0.4em] text-[12px] rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-xl"
               >
                  ADICIONAR À SACOLA <span className="material-symbols-outlined text-xl">shopping_bag</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ addToCart }: any) => (
  <div className="bg-background-light min-h-screen py-24">
    <div className="container mx-auto px-6">
       <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Catálogo Completo</span>
          <h2 className="text-6xl font-display italic text-olive">Nossas Coleções</h2>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {MOCK_PRODUCTS.map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="group animate-in fade-in slide-in-from-bottom duration-700">
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-olive/5 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" alt={p.name} />
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

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product) => setCart(prev => [...prev, product]);
  
  const handlePurchaseComplete = (newUser: User, newOrder: Order) => {
    setUser(newUser);
    localStorage.setItem('jure_user', JSON.stringify(newUser));
  };

  useEffect(() => {
    const saved = localStorage.getItem('jure_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background-light selection:bg-primary/20">
        <Header cartCount={cart.length} user={user} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} updateCart={setCart} onComplete={handlePurchaseComplete} />} />
            <Route path="/tracking/:id" element={<OrderTracking user={user} />} />
            <Route path="/account" element={<AccountSettings user={user} />} />
            <Route path="/login" element={<Navigate to="/checkout" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer className="bg-[#12130F] text-cream pt-24 pb-12 px-6">
           <div className="container mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/5 pb-20">
              <div className="max-w-xs">
                 <h2 className="text-4xl font-display italic text-primary tracking-widest mb-6 leading-none">JURÊ</h2>
                 <p className="text-[10px] uppercase tracking-widest opacity-30 leading-relaxed">
                    Artesanal, botânico e imerso na biodiversidade brasileira.
                 </p>
              </div>
              <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
                 <Link to="/products" className="hover:text-primary">Loja</Link>
                 <Link to="/about" className="hover:text-primary">História</Link>
                 <Link to="/contact" className="hover:text-primary">Suporte</Link>
              </div>
           </div>
           <div className="container mx-auto mt-12 text-center opacity-20 text-[8px] uppercase tracking-[0.5em]">
              © 2024 JURÊ AROMAS BRASIL. Todos os Direitos Reservados.
           </div>
        </footer>
        
        <a href="https://wa.me/5547992489931" target="_blank" rel="noopener noreferrer" className="fixed bottom-10 right-10 z-[150] w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95">
           <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </HashRouter>
  );
};

export default App;
