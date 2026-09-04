import React, { useState, useEffect } from "react";
import {
  FileText,
  Copy,
  Printer,
  Check,
  BookOpen,
  HelpCircle,
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
import { trackEvent } from "../lib/analytics";

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
    <div className="bg-[#FFFDF8] rounded-xl p-5 sm:p-6 border border-[#DED7CC] shadow-xs print-card transition-all hover:border-[#356F9F]/40">
      <div className="flex items-start gap-3.5 mb-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-[#17324D] text-[#FFFDF8] font-bold text-sm flex items-center justify-center font-display-accent">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#17324D] leading-snug">
            {question}
          </h3>
          <p className="text-xs sm:text-sm text-[#68727D] font-medium mt-0.5">{subtext}</p>
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={id} className="sr-only">
          {question}
        </label>
        <textarea
          id={id}
          rows={3}
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

  useEffect(() => {
    setNotes(loadStoredNotes());
  }, []);

  const handleFieldChange = (field: keyof SermonNotes, value: string) => {
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
        // Fallback for older or restricted environments
        const textArea = document.createElement("textarea");
        textArea.value = formatted;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    trackEvent("lesson_notes_print");
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("Deseja limpar as anotações do roteiro? Esta ação não pode ser desfeita.")) {
      setNotes(INITIAL_NOTES);
      saveStoredNotes(INITIAL_NOTES);
    }
  };

  return (
    <section id="roteiro-aplicacao" className="py-10 sm:py-14 px-4 sm:px-6 bg-[#FFFDF8]/60 border-y border-[#DED7CC]/60">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#356F9F]/10 border border-[#356F9F]/20 text-[#356F9F] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Material Prático de Acompanhamento</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            Enquanto assiste, responda estas cinco perguntas
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Este roteiro editorial ajuda a fixar a estrutura da aula. As anotações são salvas
            apenas no seu navegador e você pode copiá-las ou imprimi-las a qualquer momento.
          </p>
        </div>

        {/* 5 Questions Grid */}
        <div className="space-y-4 sm:space-y-5">
          <QuestionCard
            number={1}
            id="note-passage"
            question="Qual é o texto bíblico?"
            subtext="Delimite a passagem."
            value={notes.passage}
            onChange={(val) => handleFieldChange("passage", val)}
            placeholder="Ex.: Isaías 6:1-8, Salmo 23, Lucas 15:11-32..."
          />

          <QuestionCard
            number={2}
            id="note-central-idea"
            question="Qual é a ideia central?"
            subtext="Escreva em uma frase o que a mensagem comunica."
            value={notes.centralIdea}
            onChange={(val) => handleFieldChange("centralIdea", val)}
            placeholder="Ex.: Diante da santidade de Deus, o servo reconhece sua condição e se dispõe a servir..."
          />

          <QuestionCard
            number={3}
            id="note-purpose"
            question="Qual é o propósito?"
            subtext="Defina o que o ouvinte deve compreender ou aplicar."
            value={notes.purpose}
            onChange={(val) => handleFieldChange("purpose", val)}
            placeholder="Ex.: Levar a igreja a renovar seu compromisso de obediência prática no dia a dia..."
          />

          <QuestionCard
            number={4}
            id="note-points"
            question="Quais pontos desenvolvem a ideia?"
            subtext="Organize uma progressão simples."
            value={notes.points}
            onChange={(val) => handleFieldChange("points", val)}
            placeholder="Ex.: 1. A visão da glória de Deus; 2. O quebrantamento sincero; 3. A purificação e o envio..."
          />

          <QuestionCard
            number={5}
            id="note-conclusion"
            question="Como a mensagem termina?"
            subtext="Conecte conclusão e aplicação ao que foi exposto."
            value={notes.conclusion}
            onChange={(val) => handleFieldChange("conclusion", val)}
            placeholder="Ex.: Recapitulação do chamado e oração de consagração e resposta pessoal..."
          />
        </div>

        {/* Action Toolbar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#F7F1E7] border border-[#DED7CC] no-print">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#68727D]">
            <Sparkles className="w-4 h-4 text-[#2F7665]" />
            <span>Suas respostas ficam salvas no seu próprio dispositivo.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#17324D] hover:bg-[#22303C] active:scale-[0.98] text-[#FFFDF8] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#E8BE58]" />
                  <span>Roteiro copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#DED7CC]" />
                  <span>COPIAR MEU ROTEIRO</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFDF8] hover:bg-[#F7F1E7] text-[#17324D] border border-[#DED7CC] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#356F9F]" />
              <span>IMPRIMIR ROTEIRO</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Limpar campos"
              className="p-2.5 rounded-lg text-[#68727D] hover:text-[#C86E45] hover:bg-[#C86E45]/10 transition-colors"
              aria-label="Limpar anotações"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Disclosure */}
        <p className="mt-4 text-center text-xs text-[#68727D]/80 italic">
          Material editorial independente desenvolvido por A Bíblia Resolve para acompanhamento didático
          da aula, sem constituir transcrição oficial do canal.
        </p>
      </div>
    </section>
  );
};
