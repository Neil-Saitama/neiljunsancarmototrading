const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");
const grid = document.getElementById("bikeGrid");
const noResults = document.getElementById("noResults");
function updateInventory() {
  if (!grid) return;
  const query = (searchInput?.value || "").toLowerCase().trim();
  const type = typeFilter?.value || "all";
  const cards = Array.from(grid.querySelectorAll(".bike-card"));
  cards.forEach(card => {
    const matchesText = (card.dataset.name || "").toLowerCase().includes(query) || (card.dataset.type || "").toLowerCase().includes(query);
    const matchesType = type === "all" || card.dataset.type === type;
    card.hidden = !(matchesText && matchesType);
  });
  const visible = cards.filter(card => !card.hidden);
  if (sortSelect?.value === "low") visible.sort((a,b) => Number(a.dataset.price) - Number(b.dataset.price));
  if (sortSelect?.value === "high") visible.sort((a,b) => Number(b.dataset.price) - Number(a.dataset.price));
  visible.forEach(card => grid.appendChild(card));
  if (noResults) noResults.hidden = visible.length !== 0;
}
[searchInput, typeFilter, sortSelect].forEach(el => el?.addEventListener("input", updateInventory));
