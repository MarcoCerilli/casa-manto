"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DentalStudioApp } from "@/components/DentalStudioApp";
import { VeterinaryClinicApp } from "@/components/VeterinaryClinicApp";
import { LiveSplitScreenDemo } from "@/components/LiveSplitScreenDemo";
import { WhatsAppBotSimulator } from "@/components/WhatsAppBotSimulator";
import { PresentationGuideModal } from "@/components/PresentationGuideModal";
import { CopyViewer } from "@/components/CopyViewer";
import { RoiCalculator } from "@/components/RoiCalculator";
import { AiCampaignGenerator } from "@/components/AiCampaignGenerator";
import {
  DENTAL_PROMO_KIT,
  VET_PROMO_KIT,
  MEDICAL_PROMO_KIT,
  GROOMING_PROMO_KIT,
  PromoKit,
} from "@/lib/default-copy-data";
import {
  Smartphone,
  Monitor,
  Sparkles,
  Layers,
  FileText,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  PlayCircle,
  BookOpen,
  MessageSquare
} from "lucide-react";

export default function Home() {
  // Main Navigation: Dental Demo System, Veterinary Demo System, or B2B Acquisition Kit
  const [activeMainTab, setActiveMainTab] = useState<"dental-system" | "vet-system" | "groom-system" | "b2b-kit">("dental-system");

  // Inner display mode inside Dental or Veterinary demo
  const [innerDemoView, setInnerDemoView] = useState<"split-screen" | "whatsapp-bot" | "full-system">("split-screen");

  // Presentation Guide Modal
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // State for B2B Kit
  const [b2bSector, setB2bSector] = useState<"dentistico" | "veterinario" | "medico" | "toelettatura">("dentistico");
  const [customKit, setCustomKit] = useState<PromoKit | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentKit: PromoKit =
    customKit && customKit.sector === b2bSector
      ? customKit
      : b2bSector === "dentistico"
      ? DENTAL_PROMO_KIT
      : b2bSector === "veterinario"
      ? VET_PROMO_KIT
      : b2bSector === "toelettatura"
      ? GROOMING_PROMO_KIT
      : MEDICAL_PROMO_KIT;

  const objections = [
    {
      q: 'Obiezione Titolare: "I nostri pazienti sono anziani e sono abituati a chiamare al telefono."',
      a: 'Risposta Strategica: "Verissimo Dottore, i pazienti anziani continueranno a telefonare esattamente come prima. La vera differenza è che la segreteria non sarà più sommersa da tutte le altre chiamate (visite di controllo, igiene, chiarimenti) che rappresentano il 70% del volume. In questo modo il personale avrà tempo di dedicarsi con la massima calma proprio alle persone anziane e a chi è fisicamente presente in studio."',
    },
    {
      q: 'Obiezione Titolare: "Abbiamo già il gestionale interno dello studio."',
      a: 'Risposta Strategica: "Il gestionale interno serve per la cartella clinica, la fatturazione e le schede anamnestiche, non per l\'acquisizione di nuovi pazienti sul web. Questa web app non sostituisce il vostro gestionale: è un ponte mobile rapido che raccoglie la prenotazione in 3 clic da Instagram o Google e invia il promemoria automatico WhatsApp."',
    },
    {
      q: 'Obiezione Titolare: "Non vogliamo che i pazienti scelgano orari a caso rischiando ritardi."',
      a: 'Risposta Strategica: "Infatti la web app è 100% vincolata dalle vostre regole. Siete voi a decidere quali giorni, quali orari e quanti slot massimi dedicare alle visite online. Le fasce per le urgenze chirurgiche restano sempre protette e invisibili al pubblico."',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* Top Header & App Mode Bar - Clean Light Celestino Medical Style */}
      <header className="bg-white/95 border-b border-sky-100 sticky top-0 z-40 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-sky-600/20">
              🩺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  StudioLead OS • Piattaforma Demo per Medici & Cliniche
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold">
                  Innovazioni 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Tre demo indipendenti: dentista, veterinario, toelettatura. Ogni cliente riceve solo il suo link.
              </p>
            </div>
          </div>

          {/* Guide Helper Button + Main Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Come presentare in 2 min 💡</span>
            </button>

            <div className="flex items-center bg-sky-50/80 p-1 rounded-2xl border border-sky-200/80 text-xs">
              <button
                onClick={() => setActiveMainTab("dental-system")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                  activeMainTab === "dental-system"
                    ? "bg-white text-sky-800 shadow-sm border border-sky-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🦷</span>
                <span>1. Demo Studio Dentistico</span>
              </button>

              <button
                onClick={() => setActiveMainTab("vet-system")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                  activeMainTab === "vet-system"
                    ? "bg-white text-teal-800 shadow-sm border border-teal-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🐾</span>
                <span>2. Demo Clinica Veterinaria</span>
              </button>

              <button
                onClick={() => setActiveMainTab("groom-system")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                  activeMainTab === "groom-system"
                    ? "bg-white text-amber-900 shadow-sm border border-amber-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>✂️</span>
                <span>3. Demo Toelettatura</span>
              </button>

              <button
                onClick={() => setActiveMainTab("b2b-kit")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                  activeMainTab === "b2b-kit"
                    ? "bg-white text-sky-900 shadow-sm border border-sky-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>4. Kit Vendita & Marketing B2B</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* HOW THIS APP WORKS BANNER (Clear mental model for the user!) */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50/80 border border-sky-100 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-3xl">
            <div className="p-2.5 rounded-2xl bg-sky-600 text-white shadow-sm mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Come Funziona Questa App & Come Usarla con i Clienti:
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Stai mostrando al medico esattamente ciò che acquisterà:
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                1) Lo <strong>smartphone</strong> a sinistra mostra cosa vede il suo paziente alle 22:30.  
                2) Il <strong>monitor</strong> a destra mostra la sua agenda che si riempie da sola.  
                3) Il sistema invia i <strong>promemoria automatici WhatsApp</strong> che azzerano gli appuntamenti saltati.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={
                activeMainTab === "vet-system"
                  ? "/gestionale-veterinario"
                  : activeMainTab === "groom-system"
                  ? "/gestionale-toelettatura"
                  : activeMainTab === "b2b-kit"
                  ? "/contenuti"
                  : "/gestionale-dentistico"
              }
              className="px-4 py-2.5 rounded-xl bg-white border border-sky-300 text-sky-800 text-xs font-bold shadow-xs hover:bg-sky-50 transition flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
              <span>
                {activeMainTab === "vet-system"
                  ? "Apri Gestionale Veterinario"
                  : activeMainTab === "groom-system"
                  ? "Apri Agenda Toelettatura"
                  : activeMainTab === "b2b-kit"
                  ? "Apri i contenuti organici da pubblicare"
                  : "Apri Gestionale Dentistico"}
              </span>
            </Link>

            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center gap-2"
            >
              <span>Leggi la Scaletta da Dire al Medico</span>
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </button>
          </div>
        </div>

        {/* DEMO 1: DENTAL STUDIO SYSTEM */}
        {activeMainTab === "dental-system" && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-selector between Split-Screen Sync, WhatsApp Bot, and Detailed System */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border border-sky-100 shadow-xs">
              <span className="text-xs font-bold text-slate-700 pl-2">
                Scegli la modalità di presentazione per lo Studio Dentistico:
              </span>
              <div className="flex items-center gap-1.5 bg-sky-50/80 p-1 rounded-xl border border-sky-100 text-xs">
                <button
                  onClick={() => setInnerDemoView("split-screen")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "split-screen"
                      ? "bg-white text-sky-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-sky-600" />
                  <span>Split-Screen Live Sync (Consigliata)</span>
                </button>

                <button
                  onClick={() => setInnerDemoView("whatsapp-bot")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "whatsapp-bot"
                      ? "bg-white text-sky-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Simulatore Chatbot WhatsApp H24</span>
                </button>

                <button
                  onClick={() => setInnerDemoView("full-system")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "full-system"
                      ? "bg-white text-sky-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Dashboard Gestionale Completa</span>
                </button>
              </div>
            </div>

            {/* Inner view display */}
            {innerDemoView === "split-screen" && (
              <LiveSplitScreenDemo sector="dentistico" />
            )}
            {innerDemoView === "whatsapp-bot" && (
              <WhatsAppBotSimulator sector="dentistico" />
            )}
            {innerDemoView === "full-system" && (
              <DentalStudioApp />
            )}
          </div>
        )}

        {/* DEMO 2: VETERINARY CLINIC SYSTEM */}
        {activeMainTab === "vet-system" && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-selector */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border border-teal-100 shadow-xs">
              <span className="text-xs font-bold text-slate-700 pl-2">
                Scegli la modalità di presentazione per la Clinica Veterinaria:
              </span>
              <div className="flex items-center gap-1.5 bg-teal-50/80 p-1 rounded-xl border border-teal-100 text-xs">
                <button
                  onClick={() => setInnerDemoView("split-screen")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "split-screen"
                      ? "bg-white text-teal-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-teal-600" />
                  <span>Split-Screen Live Sync Pet</span>
                </button>

                <button
                  onClick={() => setInnerDemoView("whatsapp-bot")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "whatsapp-bot"
                      ? "bg-white text-teal-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                  <span>Simulatore WhatsApp Pet H24</span>
                </button>

                <button
                  onClick={() => setInnerDemoView("full-system")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                    innerDemoView === "full-system"
                      ? "bg-white text-teal-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dashboard Clinica Completa</span>
                </button>
              </div>
            </div>

            {/* Inner view display */}
            {innerDemoView === "split-screen" && (
              <LiveSplitScreenDemo sector="veterinario" />
            )}
            {innerDemoView === "whatsapp-bot" && (
              <WhatsAppBotSimulator sector="veterinario" />
            )}
            {innerDemoView === "full-system" && (
              <VeterinaryClinicApp />
            )}
          </div>
        )}

        {activeMainTab === "groom-system" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Demo autonoma del salone</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Toelettatura: agenda di salone, tempi per manto, richiami a 6–8 settimane</h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Al titolare del salone mandi solo questi due indirizzi. La clinica veterinaria resta un&apos;altra demo, con vaccini e triage. Qui ci sono vasca, tosatura, finishing e il messaggio per rifare il manto.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/demo/toelettatura" className="px-4 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold">
                  Pagina che vede il cliente
                </Link>
                <Link href="/gestionale-toelettatura" className="px-4 py-3 rounded-2xl bg-white border border-amber-300 text-amber-950 text-sm font-bold">
                  Agenda del salone
                </Link>
                <Link href="/contenuti" className="px-4 py-3 rounded-2xl bg-stone-900 text-white text-sm font-bold">
                  Testi organici da pubblicare
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ["Taglia e manto", "Pelo corto, tosatura e stripping occupano minuti diversi. Lo slot in pagina dura quanto il lavoro."],
                ["Tre postazioni", "Vasca, tosatura e finishing non si prenotano uno sopra l'altro."],
                ["Ritorno del cliente", "A 6–8 settimane parte il WhatsApp per ribloccare un feriale, non il sabato già pieno."],
              ].map(([title, body]) => (
                <div key={title} className="bg-white border border-amber-100 rounded-2xl p-5">
                  <h3 className="font-black text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: B2B PROMOTIONAL KIT & COPYWRITING */}
        {activeMainTab === "b2b-kit" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Kit di Marketing B2B per Vendere le Tue Demo
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Contenuti ad Altissima Conversione per Promuovere le Demo
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Testi pronti per dentisti, veterinari e toelettature. I post da pubblicare senza ads stanno in una pagina a parte, un giorno alla volta.
              </p>

              {/* Sector switch for copy */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-500 mr-2">Seleziona Settore Kit:</span>
                <button
                  onClick={() => setB2bSector("dentistico")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    b2bSector === "dentistico"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>🦷 Studio Dentistico</span>
                </button>
                <button
                  onClick={() => setB2bSector("veterinario")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    b2bSector === "veterinario"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>🐾 Clinica Veterinaria</span>
                </button>
                <button
                  onClick={() => setB2bSector("toelettatura")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    b2bSector === "toelettatura"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>✂️ Toelettatura</span>
                </button>
                <button
                  onClick={() => setB2bSector("medico")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    b2bSector === "medico"
                      ? "bg-sky-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>🩺 Studio Medico</span>
                </button>
              </div>
            </div>

            {/* The 4 Deliverables (Reel 30s, LinkedIn post, Instagram carousel 5 slides, Website copy) */}
            <CopyViewer kit={currentKit} onOpenAiGenerator={() => setIsAiModalOpen(true)} />

            <Link href="/contenuti" className="block bg-stone-900 text-white rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Organico, senza budget ads</p>
              <h3 className="text-xl font-black mt-1">Settimana di post già scritti, con il testo da copiare</h3>
              <p className="text-sm text-stone-300 mt-2 max-w-2xl">Instagram, storie, Facebook, LinkedIn e la risposta da mandare quando qualcuno scrive.</p>
            </Link>

            {/* Financial ROI Calculator */}
            <RoiCalculator key={b2bSector} sector={b2bSector} />

            {/* Sponsorship & Meta Ads Blueprint Section */}
            <section className="bg-gradient-to-r from-sky-50 via-white to-sky-50/60 border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  Guida Operativa al Lancio
                </span>
                <span className="text-xs text-slate-500">Come sponsorizzare queste due demo e trovare clienti paganti</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Piano di Sponsorizzazione Meta Ads & Modello di Prezzo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Non vendere &ldquo;lo sviluppo di un sito&rdquo; a ore. Vendi un sistema completo di riempimento poltrone e riduzione no-show.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">La Campagna Meta Ads (Instagram)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Registra lo schermo del tuo computer mentre mostri lo split-screen di questa demo (lo smartphone a sinistra e la tabella a destra). Usa lo Script Reel del Tab 1 con caption &ldquo;Commenta DEMO per provarla sul tuo telefono&rdquo;.
                  </p>
                  <div className="text-[11px] font-mono text-sky-700 font-bold bg-sky-50 p-2 rounded-lg">
                    Budget consigliato: 15€ - 20€ / giorno
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Il Link Diretto al Medico</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Quando un titolare commenta o ti scrive in privato, mandagli direttamente il link alla demo autonoma (<code>/demo/dentista</code> o <code>/demo/veterinario</code>). In 30 secondi proverà la prenotazione e rimarrà sbalordito.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg">
                    Zero frizione: nessun PDF noioso
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Prezzo & Canone Ricorrente</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proponi l&apos;installazione del sistema (personalizzato con il logo e i trattamenti dello studio) + un canone mensile per l&apos;infrastruttura WhatsApp e il supporto.
                  </p>
                  <div className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg">
                    1.800€ setup + 149€/mese ricorrenti
                  </div>
                </div>
              </div>
            </section>

            {/* Objection Handling Playbook */}
            <section className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  Playbook di Vendita B2B
                </span>
                <span className="text-xs text-slate-500">Guida per sviluppatori web e agenzie</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Come superare le 3 obiezioni classiche dei medici
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Quando proponi la demo a un titolare di studio, riceverai quasi sempre una di queste risposte. Ecco come rispondere per chiudere la trattativa:
                </p>
              </div>

              <div className="space-y-3">
                {objections.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/60 border border-slate-200 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:text-sky-800"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80 bg-white">
                        <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-sky-950 font-medium">
                          {item.a}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Guide Presentation Modal */}
      <PresentationGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onLaunchLiveDemo={() => {
          setActiveMainTab("dental-system");
          setInnerDemoView("split-screen");
        }}
      />

      {/* AI Campaign Generator Modal */}
      <AiCampaignGenerator
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyGeneratedKit={(kit) => {
          setCustomKit(kit);
          setB2bSector(kit.sector);
        }}
      />
    </main>
  );
}
