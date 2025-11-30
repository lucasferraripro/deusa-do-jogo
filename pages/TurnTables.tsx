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
    <Layout title="Checkmate" showBack>
      <div className="px-5 py-6 pb-24 space-y-6">
        
        {!result ? (
          <>
             <div className="text-center space-y-3 mb-4">
               <div className="w-14 h-14 bg-blood-900/20 text-blood-500 rounded-full flex items-center justify-center mx-auto text-2xl border border-blood-900/30">
                 ♟️
               </div>
               <h2 className="font-serif font-bold text-xl text-neutral-200">Vire o Tabuleiro</h2>
               <p className="text-xs text-neutral-500 max-w-xs mx-auto">Se você sente que perdeu o poder, pare agora. Vamos traçar 3 passos frios e calculados para que ele volte a correr atrás.</p>
             </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">A Situação Atual</label>
              <textarea 
                className="w-full input-dark rounded-xl p-4 text-sm min-h-[160px]"
                placeholder="Ex: Eu mandei várias mensagens, ele visualizou e não respondeu, e agora postou foto saindo..."
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
          <div className="space-y-6 animate-fade-in">
             
             <div className="bg-neutral-900 p-5 rounded-2xl border-l-4 border-blood-700 shadow-lg">
               <h3 className="font-serif font-bold text-sm text-blood-500 mb-2 uppercase tracking-wider">A Realidade Nua e Crua</h3>
               <p className="text-sm text-neutral-300 leading-relaxed opacity-90">{result.situationAnalysis}</p>
             </div>

             <div className="space-y-4">
               <h3 className="font-bold text-white ml-1 text-sm uppercase tracking-widest">O Plano Mestre</h3>
               
               <StepCard number={1} title="Choque de Padrão" content={result.step1} />
               <StepCard number={2} title="Reposicionamento" content={result.step2} />
               <StepCard number={3} title="Consolidação" content={result.step3} />
             </div>

             <div className="bg-gradient-to-r from-neutral-900 to-neutral-900 border border-blue-900/30 p-5 rounded-xl">
                <span className="font-bold text-blue-400 text-xs uppercase block mb-2 tracking-widest">O Resultado Previsto</span>
                <p className="text-neutral-300 text-sm font-medium italic">"{result.finalOutcome}"</p>
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
  <div className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-colors">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-950 border border-neutral-700 text-neutral-300 flex items-center justify-center font-serif font-bold text-sm">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-neutral-200 text-sm mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed">{content}</p>
    </div>
  </div>
);
