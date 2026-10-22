export interface ReelScene {
  timestamp: string;
  duration: string;
  videoAction: string;
  onScreenText: string;
  voiceover: string;
  soundCue?: string;
}

export interface CarouselSlide {
  slideNumber: number;
  badge: string;
  headline: string;
  body: string;
  bulletPoints?: string[];
  visualCue: string;
}

export interface WebsiteCopy {
  badge: string;
  h1: string;
  subtitle: string;
  features: {
    title: string;
    description: string;
    metric: string;
  }[];
  ctaButton: string;
  microcopy: string;
  demoBannerText: string;
}

export interface PromoKit {
  sector: 'dentistico' | 'veterinario' | 'medico' | 'toelettatura';
  sectorName: string;
  targetAudience: string;
  coreHook: string;
  reelScript: {
    title: string;
    totalDuration: string;
    vibeAudio: string;
    scenes: ReelScene[];
    captionForReel: string;
  };
  linkedInPost: {
    headline: string;
    content: string;
    hashtags: string[];
    suggestedImageDesc: string;
  };
  carousel: {
    title: string;
    totalSlides: number;
    slides: CarouselSlide[];
    captionForCarousel: string;
  };
  websiteCopy: WebsiteCopy;
  directPitchBonus: {
    whatsappDm: string;
    coldEmail: string;
  };
}

