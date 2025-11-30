import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { analyzeThermometer } from '../services/geminiService';
import { DecoderResult } from '../types';

export const Thermometer: React.FC = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<DecoderResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeThermometer(description);
      setResult(data);
    } catch (error) {
      alert("Erro ao analisar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Termômetro do Desejo">
      <div className="px-5 py-6 pb-24 space-y-6">
        
        {!result ? (
          <>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-yellow-900/20 mb-4">
              <h2 className="font-serif font-bold text-yellow-500/80 text-lg mb-2">Ele está obcecado ou brincando?</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">Conte-me os comportamentos dele. Eu analisarei os sinais que ele não consegue esconder.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Atitudes Recentes</label>
              <textarea 
                className="w-full input-dark rounded-xl p-4 text-sm min-h-[160px]"
                placeholder="Ex: Ele curte meus stories mas não manda mensagem, demora dias para responder, aparece de madrugada..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleAnalyze} 
              isLoading={loading} 
              disabled={!description.trim()}
              className="bg-gradient-to-r from-yellow-700 to-orange-800 text-yellow-100 border border-yellow-800"
            >
              Medir Temperatura
            </Button>
          </>
        ) : (
          <div className="space-y-8 animate-fade-in text-center pt-4">
             
             {/* Gauge Visual */}
             <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-4 opacity-30 ${result.interestLevel === 'Alto' ? 'border-green-600 shadow-[0_0_30px_rgba(22,163,74,0.4)]' : result.interestLevel === 'Baixo' ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'border-yellow-600 shadow-[0_0_30px_rgba(202,138,4,0.4)]'}`}></div>
                <div className="absolute inset-0 rounded-full border-t-4 border-white opacity-10 animate-spin-slow"></div>
                <div className={`text-center`}>
                   <span className="text-5xl block mb-3 opacity-100">{result.interestLevel === 'Alto' ? '🔥' : result.interestLevel === 'Baixo' ? '🧊' : '⚠️'}</span>
                   <h3 className="font-serif font-bold text-2xl text-white tracking-wider">{result.interestLevel}</h3>
                </div>
             </div>

             <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 text-left">
               <h4 className="font-bold text-neutral-500 text-xs uppercase tracking-widest mb-3">Diagnóstico</h4>
               <p className="text-neutral-300 leading-relaxed text-sm mb-6 border-l border-neutral-700 pl-4">{result.meaning}</p>
               
               <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                 <span className="font-bold text-white text-xs uppercase block mb-2">Sua Estratégia:</span>
                 <p className="text-neutral-400 font-medium text-sm">{result.advice}</p>
               </div>
             </div>

             <Button variant="ghost" onClick={() => setResult(null)}>
               Nova Medição
             </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};