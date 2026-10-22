"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingDown,
  Clock,
  Euro,
  Copy,
  Check,
  Zap,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

interface RoiCalculatorProps {
  sector: "dentistico" | "veterinario" | "medico" | "toelettatura";
}

// Deterministic thousands separator formatter to prevent SSR/client hydration differences
function formatNum(num: number): string {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ sector }) => {
  // Defaults based on sector
  const defaultTicket =
    sector === "dentistico" ? 180 : sector === "veterinario" ? 65 : sector === "toelettatura" ? 48 : 120;
  const defaultWeeklyAppts =
    sector === "dentistico" ? 75 : sector === "veterinario" ? 90 : sector === "toelettatura" ? 45 : 80;

  const [weeklyAppointments, setWeeklyAppointments] = useState<number>(defaultWeeklyAppts);
  const [averageTicket, setAverageTicket] = useState<number>(defaultTicket);
  const [noShowRate, setNoShowRate] = useState<number>(14); // 14% is average in healthcare
  const [phoneHoursPerDay, setPhoneHoursPerDay] = useState<number>(2.5);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Calculations
  const monthlyAppointments = weeklyAppointments * 4.2;
  const lostApptsPerMonth = Math.round((monthlyAppointments * noShowRate) / 100);
  const monthlyRevenueLost = lostApptsPerMonth * averageTicket;
  const yearlyRevenueLost = monthlyRevenueLost * 12;

  // Phone time calculations
  const monthlyPhoneHours = Math.round(phoneHoursPerDay * 22);
  const savedPhoneHours = Math.round(monthlyPhoneHours * 0.7); // 70% automated

  // Recovered with system
  const recoveredRevenueMonthly = Math.round(monthlyRevenueLost * 0.85); // 85% drop in no-shows
  const recoveredRevenueYearly = recoveredRevenueMonthly * 12;

  const salesPitchScript = `${sector === "toelettatura" ? "Ciao" : "Dottore"}, abbiamo calcolato che con una media di ${weeklyAppointments} visite a settimana e un valore medio di ${averageTicket}€:

📉 Con un fisiologico ${noShowRate}% di appuntamenti saltati, il suo studio perde ogni mese circa ${formatNum(monthlyRevenueLost)}€ (${formatNum(yearlyRevenueLost)}€ all'anno di fatturato bruciato da poltrone e sale vuote).
📞 In più, la sua segreteria dedica circa ${monthlyPhoneHours} ore al mese solo per gestire telefonate di prenotazione e conferma.

Con la nostra web app per smartphone in 3 clic e i promemoria automatici via WhatsApp:
✅ Recuperate oltre ${formatNum(recoveredRevenueMonthly)}€ al mese di visite che altrimenti andrebbero perse.
✅ Risparmiate circa ${savedPhoneHours} ore di telefonate al mese per il vostro personale.

Le andrebbe di testare la demo interattiva sul suo cellulare in 40 secondi per vedere come funziona?`;

  const copyPitch = () => {
    navigator.clipboard.writeText(salesPitchScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            Calcolatore Finanziario per Web Agency & Freelance
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Quanto costa davvero il no-show a un titolare di studio?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Usa questi numeri reali per formulare una proposta economica inattaccabile. Nessun medico può ignorare cifre come queste.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        {/* Sliders / Inputs */}
        <div className="space-y-5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Appuntamenti a settimana nello studio</span>
              <span className="text-sky-700 font-mono text-sm">{weeklyAppointments} visite</span>
            </div>
            <input
              type="range"
              min={20}
              max={250}
              step={5}
              value={weeklyAppointments}
              onChange={(e) => setWeeklyAppointments(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Tariffa media per prestazione (€)</span>
              <span className="text-sky-700 font-mono text-sm">{averageTicket} €</span>
            </div>
            <input
              type="range"
              min={25}
              max={400}
              step={5}
              value={averageTicket}
              onChange={(e) => setAverageTicket(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500 mt-1">
              {sector === "dentistico"
                ? "Studio Dentistico: igiene ~90€, otturazioni e chirurgia ~150-350€"
                : sector === "veterinario"
                ? "Clinica Veterinaria: visita ~50-90€, accertamenti ~100-200€"
                : sector === "toelettatura"
                ? "Toelettatura: bagno ~35€, tosatura taglia grande ~55-90€"
                : "Studio Medico: visite specialistiche ~100-180€"}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Tasso attuale di appuntamenti saltati / No-Show (%)</span>
              <span className="text-rose-600 font-mono text-sm font-bold">{noShowRate} %</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={noShowRate}
              onChange={(e) => setNoShowRate(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500 mt-1">
              Media nazionale italiana studi medici e dentistici: 12% - 18%
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Ore al giorno della segreteria dedicate al telefono</span>
              <span className="text-sky-700 font-mono text-sm font-bold">{phoneHoursPerDay} ore/giorno</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={phoneHoursPerDay}
              onChange={(e) => setPhoneHoursPerDay(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Financial ROI Output */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-rose-700 tracking-wider">
                  Costo Nascosto Attuale dello Studio
                </span>
                <div className="text-3xl font-black text-rose-950 mt-1">
                  -{formatNum(monthlyRevenueLost)} € <span className="text-xs text-rose-700 font-normal">/ mese</span>
                </div>
                <div className="text-xs text-rose-800 mt-1">
                  Pari a <strong className="text-rose-950">-{formatNum(yearlyRevenueLost)} €</strong> all&apos;anno bruciati in circa {lostApptsPerMonth} appuntamenti dimenticati.
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                  Fatturato Recuperabile con la Tua Web App + WhatsApp
                </span>
                <div className="text-3xl font-black text-emerald-950 mt-1">
                  +{formatNum(recoveredRevenueMonthly)} € <span className="text-xs text-emerald-700 font-normal">/ mese</span>
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  Oltre <strong className="text-emerald-950">+{formatNum(recoveredRevenueYearly)} € all&apos;anno</strong> recuperati + <strong className="text-emerald-950">{savedPhoneHours} ore al mese</strong> di centralino liberate per il personale.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pitch Generator Box */}
          <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Argomentazione Commerciale su Misura (Copia e Incolla):
              </span>
              <button
                onClick={copyPitch}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-xs"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript ? "Copiato!" : "Copia Pitch"}
              </button>
            </div>
            <p className="text-[11px] text-slate-700 font-mono leading-relaxed line-clamp-3 bg-white p-2.5 rounded-xl border border-sky-100">
              {salesPitchScript}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
