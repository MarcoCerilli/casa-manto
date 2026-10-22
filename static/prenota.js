const KEY = "casa-manto-bookings";
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
function bindChoices(root, key) {
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".choice").forEach((el) => el.classList.remove("on"));
      btn.classList.add("on");
      if (key) root.dataset[key] = btn.dataset.value || btn.textContent.trim();
    });
  });
}

function initClient() {
  const sizes = document.getElementById("sizes");
  const slots = document.getElementById("slots");
  const select = document.getElementById("service");
  bindChoices(sizes);
  bindChoices(slots);
  document.querySelectorAll(".service[data-service]").forEach((card) => {
    card.addEventListener("click", () => {
      select.value = card.dataset.service;
      document.getElementById("form").classList.remove("hidden");
      document.getElementById("done").classList.add("hidden");
      document.getElementById("prenota").scrollIntoView({ behavior: "smooth" });
    });
  });
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const size = sizes.querySelector(".on").textContent.trim();
    const slot = slots.querySelector(".on").textContent.trim();
    const booking = makeBooking(
      document.getElementById("pet").value,
      document.getElementById("phone").value,
      size,
      select.value,
      slot
    );
    saveBooking(booking);
    document.getElementById("form").classList.add("hidden");
    document.getElementById("done").classList.remove("hidden");
    document.getElementById("wa-text").textContent =
      `Ciao, ${booking.pet} (${booking.size}) è in agenda per ${booking.service}, ${booking.time}. Porta il cane spazzolato se ci sono nodi. Ti riscriviamo tra 7 settimane per il prossimo manto.`;
  });
}

function showToast(text) {
  const el = document.getElementById("toast");
  el.querySelector("span").textContent = text;
  el.classList.remove("hidden");
}

function renderAgenda() {
  const rows = allRows();
  const station = document.querySelector(".filters .on").dataset.station;
  const visible = station === "tutte" ? rows : rows.filter((row) => row.station === station);
  document.getElementById("count").textContent = rows.length;
  document.getElementById("total").textContent = `${rows.reduce((sum, row) => sum + row.price, 0)} €`;
  const names = station === "tutte" ? ["Vasca", "Tosatura", "Finishing"] : [station];
  document.getElementById("lanes").innerHTML = names.map((lane) => {
    const jobs = visible.filter((row) => row.station === lane);
    return `<section class="lane"><h3>${lane}<span>${jobs.length} in coda</span></h3>${jobs.map((row) => `
      <article class="job">
        <div class="top"><strong>${row.pet}</strong><time>${row.time}</time></div>
        <div class="meta">${row.service} · ${row.size}</div>
        <div class="bot"><span>${row.status}</span><strong>${row.price} €</strong></div>
      </article>`).join("")}</section>`;
  }).join("");
}

const recalls = RECALLS.map((row) => ({ ...row }));

function renderRecalls() {
  document.getElementById("recall-count").textContent = recalls.filter((row) => row.status === "Da scrivere").length;
  document.getElementById("recall-list").innerHTML = recalls.map((row, index) => `
    <li>
      <div><strong>${row.pet}</strong><div class="meta">${row.owner} · ${row.phone} · ${row.due}</div></div>
      <div><span class="meta">${row.status}</span> <button class="cta-teal" data-i="${index}">Scrivi ora</button></div>
    </li>`).join("");
}

function setTab(tab) {
  document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.toggle("on", btn.dataset.tab === tab));
  document.getElementById("view-agenda").classList.toggle("hidden", tab !== "agenda");
  document.getElementById("view-richiami").classList.toggle("hidden", tab !== "richiami");
  document.getElementById("view-prenota").classList.toggle("hidden", tab !== "prenota");
}

function initAgenda() {
  renderAgenda();
  renderRecalls();
  document.querySelectorAll(".tabs button").forEach((btn) => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach((el) => el.classList.remove("on"));
      btn.classList.add("on");
      renderAgenda();
    });
  });
  document.getElementById("toast-close").addEventListener("click", () => {
    document.getElementById("toast").classList.add("hidden");
  });
  document.getElementById("recall-all").addEventListener("click", () => {
    recalls.forEach((row) => { row.status = "WhatsApp inviato"; });
    renderRecalls();
    showToast("Messaggi inviati. Chi deve tornare ha già il link per prenotare.");
  });
  document.getElementById("recall-list").addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-i]");
    if (!btn) return;
    const row = recalls[Number(btn.dataset.i)];
    row.status = "WhatsApp inviato";
    renderRecalls();
    showToast(`WhatsApp a ${row.owner}: il manto di ${row.pet} è da rifare. Prenota da qui, ti tengo il posto.`);
  });
  bindChoices(document.getElementById("staff-sizes"));
  document.getElementById("staff-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const booking = makeBooking(
      document.getElementById("staff-pet").value,
      document.getElementById("staff-phone").value,
      document.querySelector("#staff-sizes .on").textContent.trim(),
      document.getElementById("staff-service").value,
      "Oggi 15:00"
    );
    saveBooking(booking);
    showToast(`WhatsApp inviato a ${booking.pet}. Il posto è in agenda: apri la postazione e vai.`);
    setTab("agenda");
    renderAgenda();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "client") initClient();
  if (document.body.dataset.page === "agenda") initAgenda();
});
