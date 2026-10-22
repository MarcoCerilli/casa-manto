"use client";

import React from "react";
import { X, CheckCircle2, Smartphone, Monitor, Zap, MessageSquare, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";

interface PresentationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchLiveDemo: () => void;
}

export const PresentationGuideModal: React.FC<PresentationGuideModalProps> = ({
  isOpen,
  onClose,
  onLaunchLiveDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-sky-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
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
            Guida Pratica per Web Agency & Freelance
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Come presentare questa Demo al Dottore in 2 Minuti
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Ecco esattamente cosa fare e cosa dire quando sei al telefono, in videochiamata o dal vivo con il titolare di uno studio.
          </p>
        </div>

        {/* 3 Step Script */}
        <div className="space-y-4 pt-2">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-extrabold text-sm">
              <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Minuto 0:00 - Il Gancio Visivo (Fagli prendere in mano il telefono)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
              <strong>Cosa dire:</strong> &ldquo;Dottore, non le parlo di codice o siti internet. Guardi il suo smartphone: questo è il link che i suoi pazienti aprono su Instagram o Google alle 22:30 quando il suo centralino è spento. Clicchi su <em>Igiene Dentale</em> e scelga un orario in 3 tocchi.&rdquo;
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-extrabold text-sm">
              <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Minuto 1:00 - L&apos;Effetto Causa-Effetto (Lo Split Screen in diretta)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
              <strong>Cosa mostrare:</strong> Mostragli la schermata sincronizzata: non appena il paziente tocca &ldquo;Conferma&rdquo; sul telefono, l&apos;appuntamento compare <strong>all&apos;istante</strong> sulla dashboard del suo staff e suona la notifica WhatsApp.  
              <br />
              <strong>Cosa dire:</strong> &ldquo;Vede? La sua segretaria non ha dovuto rispondere al telefono per 5 minuti. L&apos;agenda è già aggiornata e il promemoria automatico WhatsApp è già partito.&rdquo;
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-extrabold text-sm">
              <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>Minuto 1:45 - La Chiusura sui Soldi (I No-Show)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
              <strong>Cosa dire:</strong> &ldquo;Quanto le costa una poltrona vuota per un paziente che si è dimenticato l&apos;appuntamento? Tra i 150 e i 250 euro. Questo sistema manda il WhatsApp 24 ore prima. Se il paziente disdice, il nostro <em>Smart Slot-Filler</em> recupera in automatico la lista d&apos;attesa riempiendo il buco. Quando vogliamo installarlo nel vostro studio?&rdquo;
            </p>
          </div>
        </div>

        {/* CTA Launch Demo */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            Pronto a testare la modalità split-screen sincronizzata?
          </span>
          <button
            onClick={() => {
              onClose();
              onLaunchLiveDemo();
            }}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition flex items-center gap-2"
          >
            <span>Avvia Dimostrazione Live Sincronizzata</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
