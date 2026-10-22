"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  HeartPulse,
  Activity
} from "lucide-react";

interface VetAppointment {
  id: string;
  petName: string;
  petType: "Cane" | "Gatto" | "Coniglio/Esotico";
  ownerName: string;
  phone: string;
  service: string;
  room: "Ambulatorio 1 (Cani)" | "Ambulatorio 2 (Gatti & Esotici)" | "Sala Ecografia";
  time: string;
  isUrgent: boolean;
  status: "Confermato WhatsApp" | "Promemoria Inviato" | "Nuova Prenotazione";
}

export const VeterinaryClinicApp: React.FC = () => {
  // Mode switcher: Pet Owner Booking Portal vs Veterinary Backoffice Dashboard
  const [viewMode, setViewMode] = useState<"patient" | "dashboard">("dashboard");

  // Pet Owner Booking Flow State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPetType, setSelectedPetType] = useState<"Cane" | "Gatto" | "Coniglio/Esotico">("Cane");
  const [selectedService, setSelectedService] = useState<string>("vaccino");
  const [selectedSlot, setSelectedSlot] = useState<string>("Domani 11:00");
  const [petName, setPetName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>("all");
  const [lastNotificationMsg, setLastNotificationMsg] = useState<string | null>(null);

  // Initial appointments list for Veterinary Clinic Demo
  const [appointments, setAppointments] = useState<VetAppointment[]>([
    {
      id: "VET-201",
      petName: "Milo (Labrador)",
      petType: "Cane",
      ownerName: "Chiara Rinaldi",
      phone: "+39 349 112 3344",
      service: "Richiamo Vaccinale & Antiparassitario",
      room: "Ambulatorio 1 (Cani)",
      time: "09:00 - 09:30",
      isUrgent: false,
      status: "Confermato WhatsApp",
    },
    {
      id: "VET-202",
      petName: "Luna (Europeo)",
      petType: "Gatto",
      ownerName: "Federico Bisi",
      phone: "+39 335 778 9900",
      service: "Controllo Cute & Prurito Orecchie",
      room: "Ambulatorio 2 (Gatti & Esotici)",
      time: "09:45 - 10:15",
      isUrgent: false,
      status: "Promemoria Inviato",
    },
    {
      id: "VET-203",
      petName: "Thor (Pastore Tedesco)",
      petType: "Cane",
      ownerName: "Davide Marini",
      phone: "+39 340 998 1122",
      service: "Ecografia Addominale Specialistica",
      room: "Sala Ecografia",
      time: "10:30 - 11:15",
      isUrgent: false,
      status: "Confermato WhatsApp",
    },
    {
      id: "VET-204",
      petName: "Rocky (Bulldog)",
      petType: "Cane",
      ownerName: "Sara Moretti",
      phone: "+39 348 333 4455",
      service: "Sospetta Ingestione Corpo Estraneo (Urgenza)",
      room: "Ambulatorio 1 (Cani)",
      time: "11:30 - 12:00",
      isUrgent: true,
      status: "Nuova Prenotazione",
    },
    {
      id: "VET-205",
      petName: "Oliver (Maine Coon)",
      petType: "Gatto",
      ownerName: "Anna Beretta",
      phone: "+39 331 445 6677",
      service: "Visita Clinica Generale & Pesatura",
      room: "Ambulatorio 2 (Gatti & Esotici)",
      time: "15:00 - 15:30",
      status: "Confermato WhatsApp",
      isUrgent: false,
    },
  ]);

  const vetServices = [
    {
      id: "vaccino",
      name: "Richiamo Vaccinale & Antiparassitario",
      duration: "25 min",
      price: "55 €",
      note: "Porta con te il libretto sanitario del pet.",
      room: "Ambulatorio 1 (Cani)" as const,
    },
    {
      id: "visita",
      name: "Visita Clinica Generale",
      duration: "30 min",
      price: "60 €",
      note: "Controllo battito, peso, dentizione e stato generale.",
      room: "Ambulatorio 1 (Cani)" as const,
    },
    {
      id: "cute",
      name: "Controllo Dermatologia & Orecchie",
      duration: "30 min",
      price: "70 €",
      note: "Esame citologico rapido e controllo parassiti.",
      room: "Ambulatorio 2 (Gatti & Esotici)" as const,
    },
    {
      id: "ecografia",
      name: "Ecografia Addominale",
      duration: "40 min",
      price: "95 €",
      note: "Tenere il paziente a digiuno da 8 ore prima dell'esame.",
      room: "Sala Ecografia" as const,
    },
  ];

  const availableSlots = [
    { day: "Oggi", time: "16:00", room: "Amb. 1 (Cani)" },
    { day: "Oggi", time: "17:30", room: "Amb. 2 (Gatti)" },
    { day: "Domani", time: "10:00", room: "Amb. 1 (Cani)" },
    { day: "Domani", time: "11:00", room: "Amb. 2 (Gatti)" },
    { day: "Venerdì", time: "15:30", room: "Sala Eco" },
    { day: "Venerdì", time: "17:00", room: "Amb. 1 (Cani)" },
  ];

  const handleQuickFill = () => {
    setPetName("Milo (Beagle)");
    setOwnerName("Valentina Colombo");
    setOwnerPhone("+39 347 123 9876");
  };

  const handleConfirmBooking = () => {
    const srv = vetServices.find((s) => s.id === selectedService) || vetServices[0];
    const pName = petName.trim() || "Pet Demo";
    const oName = ownerName.trim() || "Proprietario Demo";
    const phone = ownerPhone.trim() || "+39 340 123 4567";

    const newAppt: VetAppointment = {
      id: `VET-${Math.floor(200 + Math.random() * 800)}`,
      petName: pName,
      petType: selectedPetType,
      ownerName: oName,
      phone: phone,
      service: srv.name,
      room: selectedPetType === "Gatto" ? "Ambulatorio 2 (Gatti & Esotici)" : srv.room,
      time: selectedSlot,
      isUrgent: false,
      status: "Confermato WhatsApp",
    };

    setAppointments([newAppt, ...appointments]);
    setLastNotificationMsg(
      `💬 Notifica WhatsApp inviata a ${oName}: "Gentile ${oName}, la visita di ${pName} per ${srv.name} è confermata per ${selectedSlot} alla Clinica San Rocco. Ricorda di portare il libretto sanitario!"`
    );
    setBookingStep(4);
  };

  const handleSimulateWhatsApp = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Confermato WhatsApp" } : a))
    );
    const target = appointments.find((a) => a.id === id);
    if (target) {
      setLastNotificationMsg(
        `💬 Promemoria WhatsApp inviato a ${target.ownerName}: "Ti ricordiamo la visita di ${target.petName} domani alle ${target.time}. Rispondi OK per confermare."`
      );
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (selectedRoomFilter === "amb1") return a.room.includes("Ambulatorio 1");
    if (selectedRoomFilter === "amb2") return a.room.includes("Ambulatorio 2");
    if (selectedRoomFilter === "eco") return a.room.includes("Sala Ecografia");
    return true;
  });

  return (
    <div className="bg-white border border-teal-100 rounded-3xl overflow-hidden shadow-xl shadow-teal-900/5">
      {/* Top Demo Bar - Soft Celestino & Mint Healthcare Theme */}
      <div className="bg-gradient-to-r from-teal-50/80 via-white to-sky-50/70 px-5 sm:px-7 py-4 border-b border-teal-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-teal-600/20">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Clinica Veterinaria San Rocco
              </h3>
              <span className="text-[10px] bg-teal-100 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-bold">
                DEMO CLINICA ATTIVA
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Prenotazione Proprietari Pet + Cruscotto Medico con Triage e Promemoria Vaccini
            </p>
          </div>
        </div>

        {/* View Switcher: Pet Owner Portal vs Clinic Backoffice */}
        <div className="flex items-center bg-teal-100/70 p-1 rounded-2xl border border-teal-200/80 text-xs">
          <button
            onClick={() => setViewMode("dashboard")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              viewMode === "dashboard"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="w-4 h-4 text-teal-600" />
            <span>1. Dashboard Clinica & Triage</span>
          </button>

          <button
            onClick={() => setViewMode("patient")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              viewMode === "patient"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-4 h-4 text-teal-600" />
            <span>2. Portale Proprietario Pet (Mobile)</span>
          </button>
        </div>
      </div>

      {/* Floating Simulated WhatsApp Toast */}
      {lastNotificationMsg && (
        <div className="bg-teal-50 border-b border-teal-200 px-5 py-2.5 text-xs text-teal-900 flex items-center justify-between gap-3 animate-fade-in font-medium">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{lastNotificationMsg}</span>
          </div>
          <button
            onClick={() => setLastNotificationMsg(null)}
            className="text-[11px] text-teal-700 hover:text-teal-950 underline font-bold shrink-0"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* MAIN VIEW: VETERINARY CLINIC DASHBOARD */}
      {viewMode === "dashboard" && (
        <div className="p-5 sm:p-7 lg:p-8 space-y-6 bg-slate-50/50">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Pazienti Pet Oggi</span>
                <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full text-[11px]">
                  In orario
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">{appointments.length} Visite</div>
              <div className="text-[11px] text-teal-600 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Nessun ritardo in sala d&apos;attesa
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Telefonate Vaccini Ridotte</span>
                <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full text-[11px]">
                  -78%
                </span>
              </div>
              <div className="text-2xl font-black text-sky-700 mt-1">28 Evitate</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Proprietari che prenotano in autonomia
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Ore Centralino Risparmiate</span>
                <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full text-[11px]">
                  Staff
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">3.1 Ore/gg</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Più tempo per assistere gli animali al bancone
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Stato Triage Urgenze</span>
                <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full text-[11px]">
                  1 Urgente
                </span>
              </div>
              <div className="text-2xl font-black text-rose-600 mt-1">Slot Protetto</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Finestra emergenza sempre riservata
              </div>
            </div>
          </div>

          {/* Agenda & Ambulatori */}
          <div className="bg-white rounded-2xl border border-teal-100 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Agenda del Giorno & Registro Triage Pet
                </h4>
                <p className="text-xs text-slate-500">
                  Separazione automatica tra visite di routine (vaccini/controlli) e urgenze cliniche.
                </p>
              </div>

              {/* Filters & Action */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRoomFilter("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedRoomFilter === "all"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Tutti ({appointments.length})
                </button>
                <button
                  onClick={() => setSelectedRoomFilter("amb1")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedRoomFilter === "amb1"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Amb. 1 Cani
                </button>
                <button
                  onClick={() => setSelectedRoomFilter("amb2")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedRoomFilter === "amb2"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Amb. 2 Gatti
                </button>

                <button
                  onClick={() => setViewMode("patient")}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Simula Nuova Visita Pet
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-teal-50/70 text-slate-700 font-bold border-b border-teal-100">
                  <tr>
                    <th className="py-3 px-4">Paziente Pet</th>
                    <th className="py-3 px-4">Specie</th>
                    <th className="py-3 px-4">Motivo Visita</th>
                    <th className="py-3 px-4">Ambulatorio</th>
                    <th className="py-3 px-4">Orario</th>
                    <th className="py-3 px-4">Stato WhatsApp</th>
                    <th className="py-3 px-4 text-center">Azione</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className={`hover:bg-teal-50/30 transition ${
                        appt.isUrgent ? "bg-rose-50/60" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {appt.petName}
                          {appt.isUrgent && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[9px] font-black uppercase">
                              URGENZA
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Proprietario: {appt.ownerName} ({appt.phone})
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {appt.petType === "Cane" ? "🐶 Cane" : appt.petType === "Gatto" ? "🐱 Gatto" : "🐰 Altro"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {appt.service}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {appt.room}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {appt.time}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            appt.status === "Confermato WhatsApp"
                              ? "bg-teal-50 text-teal-700 border border-teal-200"
                              : "bg-sky-50 text-sky-700 border border-sky-200"
                          }`}
                        >
                          <MessageSquare className="w-3 h-3 text-teal-600" />
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleSimulateWhatsApp(appt.id)}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-[11px] font-bold transition"
                        >
                          Richiama 💬
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

      {/* PATIENT VIEW: PET OWNER MOBILE PORTAL */}
      {viewMode === "patient" && (
        <div className="p-5 sm:p-7 lg:p-8 bg-slate-50/40 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Explanations */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5 text-teal-600" />
              Esperienza Proprietario Pet
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Niente più attese al telefono per fissare un vaccino
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Il proprietario seleziona la specie (cane, gatto, coniglio), il tipo di controllo e l&apos;orario in 30 secondi. Riceve su WhatsApp le indicazioni necessarie (libretto sanitario o eventuale digiuno).
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">1. Seleziona il tipo di pet e motivo</span>
                <span className="text-xs font-mono text-teal-700 font-bold">10 secondi</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">2. Sceglie lo slot libero del medico</span>
                <span className="text-xs font-mono text-teal-700 font-bold">5 secondi</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-sm flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">3. Conferma con nome pet e cellulare</span>
                <span className="text-xs font-mono text-teal-700 font-bold">10 secondi</span>
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
              >
                Torna al cruscotto clinica 👉
              </button>
            </div>
          </div>

          {/* Smartphone Simulator */}
          <div className="w-full max-w-[360px] bg-white p-3.5 rounded-[42px] border-4 border-slate-200 shadow-2xl shadow-teal-950/10">
            <div className="w-24 h-4 bg-slate-200 rounded-full mx-auto mb-3"></div>

            <div className="bg-slate-50/80 rounded-[28px] overflow-hidden border border-slate-200 text-slate-800 min-h-[530px] flex flex-col justify-between">
              {/* Vet Mobile Header - Clean Teal/Celestino */}
              <div className="bg-gradient-to-r from-teal-600 to-sky-600 p-4 text-white">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    Clinica Veterinaria
                  </span>
                  <span className="font-mono text-teal-100">Pronto Soccorso h24</span>
                </div>
                <h4 className="font-black text-base">Clinica San Rocco</h4>
                <p className="text-xs text-teal-100">Prenota la visita del tuo pet in 30 secondi</p>

                {/* Progress bar */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 1 ? "bg-white" : "bg-white/30"}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 2 ? "bg-white" : "bg-white/30"}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${bookingStep >= 3 ? "bg-white" : "bg-white/30"}`}></div>
                </div>
              </div>

              {/* Step 1: Select Pet & Service */}
              {bookingStep === 1 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      1. Tipo di Pet & Servizio
                    </span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">1 di 3</span>
                  </div>

                  {/* Pet Selector */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["Cane", "Gatto", "Coniglio/Esotico"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedPetType(type)}
                        className={`py-2 px-1 rounded-xl text-center border text-[11px] font-bold transition ${
                          selectedPetType === type
                            ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        {type === "Cane" ? "🐶 Cane" : type === "Gatto" ? "🐱 Gatto" : "🐰 Altro"}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 pt-1">
                    {vetServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          setSelectedService(srv.id);
                          setBookingStep(2);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl border transition flex items-center justify-between shadow-xs ${
                          selectedService === srv.id
                            ? "bg-teal-50 border-teal-400 text-teal-950"
                            : "bg-white border-slate-200 text-slate-800 hover:border-teal-300"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-900">{srv.name}</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {srv.duration} • <span className="text-teal-700 font-semibold">{srv.note}</span>
                          </div>
                        </div>
                        <div className="text-xs font-black text-slate-900">{srv.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Slot Selection */}
              {bookingStep === 2 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      2. Scegli Giorno & Orario
                    </span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">2 di 3</span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Disponibilità aggiornate per {selectedPetType}:
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
                              ? "bg-teal-600 border-teal-600 text-white font-bold shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:border-teal-300"
                          }`}
                        >
                          <div className="text-[10px] opacity-80">{slot.day}</div>
                          <div className="text-sm font-black mt-0.5">{slot.time}</div>
                          <div className="text-[9px] opacity-75">{slot.room}</div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setBookingStep(3)}
                    className="w-full mt-3 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Continua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Step 3: Owner & Pet Info */}
              {bookingStep === 3 && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      3. Dati Proprietario e Pet
                    </span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">3 di 3</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] text-slate-600 font-semibold block mb-1">Nome del tuo Animale ({selectedPetType})</label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Es. Milo (Golden Retriever)"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 font-semibold block mb-1">Il tuo Nome e Cognome</label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Es. Valentina Colombo"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 font-semibold block mb-1">Cellulare (per Promemoria WhatsApp)</label>
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="Es. +39 347 123 9876"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleQuickFill}
                    className="text-[11px] text-teal-700 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    ✨ Compila automaticamente per test
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full mt-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Conferma Visita in 1 Clic
                  </button>
                </div>
              )}

              {/* Step 4: Success */}
              {bookingStep === 4 && (
                <div className="p-4 space-y-4 text-center flex-1 overflow-y-auto">
                  <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto border border-teal-200">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">Visita Conclusa con Successo!</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      L&apos;ambulatorio ha registrato l&apos;appuntamento in tempo reale.
                    </p>
                  </div>

                  <div className="text-left bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-xs space-y-1">
                    <div className="font-bold text-teal-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                      Notifica WhatsApp Inviata:
                    </div>
                    <p className="text-[11px] text-teal-950 leading-relaxed font-sans">
                      &ldquo;Gentile {ownerName || "Valentina"}, confermiamo la visita per {petName || "Milo"} ({selectedPetType}) il {selectedSlot} alla Clinica San Rocco. Ricorda di portare il libretto sanitario!&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => setViewMode("dashboard")}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    Vedi la visita inserita nel Triage Clinica 👉
                  </button>
                </div>
              )}

              {/* Footer Phone */}
              <div className="bg-white p-2.5 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                <span>Nessuna app da scaricare • Portale Rapido Pet</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
