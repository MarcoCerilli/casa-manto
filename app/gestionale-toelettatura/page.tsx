"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, MessageSquare, Scissors, Smartphone, Monitor, ArrowRight } from "lucide-react";
import { GroomingBooking, priceFor, readGroomingBookings, saveGroomingBooking, stationFor } from "@/lib/grooming-bookings";

type Station = "Vasca" | "Tosatura" | "Finishing";
type Status = "Confermato WhatsApp" | "In arrivo" | "Richiamo manto";

interface Appointment {
  id: string;
  pet: string;
  size: string;
  owner: string;
  phone: string;
  service: string;
  station: Station;
  time: string;
  price: number;
  status: Status;
}

const seed: Appointment[] = [
  { id: "T-1", pet: "Lola (Maltese)", size: "Piccola", owner: "Chiara Neri", phone: "+39 333 441 2201", service: "Bagno e asciugatura", station: "Vasca", time: "09:00–09:50", price: 38, status: "Confermato WhatsApp" },
  { id: "T-2", pet: "Teo (Barboncino)", size: "Media", owner: "Marco Sala", phone: "+39 347 220 1188", service: "Tosatura completa", station: "Tosatura", time: "09:30–11:10", price: 65, status: "Confermato WhatsApp" },
  { id: "T-3", pet: "Iris (Jack Russell)", size: "Piccola", owner: "Sara Vitali", phone: "+39 349 100 8822", service: "Stripping", station: "Tosatura", time: "11:30–13:30", price: 80, status: "In arrivo" },
  { id: "T-4", pet: "Otto (Labrador)", size: "Grande", owner: "Luca Greco", phone: "+39 338 765 0091", service: "Bagno e asciugatura", station: "Vasca", time: "15:00–16:10", price: 48, status: "Confermato WhatsApp" },
  { id: "T-5", pet: "Nina (Barboncino toy)", size: "Piccola", owner: "Elena Costa", phone: "+39 340 221 7744", service: "Finishing e fiocco", station: "Finishing", time: "11:15–11:45", price: 25, status: "Confermato WhatsApp" },
];

const recalls = [
  { id: "R-1", pet: "Birba (Volpino)", owner: "Giulia Fontana", phone: "+39 335 900 1122", due: "Manto a 7 settimane", status: "Da scrivere" },
  { id: "R-2", pet: "Ciro (Barboncino)", owner: "Davide Riva", phone: "+39 348 333 2210", due: "Manto a 8 settimane", status: "Da scrivere" },
  { id: "R-3", pet: "Peggy (Westie)", owner: "Anna Berri", phone: "+39 331 556 7788", due: "Stripping in scadenza", status: "Da scrivere" },
];

const stations: Station[] = ["Vasca", "Tosatura", "Finishing"];

