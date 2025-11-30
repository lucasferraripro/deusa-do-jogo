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
      <div className="px-6 py-8 pb-24 space-y-8">
        
        {!result ? (
          <>
            <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-yellow-900/20 mb-2">
              <h2 className="font-bold text-yellow-500/90 text-xl mb-3">Ele está obcecado ou brincando?</h2>
              <p className="text-base text-neutral-400 leading-relaxed">Conte-me os comportamentos dele. Eu analisarei os sinais que ele não consegue esconder.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 pl-1">Atitudes Recentes</label>
              <textarea 
                className="w-full input-dark rounded-2xl p-5 text-lg min-h-[180px]"
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
          <div className="space-y-8 animate-fade-in text-center pt-6">
             
             {/* Gauge Visual */}
             <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-[6px] opacity-30 ${result.interestLevel === 'Alto' ? 'border-green-600 shadow-[0_0_40px_rgba(22,163,74,0.4)]' : result.interestLevel === 'Baixo' ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.4)]' : 'border-yellow-600 shadow-[0_0_40px_rgba(202,138,4,0.4)]'}`}></div>
                <div className="absolute inset-0 rounded-full border-t-[6px] border-white opacity-10 animate-spin-slow"></div>
                <div className={`text-center`}>
                   <span className="text-6xl block mb-4 opacity-100">{result.interestLevel === 'Alto' ? '🔥' : result.interestLevel === 'Baixo' ? '🧊' : '⚠️'}</span>
                   <h3 className="font-bold text-3xl text-white tracking-wider">{result.interestLevel}</h3>
                </div>
             </div>

             <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-neutral-800 text-left">
               <h4 className="font-bold text-neutral-500 text-xs uppercase tracking-widest mb-4">Diagnóstico</h4>
               <p className="text-neutral-200 leading-relaxed text-lg mb-8 border-l-4 border-neutral-700 pl-5">{result.meaning}</p>
               
               <div className="p-6 bg-black rounded-2xl border border-neutral-800">
                 <span className="font-bold text-white text-xs uppercase block mb-3">Sua Estratégia:</span>
                 <p className="text-neutral-300 font-medium text-base leading-relaxed">{result.advice}</p>
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