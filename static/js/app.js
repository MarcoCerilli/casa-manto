const KEY = "casa-manto-bookings";
const SERVICES = [
  { title: "Bagno e asciugatura", duration: "50 min", price: 38, photo: "img/bagno.jpg", desc: "Lavaggio, asciugatura e spazzolatura." },
  { title: "Tosatura completa", duration: "100 min", price: 65, photo: "img/tosatura.jpg", desc: "Bagno e taglio secondo razza o lunghezza." },
  { title: "Stripping", duration: "120 min", price: 80, photo: "img/stripping.jpg", desc: "Lavorazione a mano per manti ruvidi." },
  { title: "Unghie, orecchie e igiene", duration: "25 min", price: 22, photo: "img/unghie.jpg", desc: "Intervento breve tra un taglio e l'altro." },
];
const SLOTS = ["Oggi ore 15:00", "Domani ore 10:30", "Giovedì ore 11:00", "Sabato ore 09:00"];
const SEED = [
  { id: "T-1", pet: "Lola (Maltese)", size: "Piccola", service: "Bagno e asciugatura", station: "Vasca", time: "09:00–09:50", price: 38, status: "Confermato WhatsApp" },
  { id: "T-2", pet: "Teo (Barboncino)", size: "Media", service: "Tosatura completa", station: "Tosatura", time: "09:30–11:10", price: 65, status: "Confermato WhatsApp" },
  { id: "T-3", pet: "Iris (Jack Russell)", size: "Piccola", service: "Stripping", station: "Tosatura", time: "11:30–13:30", price: 80, status: "In arrivo" },
  { id: "T-4", pet: "Otto (Labrador)", size: "Grande", service: "Bagno e asciugatura", station: "Vasca", time: "15:00–16:10", price: 48, status: "Confermato WhatsApp" },
  { id: "T-5", pet: "Nina (Barboncino toy)", size: "Piccola", service: "Finishing e fiocco", station: "Finishing", time: "11:15–11:45", price: 25, status: "Confermato WhatsApp" },
];
const RECALLS = [
  { pet: "Birba (Volpino)", owner: "Giulia Fontana", phone: "+39 335 900 1122", due: "Manto a 7 settimane", status: "Da scrivere" },
  { pet: "Ciro (Barboncino)", owner: "Davide Riva", phone: "+39 348 333 2210", due: "Manto a 8 settimane", status: "Da scrivere" },
  { pet: "Peggy (Westie)", owner: "Anna Berri", phone: "+39 331 556 7788", due: "Stripping in scadenza", status: "Da scrivere" },
];

function stationFor(service) {
  if (service.includes("Bagno")) return "Vasca";
  if (service.includes("Unghie") || service.includes("Finishing")) return "Finishing";
  return "Tosatura";
}
function priceFor(service) {
  const found = SERVICES.find((item) => item.title === service);
  if (found) return found.price;
  if (service.includes("Stripping")) return 80;
  if (service.includes("Bagno")) return 38;
  if (service.includes("Unghie")) return 22;
  return 65;
}
function readExtras() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function saveBooking(booking) {
  localStorage.setItem(KEY, JSON.stringify([booking, ...readExtras()]));
}

const state = {
  size: "Media",
  service: SERVICES[1].title,
  slot: SLOTS[0],
  tab: "agenda",
  station: "tutte",
  recalls: RECALLS.map((row) => ({ ...row })),
};

function allRows() {
  const extras = readExtras();
  const known = new Set(SEED.map((row) => row.id));
  return [...extras.filter((row) => !known.has(row.id)), ...SEED];
}

function makeBooking(pet, phone, size, service, time) {
  return {
    id: `T-${Date.now().toString().slice(-4)}`,
    pet: pet.trim() || "Teo (Barboncino)",
    size,
    service,
    station: stationFor(service),
    time,
    price: priceFor(service),
    status: "Confermato WhatsApp",
    phone: phone.trim() || "+39 347 220 1188",
  };
}

function initClient() {
  const sizes = document.getElementById("sizes");
  const slots = document.getElementById("slots");
  const select = document.getElementById("service");
  const catalog = document.getElementById("catalog");
  SERVICES.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.title;
    option.textContent = `${item.title} (${item.duration} · ${item.price} €)`;
    if (item.title === state.service) option.selected = true;
    select.appendChild(option);
    const card = document.createElement("button");
    card.className = "service";
    card.type = "button";
    card.innerHTML = `<img src="${item.photo}" alt="${item.title}"><div><span class="pill">${item.duration}</span><h3>${item.title}</h3><p>${item.price} €</p></div>`;
    card.onclick = () => {
      state.service = item.title;
      select.value = item.title;
      document.getElementById("form").classList.remove("hidden");
      document.getElementById("done").classList.add("hidden");
      document.getElementById("prenota").scrollIntoView({ behavior: "smooth" });
    };
    catalog.appendChild(card);
  });
  ["Piccola", "Media", "Grande"].forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (item === state.size ? " on" : "");
    btn.textContent = item;
    btn.onclick = () => {
      state.size = item;
      sizes.querySelectorAll(".choice").forEach((el) => el.classList.toggle("on", el.textContent === item));
    };
    sizes.appendChild(btn);
  });
  SLOTS.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (item === state.slot ? " on" : "");
    btn.textContent = item;
    btn.onclick = () => {
      state.slot = item;
      slots.querySelectorAll(".choice").forEach((el) => el.classList.toggle("on", el.textContent === item));
    };
    slots.appendChild(btn);
  });
  select.onchange = () => { state.service = select.value; };
  document.getElementById("form").onsubmit = (event) => {
    event.preventDefault();
    const pet = document.getElementById("pet").value;
    const phone = document.getElementById("phone").value;
    const booking = makeBooking(pet, phone, state.size, state.service, state.slot);
    saveBooking(booking);
    document.getElementById("form").classList.add("hidden");
    document.getElementById("done").classList.remove("hidden");
    document.getElementById("wa-text").textContent =
      `Ciao, ${booking.pet} (${booking.size}) è in agenda per ${booking.service}, ${booking.time}. Porta il cane spazzolato se ci sono nodi. Ti riscriviamo tra 7 settimane per il prossimo manto.`;
  };
}

