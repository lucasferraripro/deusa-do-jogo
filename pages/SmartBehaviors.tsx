import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { DiamondIcon, MessageIcon, UsersIcon, SearchIcon, ChevronLeftIcon } from '../components/Icons';
import { getSmartBehaviorAdvice } from '../services/geminiService';
import { BehaviorAdviceResult } from '../types';

type Category = 'conquista' | 'conversa' | 'relacionamento' | 'interpretar';

export const SmartBehaviors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('conquista');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [result, setResult] = useState<BehaviorAdviceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const TOPICS = {
    conquista: [
      'Postura de Alto Valor',
      'Demonstrar interesse sem parecer fácil',
      'Criar atração emocional',
      'Como reagir a homens que testam limites ou fazem "jogos"',
      'Frequência de mensagens ideal',
      'Comportamentos que afastam homens'
    ],
    conversa: [
      'Timing ideal de resposta',
      'Evitar texto longo (Over-texting)',
      'Lidar com respostas secas',
      'Manter mistério saudável',
      'Encerrar conversa no auge'
    ],
    relacionamento: [
      'Manter individualidade',
      'Comunicar limites sem brigar',
      'Equilibrar carinho e espaço',
      'Reacender atração',
      'Lidar com esfriamento'
    ]
  };

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setResult(null);
    try {
      const data = await getSmartBehaviorAdvice(activeTab, topic);
      setResult(data);
    } catch (error) {
      alert("Erro ao buscar sabedoria.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomInterpretation = async () => {
    if (!customInput.trim()) return;
    setLoading(true);
    try {
      const data = await getSmartBehaviorAdvice('Interpretação Comportamental', customInput);
      setResult(data);
    } catch (error) {
      alert("Erro ao interpretar.");
    } finally {
      setLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedTopic(null);
    setResult(null);
    setCustomInput('');
  };

  return (
    <Layout title="Modo Deusa">
      <div className="pb-24">
        
        {/* Tabs */}
        {!selectedTopic && (
          <div className="sticky top-0 bg-black/95 backdrop-blur z-30 px-2 py-2 border-b border-neutral-900 flex overflow-x-auto gap-2 no-scrollbar">
            <TabButton active={activeTab === 'conquista'} onClick={() => setActiveTab('conquista')} icon={<DiamondIcon />} label="Conquista" />
            <TabButton active={activeTab === 'conversa'} onClick={() => setActiveTab('conversa')} icon={<MessageIcon />} label="Conversa" />
            <TabButton active={activeTab === 'relacionamento'} onClick={() => setActiveTab('relacionamento')} icon={<UsersIcon />} label="Relação" />
            <TabButton active={activeTab === 'interpretar'} onClick={() => setActiveTab('interpretar')} icon={<SearchIcon />} label="Decifrar" />
          </div>
        )}

        <div className="px-5 py-6">
          
          {/* LISTA DE TÓPICOS */}
          {!selectedTopic && activeTab !== 'interpretar' && (
            <div className="space-y-3 animate-fade-in">
              <h2 className="text-lg font-serif font-bold text-neutral-300 mb-4 px-1">
                {activeTab === 'conquista' && 'A Arte da Conquista'}
                {activeTab === 'conversa' && 'Domínio da Comunicação'}
                {activeTab === 'relacionamento' && 'Sabedoria da União'}
              </h2>
              {TOPICS[activeTab].map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTopicClick(topic)}
                  className="w-full text-left p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-blood-900 hover:bg-neutral-800 transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <span className="font-medium text-neutral-200 text-sm">{topic}</span>
                  <span className="text-neutral-600 group-hover:text-blood-500">→</span>
                </button>
              ))}
            </div>
          )}

          {/* INTERPRETAÇÃO CUSTOMIZADA */}
          {!selectedTopic && activeTab === 'interpretar' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 mb-4">
                 <h3 className="font-serif font-bold text-white text-base mb-2">Decifrador de Comportamento</h3>
                 <p className="text-xs text-neutral-400">Descreva o que ele fez ou disse. A Deusa explicará a psicologia por trás.</p>
              </div>
              <textarea 
                className="w-full input-dark rounded-xl p-4 text-base min-h-[140px]"
                placeholder="Ex: Ele disse que não quer namorar agora mas continua me procurando..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
              <Button onClick={handleCustomInterpretation} isLoading={loading} disabled={!customInput.trim()}>
                Analisar Comportamento
              </Button>
            </div>
          )}

          {/* RESULTADO (LOADING) */}
          {loading && selectedTopic && !result && (
             <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-blood-900 border-t-blood-500 rounded-full animate-spin"></div>
                <p className="text-neutral-500 text-sm animate-pulse">Consultando a sabedoria ancestral...</p>
             </div>
          )}

          {/* RESULTADO (CONTEÚDO) */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              <button onClick={resetSelection} className="flex items-center text-neutral-400 hover:text-white mb-2 text-sm">
                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Voltar
              </button>

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
                <div className="bg-black p-5 border-b border-neutral-800">
                  <h3 className="font-serif font-bold text-xl text-white leading-tight">{result.topic}</h3>
                  <div className="mt-3 flex items-start gap-2">
                    <span className="text-lg">🧠</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Mindset</span>
                      <p className="text-sm text-neutral-300 italic">{result.mindset}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-green-500 text-sm uppercase tracking-wide mb-3">
                      <span className="text-lg">✅</span> O que fazer
                    </h4>
                    <ul className="space-y-2">
                      {result.do.map((item, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-900 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-red-500 text-sm uppercase tracking-wide mb-3">
                      <span className="text-lg">❌</span> O que evitar
                    </h4>
                    <ul className="space-y-2">
                      {result.dont.map((item, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-900 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.examplePhrase && (
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mt-4">
                      <span className="text-[10px] uppercase font-bold text-blood-500 tracking-wider block mb-1">Mantra / Frase</span>
                      <p className="text-base font-medium text-white">"{result.examplePhrase}"</p>
                    </div>
                  )}
                </div>
              </div>
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
    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
      active 
        ? 'bg-neutral-100 text-black border-white font-bold' 
        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}
    <span className="text-xs">{label}</span>
  </button>
);