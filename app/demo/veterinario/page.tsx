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
  ChevronRight,
  Zap,
  HeartPulse,
  AlertTriangle
} from "lucide-react";
import { LiveSplitScreenDemo } from "@/components/LiveSplitScreenDemo";
import { VeterinaryClinicApp } from "@/components/VeterinaryClinicApp";

export default function VeterinaryDemoSite() {
  const [activeTab, setActiveTab] = useState<"site" | "split" | "backoffice">("site");

  // Pet Booking widget state
  const [petType, setPetType] = useState<"Cane" | "Gatto" | "Coniglio/Esotico">("Cane");
  const [selectedService, setSelectedService] = useState("Richiamo Vaccinale & Antiparassitario");
  const [selectedSlot, setSelectedSlot] = useState("Domani ore 11:00");
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    {
      id: "vaccino",
      title: "Richiamo Vaccinale & Antiparassitario",
      desc: "Protezione completa annuale contro le principali patologie virali e parassiti.",
      duration: "25 min",
      price: "55 €",
    },
    {
      id: "visita",
      title: "Visita Clinica Generale & Check-Up",
      desc: "Controllo battito, peso, stato di cute, orecchie, dentatura e palpazione addominale.",
      duration: "30 min",
      price: "60 €",
    },
    {
      id: "cute",
      title: "Controllo Dermatologia & Orecchie",
      desc: "Esame otoscopico e citologico immediato per prurito, arrossamenti o scuotimento della testa.",
      duration: "30 min",
      price: "70 €",
    },
    {
      id: "ecografia",
      title: "Ecografia Addominale Specialistica",
      desc: "Indagine diagnostica avanzata ad alta risoluzione (a digiuno da 8 ore).",
      duration: "40 min",
      price: "95 €",
    },
  ];

  const slots = ["Oggi ore 16:00", "Oggi ore 17:30", "Domani ore 10:00", "Domani ore 11:00"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName) setPetName("Milo (Golden Retriever)");
    if (!ownerName) setOwnerName("Valentina Colombo");
    if (!ownerPhone) setOwnerPhone("+39 347 123 9876");
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Floating Agency Bar */}
      <div className="bg-teal-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold">DEMO AUTONOMA: Clinica Veterinaria San Rocco</span>
          <span className="hidden md:inline text-teal-200">• Sito reale mostrato ai veterinari</span>
        </div>

        <div className="flex items-center gap-1.5 bg-teal-950/60 p-1 rounded-xl border border-teal-800 text-[11px]">
          <button
            onClick={() => setActiveTab("site")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              activeTab === "site" ? "bg-teal-600 text-white" : "text-teal-200 hover:text-white"
            }`}
          >
            1. Sito Proprietari Pet
          </button>
          <button
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
              activeTab === "split" ? "bg-teal-600 text-white" : "text-teal-200 hover:text-white"
            }`}
          >
            <Zap className="w-3 h-3 text-amber-300" />
            2. Split-Screen con Triage
          </button>
          <button
            onClick={() => setActiveTab("backoffice")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              activeTab === "backoffice" ? "bg-teal-600 text-white" : "text-teal-200 hover:text-white"
            }`}
          >
            3. Cruscotto Clinica
          </button>
          <Link
            href="/"
            className="px-2.5 py-1 text-teal-300 hover:text-white underline font-semibold ml-1"
          >
            ← Torna al B2B Hub
          </Link>
        </div>
      </div>

      {activeTab === "split" && (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 animate-fade-in">
          <LiveSplitScreenDemo sector="veterinario" />
        </div>
      )}

      {activeTab === "backoffice" && (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 animate-fade-in">
          <VeterinaryClinicApp />
        </div>
      )}

      {activeTab === "site" && (
        <div className="animate-fade-in">
          {/* Clinic Information Bar */}
          <div className="bg-teal-50 border-b border-teal-100 text-slate-600 text-xs py-2 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" /> Corso Sempione 82, Milano
                </span>
                <span className="flex items-center gap-1.5 font-bold text-rose-700">
                  <HeartPulse className="w-3.5 h-3.5" /> Pronto Soccorso Veterinario Aperto 24/7
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-teal-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Prenotazioni Online Aperte
                </span>
                <span className="font-mono text-slate-700 font-bold hidden sm:inline">
                  Tel: 02 7600 9876
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Header */}
          <header className="bg-white border-b border-teal-100 sticky top-8 z-40 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-teal-600/20">
                  🐾
                </div>
                <div>
                  <h1 className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                    Clinica Veterinaria San Rocco
                  </h1>
                  <p className="text-xs text-teal-700 font-semibold">Pronto Soccorso H24 & Ambulatorio Specialistico</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
                <a href="#servizi" className="hover:text-teal-700 transition">Visite & Vaccini</a>
                <a href="#triage" className="hover:text-teal-700 transition">Triage Urgenze</a>
                <a href="#prenota" className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition shadow-sm">
                  Prenota Visita Pet
                </a>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="bg-gradient-to-b from-teal-50/70 via-white to-slate-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-teal-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Prenotazione Rapida Cani, Gatti ed Esotici
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  La Salute del Tuo Pet,{" "}
                  <span className="text-teal-700">senza file e con promemoria su WhatsApp</span>.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Fissa richiami vaccinali, visite di controllo o esami diagnostici direttamente da cellulare. Ricevi su WhatsApp le istruzioni pre-visita per il tuo animale.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#prenota"
                    className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition inline-flex items-center gap-2"
                  >
                    <span>Prenota la Visita del tuo Pet</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Conferma istantanea • Ambulatori separati Cane/Gatto</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-teal-100 max-w-lg">
                  <div>
                    <div className="text-2xl font-black text-teal-800">H24</div>
                    <div className="text-xs text-slate-500">Pronto Soccorso</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-teal-800">Amb. Separati</div>
                    <div className="text-xs text-slate-500">Stress Ridotto per Gatti</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-600">-78%</div>
                    <div className="text-xs text-slate-500">Attese al Telefono</div>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Box (Right Side) */}
              <div id="prenota" className="lg:col-span-5 bg-white border border-teal-100 rounded-3xl p-6 sm:p-7 shadow-xl shadow-teal-950/5 space-y-5">
                <div className="flex items-center justify-between border-b border-teal-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      Ambulatorio Veterinario
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">Prenota la Visita in 3 Clic</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold">
                    Orari Live
                  </span>
                </div>

                {!isBooked ? (
                  <form onSubmit={handleBooking} className="space-y-4">
                    {/* Pet Species Selector */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        1. Specie del tuo Animale:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["Cane", "Gatto", "Coniglio/Esotico"] as const).map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setPetType(type)}
                            className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition ${
                              petType === type
                                ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-300"
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
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
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
                        3. Giorno e Orario:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {slots.map((s, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedSlot(s)}
                            className={`p-2.5 rounded-xl border text-xs text-center font-bold transition ${
                              selectedSlot === s
                                ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        4. Dati Proprietario e Pet:
                      </label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Nome del Pet (Es. Milo - Golden Retriever)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 mb-2 focus:outline-none focus:border-teal-500"
                      />
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="Cellulare per WhatsApp (Es. +39 347 123 9876)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conferma Visita Pet in 1 Clic</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-center py-4 animate-fade-in">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto border border-teal-200">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">Visita Registrata con Successo!</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        L&apos;ambulatorio della Clinica San Rocco è stato allertato.
                      </p>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 text-left text-xs space-y-1">
                      <div className="font-bold text-teal-800 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                        Promemoria WhatsApp Inviato:
                      </div>
                      <p className="text-teal-950 font-sans leading-relaxed text-[11px]">
                        &ldquo;Gentile {ownerName || "Valentina Colombo"}, confermiamo la visita per {petName || "Milo"} ({petType}) per {selectedSlot}. Ricordati di portare il libretto sanitario del tuo pet!&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("split")}
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition"
                    >
                      Guarda l&apos;effetto immediato sul Triage della Clinica 👉
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="servizi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Ambulatori Specializzati
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Cure Mediche e Diagnostica per Animali da Compagnia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ambulatori distinti per cani e gatti per evitare stress olfattivo o comportamentale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white border border-teal-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold">
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
                      className="text-xs text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
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
                <div className="font-bold text-white text-sm">Clinica Veterinaria San Rocco H24 S.r.l.</div>
                <div className="text-slate-400 mt-1">Direttore Sanitario: Dott. Marco Barbieri • Ordine Medici Veterinari n. 2891</div>
                <div className="text-slate-500 mt-0.5">Corso Sempione 82, 20154 Milano • P.IVA 09234850965</div>
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
