import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, CurtainIcon, WandIcon, CrownIcon, ChessQueenIcon, ChevronLeftIcon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black flex flex-col max-w-md mx-auto shadow-2xl shadow-black overflow-hidden relative border-x border-neutral-900 font-sans">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-xl sticky top-0 z-50 border-b border-neutral-900 px-5 py-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-neutral-400 hover:text-white transition-colors">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}
          {title ? (
            <h1 className="font-bold text-xl text-white tracking-tight">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
               <span className="text-xl">🔥</span>
               <span className="font-bold text-lg text-white tracking-tight">Deusa do Jogo</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth bg-black text-neutral-100">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-900 fixed bottom-0 max-w-md w-full z-40 pb-safe">
        <div className="flex justify-around items-center h-[88px] pb-4 px-2">
          <NavItem to="/" icon={<HomeIcon />} label="Início" active={location.pathname === '/'} />
          <NavItem to="/decoder" icon={<CurtainIcon />} label="Desvendar" active={location.pathname === '/decoder'} />
          <NavItem to="/generator" icon={<WandIcon />} label="Enfeitiçar" active={location.pathname === '/generator'} />
          <NavItem to="/behaviors" icon={<CrownIcon />} label="Modo Deusa" active={location.pathname === '/behaviors'} />
          <NavItem to="/turntables" icon={<ChessQueenIcon />} label="Checkmate" active={location.pathname === '/turntables'} />
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
      className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all active:scale-90 ${active ? 'text-blood-500' : 'text-neutral-500'}`}
    >
      <div className={`p-1 rounded-full`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
      </div>
      <span className={`text-[10px] font-medium tracking-wide ${active ? 'text-white' : 'text-neutral-600'}`}>{label}</span>
    </button>
  );
};