export const DENTAL_PROMO_KIT: PromoKit = {
  sector: 'dentistico',
  sectorName: 'Studio Dentistico & Odontoiatrico',
  targetAudience: 'Titolari di Studi Odontoiatrici, Direttori Sanitari e Odontoiatri',
  coreHook: 'La poltrona vuota costa fino a 250€/ora: ecco come riempirla 24/7 senza intasare la segreteria',
  reelScript: {
    title: 'Reel 30 Secondi: Stop ai Buchi in Poltrona',
    totalDuration: '30 secondi',
    vibeAudio: 'Beat moderno lo-fi / corporate energico ma pulito, ritmo incalzante con sound design (ding notifiche, swipe sonori).',
    scenes: [
      {
        timestamp: '00:00 - 00:05',
        duration: '5 sec',
        videoAction: 'Inquadratura ravvicinata su una poltrona dentistica completamente vuota, illuminata dal faretto chirurgico. Poi stacco rapido sul volto del presentatore o dello sviluppatore che indica lo schermo.',
        onScreenText: '🚨 QUANTO TI COSTA QUESTA POLTRONA VUOTA?',
        voiceover: 'Ogni appuntamento dimenticato in studio odontoiatrico non è solo un buco in agenda: sono tra i 150 e i 250 euro bruciati in un\'ora.',
        soundCue: 'Suono metallico di faretto + campanello d\'allarme soffuso'
      },
      {
        timestamp: '00:05 - 00:12',
        duration: '7 sec',
        videoAction: 'Scena in split-screen: a sinistra la segretaria al telefono con la cornetta incastrata nella spalla e faldoni aperti; a destra una mano che scorre fluida su uno smartphone scuro e velocissimo.',
        onScreenText: 'Basta centralini intasati dalle 9:00 alle 12:00 📞❌',
        voiceover: 'Mentre la tua segreteria perde due ore al giorno a gestire telefonate ripetitive, i pazienti ormai vogliono prenotare la sera dal divano in 30 secondi.',
        soundCue: 'Trillo telefonico fastidioso che sfuma in un "whoosh" morbido'
      },
      {
        timestamp: '00:12 - 00:22',
        duration: '10 sec',
        videoAction: 'Screen-recording verticale in alta definizione della Web App su smartphone: 1) Selezione "Igiene Orale" o "Controllo", 2) Selezione orario disponibile, 3) Conferma immediata. Subito dopo appare la notifica WhatsApp di promemoria automatico.',
        onScreenText: '3 CLIC DA SMARTPHONE 📲⚡️\n+ Promemoria WhatsApp Automatico ✅',
        voiceover: 'Ecco la soluzione: una web app istantanea da cellulare. Tre clic per scegliere giorno e trattamento, sincronizzazione immediata con l\'agenda dello studio e promemoria WhatsApp automatici che azzerano i no-show.',
        soundCue: '3 "tap" sonori ritmati + il classico "pop" di notifica WhatsApp'
      },
      {
        timestamp: '00:22 - 00:30',
        duration: '8 sec',
        videoAction: 'Il presentatore riprende la parola con uno smartphone in mano che mostra la schermata di conferma verde con logo dello studio. Compare freccia animata che punta in basso verso i commenti/bio.',
        onScreenText: 'PROVA LA DEMO INTERATTIVA 🧪👇\nScrivi "DEMO" nei commenti',
        voiceover: 'Nessuna installazione, nessun gestionale complicato da rifare. Vuoi provarla subito come se fossi un tuo paziente? Commenta "DEMO" o clicca sul link in bio per testarla gratis.',
        soundCue: 'Transizione finale decisa ed energica'
      }
    ],
    captionForReel: `Quanto costa davvero una poltrona dentistica lasciata vuota all'ultimo secondo? 🦷❌

Non è solo il mancato incasso della seduta: è il costo orario dello studio che continua a correre e il tempo della segreteria sprecato a fare da centralino.

Nel 2026 i tuoi pazienti non vogliono più aspettare le 9:00 di mattina per chiamare in studio. Vogliono prenotare dal divano, alle 22:30, in 3 clic da cellulare.

Abbiamo progettato una demo interattiva dedicata agli studi dentistici:
⚡️ Web app ultra-veloce (si apre istantaneamente senza scaricare nulla)
🗓️ Prenotazione guidata in 3 passaggi semplici anche per i meno tecnologici
💬 Promemoria automatico via WhatsApp 24 ore prima per azzerare i no-show
🔒 Controllo totale e agenda sempre aggiornata per la segreteria

👉 Vuoi testarla direttamente sul tuo smartphone in 60 secondi?
Scrivi "DEMO" qui sotto nei commenti o scrivimi in privato e ti invio il link per provarla subito senza impegno.`
  },
  linkedInPost: {
    headline: 'Un dentista non dovrebbe pagare una segretaria per fare da centralino telefonico ripetitivo.',
    content: `Un dentista non dovrebbe pagare una segretaria qualificata per fare da centralino telefonico ripetitivo.

E soprattutto: uno studio dentistico non può permettersi un buco da 180€ in poltrona perché il paziente "si è dimenticato l'appuntamento".

Facciamo due conti molto pratici:
Se nel tuo studio saltano solo 3 appuntamenti a settimana (tra controlli e igieni), a fine mese hai perso oltre 1.800€ di fatturato netto.
Aggiungi almeno 2 ore al giorno passate dal personale al telefono per:
- "Dottoressa, per che ora c'era posto giovedì?"
- "Mi ripete quando ho la pulizia dei denti?"
- Chiamate di conferma manuali a cui metà dei pazienti non risponde.

Il problema non sono i tuoi pazienti.
Il problema è che il sistema di contatto è rimasto fermo agli anni 2000.

Oggi oltre il 68% delle persone cerca e pianifica visite sanitarie fuori dall'orario lavorativo: la sera dopo cena o la domenica. Se in quel momento il tuo telefono è chiuso, quel paziente va altrove o rimanda per mesi.

Abbiamo sviluppato un'applicazione web verticale specifica per studi dentistici che risolve questo collo di bottiglia:

1️⃣ Velocità istantanea da smartphone: il paziente apre il link (dal tuo profilo Instagram, scheda Google o sito) e non deve scaricare nessuna app pesante.
2️⃣ Prenotazione guidata in 3 clic: sceglie il tipo di visita, visualizza solo gli orari realmente disponibili e conferma in 20 secondi.
3️⃣ Zero no-show con WhatsApp: riceve la conferma e il promemoria automatico direttamente sull'app che usa tutti i giorni, con possibilità di confermare con un tocco.
4️⃣ Controllo totale per lo staff: l'agenda dello studio resta sempre protetta e sincronizzata, senza doppie prenotazioni.

Abbiamo creato una DEMO INTERATTIVA online funzionante.
Puoi provarla direttamente dal tuo telefono in 45 secondi, esattamente come la vedrebbe un tuo paziente.

👉 Commenta questo post con "DEMO" oppure mandami un messaggio diretto qui su LinkedIn: ti giro il link della demo interattiva per metterla alla prova senza alcun impegno commerciale.`,
    hashtags: ['#Odontoiatria', '#StudioDentistico', '#DentistiItalia', '#GestioneStudio', '#EfficienzaSanitaria', '#B2BMarketing'],
    suggestedImageDesc: 'Mockup professionale di uno smartphone inclinato che mostra la schermata pulita di selezione orario per "Visita Odontoiatrica", con sfondo studio dentistico sfocato e un badge con scritto: "Zero appuntamenti dimenticati. Prenotazioni 24/7."'
  },
  carousel: {
    title: 'Carosello Instagram (5 Slide ad Alto Impatto B2B)',
    totalSlides: 5,
    slides: [
      {
        slideNumber: 1,
        badge: 'SLIDE 1 • COVER HOOK',
        headline: 'Quanto costa al tuo studio dentistico quel "Mi sono dimenticato"?',
        body: 'Scorri per scoprire il vero impatto dei no-show sull\'agenda e come azzerarli con una soluzione da 3 clic da cellulare. 👉',
        bulletPoints: [
          '📉 Fino al 15% di appuntamenti persi ogni mese',
          '📞 Segreteria ostaggio delle chiamate di conferma'
        ],
        visualCue: 'Sfondo antracite/blu clinico scuro. In primo piano una sedia da dentista illuminata vuota con grafica circolare che indica un orologio con buco orario.'
      },
      {
        slideNumber: 2,
        badge: 'SLIDE 2 • IL PROBLEMA NASCOSTO',
        headline: 'La poltrona vuota è il costo invisibile più alto del tuo studio.',
        body: 'Quando un paziente non si presenta all\'igiene o alla prima visita:',
        bulletPoints: [
          '💸 I costi fissi di personale, utenze e struttura continuano a correre.',
          '⏳ La segretaria ha perso 15 minuti tra chiamata e promemoria cartaceo.',
          '❌ Un altro paziente con reale urgenza ha dovuto aspettare 2 settimane.'
        ],
        visualCue: 'Grafica chiara di comparazione: "Costo appuntamento saltato = 180€" vs "Costo fisso orario = invariato". Icona di calendario con slot rosso vuoto.'
      },
      {
        slideNumber: 3,
        badge: 'SLIDE 3 • LA NUOVA ABITUDINE DEL PAZIENTE',
        headline: 'I tuoi pazienti vogliono prenotare alle 22:30. Non alle 10:00 del mattino.',
        body: 'Le persone non hanno più tempo di restare in attesa con la cornetta al lavoro.',
        bulletPoints: [
          '📲 Accesso istantaneo da cellulare senza scaricare app né registrazioni infinite.',
          '⚡️ Scelta guidata del trattamento (Prima visita, Igiene, Controllo ortodontico).',
          '🕒 Selezione autonoma dell\'orario tra quelli autorizzati dal medico.'
        ],
        visualCue: 'Mockup di smartphone con dita che selezionano un orario (17:30) con interfaccia pulita in 3 tocchi. Colore verde rassicurante.'
      },
      {
        slideNumber: 4,
        badge: 'SLIDE 4 • LA SOLUZIONE DEFINITIVA',
        headline: 'Promemoria automatici su WhatsApp: fine dei no-show.',
        body: 'Le email finiscono nello spam, gli SMS tradizionali vengono ignorati.',
        bulletPoints: [
          '💬 WhatsApp ha un tasso di apertura superiore al 98%.',
          '🔔 Promemoria automatico inviato a 24h e 2h dalla visita.',
          '🔄 Tasto rapido per confermare o liberare il posto per la lista d\'attesa in tempo utile.'
        ],
        visualCue: 'Fumetto di notifica WhatsApp verde brillante: "Studio Dentistico Dott. Rossi: Ti ricordiamo il tuo appuntamento domani alle 15:30. Clicca per confermare."'
      },
      {
        slideNumber: 5,
        badge: 'SLIDE 5 • CALL TO ACTION DIRETTA',
        headline: 'Vuoi vedere come funzionerebbe nel tuo studio?',
        body: 'Abbiamo creato una DEMO ONLINE interattiva da provare subito sul tuo smartphone.',
        bulletPoints: [
          '✅ Testabile in 40 secondi dal cellulare',
          '✅ Nessun software da installare',
          '✅ Progettata per azzerare lo stress della segreteria'
        ],
        visualCue: 'Pulsante stilizzato ad alto contrasto con freccia: "TESTA LA DEMO ORA". Box di testo: "Invia un messaggio in DM con scritto DEMO per ricevere l\'accesso istantaneo."'
      }
    ],
    captionForCarousel: `Quanti appuntamenti sono saltati nell'ultimo mese nel tuo studio odontoiatrico? 🦷📉

Spesso i titolari pensano che i buchi in agenda siano un "rischio del mestiere". Ma la verità è che il 90% degli appuntamenti saltati dipende da:
1. Pazienti che dimenticano la data fissata tre mesi fa
2. Difficoltà a contattare la segreteria negli orari d'ufficio per spostare la visita

Abbiamo condensato in questo carosello il nuovo approccio:
📲 Prenotazione smartphone in 3 clic
💬 Promemoria automatici via WhatsApp
🕒 Studio aperto 24/7 per le prenotazioni senza toccare un solo telefono

👉 Abbiamo preparato una demo interattiva funzionante che puoi testare direttamente sul tuo telefono.
Invia un messaggio privato con scritto "DEMO" o lascia un commento per provarla in 40 secondi.`
  },
  websiteCopy: {
    badge: 'SOLUZIONE DIGITALE PER STUDI DENTISTICI & ODONTOIATRICI',
    h1: 'Riduci i no-show del 90% e riempi la poltrona 24 ore su 24.',
    subtitle: 'La web app ultra-veloce da smartphone che permette ai tuoi pazienti di fissare l\'appuntamento in 3 clic e invia promemoria automatici su WhatsApp. Senza intasare la segreteria, senza app da scaricare.',
    features: [
      {
        title: 'Prenotazione guidata in 3 clic da cellulare',
        description: 'I tuoi pazienti scelgono trattamento e orario in 20 secondi, anche di sera o nel weekend. Zero password da ricordare, zero app pesanti da installare: basta un link da Instagram, Google o WhatsApp.',
        metric: '72% di prenotazioni fuori orario studio'
      },
      {
        title: 'Promemoria WhatsApp intelligenti anti-dimenticanza',
        description: 'Dimentica le ore perse dalla segretaria a fare telefonate a vuoto. Il sistema invia un promemoria automatico sul canale che il paziente apre sempre: WhatsApp. Risultato? Buchi in agenda azzerati.',
        metric: '-90% di appuntamenti saltati'
      },
      {
        title: 'Controllo totale e zero sovrapposizioni per lo staff',
        description: 'La tua segreteria mantiene il pieno controllo: blocca le fasce orarie riservate alle urgenze, differenzia la durata tra igiene e prime visite chirurgiche e riceve notifiche istantanee senza errori umani.',
        metric: '2+ ore al giorno risparmiate al centralino'
      }
    ],
    ctaButton: 'Testa la Demo Interattiva sul tuo Smartphone',
    microcopy: '⚡️ Prova immediata in 40 secondi • Nessuna carta di credito • Nessun programma da installare',
    demoBannerText: 'Sei il titolare di uno studio? Prova tu stesso l\'esperienza che vivrà il tuo paziente.'
  },
  directPitchBonus: {
    whatsappDm: `Salve Dottore/Dottoressa, ho notato che il vostro studio ha ottime recensioni ma la sera non è possibile per un paziente prenotare una visita direttamente da smartphone.

Abbiamo sviluppato una web app ultra-rapida specifica per dentisti che permette di prenotare in 3 clic e azzera gli appuntamenti saltati con promemoria automatici su WhatsApp.

Ho preparato una demo interattiva funzionante su cellulare: le andrebbe di provarla in 30 secondi senza alcun impegno? 
Le lascio il link diretto qui: [LINK DEMO]`,
    coldEmail: `Oggetto: Idea pratica per azzerare i no-show allo Studio [Nome Studio]

Gentile Dott. [Cognome],

Le scrivo perché analizzando molti studi odontoiatrici della nostra zona, emerge costantemente lo stesso costo nascosto: tra le 3 e le 5 poltrone vuote ogni settimana per "appuntamenti dimenticati" e la segreteria oberata da telefonate per spostare orari.

Abbiamo realizzato una web app per smartphone che risolve entrambi i problemi:
1. Il paziente prenota in 3 clic anche la domenica sera senza scaricare nulla
2. Riceve la conferma e il promemoria automatico su WhatsApp, con un calo dei no-show superiore all'85%
3. La segreteria risparmia oltre 10 ore a settimana di chiamate ripetitive

Abbiamo caricato una DEMO INTERATTIVA online che replica esattamente il flusso:
👉 [LINK_DEMO_INTERATTIVA]

Può testarla direttamente dal suo telefono in 45 secondi. Se le piace il flusso, mi farebbe piacere scambiare due chiacchiere rapide di 10 minuti per capire se può fare al caso vostro.

Un cordiale saluto,
[Tuo Nome / Web Agency]`
  }
};

