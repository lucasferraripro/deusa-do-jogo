import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CurtainIcon, WandIcon, CrownIcon, ChessQueenIcon } from '../components/Icons';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-6 py-8 space-y-8">
        
        {/* Hero Section - iOS Large Title Style */}
        <div className="text-left pt-4">
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Ative Sua <br />
            <span className="text-blood-600">Deusa Interior.</span>
          </h2>
          <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-[90%]">
            Assuma o controle. Manipule o desejo. Vença o jogo.
          </p>
        </div>

        {/* Action Grid - Compact 2x2 with larger text */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Daily Tip - Minimal but Readable */}
        <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-neutral-800 mt-6">
           <div className="flex items-center gap-2 mb-3">
             <span className="text-blood-500 text-lg">🔥</span>
             <h3 className="font-bold text-sm text-neutral-400 uppercase tracking-widest">Regra do Dia</h3>
           </div>
           <p className="text-white text-lg font-medium leading-relaxed italic border-l-4 border-blood-700 pl-4">
             "O silêncio é a resposta mais barulhenta que você pode dar."
           </p>
        </div>

      </div>
    </Layout>
  );
};

const ActionCard = ({ title, desc, icon, onClick, color }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void, color: string }) => {
  return (
    <button onClick={onClick} className="gem-matte aspect-square rounded-2xl flex flex-col items-center justify-center p-4 transition-transform active:scale-95 group w-full">
      <div className={`w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-black/40 ${color}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7' })}
      </div>
      <h3 className="font-bold text-white text-lg mb-1 tracking-tight">{title}</h3>
      <p className="text-sm text-neutral-400 text-center font-medium">{desc}</p>
    </button>
  );
}