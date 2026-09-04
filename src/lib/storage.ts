export interface SermonNotes {
  passage: string;
  centralIdea: string;
  purpose: string;
  points: string;
  conclusion: string;
}

export const INITIAL_NOTES: SermonNotes = {
  passage: "",
  centralIdea: "",
  purpose: "",
  points: "",
  conclusion: "",
};

const STORAGE_KEY_NOTES = "bibliaresolve_esboco_anotacoes_v1";
const STORAGE_KEY_BLOCKER = "bibliaresolve_bloqueio_selecionado_v1";

export function loadStoredNotes(): SermonNotes {
  if (typeof window === "undefined") return INITIAL_NOTES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    if (!raw) return INITIAL_NOTES;
    const parsed = JSON.parse(raw);
    return {
      passage: parsed.passage || "",
      centralIdea: parsed.centralIdea || "",
      purpose: parsed.purpose || "",
      points: parsed.points || "",
      conclusion: parsed.conclusion || "",
    };
  } catch {
    return INITIAL_NOTES;
  }
}

export function saveStoredNotes(notes: SermonNotes): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  } catch {
    // Ignore quota errors safely
  }
}

export function loadStoredBlocker(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY_BLOCKER);
  } catch {
    return null;
  }
}

export function saveStoredBlocker(blockerId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_BLOCKER, blockerId);
  } catch {
    // Ignore quota errors safely
  }
}

export function formatNotesForClipboard(notes: SermonNotes): string {
  const dateStr = new Date().toLocaleDateString("pt-BR");
  return `=== MEU ESBOÇO DE PREGAÇÃO ===
Data: ${dateStr}
Fonte de estudo: A Bíblia Resolve | Aula: O Esboço de Pregação Passo a Passo (Aperfeiçoamento Cristão)

1. TEXTO BÍBLICO (Passagem delimitada):
${notes.passage.trim() || "[Não preenchido]"}

2. IDEIA CENTRAL (A mensagem em uma frase):
${notes.centralIdea.trim() || "[Não preenchido]"}

3. PROPÓSITO DO SERMÃO (O que o ouvinte deve compreender ou aplicar):
${notes.purpose.trim() || "[Não preenchido]"}

4. PONTOS PRINCIPAIS (Progressão do sermão):
${notes.points.trim() || "[Não preenchido]"}

5. CONCLUSÃO E APLICAÇÃO (Como a mensagem termina e conecta à vida):
${notes.conclusion.trim() || "[Não preenchido]"}

==============================
Material prático de acompanhamento pessoal.`;
}
