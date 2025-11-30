import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getSmartBehaviorAdvice } from '../services/geminiService';
import { BehaviorAdviceResult, BehaviorCategory } from '../types';
import { DiamondIcon, HeartIcon, MessageIcon, UsersIcon, BrainIcon } from '../components/Icons';

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
      "Como manter minha identidade e não sumir",
      "Ele sumiu: Correr atrás ou afastar?",
      "Como criar conexão emocional verdadeira"
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
      // For interpreter, we use the custom topic as context
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
      <div className="flex flex-col h-full">
        
        {/* TABS HEADER */}
        <div className="grid grid-cols-4 border-b border-neutral-800 bg-neutral-950">
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
          <div className="text-center mb-4">
             <h2 className="font-serif font-bold text-xl text-white mb-2">
               {activeTab === 'conquest' && "A Arte da Conquista"}
               {activeTab === 'conversation' && "Domínio Digital"}
               {activeTab === 'relationship' && "Amor & Poder"}
               {activeTab === 'interpreter' && "Leitura de Mentes"}
             </h2>
             <p className="text-xs text-neutral-500 max-w-xs mx-auto">
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
                  className="w-full text-left p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blood-700 hover:bg-neutral-800 transition-all group"
                >
                  <span className="font-medium text-neutral-300 text-sm group-hover:text-white transition-colors">{topic}</span>
                </button>
              ))}
              
              {/* Custom Question */}
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Ou pergunte algo específico:</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Ex: Como lidar com..."
                    className="flex-1 input-dark rounded-lg px-3 py-2 text-sm"
                  />
                  <button 
                    onClick={() => handleAdvice(customTopic)}
                    disabled={!customTopic.trim() || loading}
                    className="bg-blood-700 text-white rounded-lg px-4 py-2 text-sm font-bold disabled:opacity-50"
                  >
                    {loading ? '...' : 'Ir'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interpreter Input (For D) */}
          {activeTab === 'interpreter' && !result && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">O que aconteceu?</label>
                <textarea 
                  className="w-full input-dark rounded-xl p-3 text-sm min-h-[120px]"
                  placeholder="Ex: Ele disse que ia ligar e não ligou, mas continua vendo meus stories..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => handleAdvice("interpretar")} 
                isLoading={loading}
                disabled={!customTopic.trim()}
              >
                Analisar Comportamento
              </Button>
            </div>
          )}

          {/* RESULT CARD */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Core Principle */}
              <div className="bg-gradient-to-r from-neutral-900 to-black p-5 rounded-2xl border border-blood-900/30 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                <h3 className="text-blood-500 font-serif font-bold text-lg mb-2 flex items-center gap-2">
                  <DiamondIcon className="w-5 h-5"/> Princípio de Ouro
                </h3>
                <p className="text-neutral-200 text-sm leading-relaxed italic">"{result.corePrinciple}"</p>
              </div>

              {/* Posture */}
              <div className="bg-neutral-900 p-5 rounded-xl border-l-4 border-white">
                 <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-2">Sua Postura Ideal</h4>
                 <p className="text-neutral-300 text-sm">{result.posture}</p>
              </div>

              {/* Dos and Don'ts */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-950/10 border border-green-900/30 rounded-xl p-4">
                  <h4 className="font-bold text-green-500 text-xs uppercase tracking-widest mb-3">Faça (Inteligente)</h4>
                  <ul className="space-y-2">
                    {result.dos.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="text-green-500 mt-0.5">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-4">
                  <h4 className="font-bold text-red-500 text-xs uppercase tracking-widest mb-3">Evite (Auto-sabotagem)</h4>
                  <ul className="space-y-2">
                    {result.donts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="text-red-500 mt-0.5">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Script Example */}
              {result.examplePhrase && (
                <div className="mt-4">
                   <h4 className="font-bold text-neutral-500 text-xs uppercase tracking-widest mb-2 text-center">Exemplo Prático</h4>
                   <div className="bg-neutral-800 p-4 rounded-xl text-center border border-neutral-700">
                     <p className="text-white italic font-medium">"{result.examplePhrase}"</p>
                   </div>
                </div>
              )}

              <Button variant="ghost" onClick={() => setResult(null)}>
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
    className={`flex flex-col items-center justify-center py-3 px-1 transition-all relative ${active ? 'text-blood-500' : 'text-neutral-500 hover:text-neutral-300'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 mb-1 ${active ? 'drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]' : ''}` })}
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    {active && <div className="absolute bottom-0 w-full h-0.5 bg-blood-600 shadow-[0_0_10px_rgba(220,38,38,1)]" />}
  </button>
);
