"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download, ExternalLink, Terminal, Sparkles, Globe, ShieldCheck } from "lucide-react";

interface RenderExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sector: "dentistico" | "veterinario";
}

export const RenderExportModal: React.FC<RenderExportModalProps> = ({
  isOpen,
  onClose,
  sector,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDental = sector === "dentistico";
  const appTitle = isDental ? "DentalCloud Pro (Odontoiatri)" : "VetCloud OS (Cliniche Veterinarie)";
  const routePath = isDental ? "/gestionale-dentistico" : "/gestionale-veterinario";
  const repoName = isDental ? "gestionale-dentistico-demo" : "gestionale-veterinario-demo";

  const renderYamlContent = `services:
  - type: web
    name: ${repoName}
    runtime: node
    plan: free
    region: frankfurt
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000`;

  const organicPostCopy = isDental
    ? `Dottore, quanti appuntamenti saltati avete avuto questo mese? 🦷📉

Ogni poltrona vuota costa tra i 90€ e i 250€. 
Abbiamo creato una web app per smartphone in 3 clic che:
✅ Fa prenotare i pazienti anche alle 22:30 quando lo studio è chiuso
✅ Invia il promemoria automatico WhatsApp 24 ore prima (No-show -94%)
✅ Se qualcuno disdice, lo Smart Slot-Filler riempie il buco in 8 secondi tramite lista d'attesa

👉 Commenta "DEMO" o scrivimi in privato per provarla subito dal tuo telefono!`
    : `Dottore, quante telefonate riceve la vostra clinica solo per fissare un vaccino? 🐾📞

Abbiamo sviluppato un gestionale rapido per cliniche veterinarie che:
✅ Permette ai proprietari di cani e gatti di prenotare dal divano in 30 secondi
✅ Separa in automatico gli ambulatori Cani e Gatti (Cat Friendly Clinic)
✅ Invia promemoria WhatsApp automatici per la scadenza dei richiami vaccinali annuali

👉 Commenta "PET" o scrivimi in DM per testare la demo interattiva!`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadDeploymentGuide = () => {
    const content = `# GUIDA AL DEPLOY SU RENDER.COM: ${appTitle.toUpperCase()}

1. CREA LA REPOSITORY GITHUB
   - Crea una nuova repository su GitHub: "${repoName}"
   - Carica i file del progetto (Next.js 15 App Router).

2. CONFIGURA IL WEB SERVICE SU RENDER.COM
   - Accedi a https://render.com
   - Clicca su "New +" -> "Web Service"
   - Connetti la repository GitHub "${repoName}"
   - Impostazioni:
     * Environment: Node
     * Region: Frankfurt (Europe)
     * Branch: main
     * Build Command: npm install && npm run build
     * Start Command: npm start
     * Instance Type: Free

3. FILE RENDER.YAML (OPZIONALE PER DEPLOY AUTOMATICO)
\`\`\`yaml
${renderYamlContent}
\`\`\`

4. LINK DA INSERIRE NEI POST ORGANICI (REEL, TIKTOK, DM)
   Una volta completato il deploy su Render, il tuo link pubblico sarà:
   https://${repoName}.onrender.com

5. COPY DA USARE NEI TUOI REEL / TIKTOK:
${organicPostCopy}
`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Deploy_Render_${sector}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-sky-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            Guida di Pubblicazione su Render.com
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Pubblica {appTitle} con Link Separato
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Segui questi 3 passaggi per avere un link pubblico indipendente su Render da incollare nei tuoi post organici.
          </p>
        </div>

        {/* Step 1: Render configuration */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between">
              <span>1. Configurazione Web Service su Render.com</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Piano Free Gratuito
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="text-slate-400 text-[10px] block">Build Command:</span>
                <span className="font-mono text-slate-800 font-bold">npm install && npm run build</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="text-slate-400 text-[10px] block">Start Command:</span>
                <span className="font-mono text-slate-800 font-bold">npm start</span>
              </div>
            </div>
          </div>

          {/* Step 2: render.yaml blueprint */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> render.yaml
              </span>
              <button
                onClick={() => handleCopy(renderYamlContent, "render-yaml")}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition inline-flex items-center gap-1"
              >
                {copiedKey === "render-yaml" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "render-yaml" ? "Copiato!" : "Copia YAML"}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto p-2 bg-slate-950/80 rounded-xl">
              {renderYamlContent}
            </pre>
          </div>

          {/* Step 3: Copy for Organic Reels */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900">
                2. Caption Pronta per il tuo Reel / Post Organico:
              </span>
              <button
                onClick={() => handleCopy(organicPostCopy, "organic-copy")}
                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white transition inline-flex items-center gap-1 shadow-xs"
              >
                {copiedKey === "organic-copy" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "organic-copy" ? "Copiato!" : "Copia Testo Post"}
              </button>
            </div>
            <p className="text-xs text-slate-700 whitespace-pre-line bg-white p-3 rounded-xl border border-sky-100 leading-relaxed font-sans">
              {organicPostCopy}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={handleDownloadDeploymentGuide}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Scarica Istruzioni Complete (.md)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition"
          >
            Ho Capito, Torna al Gestionale
          </button>
        </div>
      </div>
    </div>
  );
};
