"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  Users,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  User,
  ArrowRight,
  Smile,
  Layers,
  Euro
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  chair: "Poltrona 1 (Dott. Riva)" | "Poltrona 2 (Igiene & Prev.)";
  time: string;
  status: "Confermato WhatsApp" | "Promemoria Inviato" | "Nuova Prenotazione" | "Completato";
  amount: number;
}

export const DentalStudioApp: React.FC = () => {
  // Mode switcher: Patient Booking Site vs Staff Backoffice Dashboard
  const [viewMode, setViewMode] = useState<"patient" | "dashboard">("dashboard");

  // Patient Booking Flow state
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<string>("igiene");
  const [selectedSlot, setSelectedSlot] = useState<string>("Domani 10:15");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [selectedChair, setSelectedChair] = useState<"all" | "p1" | "p2">("all");
  const [lastNotificationMsg, setLastNotificationMsg] = useState<string | null>(null);

  // Initial appointments list for demo
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "APT-101",
      patientName: "Marco Ferri",
      phone: "+39 348 912 3456",
      service: "Igiene Orale & Detartrasi",
      chair: "Poltrona 2 (Igiene & Prev.)",
      time: "09:30 - 10:15",
      status: "Confermato WhatsApp",
      amount: 90,
    },
    {
      id: "APT-102",
      patientName: "Elena Villa",
      phone: "+39 333 456 7890",
      service: "Prima Visita & Piano di Cura",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "10:30 - 11:15",
      status: "Promemoria Inviato",
      amount: 80,
    },
    {
      id: "APT-103",
      patientName: "Giorgio Fontana",
      phone: "+39 340 789 1234",
      service: "Controllo Allineatori Invisalign",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "11:30 - 12:00",
      status: "Confermato WhatsApp",
      amount: 60,
    },
    {
      id: "APT-104",
      patientName: "Silvia Brambilla",
      phone: "+39 349 221 8844",
      service: "Urgenza Dolore Molare",
      chair: "Poltrona 1 (Dott. Riva)",
      time: "15:00 - 15:30",
      status: "Nuova Prenotazione",
      amount: 95,
    },
    {
      id: "APT-105",
      patientName: "Roberto Conti",
      phone: "+39 338 654 3210",
      service: "Igiene Orale Semestrale",
      chair: "Poltrona 2 (Igiene & Prev.)",
      time: "16:00 - 16:45",
      status: "Confermato WhatsApp",
      amount: 90,
    },
  ]);

  const dentalServices = [
    {
      id: "igiene",
      name: "Igiene Orale Professionale",
      duration: "45 min",
      price: 90,
      description: "Pulizia profonda con ultrasuoni e lucidatura con polveri delicate.",
      tag: "Consigliato ogni 6 mesi",
      chair: "Poltrona 2 (Igiene & Prev.)" as const,
    },
    {
      id: "visita",
      name: "Prima Visita Odontoiatrica & Check-Up",
      duration: "40 min",
      price: 70,
      description: "Esame clinico completo con telecamera intraorale e piano di cura.",
      tag: "Nuovi Pazienti",
      chair: "Poltrona 1 (Dott. Riva)" as const,
    },
    {
      id: "urgenza",
      name: "Urgenza Mal di Dente / Frattura",
      duration: "30 min",
      price: 85,
      description: "Intervento tempestivo per sollievo dolore immediato o riparazione rapida.",
      tag: "Disponibilità Giornata",
      chair: "Poltrona 1 (Dott. Riva)" as const,
    },
    {
      id: "ortodonzia",
      name: "Valutazione Allineatori Trasparenti",
      duration: "30 min",
      price: 60,
      description: "Scansione 3D delle arcate per ortodonzia invisibile e simulazione sorriso.",
      tag: "Visita Specialistica",
      chair: "Poltrona 1 (Dott. Riva)" as const,
    },
  ];

  const availableSlots = [
    { day: "Oggi", time: "16:30", p: "Poltrona 1" },
    { day: "Oggi", time: "17:45", p: "Poltrona 2" },
    { day: "Domani", time: "10:15", p: "Poltrona 2" },
    { day: "Domani", time: "11:30", p: "Poltrona 1" },
    { day: "Venerdì", time: "15:00", p: "Poltrona 1" },
    { day: "Venerdì", time: "16:15", p: "Poltrona 2" },
  ];

  const handleQuickFill = () => {
    setPatientName("Alessandro Galli");
    setPatientPhone("+39 347 555 1234");
  };

  const handleConfirmBooking = () => {
    const srv = dentalServices.find((s) => s.id === selectedService) || dentalServices[0];
    const name = patientName.trim() || "Paziente Demo";
    const phone = patientPhone.trim() || "+39 340 123 4567";

    const newAppt: Appointment = {
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      patientName: name,
      phone: phone,
      service: srv.name,
      chair: srv.chair,
      time: selectedSlot,
      status: "Confermato WhatsApp",
      amount: srv.price,
    };

    setAppointments([newAppt, ...appointments]);
    setLastNotificationMsg(
      `💬 Notifica WhatsApp inviata a ${name} (${phone}): "Gentile ${name}, il tuo appuntamento per ${srv.name} è confermato per ${selectedSlot} presso lo Studio Odontoiatrico Dott. Riva. Ti invieremo un promemoria 24h prima."`
    );
    setBookingStep(4);
  };

  const handleSimulateWhatsAppReminder = (apptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apptId ? { ...a, status: "Confermato WhatsApp" } : a))
    );
    const target = appointments.find((a) => a.id === apptId);
    if (target) {
      setLastNotificationMsg(
        `💬 Promemoria WhatsApp inviato a ${target.patientName}: "Ricordiamo l'appuntamento di domani alle ${target.time}. Rispondi CONFERMA o chiama lo studio per variazioni."`
      );
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (selectedChair === "p1") return a.chair.includes("Poltrona 1");
    if (selectedChair === "p2") return a.chair.includes("Poltrona 2");
    return true;
  });

  const totalTodayAmount = appointments.reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-xl shadow-sky-900/5">
      {/* Top Demo Bar - Light Celestino Theme */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50/60 px-5 sm:px-7 py-4 border-b border-sky-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-600/20">
            🦷
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Studio Odontoiatrico Dott. Riva
              </h3>
              <span className="text-[10px] bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-full font-bold">
                DEMO STUDIO ATTIVA
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Prenotazione Paziente da Smartphone & Cruscotto Gestione Poltrone per la Segreteria
            </p>
          </div>
        </div>

        {/* View Switcher: Patient Site vs Staff Dashboard */}
        <div className="flex items-center bg-sky-100/70 p-1 rounded-2xl border border-sky-200/80 text-xs">
          <button
            onClick={() => setViewMode("dashboard")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              viewMode === "dashboard"
                ? "bg-white text-sky-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="w-4 h-4 text-sky-600" />
            <span>1. Dashboard Segreteria & Poltrone</span>
          </button>

          <button
            onClick={() => setViewMode("patient")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              viewMode === "patient"
                ? "bg-white text-sky-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-4 h-4 text-sky-600" />
            <span>2. Portale Prenotazione Paziente (Mobile)</span>
          </button>
        </div>
      </div>

      {/* Floating Simulated WhatsApp Toast */}
      {lastNotificationMsg && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 text-xs text-emerald-800 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2 font-medium">
            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{lastNotificationMsg}</span>
          </div>
          <button
            onClick={() => setLastNotificationMsg(null)}
            className="text-[11px] text-emerald-700 hover:text-emerald-950 underline font-bold shrink-0"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* MAIN VIEW: STAFF DASHBOARD (LIGHT CELESTINO THEME) */}
      {viewMode === "dashboard" && (
        <div className="p-5 sm:p-7 lg:p-8 space-y-6 bg-slate-50/50">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Occupazione Poltrone Oggi</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                  92%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">11 / 12 Slot</div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Nessun buco scoperto oggi
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>No-Show Azzerati Questo Mese</span>
                <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full text-[11px]">
                  -94%
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-600 mt-1">0 Saltati</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Con i promemoria automatici WhatsApp
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Ore Centralino Risparmiate</span>
                <span className="text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full text-[11px]">
                  Oggi
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">2.8 Ore</div>
              <div className="text-[11px] text-slate-500 mt-1">
                72% prenotazioni arrivate fuori orario
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Valore Visite in Agenda Oggi</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full text-[11px]">
                  €
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {totalTodayAmount.toLocaleString()} €
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {appointments.length} visite pianificate
              </div>
            </div>
          </div>

          {/* Agenda & Poltrone Controller */}
          <div className="bg-white rounded-2xl border border-sky-100 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Agenda del Giorno & Gestione Poltrone
                </h4>
                <p className="text-xs text-slate-500">
                  Sincronizzazione istantanea: gli appuntamenti presi da cellulare appaiono in tempo reale.
                </p>
              </div>

              {/* Poltrona filter */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={() => setSelectedChair("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedChair === "all"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-150 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Tutte ({appointments.length})
                </button>
                <button
                  onClick={() => setSelectedChair("p1")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedChair === "p1"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Poltrona 1 (Dott. Riva)
                </button>
                <button
                  onClick={() => setSelectedChair("p2")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedChair === "p2"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Poltrona 2 (Igiene)
                </button>

                <button
                  onClick={() => setViewMode("patient")}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Simula Nuova Prenotazione Paziente
                </button>
              </div>
            </div>

            {/* Appointments Table in Light Theme */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                  <tr>
                    <th className="py-3 px-4">Paziente</th>
                    <th className="py-3 px-4">Trattamento</th>
                    <th className="py-3 px-4">Poltrona Assegnata</th>
                    <th className="py-3 px-4">Orario</th>
                    <th className="py-3 px-4">Stato WhatsApp</th>
                    <th className="py-3 px-4 text-right">Tariffa</th>
                    <th className="py-3 px-4 text-center">Azioni Rapide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-sky-50/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{appt.patientName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{appt.phone}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {appt.service}
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            appt.status === "Confermato WhatsApp"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : appt.status === "Promemoria Inviato"
                              ? "bg-sky-50 text-sky-700 border border-sky-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                        {appt.amount} €
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleSimulateWhatsAppReminder(appt.id)}
                          title="Invia promemoria WhatsApp"
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold transition"
                        >
                          WhatsApp 💬
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Value Proposition Note for the Web Agency */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-start gap-3 text-xs text-sky-900">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-950 font-bold">Cosa mostri al Titolare dello Studio Dentistico:</strong>
              <p className="mt-0.5 leading-relaxed text-sky-800">
                La segreteria non deve più passare la mattina ad attaccarsi al telefono per confermare le presenze. Il sistema sincronizza tutto in automatico su WhatsApp, mantenendo le poltrone sempre piene e organizzate tra medici e igienisti.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PATIENT VIEW: MOBILE PHONE PORTAL (LIGHT CLINICAL THEME) */}
      {viewMode === "patient" && (
        <div className="p-5 sm:p-7 lg:p-8 bg-slate-50/40 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left instructions */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              Esperienza Smartphone Paziente
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Come prenota il paziente dal divano alle 22:30
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mettiti nei panni di una persona con mal di denti o che desidera fissare l&apos;igiene semestrale. Apre il link dal profilo Instagram o dalla scheda Google:{" "}
              <strong className="text-sky-700 font-bold">nessuna registrazione lunga</strong>, nessun codice fiscale richiesto all&apos;inizio.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">1. Clicca sul trattamento desiderato</span>
                <span className="text-xs font-mono text-sky-700 font-bold">10 secondi</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">2. Seleziona l&apos;orario disponibile</span>
                <span className="text-xs font-mono text-sky-700 font-bold">5 secondi</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">3. Conferma con nome e cellulare</span>
                <span className="text-xs font-mono text-sky-700 font-bold">10 secondi</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setBookingStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium shadow-sm transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Ricomincia il flusso
              </button>
              <button
                onClick={() => setViewMode("dashboard")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
              >
                Torna al cruscotto segreteria 👉
              </button>
            </div>
          </div>

          {/* Smartphone Simulator - Light Medical Aesthetic */}
          <div className="w-full max-w-[360px] bg-white p-3.5 rounded-[42px] border-4 border-slate-200 shadow-2xl shadow-sky-950/10">
            <div className="w-24 h-4 bg-slate-200 rounded-full mx-auto mb-3"></div>

            <div className="bg-slate-50/80 rounded-[28px] overflow-hidden border border-slate-200 text-slate-800 min-h-[530px] flex flex-col justify-between">
              {/* Dental Studio Mobile Header - Clean Celestino */}
              <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-4 text-white">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    Studio Odontoiatrico
                  </span>
                  <span className="font-mono text-sky-100">Aperto 24/7</span>
                </div>
                <h4 className="font-black text-base">Studio Dott. Riva</h4>
                <p className="text-xs text-sky-100">Milano Centro • Prenota in 30 secondi</p>

                {/* Step indicator */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 1 ? "bg-white" : "bg-white/30"}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 2 ? "bg-white" : "bg-white/30"}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 3 ? "bg-white" : "bg-white/30"}`}></div>
                </div>
              </div>

              {/* Step 1: Select Service */}
              {bookingStep === 1 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      1. Scegli Trattamento
                    </span>
                    <span className="text-[10px] text-sky-700 font-mono font-bold">1 di 3</span>
                  </div>

                  <div className="space-y-2">
                    {dentalServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          setSelectedService(srv.id);
                          setBookingStep(2);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between shadow-xs ${
                          selectedService === srv.id
                            ? "bg-sky-50 border-sky-400 text-sky-950"
                            : "bg-white border-slate-200 text-slate-800 hover:border-sky-300"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-900">{srv.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {srv.duration} • <span className="text-sky-700 font-semibold">{srv.tag}</span>
                          </div>
                        </div>
                        <div className="text-xs font-black text-slate-900">{srv.price} €</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Slot */}
              {bookingStep === 2 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      2. Scegli Giorno & Orario
                    </span>
                    <span className="text-[10px] text-sky-700 font-mono font-bold">2 di 3</span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Slot disponibili sincronizzati in tempo reale con l&apos;agenda:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, i) => {
                      const label = `${slot.day} ore ${slot.time}`;
                      const isSel = selectedSlot === label;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedSlot(label)}
                          className={`p-2.5 rounded-2xl border text-center transition ${
                            isSel
                              ? "bg-sky-600 border-sky-600 text-white font-bold shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:border-sky-300"
                          }`}
                        >
                          <div className="text-[10px] opacity-80">{slot.day}</div>
                          <div className="text-sm font-black mt-0.5">{slot.time}</div>
                          <div className="text-[9px] opacity-75">{slot.p}</div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setBookingStep(3)}
                    className="w-full mt-3 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Continua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Step 3: Patient Info */}
              {bookingStep === 3 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      3. Conferma Prenotazione
                    </span>
                    <span className="text-[10px] text-sky-700 font-mono font-bold">3 di 3</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-sky-900 font-medium">
                    Riceverai la conferma e il promemoria automatico direttamente su WhatsApp.
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] text-slate-600 font-semibold block mb-1">Nome e Cognome</label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Es. Mario Rossi"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 font-semibold block mb-1">Cellulare (per WhatsApp)</label>
                      <input
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Es. +39 340 123 4567"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleQuickFill}
                    className="text-[11px] text-sky-700 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    ✨ Compila automaticamente per test
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Conferma Appuntamento in 1 Clic
                  </button>
                </div>
              )}

              {/* Step 4: Success Screen with WhatsApp Preview */}
              {bookingStep === 4 && (
                <div className="p-4 space-y-4 text-center flex-1 overflow-y-auto">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">Appuntamento Fissato!</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      L&apos;orario è stato bloccato istantaneamente nell&apos;agenda dello studio.
                    </p>
                  </div>

                  <div className="text-left bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs space-y-1">
                    <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      Notifica WhatsApp Inviata:
                    </div>
                    <p className="text-[11px] text-emerald-950 leading-relaxed font-sans">
                      &ldquo;Gentile {patientName || "Alessandro Galli"}, il tuo appuntamento per{" "}
                      {dentalServices.find((s) => s.id === selectedService)?.name} è confermato per{" "}
                      {selectedSlot}. Ti invieremo un promemoria 24h prima. Studio Dott. Riva.&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => setViewMode("dashboard")}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    Vedi l&apos;appuntamento inserito nella Dashboard Staff 👉
                  </button>
                </div>
              )}

              {/* Footer Phone */}
              <div className="bg-white p-2.5 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-sky-600" />
                <span>Nessuna app da scaricare • Conforme privacy sanitaria</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
