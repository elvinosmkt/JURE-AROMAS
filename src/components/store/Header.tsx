import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types';

const Header = ({ cartCount, user }: { cartCount: number, user: User | null }) => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-olive/5 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex-1 hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-olive/60">
                    <Link to="/" className="hover:text-primary transition-colors">Início</Link>
                    <Link to="/products" className="hover:text-primary transition-colors">Coleções</Link>
                    <Link to="/products" className="hover:text-primary transition-colors">Diário</Link>
                </nav>
            </div>

            <Link to="/" className="flex-none flex flex-col items-center group">
                <h1 className="text-2xl font-bold tracking-[0.4em] text-olive italic uppercase leading-none group-hover:text-primary transition-colors">JURÊ</h1>
            </Link>

            <div className="flex-1 flex justify-end items-center gap-6">
                <Link to="/favorites" className="relative group hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-red-400 transition-colors">favorite</span>
                </Link>
                <Link to="/checkout" className="relative group hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-primary transition-colors">shopping_bag</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-black animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 group hover:scale-105 transition-transform">
                    {user ? (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs overflow-hidden border border-primary/10 hover:border-primary transition-all shadow-md">
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=D4A351&color=fff`} className="w-full h-full object-cover" alt="User" />
                        </div>
                    ) : (
                        <span className="material-symbols-outlined text-olive/40 text-xl group-hover:text-primary transition-colors">person</span>
                    )}
                </Link>
            </div>
        </div>
    </header>
);

export default Header;
