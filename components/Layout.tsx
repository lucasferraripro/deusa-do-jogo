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
    <div className="min-h-screen bg-black flex flex-col max-w-md mx-auto shadow-2xl shadow-neutral-900 overflow-hidden relative border-x border-neutral-900">
      {/* Header - iOS Style */}
      <header className="bg-black/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 px-4 py-2 flex items-center justify-between h-14">
        <div className="flex items-center gap-3 w-full">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-2 -ml-3 text-blue-500 hover:text-blue-400 transition-colors flex items-center">
              <ChevronLeftIcon className="w-7 h-7" />
              <span className="text-base font-normal">Voltar</span>
            </button>
          )}
          
          <div className={`flex-1 flex items-center ${showBack ? 'justify-center pr-10' : 'justify-between'}`}>
            {title ? (
              <h1 className="font-semibold text-[17px] text-white tracking-tight">{title}</h1>
            ) : (
              <div className="flex items-center gap-2">
                 <span className="text-2xl">🔥</span>
                 <span className="font-bold text-lg text-white tracking-tight">Deusa do Jogo</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28 scroll-smooth bg-black text-white">
        {children}
      </main>

      {/* Bottom Navigation - iOS Tab Bar Style */}
      <nav className="bg-neutral-900/90 backdrop-blur-xl border-t border-white/10 fixed bottom-0 max-w-md w-full z-40 pb-safe">
        <div className="flex justify-between items-end h-[84px] pb-6 px-4">
          <NavItem to="/" icon={<HomeIcon />} label="Início" active={location.pathname === '/'} />
          <NavItem to="/generator" icon={<MessageIcon />} label="Rituais" active={location.pathname === '/generator'} />
          <NavItem to="/decoder" icon={<SearchIcon />} label="Oráculo" active={location.pathname === '/decoder'} />
          <NavItem to="/behaviors" icon={<DiamondIcon />} label="Sabedoria" active={location.pathname === '/behaviors'} />
          <NavItem to="/turntables" icon={<ZapIcon />} label="Estratégia" active={location.pathname === '/turntables'} />
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
      className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors ${active ? 'text-blood-500' : 'text-neutral-500'}`}
    >
      <div className="transition-transform duration-200">
        {React.cloneElement(icon as React.ReactElement, { 
          className: 'w-7 h-7', 
          strokeWidth: active ? 2.5 : 1.5 
        })}
      </div>
      <span className="text-[10px] font-medium tracking-tight">{label}</span>
    </button>
  );
};