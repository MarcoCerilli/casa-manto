import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sector = "dentistico",
      format = "all", // "reel" | "linkedin" | "carousel" | "website" | "outreach" | "all"
      tone = "diretto e pragmatico",
      customAngle = "",
      agencyName = "Web Agency / Dev Freelance",
    } = body;

    const sectorLabel =
      sector === "veterinario"
        ? "Cliniche e Ambulatori Veterinari"
        : sector === "medico"
        ? "Studi Medici e Polispecialistici"
        : sector === "toelettatura"
        ? "Toelettature e saloni per animali"
        : "Studi Dentistici e Odontoiatrici";

    const prompt = `Sei un Senior Copywriter e B2B Marketing Strategist di massimo livello, specializzato nell'acquisizione clienti per agenzie web e sviluppatori freelance che vendono soluzioni software verticali e demo interattive a titolari di studi sanitari.

OBIETTIVO:
Genera contenuti promozionali ad altissima conversione per vendere la DEMO INTERATTIVA di una Web App di prenotazione appuntamenti da smartphone per il settore: "${sectorLabel}".

LINEE GUIDA E REGOLE OPERATIVE TASSATIVE:
1. Focus assoluto sui benefici di business e sul ROI di tempo:
   - Eliminazione dei no-show (appuntamenti saltati/dimenticati che costano centinaia di euro di poltrona/visita vuota).
   - Abbattimento del sovraccarico telefonico in segreteria (basta personale che fa da centralino telefonico ripetitivo).
   - Agenda piena 24/7 (i pazienti/clienti prenotano la sera o nel weekend dal divano in 3 clic).
2. NESSUN gergo informatico astratto: vietato parlare di linguaggi, framework, database, API, backend. Parla invece di velocità istantanea da smartphone, facilità d'uso per il paziente/cliente (senza app da scaricare) e controllo totale per il personale di studio.
3. Call To Action (CTA) sempre dirette e senza frizione: spingere a testare la demo interattiva online direttamente da cellulare o a chiedere il link nei commenti / DM.
4. Linguaggio: Italiano professionale, dinamico, persuasivo, pragmatico e autorevole.

ANGOLO SPECIFICO RICHIESTO: ${customAngle || "Focus su no-show, segreteria intasata e prenotazione in 3 clic con promemoria WhatsApp"}
TONO: ${tone}
NOME MITTENTE/PROMOTORE: ${agencyName}
FORMATO RICHIESTO: ${format}

Fornisci la risposta in formato JSON valido strutturato con questi campi:
{
  "reelScript": {
    "title": "Titolo breve accattivante",
    "totalDuration": "30 secondi",
    "vibeAudio": "Descrizione musica di sottofondo ed effetti audio",
    "scenes": [
      {
        "timestamp": "00:00 - 00:05",
        "duration": "5 sec",
        "videoAction": "Cosa mostrare a video nei primi 5 secondi per agganciare l'attenzione",
        "onScreenText": "Testo a schermo grande e d'impatto",
        "voiceover": "Voce narrante parlata in italiano persuasivo",
        "soundCue": "Effetto sonoro"
      },
      {
        "timestamp": "00:05 - 00:12",
        "duration": "7 sec",
        "videoAction": "Cosa mostrare a video sul problema del telefono/segreteria",
        "onScreenText": "Testo a schermo",
        "voiceover": "Voce narrante",
        "soundCue": "Effetto sonoro"
      },
      {
        "timestamp": "00:12 - 00:22",
        "duration": "10 sec",
        "videoAction": "Dimostrazione della web app da smartphone e promemoria WhatsApp",
        "onScreenText": "Testo a schermo",
        "voiceover": "Voce narrante",
        "soundCue": "Effetto sonoro"
      },
      {
        "timestamp": "00:22 - 00:30",
        "duration": "8 sec",
        "videoAction": "Call to action finale verso la demo",
        "onScreenText": "Testo a schermo con CTA",
        "voiceover": "Voce narrante con CTA a commentare o provare la demo",
        "soundCue": "Effetto sonoro finale"
      }
    ],
    "captionForReel": "Testo completo della caption del Reel da pubblicare con hashtag e CTA"
  },
  "linkedInPost": {
    "headline": "Frase d'apertura provocatoria e magnetica",
    "content": "Testo completo formattato per LinkedIn con spaziature pulite, numeri tangibili, analisi del problema, soluzione e CTA per testare la demo",
    "hashtags": ["#tag1", "#tag2", "#tag3"],
    "suggestedImageDesc": "Descrizione dell'immagine/mockup consigliato per il post"
  },
  "carousel": {
    "title": "Titolo del carosello",
    "totalSlides": 5,
    "slides": [
      {
        "slideNumber": 1,
        "badge": "SLIDE 1 • COVER",
        "headline": "Titolo gancio prima slide",
        "body": "Testo breve di introduzione",
        "bulletPoints": ["punto 1", "punto 2"],
        "visualCue": "Indicazione visiva grafica per la slide"
      },
      {
        "slideNumber": 2,
        "badge": "SLIDE 2 • IL PROBLEMA",
        "headline": "Il vero costo del problema",
        "body": "Testo esplicativo",
        "bulletPoints": ["punto 1", "punto 2", "punto 3"],
        "visualCue": "Indicazione visiva"
      },
      {
        "slideNumber": 3,
        "badge": "SLIDE 3 • LA SVOLTA",
        "headline": "Prenotazione in 3 clic da smartphone",
        "body": "Testo esplicativo",
        "bulletPoints": ["punto 1", "punto 2", "punto 3"],
        "visualCue": "Indicazione visiva"
      },
      {
        "slideNumber": 4,
        "badge": "SLIDE 4 • ZERO NO-SHOW",
        "headline": "I promemoria automatici via WhatsApp",
        "body": "Testo esplicativo",
        "bulletPoints": ["punto 1", "punto 2", "punto 3"],
        "visualCue": "Indicazione visiva"
      },
      {
        "slideNumber": 5,
        "badge": "SLIDE 5 • CTA",
        "headline": "Prova la demo adesso",
        "body": "Invito all'azione senza frizione",
        "bulletPoints": ["punto 1", "punto 2"],
        "visualCue": "Indicazione visiva per la slide finale"
      }
    ],
    "captionForCarousel": "Caption Instagram completa per il carosello"
  },
  "websiteCopy": {
    "badge": "Badge della sezione",
    "h1": "Titolo H1 principale orientato al ROI di business",
    "subtitle": "Sottotitolo chiaro che elimina il gergo tecnico",
    "features": [
      {
        "title": "Titolo punto di forza 1",
        "description": "Descrizione focalizzata su semplicità per il cliente",
        "metric": "Metrica o beneficio tangibile"
      },
      {
        "title": "Titolo punto di forza 2",
        "description": "Descrizione sui promemoria WhatsApp e abbattimento no-show",
        "metric": "Metrica o beneficio tangibile"
      },
      {
        "title": "Titolo punto di forza 3",
        "description": "Descrizione su controllo totale per il personale e agenda sincronizzata",
        "metric": "Metrica o beneficio tangibile"
      }
    ],
    "ctaButton": "Testo del pulsante CTA per provare la demo",
    "microcopy": "Micro-copy rassicurante sotto il pulsante",
    "demoBannerText": "Testo d'invito al titolare"
  },
  "directPitchBonus": {
    "whatsappDm": "Messaggio breve di cold outreach da inviare in DM o WhatsApp",
    "coldEmail": "Email a freddo con oggetto e corpo orientata a far provare la demo in 45 secondi"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const textOutput = response.text || "{}";
    const parsedData = JSON.parse(textOutput);

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error generating copy with Gemini:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Errore nella generazione del copy",
      },
      { status: 500 }
    );
  }
}
