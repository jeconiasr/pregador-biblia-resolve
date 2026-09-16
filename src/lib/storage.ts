export interface SermonNotes {
  passage: string; // 1. Texto bíblico
  centralIdea: string; // 2. Tema central
  introduction: string; // 3. Introdução
  points: string; // 4. Pontos principais
  finalApplication: string; // 5. Aplicação final
}

export const INITIAL_NOTES: SermonNotes = {
  passage: "",
  centralIdea: "",
  introduction: "",
  points: "",
  finalApplication: "",
};

const STORAGE_KEY_NOTES = "bibliaresolve_esboco_anotacoes_v2";
const STORAGE_KEY_BLOCKER = "bibliaresolve_bloqueio_selecionado_v1";

export function loadStoredNotes(): SermonNotes {
  if (typeof window === "undefined") return INITIAL_NOTES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES) || localStorage.getItem("bibliaresolve_esboco_anotacoes_v1");
    if (!raw) return INITIAL_NOTES;
    const parsed = JSON.parse(raw);
    return {
      passage: parsed.passage || "",
      centralIdea: parsed.centralIdea || "",
      introduction: parsed.introduction || parsed.purpose || "",
      points: parsed.points || "",
      finalApplication: parsed.finalApplication || parsed.conclusion || "",
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
Fonte de estudo: A Bíblia Resolve | Aula: O Esboço de Pregação Passo a Passo

1. TEXTO BÍBLICO:
${notes.passage.trim() || "[Não preenchido]"}

2. TEMA CENTRAL:
${notes.centralIdea.trim() || "[Não preenchido]"}

3. INTRODUÇÃO:
${notes.introduction.trim() || "[Não preenchido]"}

4. PONTOS PRINCIPAIS:
${notes.points.trim() || "[Não preenchido]"}

5. APLICAÇÃO FINAL:
${notes.finalApplication.trim() || "[Não preenchido]"}

==============================
Material prático de acompanhamento pessoal.`;
}
