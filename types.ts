export interface MessageOption {
  type: 'Fria' | 'Neutra' | 'Magnética' | 'Estratégica';
  content: string;
  explanation?: string;
}

export interface GeneratorResult {
  analysis: string;
  timing: string;
  messages: MessageOption[];
}

export interface DecoderResult {
  meaning: string;
  interestLevel: 'Alto' | 'Moderado' | 'Baixo' | 'Red Flag' | 'Teste';
  risk: string;
  advice: string;
  bestReply: string;
}

export interface Situation {
  id: string;
  label: string;
  icon: string;
  category: 'sumiu' | 'conversa' | 'encontro' | 'comportamento';
}

export interface Tone {
  id: string;
  label: string;
  description: string;
}

export interface TurnTablesResult {
  situationAnalysis: string;
  step1: string;
  step2: string;
  step3: string;
  finalOutcome: string;
}

export interface BehaviorAdviceResult {
  topic: string;
  mindset: string;
  do: string[];
  dont: string[];
  examplePhrase?: string;
}