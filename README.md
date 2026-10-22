# Casa Manto — demo statica toelettatura

Due pagine HTML, senza Next.js. Cartella da pubblicare: `static/`.

- **Lato cliente:** `/` (`static/index.html`)
- **Lato salone (agenda):** `/agenda.html`

Le prenotazioni restano nel browser (`localStorage`) e compaiono in agenda.

## Locale

```bash
npx --yes serve static -l 4173
```

Apri `http://localhost:4173/` e `http://localhost:4173/agenda.html`.

## Render — sito statico

Crea uno **Static Site**, non un Web Service.

| Campo | Valore |
|---|---|
| Branch | `main` |
| Build Command | lascia vuoto |
| **Publish Directory** | `static` |

Link da passare a ChatGPT:

- `https://<sito>.onrender.com/` — lato cliente
- `https://<sito>.onrender.com/agenda.html` — agenda del salone
