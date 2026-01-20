import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock login delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === 'admin@jure.com' && password === 'admin') {
            localStorage.setItem('jure_admin_auth', 'true');
            onLogin();
            navigate('/admin/dashboard');
        } else {
            setError('Credenciais inválidas. Tente admin@jure.com / admin');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F1115] relative overflow-hidden font-sans">
            {/* Background Details */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#50B83C]/20 rounded-full blur-[120px] pointer-events-none opacity-20" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D4A351]/10 rounded-full blur-[100px] pointer-events-none opacity-20" />

            <div className="w-full max-w-md p-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-display italic text-[#D4A351] tracking-widest mb-2">JURÊ</h1>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Painel Administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#D4A351]/80 font-bold ml-1">Email Corporativo</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-lg">mail</span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#50B83C] focus:ring-1 focus:ring-[#50B83C] transition-all"
                                    placeholder="admin@jure.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#D4A351]/80 font-bold ml-1">Senha de Acesso</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-lg">lock</span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#50B83C] focus:ring-1 focus:ring-[#50B83C] transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in fade-in">
                                <span className="material-symbols-outlined text-red-400 text-lg">error</span>
                                <p className="text-xs text-red-300 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#50B83C] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-[#50B83C]/20 hover:bg-[#45a034] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Autenticando...
                                </>
                            ) : (
                                <>
                                    Acessar Painel
                                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/" className="text-[10px] text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest border-b border-transparent hover:border-white/20 pb-0.5">
                            Voltar para a Loja
                        </a>
                    </div>
                </div>

                <p className="text-center text-[9px] text-white/10 uppercase tracking-widest mt-8">
                    &copy; 2024 Jurê Aromas &bull; Acesso Restrito
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
