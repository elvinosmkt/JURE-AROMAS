import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { MOCK_ORDERS } from '../utils/constants';

const SYSTEM_NAME = "JURÊ";
const SUBTITLE = "Admin Panel";

const MENU_ITEMS = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/orders', icon: 'shopping_bag', label: 'Pedidos', badge: true },
    { path: '/admin/products', icon: 'inventory_2', label: 'Produtos' },
    { path: '/admin/customers', icon: 'group', label: 'Clientes' },
    { path: '/admin/reports', icon: 'bar_chart', label: 'Relatórios' },
    { path: '/admin/marketing', icon: 'campaign', label: 'Marketing' },
    { path: '/admin/settings', icon: 'settings', label: 'Configurações' },
];

const AdminLayout = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const location = useLocation();
    const [pendingOrders, setPendingOrders] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        // Contar pedidos pendentes/processando
        const pending = MOCK_ORDERS.filter(o =>
            o.status === 'Pendente' || o.status === 'Aguardando Pagamento' || o.status === 'Preparando'
        ).length;
        setPendingOrders(pending);
    }, []);

    // Redirecionar para login se não autenticado
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-[#0f281e]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f281e] text-white flex flex-col fixed h-full z-20 shadow-2xl transition-all">
                <div className="p-8 border-b border-white/5">
                    <h1 className="text-3xl font-display italic text-[#d4a351] tracking-widest">{SYSTEM_NAME}</h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-1">{SUBTITLE}</p>
                </div>

                <nav className="flex-1 py-8 space-y-2 px-4">
                    {MENU_ITEMS.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all group relative ${isActive
                                    ? 'bg-[#50b83c] text-white shadow-lg shadow-[#50b83c]/20'
                                    : 'hover:bg-white/5 text-white/60 hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined transition-colors ${isActive ? 'text-white' : 'text-[#d4a351]/60 group-hover:text-[#d4a351]'}`}>
                                    {item.icon}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                                {item.badge && pendingOrders > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                                        {pendingOrders}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <button className="flex items-center gap-4 text-white/40 hover:text-white transition-colors w-full">
                        <div className="w-10 h-10 rounded-full bg-[#d4a351] overflow-hidden border-2 border-[#d4a351]/20">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" />
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] font-bold text-white uppercase tracking-widest">Admin</p>
                            <p className="text-[9px] opacity-50">Gerente</p>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-[#0f281e]/5 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-white/90">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0f281e]/30">search</span>
                            <input
                                type="text"
                                placeholder="Buscar pedidos, produtos..."
                                className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] rounded-xl text-xs font-medium text-[#0f281e] placeholder:text-[#0f281e]/30 focus:outline-none focus:ring-1 focus:ring-[#50b83c]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-[#0f281e]/40 hover:text-[#0f281e] transition-colors"
                            >
                                <span className="material-symbols-outlined">notifications</span>
                                {pendingOrders > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                                )}
                            </button>

                            {/* Dropdown de Notificações */}
                            {showNotifications && (
                                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-[#0f281e]/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-4 border-b border-[#0f281e]/5 bg-[#f8f9fa]">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-[#0f281e]">Notificações</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {pendingOrders > 0 ? (
                                            <Link
                                                to="/admin/orders"
                                                onClick={() => setShowNotifications(false)}
                                                className="block p-4 hover:bg-[#f8f9fa] transition-colors border-b border-[#0f281e]/5"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-[#50b83c]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="material-symbols-outlined text-[#50b83c] text-lg">shopping_bag</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-[#0f281e] mb-1">
                                                            {pendingOrders} {pendingOrders === 1 ? 'novo pedido' : 'novos pedidos'}
                                                        </p>
                                                        <p className="text-[10px] text-[#0f281e]/50">
                                                            Aguardando processamento
                                                        </p>
                                                    </div>
                                                    <span className="text-[9px] text-[#0f281e]/30">Agora</span>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="p-8 text-center">
                                                <span className="material-symbols-outlined text-4xl text-[#0f281e]/20 mb-2">notifications_off</span>
                                                <p className="text-xs text-[#0f281e]/40">Nenhuma notificação</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-[1px] bg-[#0f281e]/10"></div>
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-[#0f281e] uppercase tracking-widest">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