function showToast(text) {
  const el = document.getElementById("toast");
  el.querySelector("span").textContent = text;
  el.classList.remove("hidden");
}

function renderAgenda() {
  const rows = allRows();
  const visible = state.station === "tutte" ? rows : rows.filter((row) => row.station === state.station);
  const total = rows.reduce((sum, row) => sum + row.price, 0);
  document.getElementById("count").textContent = rows.length;
  document.getElementById("total").textContent = `${total} €`;
  const lanes = document.getElementById("lanes");
  const names = state.station === "tutte" ? ["Vasca", "Tosatura", "Finishing"] : [state.station];
  lanes.innerHTML = names.map((lane) => {
    const jobs = visible.filter((row) => row.station === lane);
    return `<section class="lane"><h3>${lane}<span>${jobs.length} in coda</span></h3>${jobs.map((row) => `
      <article class="job">
        <div class="top"><strong>${row.pet}</strong><time>${row.time}</time></div>
        <div class="meta">${row.service} · ${row.size}</div>
        <div class="bot"><span>${row.status}</span><strong>${row.price} €</strong></div>
      </article>`).join("")}</section>`;
  }).join("");
}

function renderRecalls() {
  document.getElementById("recall-count").textContent = state.recalls.filter((row) => row.status === "Da scrivere").length;
  document.getElementById("recall-list").innerHTML = state.recalls.map((row, index) => `
    <li>
      <div><strong>${row.pet}</strong><div class="meta">${row.owner} · ${row.phone} · ${row.due}</div></div>
      <div><span class="meta">${row.status}</span> <button class="cta-teal" data-i="${index}">Scrivi ora</button></div>
    </li>`).join("");
}

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.toggle("on", btn.dataset.tab === tab));
  document.getElementById("view-agenda").classList.toggle("hidden", tab !== "agenda");
  document.getElementById("view-richiami").classList.toggle("hidden", tab !== "richiami");
  document.getElementById("view-prenota").classList.toggle("hidden", tab !== "prenota");
}

function initAgenda() {
  renderAgenda();
  renderRecalls();
  document.querySelectorAll(".tabs button").forEach((btn) => {
    btn.onclick = () => setTab(btn.dataset.tab);
  });
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.onclick = () => {
      state.station = btn.dataset.station;
      document.querySelectorAll(".filters button").forEach((el) => el.classList.toggle("on", el === btn));
      renderAgenda();
    };
  });
  document.getElementById("toast-close").onclick = () => document.getElementById("toast").classList.add("hidden");
  document.getElementById("recall-all").onclick = () => {
    state.recalls.forEach((row) => { row.status = "WhatsApp inviato"; });
    renderRecalls();
    showToast("Messaggi inviati. Chi deve tornare ha già il link per prenotare.");
  };
  document.getElementById("recall-list").onclick = (event) => {
    const btn = event.target.closest("button[data-i]");
    if (!btn) return;
    const row = state.recalls[Number(btn.dataset.i)];
    row.status = "WhatsApp inviato";
    renderRecalls();
    showToast(`WhatsApp a ${row.owner}: il manto di ${row.pet} è da rifare. Prenota da qui, ti tengo il posto.`);
  };
  document.getElementById("staff-form").onsubmit = (event) => {
    event.preventDefault();
    const booking = makeBooking(
      document.getElementById("staff-pet").value,
      document.getElementById("staff-phone").value,
      document.querySelector("#staff-sizes .on").textContent,
      document.getElementById("staff-service").value,
      "Oggi 15:00"
    );
    saveBooking(booking);
    showToast(`WhatsApp inviato a ${booking.pet}. Il posto è in agenda: apri la postazione e vai.`);
    setTab("agenda");
    renderAgenda();
  };
  document.querySelectorAll("#staff-sizes .choice").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll("#staff-sizes .choice").forEach((el) => el.classList.remove("on"));
      btn.classList.add("on");
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "client") initClient();
  if (document.body.dataset.page === "agenda") initAgenda();
});
