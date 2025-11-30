import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MessageIcon, SearchIcon, ZapIcon, RefreshIcon, DiamondIcon } from '../components/Icons';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-6 py-8 space-y-10">
        
        {/* Hero Section */}
        <div className="space-y-3 text-center pt-4">
          <h2 className="text-3xl font-serif font-bold text-neutral-100 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Bem-vinda ao <br />
            <span className="text-blood-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.4)]">Jogo da Sedução.</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-[280px] mx-auto leading-relaxed font-medium">
            Eu sou a Deusa do Jogo. Assuma o controle, manipule o desejo e vença.
          </p>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            title="Oráculo" 
            desc="A verdade oculta na mensagem dele"
            icon={<SearchIcon className="text-purple-500" />}
            onClick={() => navigate('/decoder')}
            glow="purple"
          />
          <ActionCard 
            title="Invocar Feitiço" 
            desc="Mensagens para atrair e manipular"
            icon={<MessageIcon className="text-blood-500" />}
            onClick={() => navigate('/generator')}
            glow="blood"
          />
          <ActionCard 
            title="Virar o Jogo" 
            desc="Estratégia de dominação total"
            icon={<RefreshIcon className="text-blue-500" />}
            onClick={() => navigate('/turntables')}
            glow="blue"
          />
          <ActionCard 
            title="Sabedoria" 
            desc="Comportamento de Alto Valor"
            icon={<DiamondIcon className="text-white" />}
            onClick={() => navigate('/behaviors')}
            glow="white"
          />
        </div>

        {/* Termometro Link (Secondary) */}
        <button 
          onClick={() => navigate('/thermometer')}
          className="w-full flex items-center justify-between p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-yellow-900/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg text-yellow-500 group-hover:text-yellow-400">
              <ZapIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-neutral-200 text-sm">Termômetro do Desejo</span>
              <span className="text-[10px] text-neutral-500">Meça a intensidade dele</span>
            </div>
          </div>
          <span className="text-neutral-600">→</span>
        </button>

        {/* Daily Tip */}
        <div className="glass-card p-6 rounded-2xl shadow-lg relative overflow-hidden group border border-blood-900/30">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blood-900 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3">
               <span className="text-blood-500 text-xl">🔥</span>
               <h3 className="font-serif font-bold text-base text-neutral-200 uppercase tracking-widest">Regra do Jogo</h3>
             </div>
             <p className="text-neutral-400 text-sm leading-relaxed italic border-l-2 border-blood-800 pl-4">
               "Nunca dê a ele a certeza da sua presença. A dúvida é o combustível da obsessão. Seja um mistério a ser desvendado, não um livro aberto."
             </p>
          </div>
        </div>

      </div>
    </Layout>
  );
};

const ActionCard = ({ title, desc, icon, onClick, glow }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void, glow: string }) => {
  const glowColors: {[key: string]: string} = {
    blood: 'group-hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] border-blood-900/40 hover:bg-neutral-900',
    purple: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] border-purple-900/40 hover:bg-neutral-900',
    yellow: 'group-hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] border-yellow-900/40 hover:bg-neutral-900',
    blue: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] border-blue-900/40 hover:bg-neutral-900',
    white: 'group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] border-neutral-700/40 hover:bg-neutral-900',
  };
  
  return (
    <button onClick={onClick} className={`flex flex-col items-start text-left p-5 rounded-2xl bg-neutral-950 border border-neutral-800 transition-all duration-300 group active:scale-95 ${glowColors[glow]}`}>
      <div className={`p-3 rounded-xl bg-black mb-3 group-hover:scale-110 transition-transform shadow-inner border border-neutral-900`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <h3 className="font-serif font-bold text-neutral-200 text-sm mb-1">{title}</h3>
      <p className="text-[11px] text-neutral-500 leading-snug font-medium">{desc}</p>
    </button>
  );
}