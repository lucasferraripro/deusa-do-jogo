import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { GeneratorResult, DecoderResult, TurnTablesResult, BehaviorAdviceResult, BehaviorCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

// Helper to clean JSON string if the model adds markdown
const cleanJson = (text: string) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateMessages = async (situationLabel: string, toneLabel: string, extraContext: string = ''): Promise<GeneratorResult> => {
  const prompt = `
  CONTEXTO: A usuária está na seguinte situação: "${situationLabel}".
  ${extraContext ? `DETALHES EXTRAS: ${extraContext}` : ''}
  OBJETIVO: Gerar mensagens de resposta no tom "${toneLabel}".

  Retorne um JSON estrito com esta estrutura:
  {
    "analysis": "Uma breve análise psicológica de 1 frase sobre o momento.",
    "timing": "Sugestão de quando enviar (ex: Espere 2 horas, Envie agora, Espere ele postar algo).",
    "messages": [
      { "type": "Fria", "content": "Opção mais distante/seca." },
      { "type": "Neutra", "content": "Opção equilibrada/segura." },
      { "type": "Magnética", "content": "Opção com alto poder de atração/gatilho mental." }
    ]
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(cleanJson(text)) as GeneratorResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Não foi possível gerar as mensagens. Tente novamente.");
  }
};

export const decodeMessage = async (message: string): Promise<DecoderResult> => {
  const prompt = `
  MENSAGEM RECEBIDA DO HOMEM: "${message}"

  TAREFA: Decodifique o que ele realmente quis dizer, o nível de interesse e como agir.
  Retorne um JSON estrito:
  {
    "meaning": "Tradução direta do subtexto masculino.",
    "interestLevel": "Alto" | "Moderado" | "Baixo" | "Red Flag" | "Teste",
    "risk": "Qual o risco atual (ex: parecer desesperada, cair na friendzone).",
    "advice": "Conselho estratégico curto.",
    "bestReply": "Uma sugestão de resposta perfeita para virar o jogo."
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(cleanJson(text)) as DecoderResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Erro ao decodificar mensagem.");
  }
};

export const analyzeThermometer = async (behaviorDescription: string): Promise<DecoderResult> => {
  // We reuse DecoderResult structure as it fits well
  const prompt = `
  COMPORTAMENTO DO HOMEM: "${behaviorDescription}"

  TAREFA: Analise o nível de interesse dele com base nessas ações.
  Retorne um JSON estrito com a mesma estrutura do Decodificador:
  {
    "meaning": "Análise do padrão comportamental.",
    "interestLevel": "Alto" | "Moderado" | "Baixo" | "Red Flag" | "Teste",
    "risk": "O que a usuária deve evitar fazer agora.",
    "advice": "A melhor postura a adotar.",
    "bestReply": "Não se aplica (deixe string vazia se não houver mensagem específica, ou sugira uma ação)."
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(cleanJson(response.text || "{}")) as DecoderResult;
  } catch (error) {
     throw new Error("Erro ao analisar temperatura.");
  }
};

export const turnTheTables = async (story: string): Promise<TurnTablesResult> => {
  const prompt = `
  HISTÓRIA DA USUÁRIA: "${story}"

  TAREFA: Criar um plano estratégico de 3 passos para ela recuperar o poder na dinâmica.
  Retorne um JSON estrito:
  {
    "situationAnalysis": "Diagnóstico brutal e honesto da situação.",
    "step1": "Passo 1: Ação imediata (geralmente afastamento ou mudança de padrão).",
    "step2": "Passo 2: Ação de reposicionamento (mídia social ou mensagem estratégica).",
    "step3": "Passo 3: Ação de consolidação (como agir quando ele vier atrás).",
    "finalOutcome": "O que esperar se ela seguir o plano."
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(cleanJson(response.text || "{}")) as TurnTablesResult;
  } catch (error) {
     throw new Error("Erro ao gerar estratégia.");
  }
};

export const getSmartBehaviorAdvice = async (category: BehaviorCategory, topic: string, context?: string): Promise<BehaviorAdviceResult> => {
  const categoryPrompts = {
    conquest: "Fase: CONQUISTA (Dating). Foco: Criar atração genuína, mistério e alto valor.",
    conversation: "Fase: CONVERSA DIGITAL (WhatsApp/Instagram). Foco: Timing, polaridade, não ser ansiosa.",
    relationship: "Fase: RELACIONAMENTO SÉRIO. Foco: Parceria, respeito, manter a chama e individualidade.",
    interpreter: "Fase: INTERPRETAÇÃO DE COMPORTAMENTO. Foco: Clareza mental, sem paranoia."
  };

  const prompt = `
  Você está no modo "SABEDORIA SUPREMA DA DEUSA".
  CATEGORIA: ${categoryPrompts[category]}
  TÓPICO/DÚVIDA DA USUÁRIA: "${topic}"
  ${context ? `CONTEXTO ESPECÍFICO: "${context}"` : ''}

  REGRAS DE OURO PARA ESTA RESPOSTA:
  1. Baseie-se em Inteligência Emocional, Autoestima Blindada e Comunicação Não Violenta.
  2. NADA de jogos tóxicos ou manipulação barata. O foco é postura de Alto Valor.
  3. Se for interpretação, seja realista (nem otimista demais, nem pessimista demais).
  4. Empodere a mulher para que ela não dependa da validação externa.
  5. Se o tópico for sobre "testes" ou "jogos", explique qual é o teste oculto e como passar nele com elegância.

  Retorne JSON estrito:
  {
    "corePrinciple": "O princípio psicológico ou emocional por trás disso (máx 2 frases).",
    "posture": "A mentalidade/postura exata que ela deve assumir.",
    "dos": ["Ação recomendada 1", "Ação recomendada 2", "Ação recomendada 3"],
    "donts": ["O que NÃO fazer (erro comum)", "O que evitar para não perder valor"],
    "examplePhrase": "Uma frase ou script inteligente para usar nessa situação (se aplicável, senão deixe vazio)."
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(cleanJson(response.text || "{}")) as BehaviorAdviceResult;
  } catch (error) {
    throw new Error("Erro ao buscar sabedoria.");
  }
};