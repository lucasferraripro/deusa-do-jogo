import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CurtainIcon, WandIcon, CrownIcon, ChessQueenIcon } from '../components/Icons';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-5 py-6 space-y-8">
        
        {/* Hero Section */}
        <div className="space-y-3 text-center pt-2">
          <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
            Ative Sua <br />
            <span className="text-blood-600">Deusa Interior.</span>
          </h2>
          <p className="text-neutral-400 text-base max-w-[300px] mx-auto leading-relaxed font-normal">
            Assuma o controle. Manipule o desejo. Vença o jogo.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          <ActionCard 
            title="Desvendar" 
            desc="Descubra a verdade."
            icon={<CurtainIcon />}
            onClick={() => navigate('/decoder')}
            color="text-blood-500"
          />
          <ActionCard 
            title="Enfeitiçar" 
            desc="Crie mensagens."
            icon={<WandIcon />}
            onClick={() => navigate('/generator')}
            color="text-purple-500"
          />
          <ActionCard 
            title="Modo Deusa" 
            desc="Sabedoria e Postura."
            icon={<CrownIcon />}
            onClick={() => navigate('/behaviors')} // Assuming behaviors route for Sabedoria based on context, or /smart-behaviors if renamed
            color="text-blue-500"
          />
           <ActionCard 
            title="Checkmate" 
            desc="Vire o jogo agora."
            icon={<ChessQueenIcon />}
            onClick={() => navigate('/turntables')}
            color="text-emerald-500"
          />
        </div>

        {/* Daily Tip - Compact */}
        <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 mt-2">
           <div className="flex items-center gap-2 mb-2">
             <span className="text-blood-500 text-lg">🔥</span>
             <h3 className="font-bold text-sm text-neutral-200 uppercase tracking-wide">Regra do Dia</h3>
           </div>
           <p className="text-neutral-300 text-base leading-relaxed italic border-l-2 border-blood-700 pl-3">
             "A ausência é uma ferramenta de poder. Use-a quando ele achar que já te conquistou."
           </p>
        </div>

      </div>
    </Layout>
  );
};

const ActionCard = ({ title, desc, icon, onClick, color }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void, color: string }) => {
  return (
    <button onClick={onClick} className="gem-matte aspect-square rounded-2xl flex flex-col items-center justify-center p-4 transition-transform active:scale-95 group">
      <div className={`w-12 h-12 flex items-center justify-center mb-3 rounded-full bg-black/40 ${color} shadow-sm`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7' })}
      </div>
      <h3 className="font-bold text-neutral-100 text-base mb-1 tracking-tight">{title}</h3>
      <p className="text-[13px] text-neutral-500 text-center leading-tight">{desc}</p>
    </button>
  );
}