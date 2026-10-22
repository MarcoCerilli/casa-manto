"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Monitor,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertTriangle,
  Zap,
  RefreshCw,
  Plus,
  ArrowRight,
  ShieldCheck,
  Bell,
  Sparkles,
  Camera,
  Calendar,
  Volume2
} from "lucide-react";

interface LiveSplitScreenDemoProps {
  sector: "dentistico" | "veterinario";
}

export const LiveSplitScreenDemo: React.FC<LiveSplitScreenDemoProps> = ({ sector }) => {
  // Sector configurations
  const isDental = sector === "dentistico";

  const clinicName = isDental
    ? "Studio Odontoiatrico Dott. Riva"
    : "Clinica Veterinaria San Rocco";

  // Phone Booking State
  const [selectedService, setSelectedService] = useState(
    isDental ? "Igiene Orale & Prevenzione" : "Richiamo Vaccino & Antiparassitario"
  );
  const [selectedTime, setSelectedTime] = useState("Oggi 17:30");
  const [patientNameInput, setPatientNameInput] = useState("");
  const [patientPhoneInput, setPatientPhoneInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Sync Feed on the Monitor (Right side)
  const [liveAppointments, setLiveAppointments] = useState([
    {
      id: "APT-1",
      name: isDental ? "Giulia Bianchi" : "Luna (Gatto) - Fed. Bisi",
      service: isDental ? "Prima Visita & Piano di Cura" : "Visita Generale & Cute",
      time: "15:00 - 15:45",
      room: isDental ? "Poltrona 1" : "Amb. 2 Gatti",
      status: "Confermato WhatsApp",
      isRecent: false,
    },
    {
      id: "APT-2",
      name: isDental ? "Roberto Conti" : "Thor (Cane) - Dav. Marini",
      service: isDental ? "Controllo Allineatori Invisalign" : "Controllo Post-Operatorio",
      time: "16:00 - 16:30",
      room: isDental ? "Poltrona 1" : "Amb. 1 Cani",
      status: "Confermato WhatsApp",
      isRecent: false,
    },
  ]);

  // Innovation Feature 1: Flash Notification banner
  const [liveSyncAlert, setLiveSyncAlert] = useState<string | null>(null);

  // Innovation Feature 2: Smart Slot-Filler (Cancellation Recovery)
  const [slotFillerState, setSlotFillerState] = useState<"idle" | "cancelled" | "searching" | "recovered">("idle");

  // Innovation Feature 3: Photo Triage Simulator
  const [photoTriageActive, setPhotoTriageActive] = useState(false);
  const [photoTriageSubmitted, setPhotoTriageSubmitted] = useState(false);

  const services = isDental
    ? [
        { name: "Igiene Orale & Prevenzione", price: "90 €", time: "45 min" },
        { name: "Prima Visita & Piano di Cura", price: "70 €", time: "30 min" },
        { name: "Urgenza Mal di Dente", price: "85 €", time: "30 min" },
      ]
    : [
        { name: "Richiamo Vaccino & Antiparassitario", price: "55 €", time: "25 min" },
        { name: "Visita Generale Pet", price: "60 €", time: "30 min" },
        { name: "Controllo Cute / Urgenza", price: "75 €", time: "30 min" },
      ];

  const slots = ["Oggi 17:30", "Domani 10:15", "Domani 11:30", "Venerdì 15:00"];

  // Quick auto-fill
  const handleQuickFill = () => {
    setPatientNameInput(isDental ? "Marco Ferri" : "Milo (Beagle) - Val. Colombo");
    setPatientPhoneInput("+39 348 912 3456");
  };

  // Submit from phone -> instant effect on monitor!
  const handleBookFromPhone = () => {
    setIsSubmitting(true);
    const pName = patientNameInput.trim() || (isDental ? "Marco Ferri" : "Milo (Beagle) - Val. Colombo");
    const phone = patientPhoneInput.trim() || "+39 348 912 3456";

    setTimeout(() => {
      setIsSubmitting(false);

      const newEntry = {
        id: `LIVE-${Date.now()}`,
        name: pName,
        service: selectedService,
        time: selectedTime,
        room: isDental ? "Poltrona 1" : "Amb. 1 Cani",
        status: "Confermato WhatsApp",
        isRecent: true,
      };

      setLiveAppointments((prev) => [newEntry, ...prev]);
      setLiveSyncAlert(`🚨 APPUNTAMENTO PRENOTATO DA SMARTPHONE: ${pName} per ${selectedTime}!`);
    }, 600);
  };

  // Trigger Smart Slot-Filler Simulation
  const handleTriggerSlotFiller = () => {
    setSlotFillerState("cancelled");
    setLiveSyncAlert("⚠️ DISDETTA DELL'ULTIMO MINUTO: Il paziente delle 16:30 ha annullato l'appuntamento (Rischio buco da 180€)!");

    setTimeout(() => {
      setSlotFillerState("searching");
      setLiveSyncAlert("🤖 ALGORITMO ATTIVATO: Invio automatico WhatsApp a 3 pazienti in lista d'attesa...");

      setTimeout(() => {
        setSlotFillerState("recovered");
        setLiveSyncAlert("🎉 BUCO RECUPERATO: Il paziente Luca Bianchi ha accettato via WhatsApp! Poltrona riempita in 8 secondi senza telefonate!");
        setLiveAppointments((prev) => [
          {
            id: `RECOVERED-${Date.now()}`,
            name: isDental ? "Luca Bianchi (Da Lista d'Attesa)" : "Toby (Cane) - Recuperato Lista d'Attesa",
            service: isDental ? "Igiene Orale Recuperata" : "Visita Recuperata",
            time: "Oggi 16:30",
            room: isDental ? "Poltrona 1" : "Amb. 1 Cani",
            status: "Confermato WhatsApp",
            isRecent: true,
          },
          ...prev,
        ]);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="bg-white border border-sky-100 rounded-3xl p-5 sm:p-7 space-y-6 shadow-sm">
      {/* Top Banner explaining the Live Split-Screen */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            Innovazione Live: Split-Screen Causa-Effetto
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Mostra al Dottore lo Smartphone (Paziente) e il Monitor (Segreteria) Insieme
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Tocca a sinistra sullo smartphone per prenotare. Guarda come a destra la dashboard dello studio si aggiorna all&apos;istante senza che la segretaria alzi un dito.
          </p>
        </div>

        {/* Action Buttons for high-tech innovations */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleTriggerSlotFiller}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Simula Disdetta & Slot-Filler Automatico</span>
          </button>

          <button
            onClick={() => setPhotoTriageActive(!photoTriageActive)}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Camera className="w-3.5 h-3.5 text-sky-600" />
            <span>{photoTriageActive ? "Chiudi Foto Triage" : "Simula Foto Triage Urgenza"}</span>
          </button>
        </div>
      </div>

      {/* Alert toast for real-time sync action */}
      {liveSyncAlert && (
        <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs text-sky-950 font-bold animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-600 shrink-0 animate-bounce" />
            <span>{liveSyncAlert}</span>
          </div>
          <button
            onClick={() => setLiveSyncAlert(null)}
            className="text-[11px] text-sky-700 hover:text-sky-900 underline font-semibold shrink-0"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* THE SPLIT SCREEN: LEFT = SMARTPHONE, RIGHT = CLINIC MONITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: THE PATIENT'S SMARTPHONE (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/70 border border-sky-100 p-4 sm:p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-sky-900 uppercase tracking-wide flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-sky-600" />
              1. Schermo Paziente (Smartphone)
            </span>
            <span className="text-[10px] bg-white border border-sky-200 text-sky-800 px-2 py-0.5 rounded-full font-bold">
              3 Clic Veloci
            </span>
          </div>

          {/* Smartphone Frame */}
          <div className="bg-white border-4 border-slate-200 rounded-[36px] p-3 shadow-md shadow-sky-950/5">
            <div className="w-20 h-3.5 bg-slate-200 rounded-full mx-auto mb-2"></div>

            <div className="bg-slate-50/90 rounded-[24px] overflow-hidden border border-slate-200 text-slate-800 text-xs flex flex-col justify-between min-h-[460px]">
              {/* Phone Header */}
              <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-3.5 text-white">
                <div className="text-[10px] font-bold text-sky-100 uppercase tracking-wider">
                  {clinicName}
                </div>
                <div className="font-black text-sm mt-0.5">Prenotazione Online 24/7</div>
                <div className="text-[11px] text-sky-100">Zero attese, conferma immediata</div>
              </div>

              {/* Booking Body */}
              <div className="p-3.5 space-y-3 flex-1 overflow-y-auto">
                {/* Photo triage add-on if active */}
                {photoTriageActive && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] space-y-1.5 animate-fade-in">
                    <div className="font-bold text-amber-900 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-amber-700" />
                      Foto Triage Intelligente:
                    </div>
                    <p className="text-slate-600">
                      {isDental
                        ? "Carica una foto della gengiva/dente per consentire al medico di valutare l'urgenza prima della visita."
                        : "Carica una foto della lesione/cute del pet per consentire al veterinario di preparare l'ambulatorio."}
                    </p>
                    <div className="p-2 bg-white rounded-lg border border-amber-200 text-[10px] text-amber-800 font-mono text-center font-bold">
                      📸 [Foto_Paziente_01.jpg allegata con successo]
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    1. Seleziona Servizio:
                  </label>
                  <div className="space-y-1.5">
                    {services.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedService(s.name)}
                        className={`w-full p-2 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                          selectedService === s.name
                            ? "bg-sky-50 border-sky-500 font-bold text-sky-950"
                            : "bg-white border-slate-200 text-slate-700 hover:border-sky-300"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[11px] font-mono text-slate-500">{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    2. Scegli Giorno & Orario:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {slots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-2 rounded-xl border text-center text-xs transition ${
                          selectedTime === slot
                            ? "bg-sky-600 border-sky-600 text-white font-bold"
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
                    <label className="text-[11px] font-bold text-slate-700">
                      3. I tuoi dati:
                    </label>
                    <button
                      onClick={handleQuickFill}
                      className="text-[10px] text-sky-700 hover:underline font-bold"
                    >
                      ✨ Compila con 1 Clic
                    </button>
                  </div>
                  <input
                    type="text"
                    value={patientNameInput}
                    onChange={(e) => setPatientNameInput(e.target.value)}
                    placeholder="Nome e Cognome Paziente"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 mb-1.5 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="tel"
                    value={patientPhoneInput}
                    onChange={(e) => setPatientPhoneInput(e.target.value)}
                    placeholder="Cellulare per WhatsApp"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  onClick={handleBookFromPhone}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? "Invio in corso..." : "Conferma Prenotazione (Guarda a destra 👉)"}</span>
                </button>
              </div>

              {/* Phone Footer */}
              <div className="p-2 bg-white border-t border-slate-200 text-center text-[10px] text-slate-400">
                🔒 Conforme GDPR Sanitario • Nessun download richiesto
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECEPTION DASHBOARD LIVE MONITOR (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-sky-100 p-5 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-extrabold text-sky-900 uppercase tracking-wide flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-sky-600" />
                2. Monitor Segreteria Studio (In Tempo Reale)
              </span>
              <p className="text-[11px] text-slate-500">
                La segretaria vede gli orari occuparsi automaticamente e i messaggi WhatsApp partire da soli.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Sincronizzato Live
            </span>
          </div>

          {/* Smart Slot-Filler Status card */}
          {slotFillerState !== "idle" && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fade-in ${
              slotFillerState === "cancelled"
                ? "bg-rose-50 border-rose-200 text-rose-950"
                : slotFillerState === "searching"
                ? "bg-amber-50 border-amber-200 text-amber-950"
                : "bg-emerald-50 border-emerald-200 text-emerald-950"
            }`}>
              <div className="font-extrabold flex items-center justify-between">
                <span>
                  {slotFillerState === "cancelled" && "🚨 Poltrona Scoperta (Disdetta Ore 16:30)"}
                  {slotFillerState === "searching" && "🤖 Slot-Filler Attivo: Contatto Lista d'Attesa..."}
                  {slotFillerState === "recovered" && "✅ Poltrona Riempita con Successo!"}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-mono font-bold">
                  {slotFillerState === "cancelled" && "-180 €"}
                  {slotFillerState === "searching" && "Invio WhatsApp"}
                  {slotFillerState === "recovered" && "+180 € Recuperati"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {slotFillerState === "cancelled" && "Un paziente ha disdetto all'ultimo minuto. Senza il nostro sistema, questo buco resterebbe vuoto facendo perdere fatturato allo studio."}
                {slotFillerState === "searching" && "Il bot sta inviando un messaggio WhatsApp a 3 pazienti che avevano chiesto disponibilità per questa settimana..."}
                {slotFillerState === "recovered" && "Il paziente ha confermato in 8 secondi via WhatsApp. Nessuna telefonata manuale, poltrona riempita al 100%!"}
              </p>
            </div>
          )}

          {/* Agenda Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Paziente / Pet</th>
                  <th className="py-2.5 px-3">Prestazione</th>
                  <th className="py-2.5 px-3">Orario</th>
                  <th className="py-2.5 px-3">Canale & Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {liveAppointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className={`transition-all ${
                      appt.isRecent ? "bg-emerald-50/70 font-semibold" : "hover:bg-sky-50/30"
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {appt.name}
                        {appt.isRecent && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-black uppercase">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{appt.room}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-800">{appt.service}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{appt.time}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        WhatsApp OK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Educational Callout on Why This Closes Deals */}
          <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-xs text-sky-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-sky-900">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Perché questa schermata fa firmare il Dottore:
            </div>
            <p className="text-[11px] text-sky-800 leading-relaxed font-sans">
              I titolari di studi sono scettici se spieghi la tecnologia a parole. Ma quando vedono con i propri occhi che toccando lo smartphone a sinistra la riga compare in 1 secondo a destra con notifica WhatsApp, capiscono immediatamente che <strong>risparmiano centinaia di telefonate al mese</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
