// ===============================
// PORTFOLIO INTERACTIONS
// ===============================

const progress = document.querySelector(".progress");
const nav = document.querySelector(".nav");

// --------------------------------
// Scroll Progress & Navbar Style
// --------------------------------

function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - innerHeight;

    progress.style.transform = `scaleX(${scrolled / max})`;
    nav.classList.toggle("scrolled", scrolled > 80);
}

window.addEventListener("scroll", updateProgress);
updateProgress();

// --------------------------------
// Split Text Animation
// --------------------------------

document.querySelectorAll("[data-split]").forEach(title => {
    const words = title.textContent.trim().split(" ");
    title.innerHTML = words.map((word, i) =>
        `<span class="word" style="--i:${i}">
            <span>${word}</span>
        </span>`
    ).join(" ");
});

// --------------------------------
// Reveal on Scroll Observer
// --------------------------------

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
        }
    });
}, {
    threshold: .15
});

document.querySelectorAll("[data-reveal], [data-split]").forEach(el => {
    observer.observe(el);
});

// --------------------------------
// Hero Parallax Subtil
// --------------------------------

const bg = document.querySelector(".hero__bg");
const person = document.querySelector(".hero__person");

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if(bg) bg.style.transform = `translateY(${y * 0.15}px)`;
    if(person) person.style.transform = `translate(-46%, ${y * 0.05}px)`;
});

document.querySelectorAll(".sec").forEach(sec => {
    observer.observe(sec);
});