"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCheck, Sparkles, RefreshCw, Smartphone, Bot, User } from "lucide-react";

interface WhatsAppBotSimulatorProps {
  sector: "dentistico" | "veterinario";
}

interface ChatMessage {
  id: string;
  sender: "patient" | "bot";
  text: string;
  time: string;
}

export const WhatsAppBotSimulator: React.FC<WhatsAppBotSimulatorProps> = ({ sector }) => {
  const isDental = sector === "dentistico";

  const clinicName = isDental ? "Studio Odontoiatrico Dott. Riva" : "Clinica Veterinaria San Rocco";

  const initialMessages: ChatMessage[] = isDental
    ? [
        {
          id: "1",
          sender: "patient",
          text: "Buonasera Dottore, da ieri sera ho un dolore forte al molare inferiore destro quando mastico. Avete un buco per visitarmi domani?",
          time: "22:15",
        },
        {
          id: "2",
          sender: "bot",
          text: "Ciao Marco! Ci dispiace per il fastidio. Per le urgenze abbiamo riservato 2 orari con il Dott. Riva per domani:\n\n1️⃣ Ore 11:30\n2️⃣ Ore 16:45\n\nQuale preferisci? Rispondi semplicemente '1' o '2'.",
          time: "22:15",
        },
      ]
    : [
        {
          id: "1",
          sender: "patient",
          text: "Buonasera, il mio cane Milo (Labrador) ha le orecchie molto arrossate e continua a scuotere la testa. Quando possiamo venire per un controllo?",
          time: "21:40",
        },
        {
          id: "2",
          sender: "bot",
          text: "Ciao Valentina! I sintomi indicano un possibile controllo otologico. Domani all'Ambulatorio 1 abbiamo liberi questi slot:\n\n1️⃣ Domani ore 10:00 (Dott. Barbieri)\n2️⃣ Domani ore 17:30\n\nRispondi '1' o '2' per bloccare l'orario senza telefonare.",
          time: "21:40",
        },
      ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "patient",
      text: text,
      time: "22:16",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "";

      if (text.includes("1")) {
        reply = isDental
          ? "🎉 Perfetto Marco! Appuntamento fissato per domani alle ore 11:30 (Poltrona 1 - Dott. Riva). Ti invieremo un promemoria 2 ore prima. Per qualsiasi urgenza rispondi a questo messaggio."
          : "🎉 Ottimo Valentina! Visita di Milo confermata per domani alle 10:00 (Ambulatorio 1 - Dott. Barbieri). Ricordati di portare il libretto sanitario!";
      } else if (text.includes("2")) {
        reply = isDental
          ? "🎉 Confermato! Ti aspettiamo domani alle 16:45 presso lo Studio Dott. Riva. Ti invieremo promemoria su WhatsApp."
          : "🎉 Confermato! Visita confermata per domani alle 17:30 alla Clinica San Rocco.";
      } else {
        reply = isDental
          ? "Grazie per il messaggio! Vuoi fissare un'igiene dentale, una prima visita o un controllo urgenza? Clicca qui per vedere tutti gli orari liberi: [LINK PRENOTAZIONE RAPIDA]"
          : "Grazie per il messaggio! Vuoi fissare un vaccino, una visita clinica o un'urgenza? Clicca sul link per scegliere lo slot: [LINK PRENOTAZIONE PET]";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: reply,
          time: "22:16",
        },
      ]);
    }, 1200);
  };

  const handleReset = () => {
    setMessages(initialMessages);
    setInputText("");
  };

  return (
    <div className="bg-white border border-sky-100 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            Innovazione: Assistente WhatsApp Automatico 24/7
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Simulatore Chat WhatsApp: Risponde in 3 Secondi Anche a Studio Chiuso
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Mostra al titolare come il sistema risponde ai messaggi serali dei pazienti e fissa l&apos;appuntamento senza far intervenire la segreteria.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Ricomincia Chat
        </button>
      </div>

      {/* WhatsApp Interface Mockup in Light Theme */}
      <div className="max-w-md mx-auto bg-slate-100 rounded-3xl p-3 border-2 border-slate-200 shadow-md">
        {/* WhatsApp App Header */}
        <div className="bg-emerald-700 text-white p-3 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white text-emerald-700 font-bold flex items-center justify-center text-sm shadow-xs">
              {isDental ? "🦷" : "🐾"}
            </div>
            <div>
              <div className="font-bold text-xs">{clinicName}</div>
              <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                Account Ufficiale • Sempre Attivo
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-md font-mono">
            H24
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="p-3 space-y-2.5 min-h-[300px] max-h-[360px] overflow-y-auto bg-[#efeae2] rounded-2xl mt-2 border border-slate-200/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs shadow-xs space-y-1 font-sans leading-relaxed ${
                  msg.sender === "patient"
                    ? "bg-[#d9fdd3] text-slate-900 rounded-br-xs"
                    : "bg-white text-slate-900 rounded-bl-xs"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 font-mono">
                  <span>{msg.time}</span>
                  {msg.sender === "patient" && (
                    <CheckCheck className="w-3 h-3 text-sky-600 inline" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-2.5 rounded-2xl text-[11px] text-slate-500 italic shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                <span>L&apos;assistente dello studio sta scrivendo...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Click Reply Chips */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
          <button
            onClick={() => handleSend("1")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-[11px] font-bold hover:bg-emerald-50 hover:border-emerald-300 transition whitespace-nowrap shadow-xs"
          >
            👉 Rispondi &ldquo;1&rdquo; (Slot 1)
          </button>
          <button
            onClick={() => handleSend("2")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-[11px] font-bold hover:bg-emerald-50 hover:border-emerald-300 transition whitespace-nowrap shadow-xs"
          >
            👉 Rispondi &ldquo;2&rdquo; (Slot 2)
          </button>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Scrivi un messaggio di test..."
            className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
