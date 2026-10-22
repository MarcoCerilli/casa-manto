"use client";

import React, { useState } from "react";
import {
  Smartphone,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Bell,
  Stethoscope,
  Smile,
  HeartPulse
} from "lucide-react";

interface InteractiveDemoSimulatorProps {
  sector: "dentistico" | "veterinario" | "medico";
}

export const InteractiveDemoSimulator: React.FC<InteractiveDemoSimulatorProps> = ({
  sector,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"patient" | "reception">("patient");
  const [appointmentsList, setAppointmentsList] = useState<
    Array<{ service: string; time: string; name: string; phone: string }>
  >([]);

  // Sector-specific content
  const config = {
    dentistico: {
      clinicName: "Studio Odontoiatrico Dott. Riva",
      clinicBadge: "Studio Dentistico Certificato",
      services: [
        { id: "igiene", name: "Igiene Orale & Prevenzione", time: "45 min", badge: "Consigliato ogni 6 mesi", price: "90€" },
        { id: "visita", name: "Prima Visita & Piano di Cura", time: "30 min", badge: "Check-up completo", price: "70€" },
        { id: "urgenza", name: "Urgenza Mal di Dente", time: "30 min", badge: "Priorità giornata", price: "80€" },
        { id: "ortodonzia", name: "Controllo Allineatori / Apparecchio", time: "20 min", badge: "Controllo mensile", price: "60€" },
      ],
      whatsappMsg: "Ciao {name}! Ti confermiamo l'appuntamento per {service} il {time} presso lo Studio Odontoiatrico Dott. Riva. Ti invieremo un promemoria 24h prima. Per qualsiasi necessità rispondi a questo messaggio.",
    },
    veterinario: {
      clinicName: "Clinica Veterinaria San Rocco",
      clinicBadge: "Pronto Soccorso & Ambulatorio",
      services: [
        { id: "vaccino", name: "Richiamo Vaccinale & Antiparassitario", time: "25 min", badge: "Cane / Gatto", price: "55€" },
        { id: "visita-pet", name: "Visita Clinica Generale", time: "30 min", badge: "Controllo generale", price: "60€" },
        { id: "dermatologia", name: "Controllo Cute & Orecchie", time: "30 min", badge: "Visita specialistica", price: "75€" },
        { id: "ecografia", name: "Ecografia Addominale", time: "40 min", badge: "A digiuno da 8 ore", price: "95€" },
      ],
      whatsappMsg: "Ciao {name}! Confermata la visita per {service} il {time} alla Clinica Veterinaria San Rocco. Ricorda di portare il libretto sanitario del tuo pet. A presto!",
    },
    medico: {
      clinicName: "Centro Medico Polispecialistico Aurora",
      clinicBadge: "Poliambulatorio Specialistico",
      services: [
        { id: "cardio", name: "Visita Cardiologica con ECG", time: "40 min", badge: "Referto immediato", price: "130€" },
        { id: "derma", name: "Visita Dermatologica & Mappatura Nei", time: "30 min", badge: "Specialista Dott.ssa Galli", price: "120€" },
        { id: "fisio", name: "Prima Valutazione Fisioterapica", time: "45 min", badge: "Valutazione posturale", price: "70€" },
        { id: "nutri", name: "Consulenza Nutrizionale", time: "45 min", badge: "Piano personalizzato", price: "90€" },
      ],
      whatsappMsg: "Gentile {name}, confermata la prenotazione per {service} il {time} presso il Centro Medico Aurora. Si prega di portare con sé eventuali esami e referti precedenti.",
    },
  }[sector];

  const slots = [
    { day: "Oggi", hour: "16:30", available: true },
    { day: "Oggi", hour: "18:00", available: true },
    { day: "Domani", hour: "10:15", available: true },
    { day: "Domani", hour: "15:45", available: true },
    { day: "Venerdì", hour: "11:30", available: true },
  ];

  const handleQuickFill = () => {
    setPatientName("Marco Ferri");
    setPatientPhone("348 912 3456");
  };

  const handleConfirm = () => {
    if (!patientName) setPatientName("Paziente Demo");
    if (!patientPhone) setPatientPhone("340 123 4567");

    const newAppt = {
      service: config.services.find((s) => s.id === selectedService)?.name || "Visita Generale",
      time: selectedSlot || "Domani alle 10:15",
      name: patientName || "Paziente Demo",
      phone: patientPhone || "340 123 4567",
    };

    setAppointmentsList((prev) => [newAppt, ...prev]);
    setStep(4);
  };

  const resetDemo = () => {
    setStep(1);
    setSelectedService("");
    setSelectedSlot("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Banner / Switch View */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Demo Interattiva Funzionante
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            • La stessa demo che mostri al titolare dello studio
          </span>
        </div>

        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "patient"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Vista Paziente (Smartphone)
          </button>
          <button
            onClick={() => setActiveTab("reception")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "reception"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Vista Segreteria (Cruscotto)
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-center gap-8">
        {activeTab === "patient" ? (
          <>
            {/* Left explanation for web agency selling this */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cosa vendi al professionista: Nessun attrito</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Esperienza paziente in 3 clic: zero barriere all&apos;entrata
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Il titolare dello studio spesso teme che i suoi pazienti non sappiano usare la tecnologia. Mostragli questa demo:{" "}
                <strong className="text-emerald-400">non serve scaricare app</strong>, non serve registrarsi con username e password, e bastano 20 secondi.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Clic 1: Scelta del servizio</h4>
                    <p className="text-xs text-slate-400">Trattamenti preimpostati con durata corretta per evitare ritardi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Clic 2: Selezione orario libero</h4>
                    <p className="text-xs text-slate-400">Disponibilità filtrate in tempo reale: nessun rischio di accavallamento.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Clic 3: Notifica WhatsApp istantanea</h4>
                    <p className="text-xs text-slate-400">Promemoria automatico che abbatte i no-show senza far alzare la cornetta allo staff.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={resetDemo}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ricomincia simulazione
                </button>
                <span className="text-xs text-slate-500">Prova subito il flusso cliccando a destra 👉</span>
              </div>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] bg-slate-950 p-3 sm:p-4 rounded-[40px] border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>

              {/* Screen container */}
              <div className="bg-slate-900 rounded-[28px] overflow-hidden border border-slate-800/80 min-h-[520px] flex flex-col justify-between text-slate-100">
                {/* Header App */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {config.clinicBadge}
                    </span>
                    <span className="text-[11px] text-blue-200 font-mono">Aperto 24/7</span>
                  </div>
                  <h4 className="font-bold text-base leading-snug">{config.clinicName}</h4>
                  <p className="text-xs text-blue-100">Prenota in 30 secondi dal cellulare</p>

                  {/* Progress dots */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-emerald-400" : "bg-white/30"}`}></div>
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-emerald-400" : "bg-white/30"}`}></div>
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-emerald-400" : "bg-white/30"}`}></div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                  {step === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                          1. Scegli Prestazione
                        </span>
                        <span className="text-[10px] text-blue-400">1 di 3</span>
                      </div>

                      <div className="space-y-2">
                        {config.services.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => {
                              setSelectedService(srv.id);
                              setStep(2);
                            }}
                            className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                              selectedService === srv.id
                                ? "bg-blue-600/20 border-blue-500 text-white"
                                : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-600"
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-slate-100">{srv.name}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400 inline" />
                                {srv.time} • <span className="text-emerald-400">{srv.badge}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-200">{srv.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                          2. Scegli Giorno e Orario
                        </span>
                        <span className="text-[10px] text-blue-400">2 di 3</span>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        Disponibilità aggiornate in tempo reale con l&apos;agenda:
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {slots.map((s, idx) => {
                          const slotStr = `${s.day} ore ${s.hour}`;
                          const isSelected = selectedSlot === slotStr;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedSlot(slotStr)}
                              className={`p-2.5 rounded-xl border text-center transition-all ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                                  : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                              }`}
                            >
                              <div className="text-[11px] font-semibold">{s.day}</div>
                              <div className="text-sm font-bold mt-0.5">{s.hour}</div>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        disabled={!selectedSlot}
                        onClick={() => setStep(3)}
                        className="w-full mt-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
                      >
                        Continua
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                          3. I tuoi dati per la conferma
                        </span>
                        <span className="text-[10px] text-blue-400">3 di 3</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/50 text-[11px] text-blue-300">
                        Riceverai subito il promemoria automatico con i dettagli su WhatsApp.
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Nome e Cognome</label>
                          <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Es. Mario Rossi"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Numero di Cellulare (WhatsApp)</label>
                          <input
                            type="tel"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="Es. 340 123 4567"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleQuickFill}
                        className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        ✨ Compila in automatico per test
                      </button>

                      <button
                        onClick={handleConfirm}
                        className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Conferma Appuntamento in 1 Clic
                      </button>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 text-center py-3">
                      <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm">Appuntamento Confermato!</h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          L&apos;agenda dello studio è stata aggiornata istantaneamente.
                        </p>
                      </div>

                      {/* Simulated WhatsApp Notification Card */}
                      <div className="text-left bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3 relative">
                        <div className="flex items-center gap-2 mb-1.5 text-emerald-400 text-xs font-semibold">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Notifica WhatsApp Inviata:</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                          {config.whatsappMsg
                            .replace("{name}", patientName || "Paziente")
                            .replace(
                              "{service}",
                              config.services.find((s) => s.id === selectedService)?.name || "Controllo"
                            )
                            .replace("{time}", selectedSlot || "Domani alle 10:15")}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-emerald-500/80">
                          <span>Spuntina doppia blu ✓✓</span>
                          <span>Inviato adesso</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab("reception");
                        }}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
                      >
                        Guarda il riscontro sulla Vista Segreteria 👉
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer of phone */}
                <div className="bg-slate-950/90 p-2.5 border-t border-slate-800/80 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Nessun dato venduto • Conforme GDPR Sanitario</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Reception Dashboard View */
          <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <div>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Cruscotto Segreteria & Agenda Medico
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Controllo Totale Senza Telefonate
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sincronizzato in Tempo Reale
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Ore centralino risparmiate</div>
                <div className="text-2xl font-bold text-white mt-1">2.5 ore / giorno</div>
                <div className="text-[11px] text-emerald-400 mt-1">Niente interruzioni durante l&apos;accoglienza</div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Tasso No-Show stimato</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">&lt; 2%</div>
                <div className="text-[11px] text-slate-300 mt-1">Grazie al promemoria 24h su WhatsApp</div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Prenotazioni fuori orario</div>
                <div className="text-2xl font-bold text-blue-400 mt-1">68%</div>
                <div className="text-[11px] text-slate-300 mt-1">Pazienti acquisiti la sera e domenica</div>
              </div>
            </div>

            {/* List of synced appointments */}
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Appuntamenti Registrati in Tempo Reale
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {appointmentsList.length + 3} visite confermate
                </span>
              </div>

              <div className="divide-y divide-slate-800">
                {/* Dynamically added from demo */}
                {appointmentsList.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex flex-wrap items-center justify-between gap-3 bg-emerald-950/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        NEW
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[11px] text-emerald-400">{item.service}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-slate-300">{item.time}</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
                        <MessageSquare className="w-3 h-3" /> WhatsApp Confermato
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pre-existing slots */}
                <div className="p-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      MR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Elena Villa</div>
                      <div className="text-[11px] text-slate-400">
                        {sector === "dentistico"
                          ? "Igiene Dentale Semestrale"
                          : sector === "veterinario"
                          ? "Vaccino Annuale Golden Retriever"
                          : "Controllo Dermatologico"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-300">Oggi ore 15:00</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Promemoria inviato
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      GF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Giorgio Fontana</div>
                      <div className="text-[11px] text-slate-400">
                        {sector === "dentistico"
                          ? "Prima Visita Odontoiatrica"
                          : sector === "veterinario"
                          ? "Controllo Orecchie Gatto"
                          : "Visita Cardiologica"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-300">Domani ore 11:00</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Confermato dal paziente
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveTab("patient")}
                className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
              >
                Torna a testare la vista smartphone del paziente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