export default function GestionaleToelettaturaPage() {
  const [tab, setTab] = useState<"agenda" | "richiami" | "prenota">("agenda");
  const [station, setStation] = useState<"tutte" | Station>("tutte");
  const [rows, setRows] = useState(seed);

  useEffect(() => {
    const fromSite = readGroomingBookings();
    if (fromSite.length === 0) return;
    setRows((current) => {
      const known = new Set(current.map((row) => row.id));
      const fresh = fromSite.filter((row) => !known.has(row.id));
      return fresh.length ? [...fresh, ...current] : current;
    });
  }, []);
  const [recallRows, setRecallRows] = useState(recalls);
  const [toast, setToast] = useState<string | null>(null);
  const [pet, setPet] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Tosatura completa");
  const [size, setSize] = useState("Media");

  const visible = rows.filter((row) => station === "tutte" || row.station === station);
  const total = rows.reduce((sum, row) => sum + row.price, 0);
  const waiting = recallRows.filter((row) => row.status === "Da scrivere").length;

  const addBooking = () => {
    const name = pet.trim() || "Teo (Barboncino)";
    const next: GroomingBooking = {
      id: `T-${Date.now().toString().slice(-4)}`,
      pet: name,
      size,
      owner: "Prenotazione dal sito",
      phone: phone.trim() || "+39 347 220 1188",
      service,
      station: stationFor(service),
      time: "Oggi 15:00",
      price: priceFor(service),
      status: "Confermato WhatsApp",
    };
    saveGroomingBooking(next);
    setRows([next, ...rows]);
    setToast(`WhatsApp inviato a ${name}. Il posto è in agenda: apri la postazione e vai.`);
    setTab("agenda");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-3 py-2 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-700 text-white px-2 py-0.5 text-[11px] font-black uppercase tracking-wide">
              <Monitor className="w-3 h-3" /> Lato salone
            </span>
            <Link href="/demo/toelettatura" className="inline-flex items-center gap-1 text-xs font-black text-teal-800">
              Apri il sito cliente <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="font-black text-base sm:text-xl text-slate-900 leading-tight">Agenda Casa Manto</h1>
                <p className="text-[11px] text-slate-500 truncate">Blocca i posti, chiudi l&apos;incasso.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl text-xs overflow-x-auto no-scrollbar">
            <button onClick={() => setTab("agenda")} className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap ${tab === "agenda" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>Agenda</button>
            <button onClick={() => setTab("richiami")} className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap ${tab === "richiami" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>
              Richiami{waiting ? ` (${waiting})` : ""}
            </button>
            <button onClick={() => setTab("prenota")} className={`px-3 py-2 rounded-xl font-bold inline-flex items-center gap-1 whitespace-nowrap ${tab === "prenota" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>
              <Smartphone className="w-3.5 h-3.5" /> Prova prenota
            </button>
          </div>
        </div>
      </header>

      {toast && (
        <div className="bg-teal-700 text-white text-xs px-4 py-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-semibold"><MessageSquare className="w-4 h-4" /> {toast}</span>
          <button onClick={() => setToast(null)} className="underline font-bold">Chiudi</button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-6 space-y-4">
        {tab === "agenda" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200">
                <p className="text-xs text-slate-500">Lavori oggi</p>
                <p className="text-3xl font-black text-slate-900">{rows.length}</p>
                <p className="text-xs font-bold text-teal-800 mt-1">Apri e vai</p>
              </div>
              <div className="rounded-2xl p-3 sm:p-4 bg-teal-700 text-white">
                <p className="text-xs font-bold text-teal-100">Incasso</p>
                <p className="text-3xl font-black">{total} €</p>
                <p className="text-xs font-bold text-teal-50 mt-1">Tieni i posti</p>
              </div>
              <div className="hidden sm:block rounded-2xl p-4 bg-white border border-slate-200 overflow-hidden relative min-h-[88px]">
                <img src="/demo/toelettatura/stations.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                <div className="relative">
                  <p className="text-xs text-slate-600">Tre code, tre postazioni</p>
                  <p className="text-lg font-black text-slate-900">Vasca · Tosatura · Finishing</p>
                  <p className="text-xs font-bold text-teal-800 mt-1">Scegli la colonna e lavora</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <h2 className="hidden sm:inline-flex font-black items-center gap-2 text-slate-900 text-sm sm:text-base"><Calendar className="w-4 h-4 text-teal-700" /> Scegli e vai</h2>
              <div className="flex gap-1.5 text-xs overflow-x-auto">
                {(["tutte", ...stations] as const).map((item) => (
                  <button key={item} onClick={() => setStation(item)} className={`px-3 py-1.5 rounded-xl font-bold border whitespace-nowrap ${station === item ? "bg-teal-700 text-white border-teal-700" : "bg-white text-slate-700 border-slate-200"}`}>
                    {item === "tutte" ? "Tutte" : item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {(station === "tutte" ? stations : [station]).map((lane) => (
                <section key={lane} className="rounded-3xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-black text-sm text-teal-800">{lane}</h3>
                    <span className="text-[10px] font-bold text-slate-500">{rows.filter((row) => row.station === lane).length} in coda</span>
                  </div>
                  {visible.filter((row) => row.station === lane).map((row) => (
                    <article key={row.id} className="rounded-2xl bg-white border border-slate-200 p-3 space-y-1 shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-black text-slate-900 text-sm">{row.pet}</p>
                        <p className="font-mono text-[11px] font-bold text-teal-800">{row.time}</p>
                      </div>
                      <p className="text-xs text-slate-500">{row.service} · {row.size}</p>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{row.status}</span>
                        <span className="font-black text-slate-900">{row.price} €</span>
                      </div>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          </>
        )}

        {tab === "richiami" && (
          <div className="rounded-3xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-black text-lg text-slate-900">Questi manti aspettano il tuo WhatsApp</h2>
                <p className="text-sm text-slate-600">Mandalo tu: proponi un orario in settimana, non il sabato già pieno.</p>
              </div>
              <button
                onClick={() => {
                  setRecallRows((prev) => prev.map((row) => ({ ...row, status: "WhatsApp inviato" })));
                  setToast("Messaggi inviati. Chi deve tornare ha già il link per prenotare.");
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
              >
                Mandali tutti su WhatsApp
              </button>
            </div>
            <ul className="divide-y divide-slate-100">
              {recallRows.map((row) => (
                <li key={row.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-bold text-slate-900">{row.pet}</p>
                    <p className="text-xs text-slate-500">{row.owner} · {row.phone} · {row.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-800">{row.status}</span>
                    <button
                      onClick={() => {
                        setRecallRows((prev) => prev.map((item) => item.id === row.id ? { ...item, status: "WhatsApp inviato" } : item));
                        setToast(`WhatsApp a ${row.owner}: il manto di ${row.pet} è da rifare. Prenota da qui, ti tengo il posto.`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-teal-700 text-white text-xs font-bold"
                    >
                      Scrivi ora
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "prenota" && (
          <div className="rounded-3xl bg-white border border-slate-200 p-6 max-w-lg mx-auto space-y-4">
            <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">Come fa il cliente</p>
            <h2 className="font-black text-lg">Prova tu il click. La riga cade in agenda.</h2>
            <p className="text-sm text-slate-600">Scegli taglia e servizio, poi blocca il posto: lo vedi sulla postazione giusta.</p>
            <div className="grid grid-cols-3 gap-2">
              {["Piccola", "Media", "Grande"].map((item) => (
                <button key={item} onClick={() => setSize(item)} className={`py-2 rounded-xl text-xs font-bold border ${size === item ? "bg-amber-700 text-white border-amber-700" : "border-slate-200"}`}>{item}</button>
              ))}
            </div>
            <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm">
              <option>Bagno e asciugatura</option>
              <option>Tosatura completa</option>
              <option>Stripping</option>
              <option>Unghie e igiene</option>
            </select>
            <input value={pet} onChange={(e) => setPet(e.target.value)} placeholder="Teo, barboncino" className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp" className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm" />
            <button onClick={addBooking} className="w-full py-3 rounded-2xl bg-amber-800 text-white text-sm font-bold inline-flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Blocca il posto in agenda
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
