export type OrganicSector = "dentistico" | "veterinario" | "toelettatura";

export interface OrganicPiece {
  id: string;
  channel: string;
  when: string;
  title: string;
  text: string;
}

export interface OrganicPack {
  sector: OrganicSector;
  sectorName: string;
  keyword: string;
  demoPath: string;
  gestionalePath: string;
  week: { day: string; action: string }[];
  pieces: OrganicPiece[];
}

export const ORGANIC_PACKS: OrganicPack[] = [
  {
    sector: "dentistico",
    sectorName: "Studi dentistici",
    keyword: "DEMO",
    demoPath: "/demo/dentista",
    gestionalePath: "/gestionale-dentistico",
    week: [
      { day: "Lunedì", action: "Post Instagram: la poltrona delle 16:00 rimasta vuota" },
      { day: "Martedì", action: "Google Business: prenotazione sera, 3 passaggi" },
      { day: "Mercoledì", action: "Storia in 3 frame: telefono / link / WhatsApp" },
      { day: "Giovedì", action: "LinkedIn: il conto dei no-show, in prima persona" },
      { day: "Venerdì", action: "Risposta ai commenti DEMO con i due link" },
    ],
    pieces: [
      {
        id: "dent-ig",
        channel: "Instagram",
        when: "Lunedì, ore 12:30",
        title: "La poltrona delle 16:00",
        text: `Ieri uno studio mi ha raccontato la solita scena delle 16:00.

La poltrona dell'igiene era pronta. La paziente aveva detto sì al telefono dieci giorni prima. Alle 16:05 non c'era. La segreteria ha chiamato, segreteria del cellulare, e quello slot da 90 euro è rimasto lì.

Non è sfortuna. È il modo in cui si prenota ancora: una telefonata, un appunto, nessun promemoria sul telefono che quella persona guarda davvero.

Sto facendo vedere agli studi una pagina in cui il paziente sceglie igiene, prima visita o urgenza e un orario libero. La conferma arriva su WhatsApp, e il giorno prima anche il promemoria.

Se hai uno studio e vuoi provarla come la vedrebbe un paziente, commenta DEMO. Ti mando il link, si apre dal telefono e non c'è niente da installare.

#studiodentistico #odontoiatria #prenotazioni #whatsapp`,
      },
      {
        id: "dent-google",
        channel: "Scheda Google",
        when: "Martedì",
        title: "Post sulla scheda dello studio (da adattare al cliente)",
        text: `Prenota l'igiene o la prima visita anche dopo l'orario di segreteria.

Scegli il trattamento, un orario libero e lascia il cellulare: la conferma arriva su WhatsApp, insieme al promemoria il giorno prima.

Nessuna app da scaricare. Il pagamento resta in studio.

[LINK_PRENOTAZIONE]`,
      },
      {
        id: "dent-stories",
        channel: "Storie Instagram",
        when: "Mercoledì, 3 frame",
        title: "Sequenza storie",
        text: `Frame 1 — testo grande su foto di una segreteria al telefono
"Quante volte al giorno ripetete gli orari liberi?"

Frame 2 — screen della demo, dito sullo slot
"Il paziente lo fa da solo, la sera, in tre passaggi."

Frame 3 — sticker domanda
"Vuoi il link della demo?
Rispondi DEMO a questa storia."

Quando rispondono, manda solo /demo/dentista.
Se il titolare chiede "e l'agenda?", aggiungi /gestionale-dentistico.`,
      },
      {
        id: "dent-li",
        channel: "LinkedIn",
        when: "Giovedì, ore 8:15",
        title: "Il conto, senza brochure",
        text: `Tre igieni saltate a settimana, a 90 euro, sono più di mille euro al mese che lo studio non vede. E la segreteria ha già passato il tempo a fissarle.

Ne parlo con i titolari partendo da questo, non dal software.

Quello che gli faccio provare è volutamente piccolo: una pagina paziente e un'agenda poltrone. Il paziente prenota dal telefono, lo studio vede la riga nuova, parte un WhatsApp.

I due indirizzi sono separati. Al paziente non mostro mai il gestionale. Al titolare sì, un minuto dopo, così vede la stessa prenotazione dall'altra parte.

Se ti occupi di uno studio e vuoi i link, scrivimi DEMO nei commenti.`,
      },
      {
        id: "dent-reply",
        channel: "Risposta commenti e DM",
        when: "Venerdì, e ogni volta che arriva DEMO",
        title: "Cosa rispondere",
        text: `Ciao, eccoli. Sono due pagine diverse di proposito.

Questa è quella che apriresti se fossi un paziente (igiene, orario, conferma WhatsApp):
[TUO_DOMINIO]/demo/dentista

Questa è l'agenda dello studio, con le poltrone e i richiami dell'igiene a 6 mesi:
[TUO_DOMINIO]/gestionale-dentistico

Provale dal telefono. Se mi dici quante poltrone avete e quali prestazioni volete online, ti dico cosa terrei e cosa no.`,
      },
    ],
  },
  {
    sector: "veterinario",
    sectorName: "Cliniche veterinarie",
    keyword: "VISITA",
    demoPath: "/demo/veterinario",
    gestionalePath: "/gestionale-veterinario",
    week: [
      { day: "Lunedì", action: "Instagram: la reception durante i richiami vaccinali" },
      { day: "Martedì", action: "Facebook gruppi pet di zona: prenotare il vaccino senza tenere la linea" },
      { day: "Mercoledì", action: "Storia: cane / gatto / ambulatori separati" },
      { day: "Giovedì", action: "LinkedIn per direttori di clinica" },
      { day: "Venerdì", action: "DM con i due link a chi commenta VISITA" },
    ],
    pieces: [
      {
        id: "vet-ig",
        channel: "Instagram",
        when: "Lunedì, ore 18:30",
        title: "La reception di lunedì",
        text: `Il lunedì in clinica veterinaria ha un suono preciso: il telefono che non si chiude, e in sala un gatto che aspetta mentre qualcuno chiede per la terza volta "il richiamo di Leo si può fare giovedì?".

Quei richiami sono visite vere. Sono anche le telefonate che intasano la linea quando entra un'urgenza.

Nella demo che sto facendo vedere alle cliniche il proprietario sceglie cane, gatto o altro, il motivo (vaccino, visita, cute, ecografia) e un orario. Cani e gatti non finiscono nello stesso ambulatorio. Su WhatsApp arriva la conferma e il promemoria del libretto.

Se hai una clinica e vuoi vederla come la vedrebbe un proprietario, commenta VISITA.

#veterinario #clinicaveterinaria #cani #gatti`,
      },
      {
        id: "vet-fb",
        channel: "Facebook",
        when: "Martedì, gruppi locali di proprietari — pubblicalo dal profilo della clinica, non come ads",
        title: "Post da dare al cliente veterinario",
        text: `Il richiamo vaccinale di quest'anno si prenota anche la sera.

Indicate se è cane, gatto o un altro animale, scegliete il motivo della visita e un orario libero. Vi arriva la conferma su WhatsApp, con il promemoria di portare il libretto.

Per le urgenze la linea del pronto soccorso resta quella di sempre: gli slot di emergenza non compaiono tra le prenotazioni normali.

[LINK_PRENOTAZIONE]`,
      },
      {
        id: "vet-stories",
        channel: "Storie Instagram",
        when: "Mercoledì",
        title: "Tre frame, ambulatori separati",
        text: `Frame 1
"Cane e gatto nella stessa sala d'attesa: lo stress si vede."

Frame 2 — agenda della demo, filtro ambulatorio gatti
"In agenda i percorsi restano separati."

Frame 3
"Direttore di clinica? Rispondi VISITA e ti mando la prova da telefono."`,
      },
      {
        id: "vet-li",
        channel: "LinkedIn",
        when: "Giovedì, ore 8:15",
        title: "Triage e richiami, due code diverse",
        text: `In clinica veterinaria il telefono fa due lavori che non dovrebbero stare in coda insieme: il richiamo vaccinale di routine e il proprietario che chiama perché il cane ha ingerito qualcosa.

Se i richiami passano online, la linea resta per chi ha fretta davvero. Il vaccino in scadenza esce da una lista, parte un WhatsApp, il proprietario riblocca l'orario.

Ho due demo separate, apposta:
una è il sito che userebbe il proprietario, l'altra è l'agenda con ambulatori cane/gatto, ecografia e scadenze vaccinali.

Chi vuole provarle commenta VISITA. Mando solo i link, senza PDF.`,
      },
      {
        id: "vet-reply",
        channel: "Risposta commenti e DM",
        when: "Quando arriva VISITA",
        title: "Cosa rispondere",
        text: `Ciao, ti mando le due pagine della clinica, sono indipendenti.

Quella del proprietario (specie, visita, orario, WhatsApp):
[TUO_DOMINIO]/demo/veterinario

L'agenda della clinica (ambulatori, urgenze, scadenze vaccini):
[TUO_DOMINIO]/gestionale-veterinario

Se mi dici se avete pronto soccorso e se cani e gatti sono già su percorsi separati, adatto il discorso al vostro giro reale.`,
      },
    ],
  },
  {
    sector: "toelettatura",
    sectorName: "Toelettature",
    keyword: "scrivi",
    demoPath: "/demo/toelettatura",
    gestionalePath: "/gestionale-toelettatura",
    week: [
      { day: "Lunedì", action: "Instagram: sabato pieno, martedì vuoto" },
      { day: "Martedì", action: "Storia con sondaggio taglia / manto" },
      { day: "Mercoledì", action: "Facebook: il link al posto dei DM delle 21" },
      { day: "Giovedì", action: "LinkedIn o post nel profilo professionale del salone" },
      { day: "Venerdì", action: "A chi ti scrive mandi la pagina del cane e l'agenda" },
    ],
    pieces: [
      {
        id: "groom-ig",
        channel: "Instagram",
        when: "Lunedì, ore 19:00 (quando i titolari hanno chiuso e scrollano)",
        title: "Sabato pieno, martedì vuoto",
        text: `Ho passato la mattina con una toelettatura che il sabato è piena fino a giugno e il martedì ha la vasca ferma.

Non gli mancano i clienti. Gli manca il momento in cui rispondere. I messaggi arrivano alle 21, "c'è posto per un barboncino giovedì?", e al mattino quelle chat sono ancora lì perché ieri c'era il phon in mano.

Un barboncino non può prendere lo stesso buco di un pelo corto. Se l'agenda non lo sa, o finisci alle 20 o lasci un'ora vuota che sembrava occupata.

Nella prova che ho online il cliente sceglie taglia, servizio e un orario lungo quanto quel manto. In sala vedi vasca, tosatura e finishing separati. A 6-8 settimane parte il richiamo del prossimo taglio, così il martedì si riempie con chi è già tuo.

Se il salone è il tuo, scrivimi. Ti mando la pagina che vede chi porta il cane, e l'agenda.

#toelettatura #toelettatori #cani #barbieri`,
      },
      {
        id: "groom-stories",
        channel: "Storie Instagram",
        when: "Martedì",
        title: "Sondaggio e poi il link",
        text: `Frame 1 — sondaggio
"Cosa ti scrive la gente alle 21?"
A) "Avete posto sabato?"
B) "Quanto ci vuole per un volpino?"

Frame 2
"Sabato è già pieno. Il buco è martedì, e il volpino dura di più di un pelo raso."

Frame 3
"Scrivimi. Ti mando la prova: c'è già il cane, e l'orario di martedì."`,
      },
      {
        id: "groom-fb",
        channel: "Facebook",
        when: "Mercoledì — pagina del salone, non sponsorizzata",
        title: "Post da consegnare al titolare",
        text: `Da questa settimana il bagno e la tosatura si prenotano anche a salone chiuso.

Scegliete il servizio, la taglia e un orario libero: i tempi cambiano se il manto è corto, se serve la tosatura o lo stripping. Vi arriva la conferma su WhatsApp con l'orario e cosa prepararci a casa (niente nodi impossibili lasciati all'ultimo).

Se il vostro cane è già nostro cliente, tra qualche settimana vi scriviamo noi per il taglio successivo. Non dovete ricordarvelo voi.

[LINK_PRENOTAZIONE]`,
      },
      {
        id: "groom-li",
        channel: "LinkedIn",
        when: "Giovedì, ore 8:15",
        title: "Un gestionale da salone, non un ambulatorio riverniciato",
        text: `Le toelettature mi chiedono spesso "va bene il gestionale del veterinario?". No. Il veterinario vende visite da 25 minuti. Il salone vende tempo di mani: 45 minuti o due ore, vasca occupata, tosatura occupata, finishing dopo.

Ho separato le demo di proposito.
Quella veterinaria resta una clinica: vaccini, ambulatori, triage.
Quella della toelettatura è un salone: taglia, manto, postazioni, richiamo a 6-8 settimane.

Al cliente del salone mando solo la sua pagina. Al titolare mando anche l'agenda, così vede la prenotazione cadere sulla postazione giusta.

Se hai un salone, scrivimi. Ti mando la pagina del cliente e l'agenda.`,
      },
      {
        id: "groom-reply",
        channel: "Risposta commenti e DM",
        when: "Quando ti scrivono",
        title: "Cosa rispondere",
        text: `Ciao, due link, due ruoli diversi.

Pagina che userebbe un cliente (servizio, taglia, orario, WhatsApp):
[TUO_DOMINIO]/demo/toelettatura

Agenda del salone (vasca, tosatura, finishing e richiami del manto):
[TUO_DOMINIO]/gestionale-toelettatura

Se mi dici quante postazioni hai e quali servizi durano più di un'ora, la prossima versione la calo sul tuo listino vero.`,
      },
    ],
  },
];
