import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getSmartBehaviorAdvice } from '../services/geminiService';
import { BehaviorAdviceResult, BehaviorCategory } from '../types';
import { DiamondIcon, HeartIcon, MessageIcon, BrainIcon } from '../components/Icons';

export const SmartBehaviors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BehaviorCategory>('conquest');
  const [customTopic, setCustomTopic] = useState('');
  const [result, setResult] = useState<BehaviorAdviceResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Predefined topics for quick access
  const TOPICS = {
    conquest: [
      "Como demonstrar interesse sem parecer fácil",
      "Limites saudáveis no início",
      "Como manter minha identidade",
      "Ele sumiu: Correr atrás ou afastar?",
      "Como criar conexão emocional verdadeira",
      "Como reagir a homens que testam limites ou fazem 'jogos'"
    ],
    conversation: [
      "Timing de resposta ideal",
      "Ele responde seco: o que fazer?",
      "Como evitar textão e ansiedade",
      "Encerrar conversa no auge",
      "Como pedir atenção sem implorar"
    ],
    relationship: [
      "Esfriou: Como reacender sem cobrar",
      "Comunicação não violenta para brigas",
      "Manter individualidade no namoro",
      "Ciúmes: Como lidar com elegância",
      "Ele pede espaço: Como reagir?"
    ]
  };

  const handleAdvice = async (topic: string) => {
    setLoading(true);
    setResult(null);
    try {
      const context = activeTab === 'interpreter' ? customTopic : '';
      const queryTopic = activeTab === 'interpreter' ? "Interpretar este comportamento" : topic;
      
      const data = await getSmartBehaviorAdvice(activeTab, queryTopic, context);
      setResult(data);
    } catch (error) {
      alert("Erro ao buscar sabedoria.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sabedoria da Deusa">
      <div className="flex flex-col h-full bg-black">
        
        {/* TABS HEADER - Larger Text */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-neutral-900/50">
          <TabButton 
            active={activeTab === 'conquest'} 
            onClick={() => { setActiveTab('conquest'); setResult(null); }}
            icon={<DiamondIcon />}
            label="Conquista"
          />
          <TabButton 
            active={activeTab === 'conversation'} 
            onClick={() => { setActiveTab('conversation'); setResult(null); }}
            icon={<MessageIcon />}
            label="Conversa"
          />
          <TabButton 
            active={activeTab === 'relationship'} 
            onClick={() => { setActiveTab('relationship'); setResult(null); }}
            icon={<HeartIcon />}
            label="Relação"
          />
          <TabButton 
            active={activeTab === 'interpreter'} 
            onClick={() => { setActiveTab('interpreter'); setResult(null); }}
            icon={<BrainIcon />}
            label="Decoder"
          />
        </div>

        <div className="p-5 pb-24 space-y-6">
          
          {/* Header text based on tab */}
          <div className="text-left mb-2">
             <h2 className="font-bold text-2xl text-white mb-2 tracking-tight">
               {activeTab === 'conquest' && "A Arte da Conquista"}
               {activeTab === 'conversation' && "Domínio Digital"}
               {activeTab === 'relationship' && "Amor & Poder"}
               {activeTab === 'interpreter' && "Leitura de Mentes"}
             </h2>
             <p className="text-base text-neutral-400 font-normal leading-relaxed">
               {activeTab === 'conquest' && "Comportamentos de alto valor para atrair quem realmente merece você."}
               {activeTab === 'conversation' && "Comunique-se com leveza, reduza a ansiedade e aumente a conexão."}
               {activeTab === 'relationship' && "Mantenha a chama, o respeito e, principalmente, sua identidade."}
               {activeTab === 'interpreter' && "Entenda o que o comportamento dele (ou dela) realmente significa."}
             </p>
          </div>

          {/* CONTENT AREA */}
          
          {/* Predefined Topics List (For A, B, C) */}
          {activeTab !== 'interpreter' && !result && (
            <div className="space-y-3">
              {TOPICS[activeTab as keyof typeof TOPICS].map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAdvice(topic)}
                  disabled={loading}
                  className="w-full text-left p-5 rounded-2xl bg-neutral-900 border border-white/5 active:scale-[0.98] active:bg-neutral-800 hover:bg-neutral-800 transition-all transform duration-200"
                >
                  <span className="font-semibold text-neutral-200 text-lg">{topic}</span>
                </button>
              ))}
              
              {/* Custom Question */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <label className="block text-sm font-semibold text-neutral-500 uppercase mb-3">Ou pergunte algo específico:</label>
                <div className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Ex: Como lidar com..."
                    className="w-full input-dark rounded-xl px-4 py-3 text-base"
                  />
                  <Button 
                    onClick={() => handleAdvice(customTopic)}
                    isLoading={loading}
                    disabled={!customTopic.trim()}
                  >
                    Consultar Deusa
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Interpreter Input (For D) */}
          {activeTab === 'interpreter' && !result && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-neutral-900 p-5 rounded-2xl border border-white/10">
                <label className="block text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3">O que aconteceu?</label>
                <textarea 
                  className="w-full input-dark rounded-xl p-4 text-lg min-h-[140px] leading-relaxed"
                  placeholder="Ex: Ele disse que ia ligar e não ligou, mas continua vendo meus stories..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => handleAdvice("interpretar")} 
                isLoading={loading}
                disabled={!customTopic.trim()}
                className="py-4 text-lg"
              >
                Analisar Comportamento
              </Button>
            </div>
          )}

          {/* RESULT CARD */}
          {result && (
            <div className="space-y-8 animate-fade-in pb-10">
              
              {/* Core Principle */}
              <div className="bg-neutral-900 p-6 rounded-2xl border-l-4 border-blood-600 shadow-xl">
                <h3 className="text-blood-500 font-bold text-xl mb-3 flex items-center gap-2">
                  <DiamondIcon className="w-6 h-6"/> Princípio de Ouro
                </h3>
                <p className="text-white text-lg leading-relaxed font-medium">"{result.corePrinciple}"</p>
              </div>

              {/* Posture */}
              <div className="space-y-3">
                 <h4 className="font-bold text-neutral-400 text-sm uppercase tracking-wider pl-1">Sua Postura Ideal</h4>
                 <div className="bg-neutral-900/50 p-5 rounded-xl border border-white/10">
                    <p className="text-neutral-200 text-lg leading-relaxed">{result.posture}</p>
                 </div>
              </div>

              {/* Dos and Don'ts */}
              <div className="space-y-6">
                <div className="bg-green-950/20 border border-green-500/20 rounded-2xl p-6">
                  <h4 className="font-bold text-green-500 text-base uppercase tracking-wider mb-4">Faça Isso</h4>
                  <ul className="space-y-4">
                    {result.dos.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-white font-medium">
                        <span className="text-green-500 mt-1 text-lg">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
                  <h4 className="font-bold text-red-500 text-base uppercase tracking-wider mb-4">Evite Isso</h4>
                  <ul className="space-y-4">
                    {result.donts.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-white font-medium">
                        <span className="text-red-500 mt-1 text-lg">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Script Example */}
              {result.examplePhrase && (
                <div className="mt-4">
                   <h4 className="font-bold text-neutral-500 text-sm uppercase tracking-wider mb-3 text-center">Script Sugerido</h4>
                   <div className="bg-neutral-800 p-6 rounded-2xl text-center border border-neutral-700 shadow-lg">
                     <p className="text-white text-xl font-medium italic">"{result.examplePhrase}"</p>
                   </div>
                </div>
              )}

              <Button variant="outline" onClick={() => setResult(null)} className="py-4 mt-4">
                Nova Consulta
              </Button>

            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-4 px-1 transition-all relative active:scale-95 ${active ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 mb-1.5 ${active ? 'text-blood-500' : ''}` })}
    <span className={`text-[11px] font-bold uppercase tracking-wide ${active ? 'text-white' : ''}`}>{label}</span>
    {active && <div className="absolute bottom-0 w-full h-0.5 bg-blood-600" />}
  </button>
);