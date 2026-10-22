"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, MessageSquare, ArrowRight, Scissors, Smartphone } from "lucide-react";
import { priceFor, saveGroomingBooking, stationFor } from "@/lib/grooming-bookings";

const services = [
  { id: "bagno", title: "Bagno e asciugatura", desc: "Lavaggio, asciugatura e spazzolatura. Per manti che non vanno tosati.", duration: "50 min", price: "38 €", photo: "/demo/toelettatura/bagno.jpg" },
  { id: "tosatura", title: "Tosatura completa", desc: "Bagno, taglio secondo lo standard di razza o la lunghezza che ci indichi.", duration: "100 min", price: "65 €", photo: "/demo/toelettatura/tosatura.jpg" },
  { id: "stripping", title: "Stripping", desc: "Lavorazione a mano per terrier e manti ruvidi. Postazione dedicata.", duration: "120 min", price: "80 €", photo: "/demo/toelettatura/stripping.jpg" },
  { id: "unghie", title: "Unghie, orecchie e igiene", desc: "Intervento breve, utile tra un taglio e l'altro.", duration: "25 min", price: "22 €", photo: "/demo/toelettatura/unghie.jpg" },
];

const slots = ["Oggi ore 15:00", "Domani ore 10:30", "Giovedì ore 11:00", "Sabato ore 09:00 (ultimo posto)"];

export default function ToelettaturaDemoPage() {
  const [size, setSize] = useState<"Piccola" | "Media" | "Grande">("Media");
  const [service, setService] = useState(services[1].title);
  const [slot, setSlot] = useState(slots[0]);
  const [petName, setPetName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const pet = petName.trim() || "Teo (Barboncino)";
    const cell = phone.trim() || "+39 347 220 1188";
    setPetName(pet);
    setPhone(cell);
    saveGroomingBooking({
      id: `T-${Date.now().toString().slice(-4)}`,
      pet,
      size,
      owner: "Prenotazione dal sito",
      phone: cell,
      service,
      station: stationFor(service),
      time: slot,
      price: priceFor(service),
      status: "Confermato WhatsApp",
    });
    setBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#f6efe6] text-stone-800">
      <div className="bg-amber-950 text-amber-50 px-3 py-2 text-xs flex items-center justify-between gap-2 sticky top-0 z-50">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-amber-950 px-2 py-0.5 font-black uppercase tracking-wide shrink-0">
          <Smartphone className="w-3 h-3" /> Lato cliente
        </span>
        <Link href="/gestionale-toelettatura" className="font-black text-amber-100 underline underline-offset-2 truncate">
          Passa all&apos;agenda
        </Link>
      </div>

      <header className="lg:relative lg:min-h-[72vh]">
        <div className="relative h-[28vh] min-h-[200px] max-h-[230px] lg:absolute lg:inset-0 lg:h-full lg:max-h-none lg:min-h-full">
          <img
            src="/demo/toelettatura/hero.jpg"
            alt="Barboncino in salone, appena tosato"
            className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
          />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-amber-950/85 via-amber-950/35 to-amber-950/10" />
          <div className="absolute top-3 left-3 right-3 lg:hidden">
            <div className="inline-flex items-center gap-2 max-w-full rounded-2xl bg-white px-2.5 py-1.5 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-sm leading-none text-stone-900">Toelettatura Casa Manto</p>
                <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Via Savona 18 · Mar–Sab 9–18:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-3 -mt-8 lg:mt-0 lg:absolute lg:inset-0 lg:px-4 lg:pb-10 lg:pt-24 lg:flex lg:items-end">
          <div className="w-full grid lg:grid-cols-12 gap-4 lg:gap-8 items-end">
            <div className="hidden lg:block lg:col-span-7 text-amber-50 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">Via Savona 18, Milano · Mar–Sab 9:00–18:30</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-black text-lg leading-none">Toelettatura Casa Manto</h1>
                  <p className="text-xs text-amber-200">Bagno, tosatura e stripping su appuntamento</p>
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] max-w-xl">
                Blocca l&apos;orario di Teo. Smetti di cercarlo in chat.
              </h2>
              <p className="text-amber-100/90 text-base sm:text-lg max-w-lg">
                Scegli servizio e taglia, conferma: il posto si tiene da solo. Un bagno breve non occupa la postazione di uno stripping.
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-md pt-1">
                <div>
                  <div className="text-2xl font-black">6–8 sett.</div>
                  <div className="text-[11px] text-amber-200">Richiamo del prossimo taglio</div>
                </div>
                <div>
                  <div className="text-2xl font-black">3 posti</div>
                  <div className="text-[11px] text-amber-200">Vasca, tosatura, finishing</div>
                </div>
                <div>
                  <div className="text-2xl font-black">Alle 21</div>
                  <div className="text-[11px] text-amber-200">Il posto si blocca da solo</div>
                </div>
              </div>
            </div>

            <div id="prenota" className="lg:col-span-5 bg-white border border-amber-100 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 text-stone-800">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="lg:hidden text-[11px] font-black uppercase tracking-wider text-amber-800">Casa Manto · prenota</p>
                <h2 className="lg:hidden font-black text-xl leading-tight text-stone-900">Blocca l&apos;orario di Teo</h2>
                <h3 className="hidden lg:block font-black text-lg">Blocca il posto adesso</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 shrink-0">Anche chiuso</span>
            </div>

            {!booked ? (
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Taglia</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Piccola", "Media", "Grande"] as const).map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSize(item)}
                        className={`py-2.5 rounded-xl text-xs font-bold border ${size === item ? "bg-amber-700 text-white border-amber-700" : "bg-stone-50 border-stone-200"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Servizio</label>
                  <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs">
                    {services.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title} ({item.duration} · {item.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Orario</label>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSlot(item)}
                        className={`px-2 py-2 rounded-xl text-[11px] font-bold border text-left leading-tight ${slot === item ? "bg-amber-700 text-white border-amber-700" : "bg-stone-50 border-stone-200"}`}
                      >
                        {item.replace(" (ultimo posto)", "")}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Teo, barboncino" className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp" className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs" />
                </div>
                <button type="submit" className="w-full py-3 rounded-2xl bg-amber-800 text-white text-sm font-bold inline-flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Conferma e tienilo
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-2">
                <CheckCircle2 className="w-10 h-10 text-amber-700 mx-auto" />
                <h4 className="font-black text-lg">Posto bloccato. Ora aprilo in agenda.</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-left text-xs space-y-1">
                  <div className="font-bold text-amber-900 inline-flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> WhatsApp</div>
                  <p>
                    Ciao, {petName || "Teo"} ({size}) è in agenda per {service}, {slot}. Porta il cane spazzolato se ci sono nodi: in salone il tempo resta quello prenotato. Ti riscriviamo tra 7 settimane per il prossimo manto.
                  </p>
                </div>
                <Link href="/gestionale-toelettatura" className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold inline-flex items-center justify-center gap-1">
                  Apri l&apos;agenda: la riga è già lì <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-3 py-8 sm:px-4 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Scegli il servizio e prenota</p>
            <h3 className="text-2xl font-black text-stone-900">Quattro lavori. Tocca e blocca l&apos;orario.</h3>
          </div>
          <p className="text-xs text-stone-500 inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Prenotazioni aperte anche a salone chiuso</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setService(item.title);
                setBooked(false);
                document.getElementById("prenota")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-100/80 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <img src={item.photo} alt={item.title} className="w-full h-36 object-cover" />
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">{item.duration}</span>
                <h3 className="font-black">{item.title}</h3>
                <p className="hidden sm:block text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                <p className="font-black text-amber-900">{item.price}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
