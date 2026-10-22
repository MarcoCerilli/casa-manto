"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  Smartphone,
  Monitor,
  MessageSquare,
  ArrowRight,
  Smile,
  ChevronRight,
  Zap
} from "lucide-react";
import { LiveSplitScreenDemo } from "@/components/LiveSplitScreenDemo";
import { DentalStudioApp } from "@/components/DentalStudioApp";

export default function DentalDemoSite() {
  const [activeTab, setActiveTab] = useState<"site" | "split" | "backoffice">("site");

  // Booking widget internal state
  const [selectedService, setSelectedService] = useState("Igiene Orale & Prevenzione");
  const [selectedSlot, setSelectedSlot] = useState("Domani 10:15");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    {
      id: "igiene",
      title: "Igiene & Prevenzione Orale",
      desc: "Seduta di igiene professionale con ultrasuoni delicati e lucidatura airflow.",
      duration: "45 min",
      price: "90 €",
    },
    {
      id: "visita",
      title: "Prima Visita & Check-Up Completo",
      desc: "Esame obiettivo con telecamera intraorale e radiografia ortopanoramica mirata.",
      duration: "40 min",
      price: "70 €",
    },
    {
      id: "invisalign",
      title: "Ortodonzia Invisibile (Allineatori)",
      desc: "Scansione 3D delle arcate con simulazione computerizzata del tuo nuovo sorriso.",
      duration: "30 min",
      price: "60 €",
    },
    {
      id: "urgenza",
      title: "Urgenza Mal di Dente & Dolore",
      desc: "Slot prioritario riservato in giornata per risoluzione immediata del dolore.",
      duration: "30 min",
      price: "85 €",
    },
  ];

  const slots = ["Oggi ore 17:30", "Domani ore 10:15", "Domani ore 11:30", "Venerdì ore 15:00"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) setPatientName("Marco Ferri");
    if (!patientPhone) setPatientPhone("+39 348 912 3456");
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Floating Agency Bar (To switch between Patient Site view, Split-Screen Live and Backoffice) */}
      <div className="bg-sky-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold">DEMO AUTONOMA: Studio Odontoiatrico Dott. Riva</span>
          <span className="hidden md:inline text-sky-200">• Sito reale mostrato ai clienti odontoiatri</span>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-950/60 p-1 rounded-xl border border-sky-800 text-[11px]">
          <button
            onClick={() => setActiveTab("site")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              activeTab === "site" ? "bg-sky-600 text-white" : "text-sky-200 hover:text-white"
            }`}
          >
            1. Sito Paziente Completo
          </button>
          <button
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === "split" ? "bg-sky-600 text-white" : "text-sky-200 hover:text-white"
            }`}
          >
            <Zap className="w-3 h-3 text-amber-300" />
            2. Split-Screen con Segreteria
          </button>
          <button
            onClick={() => setActiveTab("backoffice")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              activeTab === "backoffice" ? "bg-sky-600 text-white" : "text-sky-200 hover:text-white"
            }`}
          >
            3. Cruscotto Poltrone
          </button>
          <Link
            href="/"
            className="px-2.5 py-1 text-sky-300 hover:text-white underline font-semibold ml-1"
          >
            ← Torna al B2B Hub
          </Link>
        </div>
      </div>

      {activeTab === "split" && (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 animate-fade-in">
          <LiveSplitScreenDemo sector="dentistico" />
        </div>
      )}

      {activeTab === "backoffice" && (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 animate-fade-in">
          <DentalStudioApp />
        </div>
      )}

      {activeTab === "site" && (
        <div className="animate-fade-in">
          {/* Clinic Information Bar */}
          <div className="bg-sky-50 border-b border-sky-100 text-slate-600 text-xs py-2 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" /> Milano Centro, Via Dante 14
                </span>
                <span className="flex items-center gap-1.5 hidden sm:flex">
                  <Clock className="w-3.5 h-3.5 text-sky-600" /> Lunedì - Venerdì: 08:30 - 19:30
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Prenotazioni Online 24/7 Aperte
                </span>
                <span className="font-mono text-slate-700 font-bold hidden sm:inline">
                  Tel: 02 8900 1234
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Header */}
          <header className="bg-white border-b border-sky-100 sticky top-8 z-40 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-600/20">
                  🦷
                </div>
                <div>
                  <h1 className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                    Studio Odontoiatrico Dott. Riva
                  </h1>
                  <p className="text-xs text-sky-700 font-semibold">Odontoiatria Digitale & Chirurgia</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
                <a href="#servizi" className="hover:text-sky-700 transition">Prestazioni</a>
                <a href="#tecnologie" className="hover:text-sky-700 transition">Tecnologie 3D</a>
                <a href="#studio" className="hover:text-sky-700 transition">Lo Studio</a>
                <a href="#prenota" className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition shadow-sm">
                  Prenota Visita in 3 Clic
                </a>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="bg-gradient-to-b from-sky-50/70 via-white to-slate-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sky-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Prenotazione Intelligente da Smartphone
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  La Cura del Tuo Sorriso,{" "}
                  <span className="text-sky-700">senza attese al telefono</span>.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Scegli il trattamento desiderato, visualizza le disponibilità in tempo reale e prenota in 30 secondi. Ricevi subito il promemoria automatico su WhatsApp.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#prenota"
                    className="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition inline-flex items-center gap-2"
                  >
                    <span>Prenota la Visita Online</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Nessun costo anticipato • Pagamento in studio</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-sky-100 max-w-lg">
                  <div>
                    <div className="text-2xl font-black text-sky-800">4.9 / 5</div>
                    <div className="text-xs text-slate-500">Recensioni Pazienti</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-sky-800">30 sec</div>
                    <div className="text-xs text-slate-500">Tempo Prenotazione</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600">Zero No-Show</div>
                    <div className="text-xs text-slate-500">Promemoria WhatsApp</div>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Box (Right Side) */}
              <div id="prenota" className="lg:col-span-5 bg-white border border-sky-100 rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-950/5 space-y-5">
                <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                      Fissa l&apos;Appuntamento
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">Prenota in 3 Semplici Clic</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    Disponibilità Live
                  </span>
                </div>

                {!isBooked ? (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        1. Seleziona il Trattamento
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.duration} - {s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        2. Scegli Giorno e Orario
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {slots.map((s, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedSlot(s)}
                            className={`p-2.5 rounded-xl border text-xs text-center font-bold transition ${
                              selectedSlot === s
                                ? "bg-sky-600 border-sky-600 text-white shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        3. I tuoi dati per la conferma
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Nome e Cognome (Es. Marco Ferri)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 mb-2 focus:outline-none focus:border-sky-500"
                      />
                      <input
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Cellulare per WhatsApp (Es. +39 348 912 3456)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conferma Appuntamento in 1 Clic</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-center py-4 animate-fade-in">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">Appuntamento Confermato!</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        La poltrona è stata riservata nello Studio Odontoiatrico Dott. Riva.
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-left text-xs space-y-1">
                      <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        Promemoria WhatsApp Inviato:
                      </div>
                      <p className="text-emerald-950 font-sans leading-relaxed text-[11px]">
                        &ldquo;Gentile {patientName || "Marco Ferri"}, il tuo appuntamento per {selectedService} è confermato per {selectedSlot}. Ti invieremo un promemoria 24h prima.&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("split")}
                      className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition"
                    >
                      Guarda l&apos;effetto immediato sulla Dashboard dello Studio 👉
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="servizi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Le Nostre Specializzazioni
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Trattamenti Odontoiatrici con Tecnologie Avanzate
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ogni prestazione ha una durata prestabilita per garantire zero ritardi in sala d&apos;attesa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-sky-300 transition"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold">
                      {srv.duration}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-900">{srv.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">{srv.price}</span>
                    <a
                      href="#prenota"
                      onClick={() => setSelectedService(srv.title)}
                      className="text-xs text-sky-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      Prenota <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clinic Footer */}
          <footer className="bg-slate-900 text-slate-300 py-10 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="font-bold text-white text-sm">Studio Odontoiatrico Dott. Riva S.r.l.</div>
                <div className="text-slate-400 mt-1">Direttore Sanitario: Dott. Marco Riva • Iscr. Albo Odontoiatri n. 4512</div>
                <div className="text-slate-500 mt-0.5">Via Dante 14, 20121 Milano • P.IVA 08912340961</div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <Link href="/" className="hover:text-white underline">
                  Vai all&apos;Hub di Acquisizione Clienti B2B
                </Link>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
