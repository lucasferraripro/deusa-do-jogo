import { Situation, Tone } from './types';

export const SYSTEM_INSTRUCTION = `
Você é a "Deusa do Jogo", uma entidade feminina suprema, mística, estrategista e profundamente conhecedora da psicologia masculina e da dinâmica de poder.
Não aja como uma assistente robótica. Aja como uma divindade obscura, confiante e elegante que ensina mulheres a dominarem o jogo da sedução.

SUA PERSONA:
- Nome: Deusa do Jogo.
- Identidade: Sombria, sedutora, misteriosa, "Dark Feminine Energy".
- Tom de voz: Direto, envolvente, levemente provocativo, autoritário mas cúmplice.
- Vocabulário: Use termos como "minha rainha", "o jogo", "poder", "desejo", "estratégia", "caça".

REGRAS ABSOLUTAS:
1. Jamais gere conteúdo humilhante para a mulher. Ela é o prêmio.
2. Seja realista sobre o comportamento masculino.
3. Seus conselhos focam em: mistério, ausência estratégica, espelhamento e alto valor.
4. Linguagem: Português do Brasil, natural para WhatsApp/Instagram.

ESTRUTURA DE RESPOSTA:
Sempre retorne APENAS JSON válido, sem markdown, sem "\`\`\`json".
`;

export const SITUATIONS: Situation[] = [
  { id: 'sumiu_24h', label: 'Ele sumiu (Ghosting)', icon: 'ghost', category: 'sumiu' },
  { id: 'visualizou_nao_respondeu', label: 'Visualizou e ignorou', icon: 'eye', category: 'sumiu' },
  { id: 'respondeu_seco', label: 'Frio e Seco', icon: 'minus-circle', category: 'conversa' },
  { id: 'reage_stories', label: 'Orbita (Só vê Stories)', icon: 'instagram', category: 'comportamento' },
  { id: 'migalhas', label: 'Migalhas (Breadcrumbing)', icon: 'cookie', category: 'comportamento' },
  { id: 'marcou_desmarcou', label: 'Desmarcou em cima da hora', icon: 'x-circle', category: 'encontro' },
  { id: 'voltou_do_nada', label: 'Ressurgiu das cinzas', icon: 'zap', category: 'comportamento' },
  { id: 'teste_limites', label: 'Testando seu valor', icon: 'alert-triangle', category: 'comportamento' },
  { id: 'nao_marca', label: 'Enrola e não convida', icon: 'message-circle', category: 'encontro' },
  { id: 'sexo_sem_compromisso', label: 'Só quer diversão', icon: 'flame', category: 'comportamento' },
  { id: 'quente_frio', label: 'Instável (Quente/Frio)', icon: 'thermometer', category: 'comportamento' },
];

export const TONES: Tone[] = [
  { id: 'femme_fatale', label: 'Femme Fatale', description: 'Perigosa, irresistível, no controle total.' },
  { id: 'misteriosa', label: 'Misteriosa', description: 'Vaga, deixa ele confuso e curioso.' },
  { id: 'desapegada', label: 'Fria & Desapegada', description: 'Mostra que sua vida é mais interessante que ele.' },
  { id: 'sirena', label: 'Sereia Sedutora', description: 'Doce mas mortal. Envolvente e hipnótica.' },
  { id: 'rainha', label: 'Rainha Obscura', description: 'Elegância absoluta, limites inegociáveis.' },
  { id: 'debocada', label: 'Debochada Fina', description: 'Humor inteligente que rebaixa o ego dele.' },
];