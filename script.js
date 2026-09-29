// ===============================
// PORTFOLIO INTERACTIONS
// ===============================

const body = document.body;
const progress = document.querySelector(".progress");
const cursor = document.querySelector(".cursor");
const nav = document.querySelector(".nav");

// --------------------------------
// Scroll Progress
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
// Custom Cursor
// --------------------------------

let mouseX = 0;
let mouseY = 0;
let curX = 0;
let curY = 0;

window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;

    cursor.style.setProperty("--x", `${curX}px`);
    cursor.style.setProperty("--y", `${curY}px`);

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a,.card,.btn").forEach(el => {

    el.addEventListener("mouseenter", () => {
        cursor.classList.add("on");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("on");
    });

});


// --------------------------------
// Split Text
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
// Reveal on Scroll
// --------------------------------

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("in");

        }

    });

}, {
    threshold: .18
});

document.querySelectorAll("[data-reveal],[data-split]").forEach(el => {
    observer.observe(el);
});


// --------------------------------
// Magnetic Buttons
// --------------------------------

document.querySelectorAll("[data-magnetic]").forEach(button => {

    button.addEventListener("mousemove", e => {

        const r = button.getBoundingClientRect();

        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;

        button.style.transform = `translate(${x*0.25}px,${y*0.25}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


// --------------------------------
// Card Tilt
// --------------------------------

document.querySelectorAll("[data-tilt]").forEach(card => {

    card.addEventListener("mousemove", e => {

        const r = card.getBoundingClientRect();

        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const rotateY = (x / r.width - .5) * 18;
        const rotateX = (.5 - y / r.height) * 18;

        card.style.transform =
            `perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// --------------------------------
// Hero Parallax
// --------------------------------

const bg = document.querySelector(".hero__bg");
const person = document.querySelector(".hero__person");

window.addEventListener("scroll", () => {

    const y = window.scrollY;

    bg.style.transform = `translateY(${y*0.18}px)`;
    person.style.transform =
        `translate(-46%,${y*0.06}px)`;

});


// --------------------------------
// Fade Sections
// --------------------------------

document.querySelectorAll(".sec").forEach(sec => {

    observer.observe(sec);

});