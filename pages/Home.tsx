import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MessageIcon, SearchIcon, ZapIcon, RefreshIcon, DiamondIcon } from '../components/Icons';

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

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 gap-5">
          <ActionCard 
            title="Oráculo (Decodificar)" 
            desc="Descubra o que ele realmente quis dizer."
            icon={<SearchIcon />}
            onClick={() => navigate('/decoder')}
            gradient="from-purple-600 to-indigo-700"
            glow="shadow-purple-500/20"
            iconColor="text-purple-50"
          />
          <ActionCard 
            title="Invocar Feitiço" 
            desc="Gere mensagens que causam obsessão."
            icon={<MessageIcon />}
            onClick={() => navigate('/generator')}
            gradient="from-blood-600 to-red-800"
            glow="shadow-blood-500/20"
            iconColor="text-red-50"
          />
          <div className="grid grid-cols-2 gap-4">
            <SmallActionCard 
              title="Sabedoria" 
              icon={<DiamondIcon />}
              onClick={() => navigate('/behaviors')}
              gradient="from-cyan-600 to-blue-700"
              glow="shadow-cyan-500/20"
              iconColor="text-cyan-50"
            />
            <SmallActionCard 
              title="Virar o Jogo" 
              icon={<RefreshIcon />}
              onClick={() => navigate('/turntables')}
              gradient="from-emerald-600 to-teal-700"
              glow="shadow-emerald-500/20"
              iconColor="text-emerald-50"
            />
          </div>
        </div>

        {/* Daily Tip */}
        <div className="bg-neutral-900/50 backdrop-blur-sm p-5 rounded-2xl border border-neutral-800/50 relative overflow-hidden">
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
    <button onClick={onClick} className="group relative flex items-center gap-5 p-5 rounded-3xl bg-[#121212] border border-neutral-800 active:scale-[0.98] transition-all duration-300 w-full hover:border-neutral-700 hover:bg-[#181818] overflow-hidden">
      
      {/* 3D Gem Icon Container */}
      <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} gem-3d flex items-center justify-center ${glow} shadow-xl group-hover:scale-105 transition-transform duration-500 animate-float`}>
        <div className={`${iconColor} drop-shadow-md`}>
          {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
        </div>
        {/* Shine effect */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
      </div>

      <div className="text-left z-10">
        <h3 className="font-bold text-white text-xl mb-1 group-hover:text-blood-100 transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm leading-snug group-hover:text-neutral-300">{desc}</p>
      </div>
      
      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
    </button>
  );
}

const SmallActionCard = ({ title, icon, onClick, gradient, glow, iconColor }: { title: string, icon: React.ReactNode, onClick: () => void, gradient: string, glow: string, iconColor: string }) => {
  return (
    <button onClick={onClick} className="group relative flex flex-col justify-center items-center gap-3 p-5 rounded-3xl bg-[#121212] border border-neutral-800 active:scale-[0.96] transition-all duration-300 w-full hover:border-neutral-700 hover:bg-[#181818] aspect-square overflow-hidden">
      
      {/* 3D Gem Icon Container */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} gem-3d flex items-center justify-center ${glow} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
         <div className={`${iconColor} drop-shadow-md`}>
           {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7' })}
         </div>
      </div>

      <h3 className="font-semibold text-white text-base z-10">{title}</h3>

      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
    </button>
  );
}