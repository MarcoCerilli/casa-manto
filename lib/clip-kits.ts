import { OrganicSector } from "@/lib/organic-posts";

export interface SubtitleCue {
  start: string;
  end: string;
  text: string;
}

export interface Shot {
  time: string;
  camera: string;
  onScreen: string;
}

export interface ClipKit {
  sector: OrganicSector;
  title: string;
  duration: string;
  format: string;
  keyword: string;
  cover: string;
  caption: string;
  shots: Shot[];
  cues: SubtitleCue[];
}

export const CLIP_KITS: ClipKit[] = [
  {
    sector: "dentistico",
    title: "Reel 30s — La poltrona delle 16:00",
    duration: "30 secondi",
    format: "File già montato, verticale 9:16, 1080×1920, 30 secondi, sottotitoli impressi.",
    keyword: "DEMO",
    cover: "Locandina quadrata su Facebook e Instagram. Cover verticale sul Reel.",
    caption: `Una poltrona vuota alle 16:00 non è un imprevisto. È un sì detto al telefono e poi dimenticato.

Il paziente di oggi prenota la sera, dal telefono, in tre passaggi. Conferma e promemoria arrivano su WhatsApp.

Se hai uno studio, commenta DEMO. Ti mando il link: si apre dal telefono, niente da installare.

#studiodentistico #odontoiatria #prenotazioni`,
    shots: [
      {
        time: "0:00–0:05",
        camera: "Poltrona vuota, faretto acceso. Poi stacco sull'orologio o sull'agenda alle 16:00.",
        onScreen: "POLTRONA VUOTA\nALLE 16:00",
      },
      {
        time: "0:05–0:10",
        camera: "Telefono dello studio che squilla. Nessuno risponde, parte la segreteria.",
        onScreen: "AVEVA DETTO SÌ",
      },
      {
        time: "0:10–0:22",
        camera: "Registrazione schermo del telefono su /demo/dentista: servizio, orario, conferma. Poi la notifica WhatsApp.",
        onScreen: "3 PASSAGGI\n+ WHATSAPP",
      },
      {
        time: "0:22–0:30",
        camera: "Tu in camera, telefono in mano, dito verso il basso. Tieni la locandina verticale come ultimo frame.",
        onScreen: "COMMENTA DEMO",
      },
    ],
    cues: [
      { start: "00:00:00,000", end: "00:00:03,200", text: "Una poltrona vuota alle quattro." },
      { start: "00:00:03,200", end: "00:00:06,400", text: "Il paziente aveva detto sì." },
      { start: "00:00:06,400", end: "00:00:09,200", text: "Alle quattro non c'era." },
      { start: "00:00:09,200", end: "00:00:13,000", text: "La segreteria richiama.\nRisponde la segreteria." },
      { start: "00:00:13,000", end: "00:00:17,400", text: "Oggi si prenota la sera,\ndal telefono." },
      { start: "00:00:17,400", end: "00:00:21,000", text: "Tre passaggi.\nConferma su WhatsApp." },
      { start: "00:00:21,000", end: "00:00:24,500", text: "Il giorno prima arriva\nil promemoria." },
      { start: "00:00:24,500", end: "00:00:28,000", text: "Se hai uno studio,\ncommenta DEMO." },
      { start: "00:00:28,000", end: "00:00:30,000", text: "Ti mando il link." },
    ],
  },
  {
    sector: "veterinario",
    title: "Reel 30s — La linea per le urgenze",
    duration: "30 secondi",
    format: "File già montato, verticale 9:16, 1080×1920, 30 secondi, sottotitoli impressi.",
    keyword: "VISITA",
    cover: "Stessa coppia di locandine: quadrata per il feed, verticale per il Reel.",
    caption: `Il lunedì in clinica il telefono fa due lavori insieme: il richiamo del vaccino e il proprietario che ha un'urgenza.

I richiami possono passare dal telefono del proprietario. La linea resta per chi ha fretta.

Cane e gatto non finiscono nello stesso ambulatorio. La conferma arriva su WhatsApp, con il promemoria del libretto.

Se hai una clinica, commenta VISITA.

#veterinario #clinicaveterinaria #cani #gatti`,
    shots: [
      {
        time: "0:00–0:06",
        camera: "Reception con il telefono che lampeggia. In secondo piano una sala d'attesa, anche solo accennata.",
        onScreen: "IL TELEFONO\nNON SI CHIUDE",
      },
      {
        time: "0:06–0:12",
        camera: "Dettaglio: un libretto sanitario e un'agenda piena di richiami.",
        onScreen: "RICHIAMI E URGENZE\nNELLA STESSA CODA",
      },
      {
        time: "0:12–0:22",
        camera: "Schermo su /demo/veterinario: cane o gatto, motivo, orario, conferma WhatsApp.",
        onScreen: "IL VACCINO\nSI PRENOTA DA SOLO",
      },
      {
        time: "0:22–0:30",
        camera: "Tu in camera. Ultimo frame: locandina verticale.",
        onScreen: "COMMENTA VISITA",
      },
    ],
    cues: [
      { start: "00:00:00,000", end: "00:00:03,400", text: "Il lunedì in clinica\nil telefono non si chiude." },
      { start: "00:00:03,400", end: "00:00:07,200", text: "C'è il richiamo del vaccino." },
      { start: "00:00:07,200", end: "00:00:10,800", text: "E c'è chi chiama\nper un'urgenza." },
      { start: "00:00:10,800", end: "00:00:14,600", text: "Sono due code diverse." },
      { start: "00:00:14,600", end: "00:00:18,800", text: "Il vaccino si prenota\ndal telefono." },
      { start: "00:00:18,800", end: "00:00:22,400", text: "Cane e gatto restano\nin ambulatori separati." },
      { start: "00:00:22,400", end: "00:00:26,000", text: "Su WhatsApp arriva\nanche il libretto." },
      { start: "00:00:26,000", end: "00:00:30,000", text: "Hai una clinica?\nCommenta VISITA." },
    ],
  },
  {
    sector: "toelettatura",
    title: "Reel 30s — Il posto si blocca da solo",
    duration: "30 secondi",
    format: "File già montato, verticale 9:16, 1080×1920, 30 secondi, sottotitoli impressi.",
    keyword: "scrivi",
    cover: "Locandina quadrata nel feed. Cover verticale come primo frame del Reel.",
    caption: `Non mancano i clienti. Manca il momento per rispondere: i messaggi arrivano alle 21, quando hai il phon in mano.

Un barboncino non entra nello stesso buco di un pelo corto. L'orario dura quanto quel manto, e a 7 settimane arriva il richiamo del prossimo taglio.

Se il salone è il tuo, scrivimi. Ti mando la pagina che vede chi porta il cane, e l'agenda.

#toelettatura #toelettatori #cani`,
    shots: [
      {
        time: "0:00–0:03",
        camera: "Schermo cliente: titolo Teo, il posto si blocca da solo.",
        onScreen: "IL POSTO SI BLOCCA",
      },
      {
        time: "0:03–0:12",
        camera: "Listino bagno / tosatura / stripping. Poi conferma WhatsApp, posto tenuto.",
        onScreen: "WHATSAPP PARTE",
      },
      {
        time: "0:12–0:21",
        camera: "Agenda: lavori in postazione. Tab richiami manto.",
        onScreen: "CADE IN AGENDA",
      },
      {
        time: "0:21–0:30",
        camera: "11 lavori, 606 € in postazione. Chiudi sulla prova da mandare.",
        onScreen: "SCRIVICI",
      },
    ],
    cues: [
      { start: "00:00:00,000", end: "00:00:03,300", text: "Il manto ha il suo orario." },
      { start: "00:00:03,300", end: "00:00:06,100", text: "Ogni servizio dura\nil suo tempo." },
      { start: "00:00:06,100", end: "00:00:11,950", text: "Il posto si blocca.\nWhatsApp parte." },
      { start: "00:00:11,950", end: "00:00:18,650", text: "Cade sulla postazione giusta." },
      { start: "00:00:18,650", end: "00:00:21,250", text: "A sette settimane\nlo richiami tu." },
      { start: "00:00:21,250", end: "00:00:26,800", text: "L'incasso entra\nin postazione." },
      { start: "00:00:26,800", end: "00:00:30,000", text: "Scrivici.\nTi mando la prova." },
    ],
  },
];

export function cuesToSrt(cues: SubtitleCue[]): string {
  return cues
    .map((cue, index) => `${index + 1}\n${cue.start} --> ${cue.end}\n${cue.text}\n`)
    .join("\n");
}
