
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Product, User, Order } from './types/index';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Marketing from './pages/admin/Marketing';
import Settings from './pages/admin/Settings';
import Reports from './pages/admin/Reports';

// Store Imports
import Header from './components/store/Header';
import Home from './pages/store/Home';
import ProductList from './pages/store/ProductList';
import ProductDetail from './pages/store/ProductDetail';
import Checkout from './pages/store/Checkout';
import OrderTracking from './pages/store/OrderTracking';
import AccountSettings from './pages/store/AccountSettings';
import Login from './pages/store/Login';

// --- Helper for scroll restoration ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product) => setCart(prev => [...prev, product]);

  const handlePurchaseComplete = (newUser: User, newOrder: Order) => {
    setUser(newUser);
    localStorage.setItem('jure_user', JSON.stringify(newUser));
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    localStorage.setItem('jure_user', JSON.stringify(loggedUser));
  };

  useEffect(() => {
    const saved = localStorage.getItem('jure_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Split App into two layouts based on path
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="/admin/dashboard" />} />
        </Route>

        {/* Store Routes */}
        <Route path="*" element={<StoreLayout cart={cart} user={user} addToCart={addToCart} updateCart={setCart} onComplete={handlePurchaseComplete} onLogin={handleLogin} />} />
      </Routes>
    </HashRouter>
  );
};

// Extracted Store Layout to separate Admin logic
const StoreLayout = ({ cart, user, addToCart, updateCart, onComplete, onLogin }: any) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light selection:bg-primary/20 font-sans">
      <Header cartCount={cart.length} user={user} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} updateCart={updateCart} onComplete={onComplete} />} />
          <Route path="/tracking/:id" element={<OrderTracking user={user} />} />
          <Route path="/account" element={<AccountSettings user={user} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="bg-[#12130F] text-cream pt-24 pb-12 px-6 border-t border-olive/5">
        <div className="container mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/5 pb-20">
          <div className="max-w-xs">
            <h2 className="text-4xl font-display italic text-primary tracking-widest mb-6 leading-none">JURÊ</h2>
            <p className="text-[10px] uppercase tracking-widest opacity-30 leading-relaxed">
              Artesanal, botânico e imerso na biodiversidade brasileira.
            </p>
          </div>
          <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            <Link to="/products" className="hover:text-primary transition-colors">Loja</Link>
            <Link to="/about" className="hover:text-primary transition-colors">História</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Suporte</Link>
            <Link to="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
          </div>
        </div>
        <div className="container mx-auto mt-12 text-center opacity-20 text-[8px] uppercase tracking-[0.5em]">
          © 2024 JURÊ AROMAS BRASIL. Todos os Direitos Reservados.
        </div>
      </footer>

      <a href="https://wa.me/5547992489931" target="_blank" rel="noopener noreferrer" className="fixed bottom-10 right-10 z-[150] w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
};

export default App;
