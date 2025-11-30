import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { decodeMessage } from '../services/geminiService';
import { DecoderResult } from '../types';
import { CopyIcon } from '../components/Icons';

export const Decoder: React.FC = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<DecoderResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const data = await decodeMessage(message);
      setResult(data);
    } catch (error) {
      alert("Erro ao consultar o oráculo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Oráculo da Verdade">
      <div className="px-6 py-8 pb-24 space-y-8">
        
        {!result ? (
          <>
            <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-neutral-800 text-center">
              <span className="text-5xl mb-6 block opacity-100">👁️</span>
              <h2 className="text-2xl font-bold text-white mb-3">Revele a Intenção Oculta</h2>
              <p className="text-base text-neutral-400 leading-relaxed max-w-xs mx-auto">Os homens raramente dizem o que pensam. Cole a mensagem dele e eu traduzirei a verdade.</p>
            </div>

            <div className="relative">
              <textarea 
                className="w-full input-dark rounded-2xl p-5 text-lg min-h-[160px]"
                placeholder="Cole a mensagem dele aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleDecode} 
              isLoading={loading} 
              disabled={!message.trim()}
              className="bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-800 text-purple-100 text-lg"
            >
              Consultar Oráculo
            </Button>
          </>
        ) : (
          <div className="space-y-6 animate-fade-in">
             {/* Interest Meter */}
             <div className="bg-black border border-neutral-800 p-8 rounded-3xl relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-80"></div>
                <div className="relative z-10">
                  <span className="text-neutral-500 text-xs uppercase tracking-[0.2em] font-bold block mb-3">Nível de Interesse</span>
                  <h3 className={`text-3xl font-bold ${result.interestLevel === 'Alto' ? 'text-green-500' : result.interestLevel === 'Baixo' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {result.interestLevel}
                  </h3>
                </div>
             </div>

             {/* Meaning Card */}
             <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-neutral-800">
               <h4 className="font-bold text-purple-400 text-xs uppercase tracking-widest mb-3">A Tradução Real</h4>
               <p className="text-neutral-200 leading-relaxed font-medium text-lg">"{result.meaning}"</p>
             </div>

             {/* Strategy Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-950/20 p-5 rounded-2xl border border-red-900/30">
                   <span className="block text-red-500 font-bold text-xs uppercase mb-2">Risco</span>
                   <p className="text-sm text-red-100 leading-snug">{result.risk}</p>
                </div>
                <div className="bg-green-950/20 p-5 rounded-2xl border border-green-900/30">
                   <span className="block text-green-500 font-bold text-xs uppercase mb-2">Conselho</span>
                   <p className="text-sm text-green-100 leading-snug">{result.advice}</p>
                </div>
             </div>

             {/* Recommended Reply */}
             <div className="bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1e] p-6 rounded-2xl border border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="font-bold text-neutral-200 text-base flex items-center gap-2">Resposta Suprema</h4>
                   <button onClick={() => navigator.clipboard.writeText(result.bestReply)} className="text-neutral-400 hover:text-white">
                     <CopyIcon className="w-6 h-6"/>
                   </button>
                </div>
                <p className="text-xl font-medium text-white italic leading-relaxed">"{result.bestReply}"</p>
             </div>

             <Button variant="ghost" onClick={() => setResult(null)}>
               Nova Consulta
             </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};