export const VET_PROMO_KIT: PromoKit = {
  sector: 'veterinario',
  sectorName: 'Clinica & Ambulatorio Veterinario',
  targetAudience: 'Medici Veterinari Titolari e Direttori di Cliniche Veterinarie',
  coreHook: 'Basta linee telefoniche intasate per richiami vaccini: agenda piena e gestione emergenze 24/7',
  reelScript: {
    title: 'Reel 30 Secondi: Stop al Telefono Intasato in Clinica Veterinaria',
    totalDuration: '30 secondi',
    vibeAudio: 'Suono dinamico, ritmo incalzante, campionamento cane/gatto simpatico ma ultra professionale.',
    scenes: [
      {
        timestamp: '00:00 - 00:05',
        duration: '5 sec',
        videoAction: 'Inquadratura del banco reception di una clinica veterinaria: il telefono squilla a ripetizione mentre due proprietari con cane al guinzaglio e trasportino attendono al bancone.',
        onScreenText: '🚨 ANCORA IL TELEFONO CHE SQUILLA A VUOTO?',
        voiceover: 'In clinica veterinaria ogni minuto al telefono per fissare un banale richiamo vaccinale è un minuto tolto ai pazienti in sala d\'attesa.',
        soundCue: 'Doppio squillo telefonico d\'impatto'
      },
      {
        timestamp: '00:05 - 00:12',
        duration: '7 sec',
        videoAction: 'Scena ravvicinata su una mano che apre da smartphone una schermata moderna: logo clinica, selezione specie (Cane/Gatto), motivo visita.',
        onScreenText: 'I proprietari vogliono prenotare la sera dal divano 🐾📲',
        voiceover: 'I proprietari di pet non vogliono chiamare negli orari di ambulatorio: vogliono prenotare alle 23:00 quando si ricordano dell\'antiparassitario o della visita di controllo.',
        soundCue: 'Transizione fluida con tap digitale'
      },
      {
        timestamp: '00:12 - 00:22',
        duration: '10 sec',
        videoAction: 'Dimostrazione rapida su smartphone: 3 clic per confermare visita di routine, promemoria WhatsApp automatico con indicazione del libretto sanitario.',
        onScreenText: '3 CLIC DA SMARTPHONE ⚡️\n+ WhatsApp Automatico 🐶🐱',
        voiceover: 'Con questa web app ultra-veloce, prenotano in 3 clic dal cellulare e ricevono il promemoria automatico su WhatsApp. Risultato? Meno appuntamenti saltati e zero centralino intasato.',
        soundCue: 'Notifica WhatsApp + click di conferma'
      },
      {
        timestamp: '00:22 - 00:30',
        duration: '8 sec',
        videoAction: 'Il narratore mostra lo smartphone con la schermata confermata e invita all\'azione con testo in evidenza.',
        onScreenText: 'TESTA LA DEMO GRATIS 🧪👇\nCommenta "VET"',
        voiceover: 'Nessun gestionale da sostituire, nessuna app da scaricare. Vuoi provarla subito sul tuo telefono? Commenta "VET" per ricevere la demo interattiva gratuita.',
        soundCue: 'Jingle finale fresco e professionale'
      }
    ],
    captionForReel: `Quante volte la segreteria della tua clinica veterinaria viene bloccata da telefonate per semplici richiami o orari di apertura? 🐾📞

Mentre il personale è al telefono, la sala d'attesa si riempie e le vere urgenze rischiano di passare in secondo piano.

Oggi oltre il 70% dei proprietari di animali pianifica visite e controlli la sera tardi o nel weekend. Se trovano il telefono occupato, rimandano per settimane.

Abbiamo creato una soluzione software specifica per cliniche veterinarie:
⚡️ Web app ultra-veloce da smartphone senza app da scaricare
🗓️ Prenotazione in 3 tocchi per visite di routine e vaccinazioni
💬 Promemoria WhatsApp automatico per azzerare i buchi in agenda
🔒 Separazione automatica tra visite ordinarie e pronto soccorso

👉 Vuoi testare la demo interattiva dal tuo cellulare?
Scrivi "VET" nei commenti o mandami un messaggio in privato per accedere subito alla demo.`
  },
  linkedInPost: {
    headline: 'Perché la reception di una clinica veterinaria dovrebbe gestire decine di chiamate al giorno per un semplice vaccino?',
    content: `Perché la reception di una clinica veterinaria dovrebbe gestire decine di chiamate al giorno per un semplice vaccino?

In una clinica veterinaria il tempo del personale alla reception è prezioso: accoglienza degli animali agitati, gestione delle emergenze, supporto ai medici.

Eppure, oltre il 60% del traffico telefonico quotidiano riguarda sempre le stesse 3 richieste:
1. "A che ora posso portare il cane per il vaccino?"
2. "Avete posto per un controllo alle orecchie giovedì?"
3. "Mi sono dimenticato a che ora avevo l'appuntamento."

Ogni telefonata dura in media 3 minuti. Su 25 chiamate al giorno, sono oltre un'ora e mezza di lavoro bruciata in operazioni che uno smartphone moderno può fare in 15 secondi.

E il costo maggiore resta il "no-show": il proprietario che non si presenta perché non ha segnato l'orario o perché ha trovato il telefono occupato quando voleva spostarlo.

Abbiamo sviluppato un'applicazione web mobile pensata specificamente per cliniche veterinarie:
🐾 Web app istantanea: il proprietario del pet prenota in 3 clic da qualsiasi smartphone, senza dover scaricare app pesanti o compilare registrazioni noiose.
🕒 Disponibilità 24/7: le prenotazioni arrivano anche la sera e la domenica, quando l'ambulatorio è chiuso.
💬 Promemoria automatici via WhatsApp: il proprietario riceve il messaggio di promemoria sul canale che controlla continuamente, con l'indicazione di portare il libretto sanitario.
🛡️ Zero sovraccarico per i veterinari: l'agenda della clinica è blindata e sincronizzata, con fasce dedicate alle urgenze.

Abbiamo caricato una DEMO INTERATTIVA online.
I titolari di cliniche possono provarla subito da cellulare in meno di un minuto.

👉 Scrivi "DEMO VET" nei commenti o inviami un messaggio privato: ti condivido il link per testarla subito.`,
    hashtags: ['#VeterinariItalia', '#ClinicaVeterinaria', '#MedicinaVeterinaria', '#GestioneAmbulatorio', '#EfficienzaSanitaria', '#B2BMarketing'],
    suggestedImageDesc: 'Mockup smartphone con cucciolo di labrador accanto al bancone clinico e schermata con selezione orario: "Visita Veterinaria Generale - Conferma in 3 clic."'
  },
  carousel: {
    title: 'Carosello Instagram (5 Slide ad Alto Impatto B2B Veterinario)',
    totalSlides: 5,
    slides: [
      {
        slideNumber: 1,
        badge: 'SLIDE 1 • COVER HOOK',
        headline: 'Quante telefonate riceve la tua clinica veterinaria solo per fissare un vaccino?',
        body: 'Scorri per scoprire come liberare il personale al bancone e azzerare gli appuntamenti persi. 👉',
        bulletPoints: [
          '🐕 Oltre 40 ore al mese perse al telefono',
          '📉 Appuntamenti dimenticati dai proprietari'
        ],
        visualCue: 'Sfondo verde salvia scuro con silhouette di gatto e cane e display smartphone con notifica di promemoria.'
      },
      {
        slideNumber: 2,
        badge: 'SLIDE 2 • IL COLLO DI BOTTIGLIA',
        headline: 'Il centralino intasato rallenta le vere urgenze.',
        body: 'Quando la reception è impegnata al telefono per un controllo di routine:',
        bulletPoints: [
          '🚨 Chi ha una reale urgenza trova costantemente occupato.',
          '⏳ I clienti al bancone aspettano con animali nervosi al guinzaglio.',
          '❌ Il personale vive con il fiato sul collo.'
        ],
        visualCue: 'Icona telefono incandescente vs sala d\'attesa con proprietari in fila.'
      },
      {
        slideNumber: 3,
        badge: 'SLIDE 3 • PRENOTAZIONE IN 3 CLIC',
        headline: 'I proprietari vogliono prenotare alle 23:00 dal divano.',
        body: 'Nessuna app pesante da scaricare dagli store, zero barriere:',
        bulletPoints: [
          '📲 Si apre istantaneamente da Instagram, Google Maps o sito web.',
          '⚡️ Selezione specie (Cane, Gatto, Altro) e tipo visita in 10 secondi.',
          '🗓️ Scelta dello slot libero tra quelli approvati dalla clinica.'
        ],
        visualCue: 'Mockup smartphone con tre passaggi numerati 1-2-3 fluidi e intuitivi.'
      },
      {
        slideNumber: 4,
        badge: 'SLIDE 4 • ZERO NO-SHOW CON WHATSAPP',
        headline: 'Promemoria WhatsApp: basta appuntamenti dimenticati.',
        body: 'Il 98% dei proprietari legge subito i messaggi WhatsApp:',
        bulletPoints: [
          '💬 Promemoria automatico 24 ore prima dell\'appuntamento.',
          '📋 Avviso personalizzato: "Ricorda il libretto sanitario e tieni il cane a digiuno".',
          '🔄 Tasto rapido per confermare la presenza con un tocco.'
        ],
        visualCue: 'Schermata chat WhatsApp con messaggio personalizzato con logo della clinica.'
      },
      {
        slideNumber: 5,
        badge: 'SLIDE 5 • TESTA LA DEMO ORA',
        headline: 'Vuoi provare la demo interattiva sul tuo smartphone?',
        body: 'Metti alla prova il sistema in 40 secondi, esattamente come farebbe un cliente della tua clinica.',
        bulletPoints: [
          '✅ Accesso immediato da cellulare',
          '✅ Nessun impegno commerciale',
          '✅ Pensato per alleggerire la reception'
        ],
        visualCue: 'Call to action box con pulsante: "Commenta DEMO VET o scrivici in DM per provare la demo interattiva."'
      }
    ],
    captionForCarousel: `Perché far fare da centralino telefonico al personale della tua clinica veterinaria? 🐾📞

Ogni giorno decine di telefonate interrompono il lavoro al bancone solo per chiedere:
"Quando avete posto per un vaccino?" oppure "A che ora era la visita?"

Con una web app ultra-veloce da smartphone:
1️⃣ I proprietari prenotano in 3 clic a qualsiasi ora (anche la domenica)
2️⃣ Il sistema invia promemoria automatici su WhatsApp
3️⃣ La reception si concentra sull'accoglienza e sulle emergenze

👉 Vuoi testare la demo interattiva direttamente dal tuo cellulare?
Commenta "DEMO VET" o scrivici in privato!`
  },
  websiteCopy: {
    badge: 'SOLUZIONE DIGITALE PER CLINICHE & AMBULATORI VETERINARI',
    h1: 'Libera la reception e azzera gli appuntamenti mancati.',
    subtitle: 'La web app per smartphone che consente ai proprietari di animali di prenotare visite e richiami in 3 clic, inviando promemoria automatici su WhatsApp. Senza intasare il centralino.',
    features: [
      {
        title: 'Prenotazione smartphone istantanea in 3 passaggi',
        description: 'I proprietari scelgono specie, motivo della visita e orario disponibile in meno di 30 secondi. Funziona direttamente da browser su qualsiasi cellulare, senza scaricare app né registrazioni infinite.',
        metric: '65% delle prenotazioni fuori orario di ambulatorio'
      },
      {
        title: 'Promemoria WhatsApp con istruzioni pre-visita',
        description: 'Invia promemoria automatici su WhatsApp ricordando orario, indicazioni di digiuno o richiesta del libretto sanitario. Elimina le dimenticanze e tiene l\'agenda della clinica sempre piena.',
        metric: '-85% di visite saltate'
      },
      {
        title: 'Gestione blindata delle urgenze e controllo staff',
        description: 'Le visite di routine si distribuiscono automaticamente nelle fasce orarie stabilite, lasciando sempre finestre protette per le vere urgenze veterinarie e riducendo il tempo al telefono.',
        metric: 'Oltre 10 ore a settimana risparmiate alla reception'
      }
    ],
    ctaButton: 'Testa la Demo Interattiva per Cliniche Veterinarie',
    microcopy: '⚡️ Test online in 40 secondi dal tuo cellulare • Nessun programma da scaricare',
    demoBannerText: 'Sei il titolare o direttore di una clinica? Metti alla prova la demo interattiva adesso.'
  },
  directPitchBonus: {
    whatsappDm: `Salve Dottore, ho visto la vostra clinica veterinaria e volevo farle una domanda rapida: quanto tempo perde ogni giorno il personale al telefono solo per confermare richiami o orari di visita?

Abbiamo sviluppato una web app ultra-rapida per smartphone che fa prenotare i proprietari in 3 clic e invia promemoria automatici su WhatsApp per azzerare gli appuntamenti saltati.

Abbiamo caricato una demo interattiva funzionante su cellulare: le andrebbe di provarla in 30 secondi senza alcun impegno?
Le lascio il link diretto qui: [LINK DEMO VET]`,
    coldEmail: `Oggetto: Come liberare la reception della Clinica [Nome Clinica] dalle chiamate ripetitive

Gentile Dott. [Cognome],

Gestire una clinica veterinaria significa spesso avere la reception intasata da telefonate per semplici controlli e richiami vaccinali, mentre i pazienti in sala d'attesa hanno bisogno di attenzione immediata.

Abbiamo sviluppato un'applicazione web per smartphone specifica per cliniche veterinarie che permette di:
1. Far prenotare i proprietari in 3 clic anche la domenica sera dal divano
2. Inviare promemoria automatici su WhatsApp per abbattere i no-show di oltre l'85%
3. Lasciare la linea telefonica libera per le vere emergenze

Abbiamo predisposto una DEMO INTERATTIVA funzionante da provare su smartphone:
👉 [LINK_DEMO_INTERATTIVA]

Può testarla in 45 secondi senza alcun impegno. Mi farebbe piacere raccogliere un suo parere di professionista del settore.

Cordiali saluti,
[Tuo Nome / Web Agency]`
  }
};

