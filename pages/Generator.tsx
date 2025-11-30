import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { SITUATIONS, TONES } from '../constants';
import { Situation, Tone, GeneratorResult } from '../types';
import { generateMessages } from '../services/geminiService';
import { CopyIcon, RefreshIcon } from '../components/Icons';

export const Generator: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null);
  const [context, setContext] = useState('');
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedSituation || !selectedTone) return;
    setLoading(true);
    try {
      const data = await generateMessages(selectedSituation.label, selectedTone.label, context);
      setResult(data);
      setStep(3);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setStep(1);
    setSelectedSituation(null);
    setSelectedTone(null);
    setContext('');
    setResult(null);
  };

  return (
    <Layout title="Feitiços de Mensagem" showBack={step > 1}>
      <div className="px-5 py-6 pb-24">
        
        {/* STEP 1: SITUATION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-serif text-center text-neutral-300">Qual o cenário atual, minha rainha?</h2>
            <div className="grid grid-cols-1 gap-3">
              {SITUATIONS.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => { setSelectedSituation(sit); setStep(2); }}
                  className="flex items-center p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-blood-700/50 hover:bg-neutral-800 transition-all text-left group"
                >
                  <div className="p-2 bg-neutral-950 rounded-full mr-4 text-neutral-400 group-hover:text-blood-500 transition-colors">
                    {/* Emoji opacity fixed by using standard spans */}
                    <span className="text-xl opacity-100 block">
                      {sit.category === 'sumiu' ? '👻' : sit.category === 'encontro' ? '📅' : sit.category === 'conversa' ? '💬' : '🚩'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-200 block text-sm">{sit.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: TONE */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
             <div className="text-center">
               <h2 className="text-xl font-serif text-neutral-200 mb-1">Como você quer soar?</h2>
               <p className="text-xs text-neutral-500">Situação: <span className="text-blood-400">{selectedSituation?.label}</span></p>
             </div>

            <div className="space-y-3">
              {TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone)}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${selectedTone?.id === tone.id ? 'bg-blood-900/20 border-blood-600' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'}`}
                >
                  <span className={`font-bold block text-sm mb-1 ${selectedTone?.id === tone.id ? 'text-blood-400' : 'text-neutral-200'}`}>{tone.label}</span>
                  <span className="text-xs text-neutral-500">{tone.description}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Contexto Adicional (Opcional)</label>
              <textarea 
                className="w-full input-dark rounded-xl p-4 text-sm min-h-[100px]"
                placeholder="Ex: Ele é orgulhoso, a gente já ficou 3 vezes..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <Button onClick={handleGenerate} isLoading={loading} disabled={!selectedTone}>
              Invocar Mensagens
            </Button>
          </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && result && (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-neutral-900 p-5 rounded-2xl border border-blood-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                <h3 className="font-serif font-bold text-blood-500 mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <span className="text-lg">🔮</span> A Visão da Deusa
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed italic border-l-2 border-neutral-700 pl-4 mb-4">"{result.analysis}"</p>
                <div className="flex items-center gap-2 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                   <span className="text-blood-500 font-bold text-[10px] uppercase tracking-wide">Timing Ideal:</span>
                   <p className="text-xs text-neutral-300 font-medium">{result.timing}</p>
                </div>
             </div>

             <div className="space-y-4">
               {result.messages.map((msg, idx) => (
                 <div key={idx} className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 relative group overflow-hidden hover:border-blood-900/50 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest ${msg.type === 'Fria' ? 'bg-blue-900/30 text-blue-400' : msg.type === 'Magnética' ? 'bg-blood-900/30 text-blood-400' : 'bg-neutral-800 text-neutral-400'}`}>
                        {msg.type}
                      </span>
                      <button onClick={() => copyToClipboard(msg.content)} className="text-neutral-500 hover:text-white transition-colors">
                        <CopyIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white font-medium text-base leading-relaxed pl-1 selection:bg-blood-900">
                      "{msg.content}"
                    </p>
                 </div>
               ))}
             </div>

             <Button variant="outline" onClick={reset} className="mt-8">
               <RefreshIcon className="w-4 h-4" />
               Novo Ritual
             </Button>
          </div>
        )}

      </div>
    </Layout>
  );
};