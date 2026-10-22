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
  HeartPulse,
  Activity,
  Bell
} from "lucide-react";

interface VetPatient {
  id: string;
  petName: string;
  species: "Cane" | "Gatto" | "Coniglio/Esotico";
  ownerName: string;
  phone: string;
  reason: string;
  room: "Ambulatorio 1 (Cani)" | "Ambulatorio 2 (Gatti Cat-Friendly)" | "Sala Ecografia";
  time: string;
  isUrgent: boolean;
  status: "Confermato WhatsApp" | "Promemoria Inviato" | "Nuova Prenotazione";
}

export default function GestionaleVeterinarioPage() {
  const [activeTab, setActiveTab] = useState<"agenda" | "vaccines" | "pet-booking" | "render-deploy">("agenda");
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [roomFilter, setRoomFilter] = useState<"all" | "cani" | "gatti" | "eco">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Patient Booking Simulator State
  const [bookingPetType, setBookingPetType] = useState<"Cane" | "Gatto" | "Coniglio/Esotico">("Cane");
  const [bookingService, setBookingService] = useState("Richiamo Vaccinale & Antiparassitario");
  const [bookingSlot, setBookingSlot] = useState("Domani ore 11:00");
  const [bookingPetName, setBookingPetName] = useState("");
  const [bookingOwnerName, setBookingOwnerName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");

  // Initial appointments
  const [appointments, setAppointments] = useState<VetPatient[]>([
    {
      id: "V-201",
      petName: "Milo (Labrador)",
      species: "Cane",
      ownerName: "Chiara Rinaldi",
      phone: "+39 349 112 3344",
      reason: "Richiamo Vaccino Eptavalente & Antiparassitario",
      room: "Ambulatorio 1 (Cani)",
      time: "09:00 - 09:30",
      isUrgent: false,
      status: "Confermato WhatsApp",
    },
    {
      id: "V-202",
      petName: "Luna (Europeo)",
      species: "Gatto",
      ownerName: "Federico Bisi",
      phone: "+39 335 778 9900",
      reason: "Controllo Cute & Prurito Orecchie (Otite)",
      room: "Ambulatorio 2 (Gatti Cat-Friendly)",
      time: "09:45 - 10:15",
      isUrgent: false,
      status: "Promemoria Inviato",
    },
    {
      id: "V-203",
      petName: "Thor (Pastore Tedesco)",
      species: "Cane",
      ownerName: "Davide Marini",
      phone: "+39 340 998 1122",
      reason: "Ecografia Addominale Specialistica",
      room: "Sala Ecografia",
      time: "10:30 - 11:15",
      isUrgent: false,
      status: "Confermato WhatsApp",
    },
    {
      id: "V-204",
      petName: "Rocky (Bulldog)",
      species: "Cane",
      ownerName: "Sara Moretti",
      phone: "+39 348 333 4455",
      reason: "Sospetta Ingestione Corpo Estraneo (Urgenza Triage)",
      room: "Ambulatorio 1 (Cani)",
      time: "11:30 - 12:00",
      isUrgent: true,
      status: "Nuova Prenotazione",
    },
    {
      id: "V-205",
      petName: "Oliver (Maine Coon)",
      species: "Gatto",
      ownerName: "Anna Beretta",
      phone: "+39 331 445 6677",
      reason: "Visita Clinica Generale & Pesatura",
      room: "Ambulatorio 2 (Gatti Cat-Friendly)",
      time: "15:00 - 15:30",
      status: "Confermato WhatsApp",
      isUrgent: false,
    },
  ]);

  // Vaccine recall expiring list
  const [vaccineRecalls, setVaccineRecalls] = useState([
    {
      id: "VAC-1",
      pet: "Leo (Barboncino)",
      owner: "Francesca Neri",
      phone: "+39 338 123 4567",
      vaccine: "Antirabbica & Eptavalente",
      expiry: "Scade tra 10 giorni",
      status: "In attesa invio WhatsApp",
    },
    {
      id: "VAC-2",
      pet: "Mia (Siamese)",
      owner: "Simone Conti",
      phone: "+39 340 765 4321",
      vaccine: "Trivalente Felina (RCP)",
      expiry: "Scade tra 14 giorni",
      status: "In attesa invio WhatsApp",
    },
    {
      id: "VAC-3",
      pet: "Spike (Jack Russell)",
      owner: "Matteo Villa",
      phone: "+39 333 888 2211",
      vaccine: "Leishmaniosi & Filariosi",
      expiry: "Scade tra 5 giorni",
      status: "In attesa invio WhatsApp",
    },
  ]);

  const vetServices = [
    { name: "Richiamo Vaccino & Antiparassitario", duration: "25 min", price: "55 €", note: "Portare libretto sanitario" },
    { name: "Visita Generale & Check-Up", duration: "30 min", price: "60 €", note: "Esame obiettivo completo" },
    { name: "Dermatologia & Orecchie", duration: "30 min", price: "70 €", note: "Esame otoscopico immediato" },
    { name: "Ecografia Addominale", duration: "40 min", price: "95 €", note: "Pet a digiuno da 8 ore" },
  ];

  const availableSlots = ["Oggi ore 16:00", "Oggi ore 17:30", "Domani ore 10:00", "Domani ore 11:00"];

  const handleQuickFillPet = () => {
    setBookingPetName("Milo (Beagle)");
    setBookingOwnerName("Valentina Colombo");
    setBookingPhone("+39 347 123 9876");
  };

  const handleConfirmPetBooking = () => {
    const pName = bookingPetName.trim() || "Milo (Beagle)";
    const oName = bookingOwnerName.trim() || "Valentina Colombo";
    const phone = bookingPhone.trim() || "+39 347 123 9876";

    const newAppt: VetPatient = {
      id: `V-${Date.now().toString().slice(-3)}`,
      petName: pName,
      species: bookingPetType,
      ownerName: oName,
      phone: phone,
      reason: bookingService,
      room: bookingPetType === "Gatto" ? "Ambulatorio 2 (Gatti Cat-Friendly)" : "Ambulatorio 1 (Cani)",
      time: bookingSlot,
      isUrgent: false,
      status: "Confermato WhatsApp",
    };

    setAppointments([newAppt, ...appointments]);
    setToastMessage(`💬 WhatsApp Inviato a ${oName}: "Gentile ${oName}, la visita di ${pName} per ${bookingService} è confermata per ${bookingSlot} alla Clinica San Rocco. Ricorda di portare il libretto sanitario!"`);
    setActiveTab("agenda");
  };

  const handleSendVaccineWhatsApp = (id: string, pet: string, owner: string) => {
    setVaccineRecalls((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Messaggio WhatsApp Inviato ✅" } : v))
    );
    setToastMessage(`💬 WhatsApp inviato a ${owner}: "Gentile ${owner}, ti ricordiamo che il vaccino di ${pet} è in scadenza. Puoi bloccare l'orario del richiamo con 1 tocco qui: [LINK_PRENOTAZIONE]"`);
  };

  const filteredAppts = appointments.filter((a) => {
    if (roomFilter === "cani") return a.room.includes("Ambulatorio 1");
    if (roomFilter === "gatti") return a.room.includes("Ambulatorio 2");
    if (roomFilter === "eco") return a.room.includes("Sala Ecografia");
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Clinical Header */}
      <header className="bg-white border-b border-teal-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-teal-600/20">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                  VetCloud OS • Clinica Veterinaria San Rocco
                </h1>
                <span className="text-[10px] bg-teal-100 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full font-bold">
                  GESTIONALE STANDALONE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Piattaforma Veterinaria: Triage Emergenze, Scadenziario Vaccini WhatsApp & Ambulatori Anti-Stress
              </p>
            </div>
          </div>

          {/* Software Top Navigation */}
          <div className="flex items-center bg-teal-50/80 p-1 rounded-2xl border border-teal-200/80 text-xs">
            <button
              onClick={() => setActiveTab("agenda")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "agenda"
                  ? "bg-white text-teal-800 shadow-sm border border-teal-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Agenda & Triage</span>
            </button>

            <button
              onClick={() => setActiveTab("vaccines")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "vaccines"
                  ? "bg-white text-teal-800 shadow-sm border border-teal-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <span>Scadenziario Vaccini</span>
            </button>

            <button
              onClick={() => setActiveTab("pet-booking")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "pet-booking"
                  ? "bg-white text-teal-800 shadow-sm border border-teal-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Sito Proprietari Pet</span>
            </button>

            <button
              onClick={() => setActiveTab("render-deploy")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === "render-deploy"
                  ? "bg-white text-teal-800 shadow-sm border border-teal-200/60"
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
        <div className="bg-teal-900 text-white px-5 py-3 text-xs flex items-center justify-between gap-4 sticky top-16 z-30 shadow-md animate-fade-in">
          <div className="flex items-center gap-2 max-w-4xl font-medium">
            <MessageSquare className="w-4 h-4 text-teal-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs text-teal-200 hover:text-white underline font-bold shrink-0"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: AGENDA & REGISTRO TRIAGE */}
        {activeTab === "agenda" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top KPI Veterinari */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Pazienti Pet Oggi</span>
                  <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
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
                  <span>Chiamate Reception Ridotte</span>
                  <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full">
                    -78%
                  </span>
                </div>
                <div className="text-2xl font-black text-sky-700 mt-1">28 Evitate</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Proprietari che prenotano dal divano
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Ore Reception Risparmiate</span>
                  <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
                    Oggi
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">3.1 Ore</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Più tempo dedicato alla cura degli animali
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Triage Pronto Soccorso</span>
                  <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
                    1 Urgenza
                  </span>
                </div>
                <div className="text-2xl font-black text-rose-600 mt-1">Slot Protetto</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Finestra emergenze sempre riservata
                </div>
              </div>
            </div>

            {/* Agenda Table Card */}
            <div className="bg-white border border-teal-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    Agenda Giornaliera & Separazione Ambulatori
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ambulatori dedicati per cani e gatti in conformità allo standard moderno <em>Cat Friendly Clinic</em>.
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => setRoomFilter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      roomFilter === "all"
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Tutti gli Ambulatori ({appointments.length})
                  </button>
                  <button
                    onClick={() => setRoomFilter("cani")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      roomFilter === "cani"
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Amb. 1 Cani
                  </button>
                  <button
                    onClick={() => setRoomFilter("gatti")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      roomFilter === "gatti"
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Amb. 2 Gatti (Cat-Friendly)
                  </button>
                  <button
                    onClick={() => setRoomFilter("eco")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      roomFilter === "eco"
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Sala Ecografia
                  </button>
                </div>
              </div>

              {/* Table of appointments */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-teal-50/70 text-slate-700 font-bold border-b border-teal-100">
                    <tr>
                      <th className="py-3 px-4">Paziente Pet</th>
                      <th className="py-3 px-4">Specie</th>
                      <th className="py-3 px-4">Motivo della Visita</th>
                      <th className="py-3 px-4">Ambulatorio Assegnato</th>
                      <th className="py-3 px-4">Orario</th>
                      <th className="py-3 px-4">Stato WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredAppts.map((appt) => (
                      <tr
                        key={appt.id}
                        className={`transition-all ${
                          appt.isUrgent ? "bg-rose-50/70" : "hover:bg-teal-50/30"
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {appt.petName}
                            {appt.isUrgent && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-200 text-rose-800 text-[9px] font-black uppercase">
                                URGENZA PS
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Proprietario: {appt.ownerName} ({appt.phone})
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                            {appt.species === "Cane" ? "🐶 Cane" : appt.species === "Gatto" ? "🐱 Gatto" : "🐰 Altro"}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {appt.reason}
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-[11px]">
                          {appt.room}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {appt.time}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                            <MessageSquare className="w-3 h-3 text-teal-600" />
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCADENZIARIO VACCINI & ANTIPARASSITARI */}
        {activeTab === "vaccines" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-teal-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                    Scadenziario Vaccinale Automatico
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Pet in Scadenza Vaccinale (Richiamo Annuale)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Notifiche automatiche su WhatsApp 15 giorni prima della scadenza: il proprietario prenota il vaccino con un tocco.
                  </p>
                </div>

                <button
                  onClick={() => {
                    vaccineRecalls.forEach((v) => handleSendVaccineWhatsApp(v.id, v.pet, v.owner));
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/25 transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Invia WhatsApp a Tutti i Proprietari</span>
                </button>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-teal-50/70 text-slate-700 font-bold border-b border-teal-100">
                    <tr>
                      <th className="py-3 px-4">Paziente Pet</th>
                      <th className="py-3 px-4">Proprietario & Cellulare</th>
                      <th className="py-3 px-4">Tipo di Vaccino</th>
                      <th className="py-3 px-4">Scadenza</th>
                      <th className="py-3 px-4">Stato Notifica</th>
                      <th className="py-3 px-4 text-center">Azione Rapida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {vaccineRecalls.map((v) => (
                      <tr key={v.id} className="hover:bg-teal-50/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{v.pet}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{v.owner}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{v.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{v.vaccine}</td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {v.expiry}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status.includes("✅")
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleSendVaccineWhatsApp(v.id, v.pet, v.owner)}
                            className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-bold transition inline-flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Invia Recall Vaccino
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

        {/* TAB 3: SMARTPHONE DEL PROPRIETARIO (VISTA MOBILE PET) */}
        {activeTab === "pet-booking" && (
          <div className="bg-white border border-teal-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Esperienza Proprietario da Cellulare
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Come prenota un proprietario di cane o gatto in 30 secondi
              </h3>
              <p className="text-xs text-slate-500">
                Filtro per specie, orario del medico e istruzioni sanitarie via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-3xl p-5 border border-slate-200 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  1. Specie del tuo Animale:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Cane", "Gatto", "Coniglio/Esotico"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBookingPetType(type)}
                      className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition ${
                        bookingPetType === type
                          ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-700 hover:border-teal-300"
                      }`}
                    >
                      {type === "Cane" ? "🐶 Cane" : type === "Gatto" ? "🐱 Gatto" : "🐰 Altro"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  2. Motivo della Visita:
                </label>
                <div className="space-y-1.5">
                  {vetServices.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setBookingService(s.name)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                        bookingService === s.name
                          ? "bg-teal-50 border-teal-500 font-bold text-teal-950"
                          : "bg-white border-slate-200 text-slate-700 hover:border-teal-300"
                      }`}
                    >
                      <div>
                        <div className="font-bold">{s.name}</div>
                        <div className="text-[10px] text-slate-400">{s.duration} • {s.note}</div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  3. Scegli Giorno e Orario Disponibile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setBookingSlot(slot)}
                      className={`p-2 rounded-xl border text-xs text-center font-bold transition ${
                        bookingSlot === slot
                          ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-700 hover:border-teal-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">4. Dati Pet e Proprietario:</label>
                  <button
                    onClick={handleQuickFillPet}
                    className="text-[10px] text-teal-700 hover:underline font-bold"
                  >
                    ✨ Compila con 1 Clic
                  </button>
                </div>
                <input
                  type="text"
                  value={bookingPetName}
                  onChange={(e) => setBookingPetName(e.target.value)}
                  placeholder="Nome del Pet (Es. Milo - Beagle)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 mb-2 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  placeholder="Cellulare per WhatsApp (Es. +39 347 123 9876)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={handleConfirmPetBooking}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Conferma Visita Pet (Vedi sul Triage Clinica)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: ISTRUZIONI PER DEPLOY SU RENDER CON LINK SEPARATO */}
        {activeTab === "render-deploy" && (
          <div className="bg-white border border-teal-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Pubblicazione su Render.com
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Come Pubblicare Questa Demo Veterinaria su Render con il tuo Link
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Puoi pubblicare questo gestionale veterinario come Web Service autonomo su Render.com (es. <code>clinicaveterinariademo.onrender.com</code>).
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
                <div className="font-bold text-sm text-teal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">1</span>
                  Crea una Repository GitHub
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
                  Carica questo progetto su una repository GitHub dedicata (es. <code>gestionale-veterinario-demo</code>).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
                <div className="font-bold text-sm text-teal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">2</span>
                  Collega Render a GitHub
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans pl-8">
                  Vai su <strong>Render.com</strong> &gt; <em>New +</em> &gt; <em>Web Service</em> &gt; Seleziona la repository.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
                <div className="font-bold text-sm text-teal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">3</span>
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
                    Render imposta automaticamente la porta e ti fornirà un link HTTPS pubblico e gratuito da mettere nei post organici!
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
        sector="veterinario"
      />
    </div>
  );
}
