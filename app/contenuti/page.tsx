"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { ORGANIC_PACKS, OrganicSector } from "@/lib/organic-posts";
import { CLIP_KITS, cuesToSrt } from "@/lib/clip-kits";

export default function ContenutiOrganiciPage() {
  const [sector, setSector] = useState<OrganicSector>("dentistico");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const pack = ORGANIC_PACKS.find((item) => item.sector === sector) ?? ORGANIC_PACKS[0];
  const clip = CLIP_KITS.find((item) => item.sector === sector) ?? CLIP_KITS[0];

  const downloadSrt = () => {
    const blob = new Blob([cuesToSrt(clip.cues)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sottotitoli-${clip.sector}.srt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Clip, sottotitoli, locandine, didascalie</p>
            <h1 className="text-lg font-black text-slate-900">Da programmare su Instagram e Facebook</h1>
          </div>
          <Link href="/" className="text-xs font-bold text-sky-700 hover:underline">
            Torna all&apos;hub
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          Un post a giorno, scritto in prima persona.{" "}
          {sector === "toelettatura"
            ? "A chi ti scrive mandi la pagina del cane e, se la chiede, l'agenda del salone."
            : "A chi commenta la parola chiave mandi solo il link della demo di quel mestiere, e l'agenda solo se te la chiede."}{" "}
          Sostituisci <span className="font-mono text-xs">[TUO_DOMINIO]</span> con l&apos;indirizzo pubblico quando pubblichi.
        </p>

        <div className="flex flex-wrap gap-2">
          {ORGANIC_PACKS.map((item) => (
            <button
              key={item.sector}
              onClick={() => setSector(item.sector)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                sector === item.sector
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              {item.sectorName}
            </button>
          ))}
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Reel pronto · {clip.duration}</p>
              <h2 className="font-black text-slate-900">{clip.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{clip.format}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={downloadSrt}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Scarica sottotitoli .srt
              </button>
              <button
                onClick={() => copyText(`srt-${clip.sector}`, cuesToSrt(clip.cues))}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
              >
                {copiedId === `srt-${clip.sector}` ? "Copiato" : "Copia sottotitoli"}
              </button>
            </div>
          </div>
          <video
            key={clip.sector}
            src={`/clip/${clip.sector}.mp4`}
            controls
            playsInline
            poster={`/locandine/${clip.sector}-reel.jpg`}
            className="w-full max-w-xs mx-auto rounded-2xl bg-black"
          />
          <a
            href={`/clip/${clip.sector}.mp4`}
            download
            className="inline-flex px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Scarica il Reel .mp4
          </a>
          <div className="bg-slate-950 text-white rounded-2xl p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {clip.cues.map((cue) => `${cue.start}  ${cue.text.replace("\n", " ")}`).join("\n")}
          </div>
          <p className="text-xs text-slate-500">
            Il video è già in 9:16 con i sottotitoli dentro. Su Meta Business Suite lo carichi così, incolli la didascalia e metti la locandina quadrata come anteprima del feed. L&apos;audio è vuoto di proposito: su Instagram e Facebook questi Reel si guardano senza volume.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          {[
            { file: "feed", label: "Instagram e Facebook · quadrata" },
            { file: "reel", label: "Cover Reel e storia · verticale" },
          ].map((poster) => (
            <a
              key={poster.file}
              href={`/locandine/${sector}-${poster.file}.jpg`}
              download
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <img
                src={`/locandine/${sector}-${poster.file}.jpg`}
                alt={poster.label}
                className="w-full h-auto bg-slate-100"
              />
              <p className="p-3 text-xs font-bold text-slate-700">Scarica · {poster.label}</p>
            </a>
          ))}
        </section>

        <article className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Didascalia da incollare sotto il Reel</p>
              <h3 className="font-black text-slate-900">Stessa frase su Instagram e Facebook</h3>
            </div>
            <button
              onClick={() => copyText(`cap-${clip.sector}`, clip.caption)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5"
            >
              {copiedId === `cap-${clip.sector}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === `cap-${clip.sector}` ? "Copiato" : "Copia didascalia"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">{clip.caption}</pre>
        </article>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h2 className="font-black text-slate-900">Settimana tipo — {pack.sectorName}</h2>
          <p className="text-xs text-slate-500">
            {sector === "toelettatura" ? (
              "A chi scrive mandi i due link"
            ) : (
              <>
                Parola nei commenti: <span className="font-bold text-slate-800">{pack.keyword}</span>
              </>
            )}
            {" · "}
            cliente <span className="font-mono">{pack.demoPath}</span>
            {" · "}
            agenda <span className="font-mono">{pack.gestionalePath}</span>
          </p>
          <ul className="space-y-1.5 text-sm">
            {pack.week.map((row) => (
              <li key={row.day} className="flex gap-3">
                <span className="w-24 shrink-0 font-bold text-slate-900">{row.day}</span>
                <span className="text-slate-600">{row.action}</span>
              </li>
            ))}
          </ul>
        </section>

        {pack.pieces.map((piece) => (
          <article key={piece.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {piece.channel} · {piece.when}
                </p>
                <h3 className="font-black text-slate-900">{piece.title}</h3>
              </div>
              <button
                onClick={() => copyText(piece.id, piece.text)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                {copiedId === piece.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === piece.id ? "Copiato" : "Copia testo"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">{piece.text}</pre>
          </article>
        ))}
      </div>
    </main>
  );
}