export const MEDICAL_PROMO_KIT: PromoKit = {
  sector: 'medico',
  sectorName: 'Studio Medico & Polispecialistico',
  targetAudience: 'Titolari di Centri Medici Privati e Studi Polispecialistici',
  coreHook: 'Agenda specialistica piena 24/7 e zero telefonate a vuoto in segreteria',
  reelScript: {
    title: 'Reel 30 Secondi: Stop alle Code Telefoniche negli Studi Medici',
    totalDuration: '30 secondi',
    vibeAudio: 'Suono pulito, professionale e ritmato con campionamenti minimali.',
    scenes: [
      {
        timestamp: '00:00 - 00:05',
        duration: '5 sec',
        videoAction: 'Inquadratura sulla sala d\'attesa di uno studio polispecialistico con pazienti che guardano l\'orologio e la segretaria con 3 linee lampeggianti.',
        onScreenText: '🚨 3 LINEE OCCUPATE E PAZIENTI IN ATTESA?',
        voiceover: 'Ogni volta che la tua segreteria è occupata al telefono con un paziente, un altro sta rinunciando a prenotare la sua visita specialistica.',
        soundCue: 'Segnale di linea occupata rapido'
      },
      {
        timestamp: '00:05 - 00:12',
        duration: '7 sec',
        videoAction: 'Scena fluida su smartphone: selezione dello specialista (es. Cardiologia, Dermatologia, Fisioterapia) con orari chiari e trasparenti.',
        onScreenText: 'Visita specialistica in 3 clic da cellulare 🩺📲',
        voiceover: 'I pazienti privati vogliono velocità: scelgono lo specialista, selezionano l\'orario libero e confermano in 20 secondi da smartphone, 24 ore su 24.',
        soundCue: 'Swipe elegante e tocco selettivo'
      },
      {
        timestamp: '00:12 - 00:22',
        duration: '10 sec',
        videoAction: 'Visualizzazione del promemoria automatico WhatsApp che arriva con le indicazioni pre-visita (es. referti precedenti da portare).',
        onScreenText: 'Promemoria WhatsApp automatico ✅\nZero appuntamenti dimenticati',
        voiceover: 'E con i promemoria automatici su WhatsApp, azzeri i no-show e ricordi al paziente cosa portare alla visita, senza far perdere un solo minuto al tuo staff.',
        soundCue: 'Notifica WhatsApp squillante'
      },
      {
        timestamp: '00:22 - 00:30',
        duration: '8 sec',
        videoAction: 'Il presentatore mostra la demo interattiva sul cellulare con logo personalizzato dello studio medico.',
        onScreenText: 'PROVA LA DEMO SUBITO 🧪👇\nCommenta "STUDIO"',
        voiceover: 'Nessun gestionale complicato da cambiare. Vuoi provarla sul tuo telefono? Commenta "STUDIO" per testare la demo interattiva gratuita.',
        soundCue: 'Chiusura decisa e solida'
      }
    ],
    captionForReel: `Quanti pazienti rinunciano a prenotare nel tuo studio medico perché trovano sempre la linea occupata? 🩺📞

Oggi il paziente privato cerca lo specialista la sera o durante la pausa pranzo, e si aspetta la stessa comodità di qualsiasi servizio moderno:
⚡️ Scelta della specialità in 3 clic
🗓️ Disponibilità in tempo reale
💬 Promemoria istantaneo su WhatsApp per non dimenticare la visita

Abbiamo sviluppato una web app ultra-veloce da cellulare specifica per centri medici e studi polispecialistici.
👉 Vuoi provarla come se fossi un tuo paziente?
Scrivi "STUDIO" nei commenti o mandami un messaggio in privato!`
  },
  linkedInPost: {
    headline: 'La segreteria di un centro medico dovrebbe accogliere i pazienti, non fare da operatore di call center.',
    content: `La segreteria di un centro medico dovrebbe accogliere i pazienti con cura, non fare da operatore di call center per 8 ore al giorno.

In uno studio polispecialistico, ogni specialista ha orari, tariffe e durate di visita diverse. Quando la gestione delle prenotazioni passa unicamente dal telefono:
- Le linee sono costantemente sature tra le 9:00 e le 11:30
- I pazienti presenti al desk aspettano con imbarazzo che la segretaria finisca la telefonata
- Gli appuntamenti saltati dell'ultimo minuto lasciano lo specialista fermo per 45 minuti senza compenso

Oggi la maggior parte delle persone prenota servizi medici fuori dall'orario d'ufficio. Chi trova la segreteria chiusa, cerca un altro specialista su Google.

Abbiamo creato una soluzione web per studi medici che risolve il problema alla radice:
1️⃣ Prenotazione guidata in 3 clic da cellulare: il paziente sceglie la specialità o il medico desiderato e prenota in 30 secondi senza dover installare nulla.
2️⃣ Zero no-show con WhatsApp: riceve conferma e promemoria con promemoria documentale ("porta i referti precedenti").
3️⃣ Controllo totale e flessibilità per ogni medico: le disponibilità si aggiornano automaticamente in base ai turni degli specialisti.

Abbiamo allestito una DEMO INTERATTIVA funzionante.
Puoi testare l'esperienza completa direttamente dal tuo smartphone in 45 secondi.

👉 Commenta con "DEMO MEDICO" o inviami un messaggio privato per ricevere il link di prova immediato.`,
    hashtags: ['#StudiMedici', '#Poliambulatorio', '#MedicinaPrivata', '#SanitaDigitale', '#DirezioneSanitaria', '#B2BMarketing'],
    suggestedImageDesc: 'Mockup smartphone con elenco medici specialisti e tasto rapido "Prenota Visita Specialistica in 3 clic".'
  },
  carousel: {
    title: 'Carosello Instagram (5 Slide ad Alto Impatto B2B Medico)',
    totalSlides: 5,
    slides: [
      {
        slideNumber: 1,
        badge: 'SLIDE 1 • COVER HOOK',
        headline: 'Quanti pazienti perde il tuo studio medico a causa delle linee telefoniche occupate?',
        body: 'Scorri per scoprire come riempire l\'agenda degli specialisti 24 ore su 24 senza aumentare il carico della segreteria. 👉',
        bulletPoints: [
          '📉 Fino al 20% di chiamate perse nelle ore di punta',
          '⏳ Medici fermi per visite saltate all\'ultimo minuto'
        ],
        visualCue: 'Sfondo blu navy clinico con grafica minimale di orologio e calendario digitale.'
      },
      {
        slideNumber: 2,
        badge: 'SLIDE 2 • IL PROBLEMA',
        headline: 'Il centralino telefonico è un collo di bottiglia costoso.',
        body: 'Mentre la segreteria ripete per la ventesima volta gli orari disponibili:',
        bulletPoints: [
          '❌ Altri pazienti trovano occupato e scelgono un altro centro medico.',
          '😤 Chi è in sala d\'attesa non riceve la giusta attenzione al desk.',
          '💸 I medici perdono fatturato per appuntamenti non confermati.'
        ],
        visualCue: 'Grafica split: 3 cornette rosse con linea occupata vs sala d\'attesa con persone in attesa.'
      },
      {
        slideNumber: 3,
        badge: 'SLIDE 3 • PRENOTAZIONI 24/7',
        headline: 'Lo studio aperto 24/7 per le prenotazioni, anche di domenica.',
        body: 'Il paziente prenota quando ha tempo, non quando lo studio ha le linee aperte.',
        bulletPoints: [
          '📲 Accesso istantaneo da cellulare con un semplice tocco.',
          '🩺 Selezione specialistica guidata (Cardiologia, Dermatologia, etc.).',
          '⚡️ Conferma in 3 clic senza dover installare applicazioni.'
        ],
        visualCue: 'Interfaccia smartphone moderna con lista specialisti con foto e orari liberi.'
      },
      {
        slideNumber: 4,
        badge: 'SLIDE 4 • PROMEMORIA WHATSAPP',
        headline: 'WhatsApp batte SMS ed email per azzerare i no-show.',
        body: 'Il messaggio arriva direttamente sul canale più letto al mondo:',
        bulletPoints: [
          '💬 Promemoria personalizzato con orario e indirizzo preciso.',
          '📑 Indicazioni chiare su referti o esami precedenti da portare.',
          '✅ Calo drastico degli appuntamenti dimenticati.'
        ],
        visualCue: 'Notifica WhatsApp con messaggio professionale di promemoria visita specialistica.'
      },
      {
        slideNumber: 5,
        badge: 'SLIDE 5 • TESTA LA DEMO',
        headline: 'Prova la demo interattiva adesso dal tuo cellulare.',
        body: 'In 40 secondi scopri come trasformare l\'acquisizione e la gestione dei tuoi pazienti.',
        bulletPoints: [
          '✅ Demo online funzionante subito',
          '✅ Nessun impegno commerciale',
          '✅ Pensata per studi polispecialistici moderni'
        ],
        visualCue: 'Pulsante stilizzato: "Invia DEMO MEDICO in DM per ricevere subito il link."'
      }
    ],
    captionForCarousel: `Perché far aspettare i pazienti al telefono quando potrebbero prenotare in 3 clic dal loro smartphone? 🩺📲

Negli studi medici e polispecialistici, il centralino intasato costa decine di visite perse ogni settimana.

Con una web app ultra-veloce da cellulare:
1️⃣ I pazienti prenotano in qualsiasi momento (anche alle 23:00)
2️⃣ I promemoria su WhatsApp azzerano le dimenticanze
3️⃣ La segreteria torna a dedicarsi all'accoglienza in studio

👉 Metti alla prova la nostra DEMO INTERATTIVA funzionante:
Lascia un commento o scrivici in DM per provarla subito dal tuo telefono!`
  },
  websiteCopy: {
    badge: 'SOLUZIONE DIGITALE PER STUDI MEDICI & POLISPECIALISTICI',
    h1: 'Agenda specialistica sempre piena e segreteria finalmente libera.',
    subtitle: 'La web app ultra-veloce da smartphone che permette ai pazienti di prenotare visite specialistiche in 3 clic, inviando promemoria automatici su WhatsApp. Senza code telefoniche.',
    features: [
      {
        title: 'Prenotazione specialistica in 3 clic da qualsiasi cellulare',
        description: 'I pazienti selezionano specialista, prestazione e orario in 30 secondi. Senza registrazioni complesse né applicazioni pesanti da installare: basta un link.',
        metric: '70% delle prenotazioni fuori orario segreteria'
      },
      {
        title: 'Promemoria WhatsApp intelligenti con note cliniche',
        description: 'Invia automaticamente al paziente il promemoria con orario esatto e note su cosa portare alla visita (esami precedenti, referti). Meno dimenticanze, visite più puntuali.',
        metric: '-88% di no-show in studio'
      },
      {
        title: 'Gestione modulare per ciascuno specialista dello studio',
        description: 'Orari personalizzati, durate diverse per ogni tipo di prestazione e sincronizzazione in tempo reale per eliminare per sempre qualsiasi rischio di sovrapposizione.',
        metric: 'Più di 15 ore alla settimana risparmiate alla reception'
      }
    ],
    ctaButton: 'Testa la Demo Interattiva per Studi Medici',
    microcopy: '⚡️ Test online immediato in 40 secondi • Nessun download richiesto',
    demoBannerText: 'Sei il titolare o direttore del centro medico? Prova la demo interattiva sul tuo smartphone.'
  },
  directPitchBonus: {
    whatsappDm: `Salve Dottore, ho visto il vostro centro medico e volevo farle una domanda: quanto fatturato perde ogni mese lo studio per visite specialistiche saltate all'ultimo minuto o pazienti che non riescono a contattarvi negli orari di centralino?

Abbiamo creato una web app per smartphone che fa prenotare i pazienti in 3 clic e azzera i no-show con promemoria su WhatsApp.

Ho caricato una demo interattiva online: le andrebbe di provarla in 30 secondi senza impegno?
Ecco il link diretto: [LINK DEMO MEDICO]`,
    coldEmail: `Oggetto: Eliminare le code telefoniche e i no-show allo Studio [Nome Studio]

Gentile Dott. [Cognome],

Molti direttori di centri medici polispecialistici con cui collaboriamo condividevano lo stesso problema: il centralino intasato la mattina che blocca i pazienti e specialisti fermi per appuntamenti saltati all'ultimo.

Abbiamo realizzato una web app per smartphone che permette ai pazienti di:
1. Prenotare la visita con lo specialista in 3 clic anche la sera o nel weekend
2. Ricevere il promemoria automatico su WhatsApp con le indicazioni cliniche necessarie
3. Abbattere i no-show di oltre l'85% liberando più di 15 ore a settimana al personale di reception

Abbiamo reso disponibile una DEMO INTERATTIVA funzionante:
👉 [LINK_DEMO_INTERATTIVA]

Può provarla in 45 secondi direttamente dal suo smartphone.

Cordiali saluti,
[Tuo Nome / Web Agency]`
  }
};

