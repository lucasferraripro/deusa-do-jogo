import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MessageIcon, SearchIcon, ZapIcon, ChevronLeftIcon, DiamondIcon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col max-w-md mx-auto shadow-2xl shadow-black overflow-hidden relative border-x border-neutral-900">
      {/* Header */}
      <header className="bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-blood-900/30 px-4 py-4 flex items-center justify-between h-16 shadow-lg shadow-black/50">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-neutral-400 hover:text-blood-500 transition-colors">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}
          {title ? (
            <h1 className="font-serif font-bold text-lg text-neutral-200 tracking-wide">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
               <span className="text-2xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">🔥</span>
               <div className="flex flex-col">
                  <span className="font-serif font-medium text-xs text-neutral-400 leading-none tracking-widest uppercase mb-0.5">Deusa do</span>
                  <span className="font-serif font-black text-xl text-blood-600 leading-none tracking-[0.1em] drop-shadow-sm">JOGO</span>
               </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth bg-neutral-950 text-neutral-200">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-neutral-900 border-t border-neutral-800 fixed bottom-0 max-w-md w-full z-40 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center h-20 pb-2 px-2">
          <NavItem to="/" icon={<HomeIcon />} label="Altar" active={location.pathname === '/'} />
          <NavItem to="/generator" icon={<MessageIcon />} label="Rituais" active={location.pathname === '/generator'} />
          <NavItem to="/decoder" icon={<SearchIcon />} label="Oráculo" active={location.pathname === '/decoder'} />
          <NavItem to="/thermometer" icon={<ZapIcon />} label="Energia" active={location.pathname === '/thermometer'} />
          <NavItem to="/behaviors" icon={<DiamondIcon />} label="Sabedoria" active={location.pathname === '/behaviors'} />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 ${active ? 'text-blood-500' : 'text-neutral-600 hover:text-neutral-400'}`}
    >
      <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-blood-900/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : ''}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      </div>
      <span className="text-[8px] font-bold tracking-widest uppercase">{label}</span>
    </button>
  );
};