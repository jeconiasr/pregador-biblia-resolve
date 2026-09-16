import React, { useState, useEffect, useRef } from "react";
import {
  Copy,
  Printer,
  Check,
  BookOpen,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  SermonNotes,
  INITIAL_NOTES,
  loadStoredNotes,
  saveStoredNotes,
  formatNotesForClipboard,
} from "../lib/storage";
import { trackEvent, trackOnce } from "../lib/analytics";

interface QuestionCardProps {
  number: number;
  question: string;
  subtext: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  id: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  number,
  question,
  subtext,
  value,
  placeholder,
  onChange,
  id,
}) => {
  return (
    <div className="bg-[#FFFDF8] rounded-xl p-4 sm:p-5 border border-[#DED7CC] shadow-xs print-card transition-all hover:border-[#356F9F]/40">
      <div className="flex items-start gap-3 mb-2.5">
        <span className="shrink-0 w-7 h-7 rounded-full bg-[#17324D] text-[#FFFDF8] font-bold text-xs flex items-center justify-center font-display-accent">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#17324D] leading-snug">
            {question}
          </h3>
          <p className="text-xs text-[#68727D] font-medium mt-0.5">{subtext}</p>
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor={id} className="sr-only">
          {question}
        </label>
        <textarea
          id={id}
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm sm:text-base text-[#22303C] bg-[#F7F1E7]/40 border border-[#DED7CC] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#356F9F] focus:border-transparent transition-all placeholder:text-[#68727D]/60 resize-y"
        />
      </div>
    </div>
  );
};

export const LessonCompanion: React.FC = () => {
  const [notes, setNotes] = useState<SermonNotes>(INITIAL_NOTES);
  const [copied, setCopied] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const outlineStartedTracked = useRef<boolean>(false);

  useEffect(() => {
    setNotes(loadStoredNotes());
  }, []);

  const handleFieldChange = (field: keyof SermonNotes, value: string) => {
    if (!outlineStartedTracked.current && value.trim().length > 0) {
      outlineStartedTracked.current = true;
      trackOnce("outline_started");
    }

    const updated = { ...notes, [field]: value };
    setNotes(updated);
    saveStoredNotes(updated);
  };

  const handleCopy = async () => {
    trackEvent("lesson_notes_copy");
    const formatted = formatNotesForClipboard(notes);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formatted);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = formatted;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setStatusMessage("Esboço copiado com sucesso para a área de transferência!");
      setTimeout(() => {
        setCopied(false);
        setStatusMessage(null);
      }, 3500);
    } catch {
      setCopied(true);
      setStatusMessage("Esboço copiado!");
      setTimeout(() => {
        setCopied(false);
        setStatusMessage(null);
      }, 3500);
    }
  };

  const handlePrint = () => {
    trackEvent("lesson_notes_print");
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("Deseja limpar as anotações do esboço? Esta ação não pode ser desfeita.")) {
      setNotes(INITIAL_NOTES);
      saveStoredNotes(INITIAL_NOTES);
      trackEvent("lesson_notes_clear");
      setStatusMessage("Campos limpos com sucesso.");
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  return (
    <section id="exercicio-pratico" className="py-10 sm:py-14 px-4 sm:px-6 bg-[#FFFDF8]/70 border-y border-[#DED7CC]/60">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#356F9F]/10 border border-[#356F9F]/20 text-[#356F9F] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Exercício Prático</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight">
            Monte o roteiro inicial do seu esboço
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Acompanhe a aula e preencha os cinco blocos fundamentais. Suas anotações são salvas
            automaticamente no seu navegador.
          </p>
        </div>

        {/* 5 Questions Grid */}
        <div className="space-y-3 sm:space-y-4">
          <QuestionCard
            number={1}
            id="note-passage"
            question="Texto bíblico"
            subtext="Qual passagem das Escrituras você vai utilizar?"
            value={notes.passage}
            onChange={(val) => handleFieldChange("passage", val)}
            placeholder="Ex.: Isaías 6:1-8, Salmo 23:1-6, Lucas 15:11-32..."
          />

          <QuestionCard
            number={2}
            id="note-central-idea"
            question="Tema central"
            subtext="Qual é a ideia principal que resume a mensagem em uma frase?"
            value={notes.centralIdea}
            onChange={(val) => handleFieldChange("centralIdea", val)}
            placeholder="Ex.: O encontro sincero com Deus transforma o coração e gera disposição para o serviço..."
          />

          <QuestionCard
            number={3}
            id="note-introduction"
            question="Introdução"
            subtext="Como você vai despertar o interesse dos ouvintes no início?"
            value={notes.introduction}
            onChange={(val) => handleFieldChange("introduction", val)}
            placeholder="Ex.: Apresentação do contexto histórico da passagem e conexão com os dilemas atuais da igreja..."
          />

          <QuestionCard
            number={4}
            id="note-points"
            question="Pontos principais"
            subtext="Quais são as divisões que desenvolvem e sustentam o tema?"
            value={notes.points}
            onChange={(val) => handleFieldChange("points", val)}
            placeholder="Ex.: 1. A santidade de Deus; 2. O reconhecimento do pecado; 3. O perdão e a resposta ao chamado..."
          />

          <QuestionCard
            number={5}
            id="note-final-application"
            question="Aplicação final"
            subtext="Como essa verdade bíblica deve ser vivida na prática esta semana?"
            value={notes.finalApplication}
            onChange={(val) => handleFieldChange("finalApplication", val)}
            placeholder="Ex.: Desafio prático de consagração e oração de compromisso com o propósito de Deus..."
          />
        </div>

        {/* Status alert message if active */}
        {statusMessage && (
          <div
            role="status"
            className="mt-4 p-3 rounded-lg bg-[#2F7665]/10 border border-[#2F7665]/30 text-[#24594D] text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn"
          >
            <Check className="w-4 h-4 text-[#2F7665] shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#F7F1E7] border border-[#DED7CC] no-print">
          <div className="flex items-center gap-2 text-xs text-[#68727D]">
            <Sparkles className="w-3.5 h-3.5 text-[#2F7665] shrink-0" />
            <span>Salvo automaticamente no seu dispositivo.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#17324D] hover:bg-[#22303C] active:scale-[0.98] text-[#FFFDF8] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer min-h-[48px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#E8BE58]" />
                  <span>Esboço copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#DED7CC]" />
                  <span>COPIAR ESBOÇO</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FFFDF8] hover:bg-[#F7F1E7] text-[#17324D] border border-[#DED7CC] text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[48px]"
            >
              <Printer className="w-4 h-4 text-[#356F9F]" />
              <span>IMPRIMIR / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Limpar campos"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg text-[#68727D] hover:text-[#C86E45] hover:bg-[#C86E45]/10 border border-transparent hover:border-[#C86E45]/20 transition-colors cursor-pointer min-h-[48px]"
              aria-label="Limpar anotações"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="sm:hidden text-xs">Limpar campos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

