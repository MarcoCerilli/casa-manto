"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RenderExportModal } from "@/components/RenderExportModal";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Users,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Monitor,
  Smartphone,
  PhoneCall,
  Download,
  ExternalLink,
  Layers,
  Settings,
  Bell,
  Check,
  Share2
} from "lucide-react";

interface DentalPatient {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  chair: "Poltrona 1 (Dott. Riva)" | "Poltrona 2 (Dott.ssa Galli - Igiene)";
  time: string;
  status: "Confermato WhatsApp" | "Promemoria Inviato" | "Nuova Prenotazione" | "Disdetta";
  amount: number;
  lastHygieneMonthsAgo?: number;
}

export default function GestionaleDentisticoPage() {
  // Navigation tabs inside dental software
  const [activeTab, setActiveTab] = useState<"agenda" | "recalls" | "patient-booking" | "render-deploy">("agenda");
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);

  // Selected chair filter
  const [selectedChair, setSelectedChair] = useState<"all" | "p1" | "p2">("all");

  // Slot-filler simulation state
  const [slotFillerState, setSlotFillerState] = useState<"idle" | "cancelled" | "recovering" | "recovered">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Patient Booking Simulator State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [bookingService, setBookingService] = useState("Igiene Orale Professionale");
  const [bookingSlot, setBookingSlot] = useState("Domani ore 10:15");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");

  // Dental appointments
  const [appointments, setAppointments] = useState<DentalPatient[]>([
    {
      id: "D-101",
      name: "Marco Ferri",
      phone: "+39 348 912 3456",
      treatment: "Igiene Orale & Detartrasi Airflow",
      chair: "Poltrona 2 (Dott.ssa Galli - Igiene)",
      time: "09:30 - 10:15",
      status: "Confermato WhatsApp",
      amount: 90,
    },
    {
      id: "D-102",
      name: "Elena Villa",
      phone: "+39 333 456 7890",
      treatment: "Prima Visita & Piano Terapeutico",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "10:30 - 11:15",
      status: "Confermato WhatsApp",
      amount: 80,
    },
    {
      id: "D-103",
      name: "Giorgio Fontana",
      phone: "+39 340 789 1234",
      treatment: "Controllo Allineatori Invisalign",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "11:30 - 12:00",
      status: "Promemoria Inviato",
      amount: 60,
    },
    {
      id: "D-104",
      name: "Silvia Brambilla",
      phone: "+39 349 221 8844",
      treatment: "Urgenza Mal di Dente Molare",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "15:00 - 15:30",
      status: "Nuova Prenotazione",
      amount: 95,
    },
    {
      id: "D-105",
      name: "Roberto Conti",
      phone: "+39 338 654 3210",
      treatment: "Igiene Orale Semestrale",
      chair: "Poltrona 2 (Dott.ssa Galli - Igiene)",
      time: "16:00 - 16:45",
      status: "Confermato WhatsApp",
      amount: 90,
    },
  ]);

  // Recall hygiene list (6-month automatic recall)
  const [recallPatients, setRecallPatients] = useState([
    {
      id: "REC-1",
      name: "Valeria Morandi",
      phone: "+39 347 112 9988",
      lastVisit: "6 mesi fa (Aprile)",
      status: "In attesa invio WhatsApp",
    },
    {
      id: "REC-2",
      name: "Claudio Sassi",
      phone: "+39 335 889 0011",
      lastVisit: "6 mesi e 2 sett. fa",
      status: "In attesa invio WhatsApp",
    },
    {
      id: "REC-3",
      name: "Martina Colombo",
      phone: "+39 348 334 5566",
      lastVisit: "7 mesi fa",
      status: "In attesa invio WhatsApp",
    },
  ]);

  const dentalServices = [
    { name: "Igiene Orale Professionale", duration: "45 min", price: "90 €", chair: "Poltrona 2 (Igiene)" },
    { name: "Prima Visita & Check-Up Completo", duration: "40 min", price: "70 €", chair: "Poltrona 1 (Dott. Riva)" },
    { name: "Urgenza Mal di Dente & Dolore", duration: "30 min", price: "85 €", chair: "Poltrona 1 (Dott. Riva)" },
    { name: "Scansione 3D Allineatori Invisibili", duration: "30 min", price: "60 €", chair: "Poltrona 1 (Dott. Riva)" },
  ];

  const availableSlots = ["Oggi ore 17:30", "Domani ore 10:15", "Domani ore 11:30", "Venerdì ore 15:00"];

  // Quick fill demo helper
  const handleQuickFill = () => {
    setBookingName("Alessandro Galli");
    setBookingPhone("+39 347 555 1234");
  };

  // Submit patient booking from smartphone
  const handleConfirmPatientBooking = () => {
    const pName = bookingName.trim() || "Alessandro Galli";
    const phone = bookingPhone.trim() || "+39 347 555 1234";

    const newAppt: DentalPatient = {
      id: `D-${Date.now().toString().slice(-3)}`,
      name: pName,
      phone: phone,
      treatment: bookingService,
      chair: bookingService.includes("Igiene")
        ? "Poltrona 2 (Dott.ssa Galli - Igiene)"
        : "Poltrona 1 (Dott. Riva)",
      time: bookingSlot,
      status: "Confermato WhatsApp",
      amount: 90,
    };

    setAppointments([newAppt, ...appointments]);
    setToastMessage(`💬 WhatsApp Inviato a ${pName}: "Gentile ${pName}, il tuo appuntamento per ${bookingService} è confermato per ${bookingSlot} presso lo Studio Dott. Riva. Ti invieremo un promemoria 24h prima."`);
    setActiveTab("agenda");
  };

  // Simulate slot-filler recovery
  const handleTriggerSlotFiller = () => {
    setSlotFillerState("cancelled");
    setToastMessage("🚨 DISDETTA PAZIENTE ORE 16:00: Poltrona scoperta (Rischio buco da 90€-180€)!");

    setTimeout(() => {
      setSlotFillerState("recovering");
      setToastMessage("🤖 ALGORITMO SMART SLOT-FILLER: Invio WhatsApp automatico a 3 pazienti in lista d'attesa...");

      setTimeout(() => {
        setSlotFillerState("recovered");
        setToastMessage("🎉 BUCO RECUPERATO IN 8 SECONDI: Il paziente Luca Bianchi ha accettato il posto! Nessuna telefonata manuale richiesta.");
        setAppointments((prev) => [
          {
            id: `D-REC-${Date.now().toString().slice(-3)}`,
            name: "Luca Bianchi (Da Lista d'Attesa)",
            phone: "+39 333 999 1122",
            treatment: "Igiene Orale Recuperata",
            chair: "Poltrona 2 (Dott.ssa Galli - Igiene)",
            time: "Oggi 16:00 - 16:45",
            status: "Confermato WhatsApp",
            amount: 90,
          },
          ...prev,
        ]);
      }, 2500);
    }, 2000);
  };

  // Trigger hygiene recall WhatsApp blast
  const handleSendRecallWhatsApp = (id: string, name: string) => {
    setRecallPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Messaggio WhatsApp Inviato ✅" } : p))
    );
    setToastMessage(`💬 WhatsApp inviato a ${name}: "Gentile ${name}, sono passati 6 mesi dalla tua ultima igiene orale. La prevenzione è fondamentale: tocca qui per scegliere comodamente il tuo orario: [LINK_PRENOTAZIONE]"`);
  };

  const filteredAppts = appointments.filter((a) => {
    if (selectedChair === "p1") return a.chair.includes("Poltrona 1");
    if (selectedChair === "p2") return a.chair.includes("Poltrona 2");
    return true;
  });

  const totalAmountToday = appointments.reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Clinical Header */}
      <header className="bg-white border-b border-sky-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-600/20">
              🦷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                  DentalCloud Pro • Studio Odontoiatrico Dott. Riva
                </h1>
                <span className="text-[10px] bg-sky-100 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full font-bold">
                  GESTIONALE STANDALONE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Piattaforma Odontoiatrica Moderna: Gestione Poltrone, Recall Igiene 6 Mesi & Automazioni WhatsApp
              </p>
            </div>
          </div>

          {/* Software Top Navigation */}
          <div className="flex items-center bg-sky-50/80 p-1 rounded-2xl border border-sky-200/80 text-xs">
            <button
              onClick={() => setActiveTab("agenda")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "agenda"
                  ? "bg-white text-sky-800 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Agenda & Poltrone</span>
            </button>

            <button
              onClick={() => setActiveTab("recalls")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "recalls"
                  ? "bg-white text-sky-800 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Recall Igiene (6 Mesi)</span>
            </button>

            <button
              onClick={() => setActiveTab("patient-booking")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "patient-booking"
                  ? "bg-white text-sky-800 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>Sito Prenotazione Paziente</span>
            </button>

            <button
              onClick={() => setActiveTab("render-deploy")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "render-deploy"
                  ? "bg-white text-sky-800 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>📦 Deploy su Render</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Alert / Toast */}
      {toastMessage && (
        <div className="bg-sky-900 text-white px-5 py-3 text-xs flex items-center justify-between gap-4 sticky top-16 z-30 shadow-md animate-fade-in">
          <div className="flex items-center gap-2 max-w-4xl font-medium">
            <MessageSquare className="w-4 h-4 text-sky-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs text-sky-200 hover:text-white underline font-bold shrink-0"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: AGENDA & GESTIONE POLTRONE */}
        {activeTab === "agenda" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top KPI Odontoiatrici */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Occupazione Poltrone Oggi</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    92%
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">{appointments.length} Pazienti</div>
                <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Entrambe le poltrone operative
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>No-Show Questo Mese</span>
                  <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full">
                    -94%
                  </span>
                </div>
                <div className="text-2xl font-black text-emerald-600 mt-1">0 Saltati</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Grazie a promemoria 24h WhatsApp
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Ore Centralino Risparmiate</span>
                  <span className="text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full">
                    Oggi
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">3.2 Ore</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  70% prenotazioni ricevute online
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Fatturato Stimato in Poltrona</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                    Oggi
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {totalAmountToday.toLocaleString()} €
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {appointments.length} visite programmate
                </div>
              </div>
            </div>

            {/* Smart Slot-Filler Alert Box */}
            <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    Agenda Giornaliera & Gestione Poltrone
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sincronizzazione oraria tra Dott. Riva (Chirurgia/Conservativa) e Dott.ssa Galli (Igiene e Sbiancamenti).
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedChair("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedChair === "all"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Tutte le Poltrone ({appointments.length})
                  </button>
                  <button
                    onClick={() => setSelectedChair("p1")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedChair === "p1"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Poltrona 1 (Dott. Riva)
                  </button>
                  <button
                    onClick={() => setSelectedChair("p2")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedChair === "p2"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Poltrona 2 (Igiene)
                  </button>

                  <button
                    onClick={handleTriggerSlotFiller}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Test Slot-Filler Disdette</span>
                  </button>
                </div>
              </div>

              {/* Table of appointments */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                    <tr>
                      <th className="py-3 px-4">Paziente Odontoiatrico</th>
                      <th className="py-3 px-4">Trattamento Previsto</th>
                      <th className="py-3 px-4">Poltrona & Medico</th>
                      <th className="py-3 px-4">Orario Seduta</th>
                      <th className="py-3 px-4">Stato Promemoria WhatsApp</th>
                      <th className="py-3 px-4 text-right">Tariffa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredAppts.map((appt) => (
                      <tr key={appt.id} className="hover:bg-sky-50/30 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{appt.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{appt.phone}</div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {appt.treatment}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              appt.chair.includes("Poltrona 1")
                                ? "bg-sky-100 text-sky-800 border border-sky-200"
                                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            }`}
                          >
                            {appt.chair}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">
                          {appt.time}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <MessageSquare className="w-3 h-3 text-emerald-600" />
                            {appt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                          {appt.amount} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECALL IGIENE AUTOMATICO (6 MESI) - Il modulo più richiesto dai dentisti! */}
        {activeTab === "recalls" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Modulo Automatico Richiamo Semestrale
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Pazienti da Richiamare per Igiene Dentale Semestrale
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Il vero motore economico dello studio odontoiatrico: richiama in automatico su WhatsApp i pazienti a 6 mesi dall&apos;ultima pulizia per riempire le poltrone future.
                  </p>
                </div>

                <button
                  onClick={() => {
                    recallPatients.forEach((p) => handleSendRecallWhatsApp(p.id, p.name));
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Invia WhatsApp a Tutti i Pazienti in Scadenza</span>
                </button>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-emerald-50/70 text-slate-700 font-bold border-b border-emerald-100">
                    <tr>
                      <th className="py-3 px-4">Paziente</th>
                      <th className="py-3 px-4">Cellulare</th>
                      <th className="py-3 px-4">Ultima Seduta Igiene</th>
                      <th className="py-3 px-4">Stato Recall</th>
                      <th className="py-3 px-4 text-center">Azione Rapida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {recallPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-emerald-50/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{p.phone}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{p.lastVisit}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status.includes("✅")
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleSendRecallWhatsApp(p.id, p.name)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition inline-flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Invia Recall WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMARTPHONE DEL PAZIENTE (VISTA MOBILE) */}
        {activeTab === "patient-booking" && (
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Esperienza Paziente da Cellulare
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Come prenota un paziente alle 22:30 sul tuo sito
              </h3>
              <p className="text-xs text-slate-500">
                Nessuna registrazione complessa: 3 passaggi, 30 secondi.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-3xl p-5 border border-slate-200 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  1. Scegli Prestazione Odontoiatrica:
                </label>
                <div className="space-y-1.5">
                  {dentalServices.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setBookingService(s.name)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                        bookingService === s.name
                          ? "bg-sky-50 border-sky-500 font-bold text-sky-950"
                          : "bg-white border-slate-200 text-slate-700 hover:border-sky-300"
                      }`}
                    >
                      <div>
                        <div className="font-bold">{s.name}</div>
                        <div className="text-[10px] text-slate-400">{s.duration} • {s.chair}</div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  2. Scegli Giorno e Orario Disponibile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setBookingSlot(slot)}
                      className={`p-2 rounded-xl border text-xs text-center font-bold transition ${
                        bookingSlot === slot
                          ? "bg-sky-600 border-sky-600 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-700 hover:border-sky-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">3. I tuoi dati:</label>
                  <button
                    onClick={handleQuickFill}
                    className="text-[10px] text-sky-700 hover:underline font-bold"
                  >
                    ✨ Compila con 1 Clic
                  </button>
                </div>
                <input
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="Nome e Cognome (Es. Alessandro Galli)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 mb-2 focus:outline-none focus:border-sky-500"
                />
                <input
                  type="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  placeholder="Cellulare per WhatsApp (Es. +39 347 555 1234)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                onClick={handleConfirmPatientBooking}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Conferma Prenotazione (Vedi sulla Dashboard dello Studio)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: ISTRUZIONI PER DEPLOY SU RENDER CON LINK SEPARATO */}
        {activeTab === "render-deploy" && (
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Pubblicazione su Render.com
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Come Pubblicare Questa Demo Odontoiatrica su Render con il tuo Link
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Puoi pubblicare questo gestionale dentale come Web Service autonomo su Render.com (es. <code>studiodentisticodemo.onrender.com</code>).
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
                <div className="font-bold text-sm text-sky-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">1</span>
                  Crea una Repository GitHub
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
                  Carica questo progetto su una repository GitHub privata o pubblica (es. <code>gestionale-dentistico-demo</code>).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
                <div className="font-bold text-sm text-sky-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">2</span>
                  Collega Render a GitHub
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
                  Vai su <strong>Render.com</strong> &gt; <em>New +</em> &gt; <em>Web Service</em> &gt; Seleziona la repository.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
                <div className="font-bold text-sm text-sky-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">3</span>
                  Comandi di Build e Start su Render
                </div>
                <div className="pl-8 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Build Command:</span>
                    <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[11px] mt-1">npm install && npm run build</pre>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Start Command:</span>
                    <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[11px] mt-1">npm start</pre>
                  </div>
                  <div className="text-slate-500 pt-1">
                    Render imposta automaticamente la porta 3000 o 10000 e ti fornirà un link HTTPS pubblico e gratuito!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Render Export & Deployment Modal */}
      <RenderExportModal
        isOpen={isRenderModalOpen}
        onClose={() => setIsRenderModalOpen(false)}
        sector="dentistico"
      />
    </div>
  );
}
