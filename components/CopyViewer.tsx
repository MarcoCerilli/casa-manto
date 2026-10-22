"use client";

import React, { useState } from "react";
import { PromoKit } from "@/lib/default-copy-data";
import {
  Film,
  Linkedin,
  Layers,
  Globe,
  Copy,
  Check,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Clock,
  Play,
  CheckCircle2,
  PhoneCall,
  Smartphone,
  Eye
} from "lucide-react";

interface CopyViewerProps {
  kit: PromoKit;
  onOpenAiGenerator: () => void;
}

export const CopyViewer: React.FC<CopyViewerProps> = ({ kit, onOpenAiGenerator }) => {
  const [activeTab, setActiveTab] = useState<"reel" | "linkedin" | "carousel" | "website" | "outreach">("reel");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [reelPreviewMode, setReelPreviewMode] = useState<"storyboard" | "raw">("storyboard");

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadFullKit = () => {
    const markdownContent = `# KIT PROMOZIONALE B2B: SOFTWARE & DEMO PER ${kit.sectorName.toUpperCase()}
Target: ${kit.targetAudience}
Hook Principale: ${kit.coreHook}

---

## 1. SCRIPT REEL / TIKTOK (30 SECONDI)
Titolo: ${kit.reelScript.title}
Durata: ${kit.reelScript.totalDuration}
Mood Audio/Musica: ${kit.reelScript.vibeAudio}

${kit.reelScript.scenes
  .map(
    (scene, idx) => `### SCENA ${idx + 1} (${scene.timestamp} - ${scene.duration})
- COSA MOSTRARE A VIDEO: ${scene.videoAction}
- TESTO A SCHERMO: ${scene.onScreenText}
- VOCE NARRANTE: "${scene.voiceover}"
- EFFETTO AUDIO: ${scene.soundCue || "N/A"}
`
  )
  .join("\n")}

### CAPTION PER IL REEL:
${kit.reelScript.captionForReel}

---

## 2. POST LINKEDIN / FACEBOOK B2B
HEADLINE: ${kit.linkedInPost.headline}

${kit.linkedInPost.content}

Hashtags: ${kit.linkedInPost.hashtags.join(" ")}
Immagine suggerita: ${kit.linkedInPost.suggestedImageDesc}

---

## 3. CAROSELLO INSTAGRAM (5 SLIDE)
Titolo: ${kit.carousel.title}

${kit.carousel.slides
  .map(
    (slide) => `### ${slide.badge}
HEADLINE: ${slide.headline}
CORPO: ${slide.body}
${slide.bulletPoints ? slide.bulletPoints.map((bp) => `- ${bp}`).join("\n") : ""}
NOTA VISIVA: ${slide.visualCue}
`
  )
  .join("\n")}

### CAPTION CAROSELLO INSTAGRAM:
${kit.carousel.captionForCarousel}

---

## 4. COPY SEZIONE SITO WEB (HERO & FEATURES)
BADGE: ${kit.websiteCopy.badge}
TITOLO H1: ${kit.websiteCopy.h1}
SOTTOTITOLO: ${kit.websiteCopy.subtitle}

PUNTI DI FORZA:
${kit.websiteCopy.features
  .map(
    (feat, idx) => `Punto ${idx + 1}: ${feat.title}
Descrizione: ${feat.description}
Metrica di Business: ${feat.metric}
`
  )
  .join("\n")}

TESTO PULSANTE CTA: ${kit.websiteCopy.ctaButton}
MICRO-COPY: ${kit.websiteCopy.microcopy}

---

## 5. BONUS: PITCH OUTREACH DIRETTO
### MESSAGGIO DIRETTO WHATSAPP / INSTAGRAM DM:
${kit.directPitchBonus.whatsappDm}

### EMAIL A FREDDO:
${kit.directPitchBonus.coldEmail}
`;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Kit_Promozionale_${kit.sector}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReelRawText = () => {
    return `SCRIPT REEL 30 SECONDI:
${kit.reelScript.scenes
  .map(
    (s, i) =>
      `[${s.timestamp}] (${s.duration})\nVIDEO: ${s.videoAction}\nTESTO A SCHERMO: ${s.onScreenText}\nVOCE: "${s.voiceover}"\n`
  )
  .join("\n")}

CAPTION:
${kit.reelScript.captionForReel}`;
  };

  const getCarouselRawText = () => {
    return kit.carousel.slides
      .map(
        (s) =>
          `[${s.badge}]\n${s.headline}\n${s.body}\n${
            s.bulletPoints ? s.bulletPoints.join("\n") : ""
          }\nVisual: ${s.visualCue}\n`
      )
      .join("\n---\n\n") + `\n\nCAPTION:\n${kit.carousel.captionForCarousel}`;
  };

  const getWebsiteRawText = () => {
    return `BADGE: ${kit.websiteCopy.badge}
TITOLO H1: ${kit.websiteCopy.h1}
SOTTOTITOLO: ${kit.websiteCopy.subtitle}

PUNTI DI FORZA:
${kit.websiteCopy.features
  .map((f, i) => `${i + 1}. ${f.title}\n${f.description}\n[${f.metric}]`)
  .join("\n\n")}

PULSANTE CTA: ${kit.websiteCopy.ctaButton}
MICRO-COPY: ${kit.websiteCopy.microcopy}`;
  };

  return (
    <div className="space-y-6">
      {/* Sector Header / Controls Bar - Clean Light Styling */}
      <div className="bg-white border border-sky-100 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
              Kit Pronto all&apos;Uso
            </span>
            <span className="text-xs text-slate-500">Target: {kit.targetAudience}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Campagna Promozionale per {kit.sectorName}
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">{kit.coreHook}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAiGenerator}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Personalizza con AI
          </button>

          <button
            onClick={handleDownloadFullKit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Scarica (.md)
          </button>
        </div>
      </div>

      {/* Tabs navigation in light celestino theme */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("reel")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === "reel"
              ? "bg-rose-50 text-rose-800 border border-rose-200 shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Film className="w-4 h-4 text-rose-600" />
          <span>1. Script Reel 30s</span>
        </button>

        <button
          onClick={() => setActiveTab("linkedin")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === "linkedin"
              ? "bg-sky-50 text-sky-800 border border-sky-200 shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Linkedin className="w-4 h-4 text-sky-600" />
          <span>2. Post LinkedIn B2B</span>
        </button>

        <button
          onClick={() => setActiveTab("carousel")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === "carousel"
              ? "bg-purple-50 text-purple-800 border border-purple-200 shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-4 h-4 text-purple-600" />
          <span>3. Carosello Instagram (5 Slide)</span>
        </button>

        <button
          onClick={() => setActiveTab("website")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === "website"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>4. Copy Sezione Sito Web</span>
        </button>

        <button
          onClick={() => setActiveTab("outreach")}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === "outreach"
              ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <MessageCircle className="w-4 h-4 text-amber-600" />
          <span>Bonus: DM & Cold Email</span>
        </button>
      </div>

      {/* TAB 1: SCRIPT REEL */}
      {activeTab === "reel" && (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                  Script Video Breve • TikTok, Instagram Reel, YouTube Shorts
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{kit.reelScript.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Audio consigliato:</strong> {kit.reelScript.vibeAudio}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setReelPreviewMode(reelPreviewMode === "storyboard" ? "raw" : "storyboard")
                  }
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-200"
                >
                  {reelPreviewMode === "storyboard" ? "Visualizza Testo Grezzo" : "Vista Storyboard"}
                </button>
                <button
                  onClick={() => handleCopy(getReelRawText(), "reel-all")}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                >
                  {copiedKey === "reel-all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "reel-all" ? "Copiato!" : "Copia Tutto lo Script"}
                </button>
              </div>
            </div>

            {reelPreviewMode === "storyboard" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kit.reelScript.scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 relative hover:border-slate-300 transition shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-800 font-mono text-xs font-bold">
                        {scene.timestamp} ({scene.duration})
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">Scena {idx + 1} di 4</span>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase font-bold text-slate-600 tracking-wider mb-1">
                        🎬 Cosa mostrare a video:
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                        {scene.videoAction}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase font-bold text-amber-700 tracking-wider mb-1">
                        📝 Testo a schermo (Overlay):
                      </div>
                      <div className="text-xs font-black text-amber-950 bg-amber-50 border border-amber-200 p-2.5 rounded-xl whitespace-pre-line">
                        {scene.onScreenText}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase font-bold text-emerald-700 tracking-wider mb-1">
                        🎙️ Voce Narrante (Cosa dire):
                      </div>
                      <p className="text-xs text-emerald-950 font-medium italic bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                        &ldquo;{scene.voiceover}&rdquo;
                      </p>
                    </div>

                    {scene.soundCue && (
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Sound design: {scene.soundCue}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-wrap">
                {getReelRawText()}
              </pre>
            )}

            {/* Caption Section */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Caption pronta da incollare sotto al video:
                </span>
                <button
                  onClick={() => handleCopy(kit.reelScript.captionForReel, "reel-caption")}
                  className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1"
                >
                  {copiedKey === "reel-caption" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === "reel-caption" ? "Copiata" : "Copia Caption"}
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {kit.reelScript.captionForReel}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST LINKEDIN (LIGHT THEME MOCKUP) */}
      {activeTab === "linkedin" && (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-sky-700">
                  Post B2B LinkedIn & Gruppi Facebook di Settore
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Struttura ad Alto Engagement & Conversione Diretta
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Formattato con spaziature per massimizzare il &ldquo;dwell time&rdquo; e le richieste nei commenti.
                </p>
              </div>

              <button
                onClick={() => handleCopy(kit.linkedInPost.content, "linkedin-all")}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                {copiedKey === "linkedin-all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "linkedin-all" ? "Copiato negli Appunti!" : "Copia Post Completo"}
              </button>
            </div>

            {/* LinkedIn Clean White Card Mockup */}
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              {/* Fake author header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                  DEV
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Sviluppatore Web / Web Agency
                    <span className="text-[10px] text-sky-600 font-bold"> • 1°</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Soluzioni Software & Demo per {kit.sectorName}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>Adesso</span> • <span>🌐 Pubblico</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {kit.linkedInPost.headline}
              </div>

              {/* Main content body */}
              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {kit.linkedInPost.content}
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {kit.linkedInPost.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-xs text-sky-700 font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Image suggestion banner */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-[11px] text-sky-950 flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-900">Immagine consigliata per il post:</strong>
                  <div>{kit.linkedInPost.suggestedImageDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAROSELLO INSTAGRAM (5 SLIDE) */}
      {activeTab === "carousel" && (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700">
                  Carosello Instagram • 5 Slide ad Alto Valore
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{kit.carousel.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Perfetto per Instagram, caroselli PDF su LinkedIn e post visivi.
                </p>
              </div>

              <button
                onClick={() => handleCopy(getCarouselRawText(), "carousel-all")}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                {copiedKey === "carousel-all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "carousel-all" ? "Copiato!" : "Copia Tutte le 5 Slide"}
              </button>
            </div>

            {/* Interactive Carousel Slide Viewer - Light Mode */}
            <div className="max-w-xl mx-auto">
              <div className="aspect-square bg-gradient-to-br from-white via-sky-50/40 to-purple-50/40 border-2 border-purple-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-purple-950/5 relative">
                {/* Slide Header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200">
                    {kit.carousel.slides[currentSlideIndex].badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-bold">
                    {currentSlideIndex + 1} / {kit.carousel.totalSlides}
                  </span>
                </div>

                {/* Slide Body */}
                <div className="space-y-4 my-auto">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {kit.carousel.slides[currentSlideIndex].headline}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {kit.carousel.slides[currentSlideIndex].body}
                  </p>

                  {kit.carousel.slides[currentSlideIndex].bulletPoints && (
                    <div className="space-y-2 pt-2">
                      {kit.carousel.slides[currentSlideIndex].bulletPoints?.map((bp, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{bp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Slide Footer */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="italic text-[11px]">
                    🎨 Visual cue: {kit.carousel.slides[currentSlideIndex].visualCue}
                  </span>
                  <span className="text-purple-700 font-bold shrink-0">
                    {currentSlideIndex < 4 ? "Scorri 👉" : "Link in bio 🔗"}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 shadow-xs transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {kit.carousel.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlideIndex === idx ? "w-6 bg-purple-600" : "w-2 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlideIndex === kit.carousel.totalSlides - 1}
                  onClick={() =>
                    setCurrentSlideIndex((prev) => Math.min(kit.carousel.totalSlides - 1, prev + 1))
                  }
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 shadow-xs transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Carousel Caption */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Caption consigliata per il post carosello Instagram:
                </span>
                <button
                  onClick={() => handleCopy(kit.carousel.captionForCarousel, "carousel-caption")}
                  className="text-xs text-purple-700 hover:text-purple-900 font-bold inline-flex items-center gap-1"
                >
                  {copiedKey === "carousel-caption" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === "carousel-caption" ? "Copiata" : "Copia Caption Carosello"}
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {kit.carousel.captionForCarousel}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COPY SEZIONE SITO WEB (LIGHT PREVIEW) */}
      {activeTab === "website" && (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
                  Copy Landing Page & Sezione Sito Web
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Sezione di Presentazione ad Alta Conversione
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Titolo H1, Sottotitolo, 3 Punti di Forza con metriche di business e pulsante CTA magnetico.
                </p>
              </div>

              <button
                onClick={() => handleCopy(getWebsiteRawText(), "website-all")}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                {copiedKey === "website-all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "website-all" ? "Copiato!" : "Copia Tutto il Copy Web"}
              </button>
            </div>

            {/* Live Web Section Mockup in Clean Light Theme */}
            <div className="bg-gradient-to-b from-sky-50/50 to-white border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
              {/* Badge */}
              <div className="text-center">
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  {kit.websiteCopy.badge}
                </span>
              </div>

              {/* H1 & Subtitle */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {kit.websiteCopy.h1}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  {kit.websiteCopy.subtitle}
                </p>
              </div>

              {/* 3 Features Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                {kit.websiteCopy.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm mb-3 border border-sky-100">
                        {idx + 1}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">
                        {feat.metric}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="text-center pt-4 space-y-3">
                <button className="px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base shadow-md shadow-sky-600/25 transition inline-flex items-center gap-2 group">
                  <span>{kit.websiteCopy.ctaButton}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-xs text-slate-500">
                  {kit.websiteCopy.microcopy}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BONUS OUTREACH */}
      {activeTab === "outreach" && (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">
                Sequenze Cold Outreach & Pitch 1-to-1
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Contatta direttamente i Titolari su WhatsApp, Instagram o Email
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pitch brevi di 45 secondi formulati per incuriosire il medico e fargli cliccare sul link della demo online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp / DM Box */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" /> Messaggio Rapido WhatsApp / DM Instagram
                  </span>
                  <button
                    onClick={() => handleCopy(kit.directPitchBonus.whatsappDm, "pitch-dm")}
                    className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1"
                  >
                    {copiedKey === "pitch-dm" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "pitch-dm" ? "Copiato" : "Copia"}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-white text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans border border-slate-200">
                  {kit.directPitchBonus.whatsappDm}
                </div>
              </div>

              {/* Cold Email Box */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-sky-600" /> Cold Email per Titolare / Direttore Sanitario
                  </span>
                  <button
                    onClick={() => handleCopy(kit.directPitchBonus.coldEmail, "pitch-email")}
                    className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1"
                  >
                    {copiedKey === "pitch-email" ? <Check className="w-3 h-3 text-sky-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "pitch-email" ? "Copiato" : "Copia"}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-white text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans border border-slate-200">
                  {kit.directPitchBonus.coldEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
