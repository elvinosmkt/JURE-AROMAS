import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../../types';

const Login = ({ onLogin }: { onLogin?: (user: User) => void }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login / check existing user
        setTimeout(() => {
            // Mock user retrieval
            const mockUser: User = {
                id: 'user-mock',
                name: 'Sofia Albuquerque',
                email: email,
                phone: '(11) 99999-9999',
                address: {
                    street: 'Av. Paulista, 1000',
                    city: 'São Paulo',
                    state: 'SP',
                    zip: '01310-100'
                },
                preferences: ['Floral', 'Amadeirado'],
                orders: []
            };

            // Check if onLogin exists before calling it
            if (onLogin) {
                onLogin(mockUser);
            } else {
                localStorage.setItem('jure_user', JSON.stringify(mockUser));
            }

            setLoading(false);
            navigate('/account'); // Redirect to account dashboard
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background-light flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <img src="/img/hero_banner.png" className="w-full h-full object-cover opacity-20 blur-sm" alt="Background" />
                <div className="absolute inset-0 bg-background-light/80"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-10">
                <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/40">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-display italic text-olive mb-2">Bem-vindo</h1>
                        <p className="text-[10px] uppercase tracking-widest text-olive/40">Acesse sua conta Jurê</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-4 mb-2 block">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-white/50 border border-olive/5 rounded-2xl px-6 py-4 text-olive text-sm outline-none focus:border-primary transition-colors"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-olive/40 ml-4 mb-2 block">Senha</label>
                            <input
                                type="password"
                                className="w-full bg-white/50 border border-olive/5 rounded-2xl px-6 py-4 text-olive text-sm outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-olive text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-lg mt-8 disabled:opacity-70"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-12 text-center space-y-4">
                        <a href="#" className="block text-[10px] uppercase tracking-widest text-olive/40 hover:text-primary transition-colors">Esqueci minha senha</a>
                        <div className="w-full h-[1px] bg-olive/5"></div>
                        <p className="text-[10px] text-olive/60">Ainda não tem conta? <Link to="/checkout" className="font-bold text-primary underline">Faça seu primeiro pedido</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
