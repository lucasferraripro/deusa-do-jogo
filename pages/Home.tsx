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
        <div className="space-y-2 text-left pt-4">
          <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Ative Sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blood-500 to-red-600 drop-shadow-lg">Deusa Interior.</span>
          </h2>
          <p className="text-neutral-400 text-base font-normal leading-relaxed max-w-[300px]">
            Assuma o controle. Manipule o desejo. Vença o jogo.
          </p>
        </div>

        {/* Main Actions Grid - 2 per column */}
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            title="Desvendar" 
            desc="Descubra a verdade oculta."
            icon={<CurtainIcon />}
            onClick={() => navigate('/decoder')}
            gradient="from-blood-900 to-red-900"
            glow="shadow-red-900/40"
            iconColor="text-red-200"
          />
          
          <ActionCard 
            title="Enfeitiçar" 
            desc="Crie mensagens magnéticas."
            icon={<WandIcon />}
            onClick={() => navigate('/generator')}
            gradient="from-purple-900 to-indigo-900"
            glow="shadow-purple-900/40"
            iconColor="text-purple-200"
          />

          <ActionCard 
            title="Modo Deusa" 
            desc="Sabedoria e Postura."
            icon={<CrownIcon />}
            onClick={() => navigate('/behaviors')}
            gradient="from-blue-900 to-cyan-900"
            glow="shadow-blue-900/40"
            iconColor="text-blue-200"
          />

          <ActionCard 
            title="Checkmate" 
            desc="Vire o jogo agora."
            icon={<ChessQueenIcon />}
            onClick={() => navigate('/turntables')}
            gradient="from-slate-800 to-gray-900"
            glow="shadow-slate-700/40"
            iconColor="text-teal-200"
          />
        </div>

        {/* Daily Tip */}
        <div className="bg-neutral-900/50 backdrop-blur-sm p-5 rounded-2xl border border-neutral-800/50 relative overflow-hidden mt-6">
             <div className="absolute top-0 right-0 w-20 h-20 bg-blood-600/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div className="flex items-center gap-2 mb-2 relative z-10">
               <span className="text-blood-500 text-lg animate-pulse-slow">🔥</span>
               <h3 className="font-bold text-base text-white uppercase tracking-wide">Regra do Dia</h3>
             </div>
             <p className="text-neutral-300 text-lg leading-relaxed font-normal relative z-10 italic">
               "A ausência é uma ferramenta de poder. Use-a quando ele achar que já te conquistou."
             </p>
        </div>

        {/* Extra Link */}
        <button 
          onClick={() => navigate('/thermometer')}
          className="w-full py-4 text-center text-neutral-500 text-sm font-medium hover:text-white transition-colors active:scale-95 transform"
        >
          Acessar Termômetro do Desejo →
        </button>

      </div>
    </Layout>
  );
};

const ActionCard = ({ title, desc, icon, onClick, gradient, glow, iconColor }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void, gradient: string, glow: string, iconColor: string }) => {
  return (
    <button onClick={onClick} className="group relative flex flex-col justify-between items-center text-center gap-3 p-5 rounded-3xl bg-[#121212] border border-neutral-800 active:scale-[0.96] transition-all duration-300 w-full hover:border-neutral-700 hover:bg-[#181818] aspect-[4/5] overflow-hidden">
      
      {/* 3D Gem Icon Container */}
      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} gem-3d flex items-center justify-center ${glow} shadow-lg group-hover:scale-110 transition-transform duration-500 mt-2`}>
         <div className={`${iconColor} drop-shadow-md`}>
           {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
         </div>
         {/* Shine effect */}
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
      </div>

      <div className="z-10 flex flex-col items-center justify-end h-full w-full">
        <h3 className="font-bold text-white text-base leading-tight mb-1 group-hover:text-blood-100 transition-colors">{title}</h3>
        <p className="text-neutral-500 text-[11px] leading-tight opacity-80 line-clamp-2">{desc}</p>
      </div>

      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
    </button>
  );
}
