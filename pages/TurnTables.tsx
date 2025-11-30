import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { turnTheTables } from '../services/geminiService';
import { TurnTablesResult } from '../types';

export const TurnTables: React.FC = () => {
  const [story, setStory] = useState('');
  const [result, setResult] = useState<TurnTablesResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!story.trim()) return;
    setLoading(true);
    try {
      const data = await turnTheTables(story);
      setResult(data);
    } catch (error) {
      alert("Erro ao gerar plano.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dominação Estratégica" showBack>
      <div className="px-6 py-8 pb-24 space-y-8">
        
        {!result ? (
          <>
             <div className="text-center space-y-4 mb-4">
               <div className="w-16 h-16 bg-blood-900/20 text-blood-500 rounded-full flex items-center justify-center mx-auto text-3xl border border-blood-900/30">
                 ♟️
               </div>
               <h2 className="font-bold text-2xl text-white">Vire o Tabuleiro</h2>
               <p className="text-base text-neutral-400 max-w-xs mx-auto leading-relaxed">Se você sente que perdeu o poder, pare agora. Vamos traçar 3 passos frios e calculados.</p>
             </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 pl-1">A Situação Atual</label>
              <textarea 
                className="w-full input-dark rounded-2xl p-5 text-lg min-h-[180px]"
                placeholder="Ex: Eu mandei várias mensagens, ele visualizou e não respondeu..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
              />
            </div>

            <Button 
              onClick={handlePlan} 
              isLoading={loading} 
              disabled={!story.trim()}
              className="bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-100 border border-blue-800"
            >
              Gerar Plano de Resgate
            </Button>
          </>
        ) : (
          <div className="space-y-8 animate-fade-in">
             
             <div className="bg-[#1c1c1e] p-6 rounded-3xl border-l-4 border-blood-700 shadow-xl">
               <h3 className="font-bold text-sm text-blood-500 mb-3 uppercase tracking-wider">A Realidade Nua e Crua</h3>
               <p className="text-lg text-neutral-200 leading-relaxed font-medium">{result.situationAnalysis}</p>
             </div>

             <div className="space-y-4">
               <h3 className="font-bold text-white ml-2 text-sm uppercase tracking-widest">O Plano Mestre</h3>
               
               <StepCard number={1} title="Choque de Padrão" content={result.step1} />
               <StepCard number={2} title="Reposicionamento" content={result.step2} />
               <StepCard number={3} title="Consolidação" content={result.step3} />
             </div>

             <div className="bg-gradient-to-r from-[#1c1c1e] to-black border border-blue-900/30 p-6 rounded-2xl">
                <span className="font-bold text-blue-400 text-xs uppercase block mb-3 tracking-widest">O Resultado Previsto</span>
                <p className="text-neutral-300 text-base font-medium italic leading-relaxed">"{result.finalOutcome}"</p>
             </div>

             <Button variant="ghost" onClick={() => setResult(null)}>
               Criar Nova Estratégia
             </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const StepCard = ({ number, title, content }: { number: number, title: string, content: string }) => (
  <div className="flex gap-5 p-5 bg-[#1c1c1e] rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-colors">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black border border-neutral-700 text-white flex items-center justify-center font-bold text-lg shadow-lg">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
      <p className="text-base text-neutral-400 leading-relaxed">{content}</p>
    </div>
  </div>
);