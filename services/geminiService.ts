import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { GeneratorResult, DecoderResult, TurnTablesResult, BehaviorAdviceResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("⚠️ AVISO CRÍTICO: API_KEY não foi encontrada. A IA não funcionará. Verifique as Variáveis de Ambiente no Vercel/Netlify.");
}

// Inicializa com a chave ou uma string vazia para evitar crash imediato da aplicação no load
const ai = new GoogleGenAI({ apiKey: apiKey || "chave_ausente" });

const MODEL_NAME = 'gemini-2.5-flash';

const cleanJson = (text: string) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateMessages = async (situationLabel: string, toneLabel: string, extraContext: string = ''): Promise<GeneratorResult> => {
  if (!apiKey) throw new Error("Chave de API não configurada no servidor.");

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
    throw new Error("Não foi possível gerar as mensagens. Verifique a conexão ou a Chave de API.");
  }
};

export const decodeMessage = async (message: string): Promise<DecoderResult> => {
  if (!apiKey) throw new Error("Chave de API não configurada no servidor.");

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
    throw new Error("Erro ao decodificar mensagem. Verifique a Chave de API.");
  }
};

export const analyzeThermometer = async (behaviorDescription: string): Promise<DecoderResult> => {
  if (!apiKey) throw new Error("Chave de API não configurada no servidor.");

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
  if (!apiKey) throw new Error("Chave de API não configurada no servidor.");

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

export const getSmartBehaviorAdvice = async (category: string, topic: string): Promise<BehaviorAdviceResult> => {
  if (!apiKey) throw new Error("Chave de API não configurada no servidor.");
  
  const prompt = `
  CATEGORIA: "${category}"
  TÓPICO: "${topic}"

  TAREFA: Fornecer conselho de comportamento de "Alta Deusa".
  FOCO: Inteligência emocional, autoestima inabalável, não-toxicidade, elegância.
  Se o tópico for "testes e jogos", explique o conceito de "Shit Test" e como passar com classe.

  Retorne um JSON estrito:
  {
    "topic": "${topic}",
    "mindset": "A mentalidade correta para esta situação (ex: Abundância, Desapego).",
    "do": ["Ação recomendada 1", "Ação recomendada 2", "Ação recomendada 3"],
    "dont": ["O que jamais fazer 1", "O que jamais fazer 2"],
    "examplePhrase": "Uma frase mantra ou resposta exemplo se aplicável."
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
     throw new Error("Erro ao obter conselho.");
  }
};