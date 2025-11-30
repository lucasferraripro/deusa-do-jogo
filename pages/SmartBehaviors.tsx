import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { DiamondIcon, MessageIcon, UsersIcon, SearchIcon, ChevronLeftIcon } from '../components/Icons';
import { getSmartBehaviorAdvice } from '../services/geminiService';
import { BehaviorAdviceResult } from '../types';

type Category = 'conquista' | 'conversa' | 'relacionamento' | 'interpretar';

export const SmartBehaviors: React.FC = () => {
  const activeIconClass = "w-6 h-6";
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
        
        {/* Tabs - Scrollable with larger targets */}
        {!selectedTopic && (
          <div className="sticky top-0 bg-black/95 backdrop-blur z-30 px-4 py-4 border-b border-neutral-900 flex overflow-x-auto gap-3 no-scrollbar">
            <TabButton active={activeTab === 'conquista'} onClick={() => setActiveTab('conquista')} icon={<DiamondIcon />} label="Conquista" />
            <TabButton active={activeTab === 'conversa'} onClick={() => setActiveTab('conversa')} icon={<MessageIcon />} label="Conversa" />
            <TabButton active={activeTab === 'relacionamento'} onClick={() => setActiveTab('relacionamento')} icon={<UsersIcon />} label="Relação" />
            <TabButton active={activeTab === 'interpretar'} onClick={() => setActiveTab('interpretar')} icon={<SearchIcon />} label="Decifrar" />
          </div>
        )}

        <div className="px-6 py-6">
          
          {/* LISTA DE TÓPICOS */}
          {!selectedTopic && activeTab !== 'interpretar' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-6 px-1">
                {activeTab === 'conquista' && 'A Arte da Conquista'}
                {activeTab === 'conversa' && 'Domínio da Comunicação'}
                {activeTab === 'relacionamento' && 'Sabedoria da União'}
              </h2>
              {TOPICS[activeTab].map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTopicClick(topic)}
                  className="w-full text-left p-5 bg-[#1c1c1e] rounded-2xl border border-neutral-800 hover:border-blood-900 transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <span className="font-semibold text-neutral-200 text-base">{topic}</span>
                  <span className="text-neutral-500 group-hover:text-blood-500 text-xl">→</span>
                </button>
              ))}
            </div>
          )}

          {/* INTERPRETAÇÃO CUSTOMIZADA */}
          {!selectedTopic && activeTab === 'interpretar' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-neutral-800 mb-2">
                 <h3 className="font-bold text-white text-lg mb-2">Decifrador de Comportamento</h3>
                 <p className="text-sm text-neutral-400 leading-relaxed">Descreva o que ele fez ou disse. A Deusa explicará a psicologia por trás.</p>
              </div>
              <textarea 
                className="w-full input-dark rounded-2xl p-5 text-lg min-h-[160px]"
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
             <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="w-12 h-12 border-4 border-blood-900 border-t-blood-500 rounded-full animate-spin"></div>
                <p className="text-neutral-400 text-base font-medium animate-pulse">Consultando a sabedoria ancestral...</p>
             </div>
          )}

          {/* RESULTADO (CONTEÚDO) */}
          {result && (
            <div className="space-y-8 animate-fade-in">
              <button onClick={resetSelection} className="flex items-center text-neutral-400 hover:text-white mb-2 text-base font-medium">
                <ChevronLeftIcon className="w-6 h-6 mr-1" /> Voltar
              </button>

              <div className="bg-[#1c1c1e] rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
                <div className="bg-black p-6 border-b border-neutral-800">
                  <h3 className="font-bold text-2xl text-white leading-tight mb-2">{result.topic}</h3>
                  <div className="mt-4 flex items-start gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Mindset</span>
                      <p className="text-base text-neutral-300 italic leading-relaxed mt-1">{result.mindset}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-green-500 text-sm uppercase tracking-wide mb-4">
                      <span className="text-xl">✅</span> O que fazer
                    </h4>
                    <ul className="space-y-4">
                      {result.do.map((item, i) => (
                        <li key={i} className="text-base text-neutral-200 flex items-start leading-relaxed">
                          <span className="w-2 h-2 bg-green-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-red-500 text-sm uppercase tracking-wide mb-4">
                      <span className="text-xl">❌</span> O que evitar
                    </h4>
                    <ul className="space-y-4">
                      {result.dont.map((item, i) => (
                        <li key={i} className="text-base text-neutral-200 flex items-start leading-relaxed">
                          <span className="w-2 h-2 bg-red-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.examplePhrase && (
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 mt-6">
                      <span className="text-xs uppercase font-bold text-blood-500 tracking-wider block mb-2">Mantra / Frase</span>
                      <p className="text-lg font-semibold text-white leading-relaxed">"{result.examplePhrase}"</p>
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
    className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all whitespace-nowrap ${
      active 
        ? 'bg-white text-black border-white font-bold shadow-lg' 
        : 'bg-[#1c1c1e] text-neutral-400 border-neutral-800 hover:bg-neutral-800'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
    <span className="text-sm">{label}</span>
  </button>
);