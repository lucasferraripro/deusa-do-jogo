import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CurtainIcon, WandIcon, CrownIcon, ChessQueenIcon } from '../components/Icons';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        
        {/* Hero Section */}
        <div className="text-center pt-2 pb-2">
          <h2 className="text-2xl font-bold text-white leading-tight tracking-tight mb-1">
            Ative Sua <span className="text-blood-600">Deusa Interior.</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-[260px] mx-auto leading-tight">
            Assuma o controle. Manipule o desejo.
          </p>
        </div>

        {/* Action Grid - Compact 2x2 */}
        <div className="grid grid-cols-2 gap-3 max-w-[360px] mx-auto">
          <ActionCard 
            title="Desvendar" 
            desc="A verdade oculta."
            icon={<CurtainIcon />}
            onClick={() => navigate('/decoder')}
            color="text-blood-500"
          />
          <ActionCard 
            title="Enfeitiçar" 
            desc="Gere obsessão."
            icon={<WandIcon />}
            onClick={() => navigate('/generator')}
            color="text-purple-500"
          />
          <ActionCard 
            title="Modo Deusa" 
            desc="Sabedoria pura."
            icon={<CrownIcon />}
            onClick={() => navigate('/behaviors')}
            color="text-blue-500"
          />
           <ActionCard 
            title="Checkmate" 
            desc="Vire o jogo."
            icon={<ChessQueenIcon />}
            onClick={() => navigate('/turntables')}
            color="text-emerald-500"
          />
        </div>

        {/* Daily Tip - Minimal */}
        <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/50 mt-2 max-w-[360px] mx-auto">
           <div className="flex items-center gap-2 mb-1">
             <span className="text-blood-500 text-sm">🔥</span>
             <h3 className="font-bold text-xs text-neutral-400 uppercase tracking-wide">Regra do Dia</h3>
           </div>
           <p className="text-neutral-300 text-sm leading-snug italic border-l-2 border-blood-800 pl-3">
             "O silêncio é a resposta mais barulhenta que você pode dar."
           </p>
        </div>

      </div>
    </Layout>
  );
};

const ActionCard = ({ title, desc, icon, onClick, color }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void, color: string }) => {
  return (
    <button onClick={onClick} className="gem-matte aspect-[1/0.85] rounded-xl flex flex-col items-center justify-center p-3 transition-transform active:scale-95 group w-full">
      <div className={`w-10 h-10 flex items-center justify-center mb-2 rounded-full bg-black/40 ${color}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
      </div>
      <h3 className="font-bold text-neutral-200 text-sm mb-0.5 tracking-tight">{title}</h3>
      <p className="text-[11px] text-neutral-500 text-center leading-none">{desc}</p>
    </button>
  );
}