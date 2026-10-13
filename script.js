// PORTFOLIO INTERACTIONS


const progress = document.querySelector(".progress");

// Scroll Progress


function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${scrolled / max})`;
}

window.addEventListener("scroll", updateProgress);
updateProgress();


// Split Text Animation


document.querySelectorAll("[data-split]").forEach(title => {
    const words = title.textContent.trim().split(" ");
    title.innerHTML = words.map((word, i) =>
        `<span class="word" style="--i:${i}">
            <span>${word}</span>
        </span>`
    ).join(" ");
});

// Reveal on Scroll Observer

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
        }
    });
}, {
    threshold: .15
});

document.querySelectorAll("[data-reveal], [data-split], .sec").forEach(el => {
    observer.observe(el);
});

// HERO PARALLAX
const heroBg = document.querySelector(".hero__bg");
addEventListener("scroll", () => {
    if (scrollY < innerHeight) heroBg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
}, { passive: true });

// CAMPAGNES — Titres adaptés à vos affiches
const CAMPAIGNS = {
    esport: {
        name: "Esport & Gaming",
        titles: ["Tournoi Valorant", "Tournoi Valorant Féminin", "Table Ronde : Jeux Vidéo"], 
        type: "Digital & Events", 
        c: ["#e0562b", "#4a1408"],
        short: "Visuels dynamiques pour les tournois e-sport et tables rondes de l'Institut Français.",
        full: "Conception de supports de communication percutants pour l'univers du gaming et de l'e-sport, incluant les tournois Valorant et des conférences professionnelles sur les métiers du jeu vidéo.",
        meta: { Client: "Institut Français Constantine", Year: "2026", Role: "Graphic Design, Art Direction" },
        cover: "assets/2 social media/10.jpg",
        images: [
            "assets/2 social media/10.jpg", 
            "assets/2 social media/6.png", 
            "assets/2 social media/5.png"
        ]
    },
    concerts: {
        name: "Concerts Live",
        titles: ["Tikoubaouine en concert", "El Besta : Aux origines du raï", "Concert Abbas Righi"], 
        type: "Music & Live Shows", 
        c: ["#2f9e6e", "#0b3d2a"],
        short: "Affiches de concerts et scènes musicales live au Novotel Constantine.",
        full: "Création d'identités visuelles et d'affiches pour la programmation musicale, mettant en valeur des artistes de renom à travers une direction artistique soignée.",
        meta: { Client: "Institut Français / Novotel", Year: "2026", Role: "Branding, Poster Design" },
        cover: "assets/2 social media/12.jpg",
        images: [
            "assets/2 social media/12.jpg", 
            "assets/2 social media/11.jpg", 
            "assets/2 social media/7.png"
        ]
    },
    culture: {
        name: "Culture & Soirées",
        titles: ["Soirée Électro Blanche", "Récital Lyrique : Ode à l'amour", "Lectures Participatives"], 
        type: "Cultural Events", 
        c: ["#6c4bff", "#1a1050"],
        short: "Campagnes visuelles pour les soirées, récitals lyriques et événements culturels.",
        full: "Direction artistique et production de supports pour des événements artistiques variés, allant des soirées électro aux récitals de chant et programmes culturels institutionnels.",
        meta: { Client: "Institut Français Constantine", Year: "2026", Role: "Art Direction, Content Creation" },
        cover: "assets/2 social media/9.jpg",
        images: [
            "assets/2 social media/9.jpg", 
            "assets/2 social media/8.png", 
            "assets/2 social media/1.png"
        ]
    }

};

const $ = (s, r = document) => r.querySelector(s);
const tint = (el, k) => { el.style.setProperty("--c1", CAMPAIGNS[k].c[0]); el.style.setProperty("--c2", CAMPAIGNS[k].c[1]); };
function setImg(box, src, name) {
    const img = new Image();
    img.alt = name; img.loading = "lazy";
    img.onerror = () => { img.remove(); box.classList.add("noimg"); };
    img.src = src;
    box.prepend(img);
}

// Modal (campagne en grand)
const modal = $("#modal"), mMedia = $(".modal__media");
let cur = { k: null, i: 0 };

function renderImage(delay) {
    const c = CAMPAIGNS[cur.k];
    mMedia.classList.add("swap");
    setTimeout(() => {
        mMedia.querySelector("img")?.remove();
        mMedia.classList.remove("noimg");
        mMedia.dataset.name = c.name;
        setImg(mMedia, c.images[cur.i], c.name);
        $(".m-count").textContent = `${cur.i + 1} / ${c.images.length}`;
        mMedia.classList.remove("swap");
    }, delay);
}
function openModal(k, i = 0) {
    const c = CAMPAIGNS[k];
    cur = { k, i };
    tint(mMedia, k);
    $("#mTag").textContent = c.type;
    $("#mTitle").textContent = c.name;
    $("#mDesc").textContent = c.full;
    $("#mMeta").innerHTML = Object.entries(c.meta).map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
    renderImage(0);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".modal__close").focus({ preventScroll: true });
}
function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
function stepModal(d) {
    const n = CAMPAIGNS[cur.k].images.length;
    cur.i = (cur.i + d + n) % n;
    renderImage(200);
}
$(".modal__close").addEventListener("click", closeModal);
$(".modal__backdrop").addEventListener("click", closeModal);
$(".m-prev").addEventListener("click", () => stepModal(-1));
$(".m-next").addEventListener("click", () => stepModal(1));

// Branding : cartes campagnes

Object.entries(CAMPAIGNS).forEach(([k, c], i) => {
    const a = document.createElement("a");
    a.href = "#"; a.className = "bcard"; a.dataset.reveal = "";
    a.style.setProperty("--d", i * .12 + "s");
    a.innerHTML = `<div class="bcard__img" data-name="${c.name}"><span class="bcard__pill">View campaign</span></div>
        <div class="bcard__meta"><b>${c.name}</b><em>${c.type}</em></div><p>${c.short}</p>`;
    const box = a.firstElementChild;
    tint(box, k); setImg(box, c.cover || c.images[0], c.name);
    a.addEventListener("click", e => { e.preventDefault(); openModal(k, 0); });
    $("#brandGrid").append(a);
    observer.observe(a);
});


// Photo & video
document.querySelectorAll(".mt[data-src]").forEach(t => setImg(t, t.dataset.src, t.dataset.name));


// Carousel 3D d'affiches
const slides = [];
for (let n = 0; n < 3; n++) Object.keys(CAMPAIGNS).forEach(k => slides.push({ k, n, t: CAMPAIGNS[k].titles[n] }));
const N = slides.length, stage = $(".cf__stage"), cf = $(".cf");
let active = 0, moved = false, hover = false, inView = false;

slides.forEach((s, i) => {
    const c = CAMPAIGNS[s.k], f = document.createElement("figure");
    f.className = "cf__slide";
    const box = document.createElement("div");
    box.className = "cf__img"; box.dataset.name = s.t;
    tint(box, s.k); setImg(box, c.images[s.n], s.t);
    const cap = document.createElement("figcaption");
    cap.innerHTML = `<b>${s.t}</b><span>${c.name}</span>`;
    f.append(box, cap);
    f.addEventListener("click", () => {
        if (moved) return;
        i === active ? openModal(s.k, s.n) : go(i);
    });
    stage.append(f); s.el = f;
});

function layout() {
    const sm = innerWidth < 850, step = sm ? 58 : 64, max = sm ? 2 : 3;
    slides.forEach((s, i) => {
        let d = i - active;
        if (d > N / 2) d -= N;
        if (d < -N / 2) d += N;
        const a = Math.abs(d), vis = a <= max;
        Object.assign(s.el.style, {
            transform: `translate(-50%,-50%) translateX(${d * step}%) translateZ(${-a * 160}px) rotateY(${-d * 26}deg) scale(${1 - a * 0.05})`,
            opacity: vis ? 1 : 0, zIndex: 10 - a, filter: `brightness(${1 - a * 0.2})`, pointerEvents: vis ? "auto" : "none"
        });
        s.el.classList.toggle("is-active", d === 0);
    });
    const c = CAMPAIGNS[slides[active].k];
    $(".cf__count").textContent = `${String(active + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
    $(".cf__name").textContent = slides[active].t;
    cf.style.setProperty("--glow", c.c[0]);
}
const go = i => { active = (i + N) % N; layout(); };
layout(); addEventListener("resize", layout);

$(".cf__prev").addEventListener("click", () => go(active - 1));
$(".cf__next").addEventListener("click", () => go(active + 1));

// drag / swipe
let sx = 0, dragging = false;
stage.addEventListener("pointerdown", e => { dragging = true; moved = false; sx = e.clientX; });
addEventListener("pointerup", e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 45) { moved = true; go(active + (dx < 0 ? 1 : -1)); setTimeout(() => moved = false, 60); }
});

// clavier + autoplay
new IntersectionObserver(([e]) => inView = e.isIntersecting, { threshold: .4 }).observe(stage);
stage.addEventListener("mouseenter", () => hover = true);
stage.addEventListener("mouseleave", () => hover = false);
addEventListener("keydown", e => {
    if (modal.classList.contains("open")) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") stepModal(1);
        if (e.key === "ArrowLeft") stepModal(-1);
    } else if (inView) {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
    }
});
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => { if (inView && !hover && !modal.classList.contains("open")) go(active + 1); }, 4500);
}