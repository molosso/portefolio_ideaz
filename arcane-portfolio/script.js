document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const clearButton = document.querySelector(".clear-search");
  const searchableItems = [...document.querySelectorAll(".searchable")];
  const toast = document.querySelector("#toast");
  const menuButton = document.querySelector("#mobile-menu");
  const nav = document.querySelector("#main-nav");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function filterCharacters(query) {
    const term = query.trim().toLocaleLowerCase();
    let visible = 0;
    searchableItems.forEach((item) => {
      const text = `${item.dataset.search || ""} ${item.textContent}`.toLocaleLowerCase();
      const matches = !term || text.includes(term);
      item.classList.toggle("is-hidden", !matches);
      if (matches) visible++;
    });
    if (term && visible === 0) showToast("No characters found. Try Jinx, Vi, or Caitlyn.");
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCharacters(searchInput.value);
    document.querySelector("#characters").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", () => filterCharacters(searchInput.value));
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterCharacters("");
    searchInput.focus();
  });

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    nav.classList.toggle("open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // These are interface mockups, not embedded episode streams.
  document.querySelectorAll(".play-button, .episode-card").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = button.closest(".video-frame");
      const label = button.dataset.video || frame?.dataset.video || "Arcane";
      showToast(`${label} — add your official video link here.`);
    });
  });

  document.querySelectorAll(".skip-button").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = button.closest(".video-frame");
      const progress = frame?.querySelector(".progress span");
      if (!progress) return;
      const current = parseFloat(progress.style.width) || 40;
      const amount = Number(button.dataset.skip) / 10;
      progress.style.width = `${Math.max(0, Math.min(100, current + amount))}%`;
    });
  });

  // Add a subtle entrance effect without hiding content if JS is unavailable.
  const animated = document.querySelectorAll(".hero-copy, .season-title, .character-feature, .character-row, .episodes");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("entered");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    animated.forEach((element) => observer.observe(element));
  } else {
    animated.forEach((element) => element.classList.add("entered"));
  }
});
