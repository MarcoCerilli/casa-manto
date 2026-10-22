"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, X, Check, RefreshCw, Wand2, ArrowRight } from "lucide-react";
import { PromoKit } from "@/lib/default-copy-data";

interface AiCampaignGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedKit: (kit: PromoKit) => void;
}

export const AiCampaignGenerator: React.FC<AiCampaignGeneratorProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedKit,
}) => {
  const [sector, setSector] = useState<"dentistico" | "veterinario" | "medico" | "toelettatura">("dentistico");
  const [tone, setTone] = useState<string>("Diretto, pragmatico e focalizzato sul ROI");
  const [customAngle, setCustomAngle] = useState<string>("");
  const [agencyName, setAgencyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector,
          tone,
          customAngle,
          agencyName: agencyName || "La tua Web Agency",
        }),
      });

      const data = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || "Errore durante la generazione");
      }

      const generated = data.data;

      // Construct a new PromoKit
      const newKit: PromoKit = {
        sector,
        sectorName:
          sector === "veterinario"
            ? "Clinica & Ambulatorio Veterinario"
            : sector === "medico"
            ? "Studio Medico & Polispecialistico"
            : sector === "toelettatura"
            ? "Toelettatura & Salone per Animali"
            : "Studio Dentistico & Odontoiatrico",
        targetAudience:
          sector === "veterinario"
            ? "Medici Veterinari e Direttori di Cliniche"
            : sector === "medico"
            ? "Medici e Titolari di Poliambulatori"
            : sector === "toelettatura"
            ? "Titolari di toelettature e saloni per cani e gatti"
            : "Odontoiatri e Titolari di Studi Dentistici",
        coreHook:
          generated.linkedInPost?.headline ||
          "La soluzione da smartphone in 3 clic che abbatte i no-show ed elimina il sovraccarico della segreteria",
        reelScript: generated.reelScript,
        linkedInPost: generated.linkedInPost,
        carousel: generated.carousel,
        websiteCopy: generated.websiteCopy,
        directPitchBonus: generated.directPitchBonus || {
          whatsappDm: `Salve Dottore, abbiamo sviluppato una web app da smartphone per far prenotare i pazienti in 3 clic e azzerare i no-show con WhatsApp. Vuole provarla in 30 secondi?`,
          coldEmail: `Gentile Dottore, abbiamo una demo interattiva per azzerare gli appuntamenti saltati. La può testare qui...`,
        },
      };

      onApplyGeneratedKit(newKit);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Si è verificato un errore nella chiamata AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-sky-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            AI Copywriter B2B (Gemini 3.8 Flash)
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Genera un Nuovo Kit Personalizzato
          </h3>
          <p className="text-xs text-slate-500">
            Crea una variante su misura specificando un angolo d&apos;attacco o il nome della tua agenzia.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Settore Target
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSector("dentistico")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                  sector === "dentistico"
                    ? "bg-sky-600 border-sky-600 text-white shadow-xs"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🦷 Dentisti
              </button>
              <button
                type="button"
                onClick={() => setSector("veterinario")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                  sector === "veterinario"
                    ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🐾 Veterinari
              </button>
              <button
                type="button"
                onClick={() => setSector("medico")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                  sector === "medico"
                    ? "bg-sky-700 border-sky-700 text-white shadow-xs"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🩺 Studi Medici
              </button>
              <button
                type="button"
                onClick={() => setSector("toelettatura")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                  sector === "toelettatura"
                    ? "bg-amber-600 border-amber-600 text-white shadow-xs"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ✂️ Toelettatura
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Tono di Voce
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="Diretto, pragmatico e focalizzato sul ROI">
                Diretto & Pragmatico (Focus sul ROI e no-show)
              </option>
              <option value="Provocatorio con numeri crudi sul costo delle poltrone vuote">
                Provocatorio con numeri crudi sui costi della poltrona vuota
              </option>
              <option value="Empatico e rassicurante, incentrato sulla tranquillità del personale di segreteria">
                Empatico (Focus sulla serenità del personale di segreteria)
              </option>
              <option value="Elegante e orientato all'esperienza premium del paziente privato">
                Premium & Esclusivo (Esperienza paziente a 5 stelle)
              </option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Angolo di Attacco Specifico (Opzionale)
            </label>
            <input
              type="text"
              value={customAngle}
              onChange={(e) => setCustomAngle(e.target.value)}
              placeholder="Es. Focus sulle disdette dell'ultimo minuto e recupero lista d'attesa"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Nome della tua Web Agency / Freelance
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="Es. Studio Web Agency / Marco Dev"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 placeholder:text-slate-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generazione con Gemini in corso...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Genera Kit Completo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