export const GROOMING_PROMO_KIT: PromoKit = {
  sector: 'toelettatura',
  sectorName: 'Toelettatura & Salone per Animali',
  targetAudience: 'Titolari di toelettature, pet shop con salone e centri di tosatura per cani e gatti',
  coreHook: 'Il sabato è pieno e il martedì è vuoto: l\'agenda si riempie da Instagram, con i tempi giusti per ogni manto',
  reelScript: {
    title: 'Reel 30 Secondi: Basta DM per fissare il bagno',
    totalDuration: '30 secondi',
    vibeAudio: 'Beat leggero, caldo, da negozio di quartiere. Tap del telefono e pop di notifica WhatsApp.',
    scenes: [
      {
        timestamp: '00:00 - 00:05',
        duration: '5 sec',
        videoAction: 'Telefono del titolare sommerso di DM Instagram: "avete posto sabato per un barboncino?". Stacco sulla vasca vuota di martedì mattina.',
        onScreenText: 'SABATO PIENO. MARTEDÌ VUOTO.',
        voiceover: 'In toelettatura il sabato è un ingorgo e il martedì resta una vasca ferma. Ogni buco è un bagno che non incassi.',
        soundCue: 'Notifiche Instagram a raffica, poi silenzio'
      },
      {
        timestamp: '00:05 - 00:12',
        duration: '7 sec',
        videoAction: 'Mani che rispondono a tre chat diverse mentre un cane è in asciugatura. Il titolare non può mollare phon e forbici.',
        onScreenText: 'Non puoi rispondere ai DM con il phon in mano',
        voiceover: 'Mentre stai tosando non puoi anche fare da centralino. I proprietari scrivono la sera, quando il salone è chiuso.',
        soundCue: 'Phon che copre una suoneria'
      },
      {
        timestamp: '00:12 - 00:22',
        duration: '10 sec',
        videoAction: 'Screen recording: scelta taglia e manto, servizio (bagno, tosatura, stripping), orario che rispetta la durata reale, conferma. Poi notifica WhatsApp con cosa portare.',
        onScreenText: '3 CLIC • TEMPI PER MANTO • WHATSAPP',
        voiceover: 'Il proprietario sceglie taglia, servizio e orario libero. L\'agenda blocca il tempo giusto: quarantacinque minuti per un pelo corto, due ore per un barboncino. Il promemoria parte da solo su WhatsApp.',
        soundCue: 'Tre tap e pop WhatsApp'
      },
      {
        timestamp: '00:22 - 00:30',
        duration: '8 sec',
        videoAction: 'Titolare mostra il telefono con la conferma verde e indica il link in bio.',
        onScreenText: 'SCRIVICI\nGli teniamo il martedì',
        voiceover: 'Se il salone è il tuo, scrivimi. Ti mando la pagina che vede chi porta il cane, e l\'agenda.',
        soundCue: 'Chiusura morbida'
      }
    ],
    captionForReel: `Il sabato in toelettatura è un ingorgo. Il martedì la vasca resta ferma. ✂️

Nel mezzo ci sei tu, con il phon in una mano e Instagram nell'altra, a rispondere "sì c'è posto" mentre il cane è in asciugatura.

I proprietari non chiamano più in orario di apertura. Scrivono alle 21: "avete un buco per un volpino giovedì?".

Ho messo online una demo di agenda per toelettature:
🐶 il cliente sceglie taglia, manto e servizio
⏱ lo slot dura quanto serve davvero (niente barboncino infilato in 40 minuti)
💬 WhatsApp di conferma e richiamo a 6-8 settimane, quando tocca rifare il manto

👉 Se il salone è il tuo, scrivimi. Ti mando la pagina del cane e l'agenda.`
  },
  linkedInPost: {
    headline: 'Una toelettatura non perde clienti per mancanza di domanda. Li perde mentre ha le mani nel phon.',
    content: `Una toelettatura non perde clienti per mancanza di domanda. Li perde mentre ha le mani nel phon.

Il sabato è pieno da settimane. Il martedì e il mercoledì hanno buchi. I messaggi arrivano la sera su Instagram e al mattino trovi dieci chat a cui non hai risposto, perché stavi tosando.

Il punto non è "mettere un sito". Il punto è un'agenda che conosce il mestiere:

- un pelo corto non occupa lo stesso tempo di un barboncino o di uno stripping
- la vasca, la postazione tosatura e il finishing non possono essere prenotati uno sopra l'altro
- il cliente che disdice alle 8:00 lascia un buco che, se non lo riempi in giornata, è fatturato perso
- a 6-8 settimane quel manto va rifatto, e se non lo richiami tu lo prenota il salone dopo

Ho preparato una demo indipendente, solo per toelettature: il proprietario prenota in pochi passaggi da telefono, l'agenda del salone si aggiorna, parte il WhatsApp con orario e cose da sapere, e lo scadenziario del prossimo taglio è già in lista.

La provi come se fossi un cliente, poi apri il gestionale e vedi la prenotazione in postazione.

👉 Scrivimi: ti mando i due link, la pagina di chi porta il cane e l'agenda del salone.`,
    hashtags: ['#Toelettatura', '#Toelettatori', '#PetBusiness', '#AgendaOnline', '#Cani', '#ServiziWeb'],
    suggestedImageDesc: 'Barboncino albicocca appena tosato, seduto sul tavolo del salone, che guarda in camera. In basso la scritta "Martedì alle 15. Scrivici, è il suo posto".'
  },
  carousel: {
    title: 'Carosello Instagram (5 slide) — Toelettatura',
    totalSlides: 5,
    slides: [
      {
        slideNumber: 1,
        badge: 'SLIDE 1 • COVER',
        headline: 'Sabato esplode. Martedì la vasca è vuota.',
        body: 'Scorri: è il modo in cui una toelettatura riempie i giorni morti senza vivere dentro i DM.',
        bulletPoints: ['📅 Sabato saturo da settimane', '🛁 Feriali con buchi che non si recuperano'],
        visualCue: 'Due colonne: sabato rosso "completo", martedì con una vasca vuota.'
      },
      {
        slideNumber: 2,
        badge: 'SLIDE 2 • IL TEMPO REALE',
        headline: 'Un barboncino non entra nello slot di un pelo corto.',
        body: 'Se l\'agenda ignora taglia e manto, o fai tardi su tutti o lasci buchi finti.',
        bulletPoints: [
          '⏱ Pelo corto: circa 45 minuti',
          '🐩 Tosatura: 90-120 minuti',
          '🧶 Stripping: postazione dedicata, non sovrapponibile'
        ],
        visualCue: 'Tre card durata con icone di manto diverso.'
      },
      {
        slideNumber: 3,
        badge: 'SLIDE 3 • DI SERA',
        headline: 'I clienti prenotano quando il salone è chiuso.',
        body: 'Alle 21:30 non rispondi al telefono. Un link in bio sì.',
        bulletPoints: [
          '📲 Scelta servizio, taglia e orario libero',
          '✅ Conferma subito, senza "ti richiamo io"',
          '💬 WhatsApp con orario e cosa preparare'
        ],
        visualCue: 'Mockup telefono, prenotazione completata di sera.'
      },
      {
        slideNumber: 4,
        badge: 'SLIDE 4 • IL RITORNO',
        headline: 'Il prossimo taglio si prenota da solo, a 6-8 settimane.',
        body: 'Il manto non aspetta che il cliente si ricordi di te.',
        bulletPoints: [
          '🔁 Lista richiami pronta ogni settimana',
          '💬 Un WhatsApp con il link per ribloccare',
          '💰 Il feriale si riempie con chi è già tuo cliente'
        ],
        visualCue: 'Lista "manto in scadenza" con pulsante invia WhatsApp.'
      },
      {
        slideNumber: 5,
        badge: 'SLIDE 5 • DEMO',
        headline: 'Due link: quello del cliente e quello del salone.',
        body: 'Li provi separati. Al cliente mandi solo il suo.',
        bulletPoints: ['✅ Prenotazione da telefono', '✅ Agenda postazioni', '✅ Nessun impegno'],
        visualCue: 'Due pulsanti: "Sono un cliente" e "Apro l\'agenda".'
      }
    ],
    captionForCarousel: `In toelettatura il telefono squilla quando hai le forbici in mano. Instagram si riempie quando hai chiuso. ✂️

Ho preparato una demo di agenda pensata per i saloni, non per un ambulatorio riadattato:
• tempi diversi per taglia e manto
• vasca, tosatura e finishing che non si pestano i piedi
• conferma WhatsApp
• richiamo automatico quando il manto va rifatto

👉 Scrivimi se vuoi i due link: la pagina di chi porta il cane e l'agenda del salone.`
  },
  websiteCopy: {
    badge: 'AGENDA ONLINE PER TOELETTATURE',
    h1: 'Il cliente prenota il bagno da solo. Tu tieni le forbici in mano.',
    subtitle: 'Una pagina di prenotazione e un\'agenda di salone: taglia, tipo di manto, durata reale, conferma WhatsApp e richiamo a 6-8 settimane.',
    features: [
      {
        title: 'Prenotazione serale, senza DM da smaltire al mattino',
        description: 'Il proprietario sceglie servizio, taglia e orario libero dal telefono. La richiesta non resta in una chat che leggi a fine turno.',
        metric: 'Prenotazioni anche a salone chiuso'
      },
      {
        title: 'Slot lunghi quanto il manto, non quanto il calendario',
        description: 'Pelo corto, tosatura e stripping occupano postazioni e minuti diversi. L\'agenda non infila due lavori lunghi nello stesso buco.',
        metric: 'Meno ritardi a catena il sabato'
      },
      {
        title: 'Richiamo del prossimo taglio',
        description: 'A 6-8 settimane il cliente riceve un WhatsApp per ribloccare. I feriali si riempiono con chi ti conosce già.',
        metric: 'Il martedì smette di restare vuoto'
      }
    ],
    ctaButton: 'Apri la demo della toelettatura',
    microcopy: 'Due indirizzi separati: uno per il cliente, uno per l\'agenda del salone.',
    demoBannerText: 'Titolare di un salone? Prova prima come cliente, poi apri l\'agenda.'
  },
  directPitchBonus: {
    whatsappDm: `Ciao, ho visto la vostra toelettatura e una cosa mi è saltata all'occhio: il sabato è il giorno in cui tutti scrivono, e durante la settimana restano buchi.

Ho preparato una demo di prenotazione fatta per i saloni: il cliente sceglie taglia e servizio, lo slot dura il tempo giusto per quel manto, e arriva la conferma su WhatsApp. C'è anche il richiamo a 6-8 settimane per il taglio successivo.

Sono due link distinti. Uno è quello che vedrebbe un cliente, l'altro è l'agenda del salone.
Te li mando? Si provano dal telefono in un minuto.`,
    coldEmail: `Oggetto: Agenda per la toelettatura [Nome Salone], senza vivere nei DM

Ciao [Nome],

ti scrivo perché le toelettature che seguo hanno lo stesso collo di bottiglia: i messaggi arrivano la sera e il titolare risponde tra un bagno e l'altro. Il sabato è pieno, il martedì no.

Ho messo online una demo solo per questo lavoro:
1. il cliente prenota servizio, taglia e orario da telefono
2. l'agenda tiene tempi diversi per pelo corto, tosatura e stripping
3. parte un WhatsApp di conferma e, a 6-8 settimane, il richiamo del manto

Puoi provarla in due passaggi:
- pagina cliente: [LINK_DEMO_CLIENTE]
- agenda del salone: [LINK_GESTIONALE]

Se ti è utile, ne parliamo dieci minuti e la adatto al tuo listino e alle tue postazioni.

[Tuo Nome]`
  }
};
