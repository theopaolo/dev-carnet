import mermaid from "mermaid";

// Rendu Mermaid + barre légende/zoom sous chaque diagramme.
// Les flowcharts sont stylés par theme.css. Les autres types (séquence, état,
// entités) prennent leurs couleurs des themeVariables : on re-rend au changement de thème.
const common = {
  startOnLoad: false,
  theme: "base",
  look: "classic",
  flowchart: { htmlLabels: true, padding: 16, nodeSpacing: 48, rankSpacing: 56, curve: "basis" },
  sequence: { actorMargin: 60, messageMargin: 40, mirrorActors: false },
};

const fonts = { fontFamily: "Inclusive Sans, system-ui, sans-serif", fontSize: "15px" };

// Mêmes valeurs que les jetons de theme.css
const themeVariables = {
  light: {
    ...fonts,
    background: "#f4f4f6",
    mainBkg: "#e8ecf4",
    primaryColor: "#e8ecf4",
    primaryTextColor: "#202637",
    primaryBorderColor: "#3f4658",
    secondaryColor: "#eee5fa",
    tertiaryColor: "#e6f3ea",
    lineColor: "#3f4658",
    textColor: "#1e2530",
    noteBkgColor: "#eee5fa",
    noteTextColor: "#51357e",
    noteBorderColor: "#8261b6",
    actorBkg: "#e8ecf4",
    actorBorder: "#3f4658",
    actorTextColor: "#202637",
    actorLineColor: "#8e97aa",
    signalColor: "#3f4658",
    signalTextColor: "#1e2530",
    labelBoxBkgColor: "#f4f4f6",
    labelBoxBorderColor: "#8e97aa",
    labelTextColor: "#1e2530",
    loopTextColor: "#1e2530",
    activationBkgColor: "#eee5fa",
    activationBorderColor: "#8261b6",
    attributeBackgroundColorOdd: "#ffffff",
    attributeBackgroundColorEven: "#f4f4f6",
  },
  dark: {
    ...fonts,
    background: "#181c26",
    mainBkg: "#232a3b",
    primaryColor: "#232a3b",
    primaryTextColor: "#e6e8ee",
    primaryBorderColor: "#aab3c8",
    secondaryColor: "#322844",
    tertiaryColor: "#17301f",
    lineColor: "#b3bccd",
    textColor: "#e6e8ee",
    noteBkgColor: "#322844",
    noteTextColor: "#dcc8fa",
    noteBorderColor: "#c4a6ee",
    actorBkg: "#232a3b",
    actorBorder: "#aab3c8",
    actorTextColor: "#e6e8ee",
    actorLineColor: "#6b7590",
    signalColor: "#b3bccd",
    signalTextColor: "#e6e8ee",
    labelBoxBkgColor: "#181c26",
    labelBoxBorderColor: "#4a5268",
    labelTextColor: "#e6e8ee",
    loopTextColor: "#e6e8ee",
    activationBkgColor: "#322844",
    activationBorderColor: "#c4a6ee",
    attributeBackgroundColorOdd: "#1b1f2a",
    attributeBackgroundColorEven: "#232a3b",
  },
};

// Tout de suite, avant toute attente : sinon Mermaid lance son propre rendu au
// chargement de la page et les diagrammes se rendent deux fois, mélangés
mermaid.initialize(common);
mermaid.startOnLoad = false;

const zoom = document.createElement("dialog");
zoom.className = "zoom mermaid";
zoom.dataset.processed = "true"; // ignoré par mermaid.run()
zoom.innerHTML = '<div class="zoom-controls"></div><button type="button" class="zoom-close">Fermer</button><div class="zoom-body"></div>';
document.body.append(zoom);
// Un clic ferme, sauf sur le diagramme au téléphone : il s'y parcourt au doigt
zoom.addEventListener("click", (e) => {
  if (e.target.closest(".zoom-controls")) return;
  if (!e.target.closest(".zoom-body svg") || !matchMedia("(max-width: 760px)").matches) zoom.close();
});

const motionStops = [];
let stopZoomMotion = () => {};

// Seulement sur les flowcharts marqués ```mermaid play : l'ordre des flèches y a un sens
function mountMotion(d, svg, controls) {
  if (!d.closest("pre[data-play]") || !svg.classList.contains("flowchart")) return () => {};
  const edges = [...svg.querySelectorAll(".edgePaths path.flowchart-link")];
  if (!edges.length) return () => {};
  const labels = [...svg.querySelectorAll(".edgeLabels > .edgeLabel")];
  controls.innerHTML = '<button type="button" class="seq-btn" data-act="prev" aria-label="Connexion précédente">‹</button>' +
    '<button type="button" class="seq-btn" data-act="play" aria-pressed="false">Lecture</button>' +
    '<button type="button" class="seq-btn" data-act="next" aria-label="Connexion suivante">›</button>' +
    '<span class="seq-count" aria-live="polite"></span>';
  let cur = edges.length;
  let timer;
  let drawing;
  const play = controls.querySelector('[data-act="play"]');

  function clearDrawing() {
    if (!drawing) return;
    drawing.animation.cancel();
    drawing.edge.style.removeProperty("stroke-dasharray");
    drawing = null;
  }

  function show(k) {
    const forward = k > cur;
    clearDrawing();
    cur = k;
    svg.classList.add("diagram-stepping");
    edges.forEach((edge, i) => {
      edge.classList.toggle("revealed", i < k);
      edge.classList.toggle("current", i === k - 1);
    });
    labels.forEach((label, i) => label.classList.toggle("revealed", i < k));
    controls.querySelector(".seq-count").textContent = `${k} / ${edges.length}`;
    controls.querySelector('[data-act="prev"]').disabled = k === 0;
    controls.querySelector('[data-act="next"]').disabled = k === edges.length;

    if (forward && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const edge = edges[k - 1];
      const length = edge.getTotalLength();
      edge.style.setProperty("stroke-dasharray", `${length}`, "important");
      const animation = edge.animate(
        [{ strokeDashoffset: length, opacity: 0.35 }, { strokeDashoffset: 0, opacity: 1 }],
        { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      drawing = { edge, animation };
      animation.onfinish = () => clearDrawing();
    }
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    clearDrawing();
    play.textContent = "Lecture";
    play.setAttribute("aria-pressed", "false");
  }

  controls.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "play") {
      if (timer) return stop();
      if (cur === edges.length) show(0);
      play.textContent = "Pause";
      play.setAttribute("aria-pressed", "true");
      show(cur + 1);
      timer = setInterval(() => cur < edges.length ? show(cur + 1) : stop(), 1100);
    }
    if (act === "prev" || act === "next") {
      stop();
      show(Math.max(0, Math.min(edges.length, cur + (act === "next" ? 1 : -1))));
    }
  });
  controls.querySelector(".seq-count").textContent = `${cur} / ${edges.length}`;
  controls.querySelector('[data-act="next"]').disabled = true;
  return stop;
}

function openZoom(d) {
  stopZoomMotion();
  const svg = d.querySelector("svg").cloneNode(true);
  zoom.setAttribute("aria-label", svg.querySelector(":scope > title")?.textContent || "Diagramme agrandi");
  svg.classList.remove("diagram-stepping");
  svg.querySelectorAll(".revealed, .current").forEach((el) => el.classList.remove("revealed", "current"));
  zoom.querySelector(".zoom-body").replaceChildren(svg);
  const controls = zoom.querySelector(".zoom-controls");
  controls.replaceChildren();
  stopZoomMotion = mountMotion(d, svg, controls);
  zoom.showModal();
}
zoom.addEventListener("close", () => stopZoomMotion());

const expandIcon =
  '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M9.5 2H14v4.5M14 2l-5 5M6.5 14H2V9.5M2 14l5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

// Légende depuis accTitle / accDescr du Mermaid :
//   flowchart LR
//       accTitle: Cycle de vie d'une image
//       accDescr: Du code source au conteneur qui tourne
function addBars() {
  const all = [...document.querySelectorAll(".diagram")];
  document.querySelectorAll("div.mermaid").forEach((d) => {
    const n = all.indexOf(d.closest(".diagram")) + 1;
    const svg = d.querySelector("svg");
    if (!svg) return;
    // Mermaid bloque le SVG à sa largeur naturelle en px. theme.css la convertit
    // en rem : le diagramme grandit avec A+ et avec le mode Projeter
    svg.style.removeProperty("max-width");
    svg.style.setProperty("--w", svg.viewBox.baseVal.width);
    // Flèche sans texte : Mermaid pose quand même une étiquette vide
    svg.querySelectorAll(".edgeLabel .labelBkg").forEach((l) => {
      if (!l.textContent.trim()) l.style.display = "none";
    });
    const title = svg.querySelector(":scope > title")?.textContent.trim();
    const desc = svg.querySelector(":scope > desc")?.textContent.trim();
    const bar = document.createElement("div");
    bar.className = "diagram-bar";
    bar.innerHTML =
      '<p class="diagram-caption"></p>' +
      '<div class="diagram-motion"></div>' +
      '<button type="button" class="zoom-btn">' + expandIcon + " Agrandir</button>";
    const cap = bar.querySelector(".diagram-caption");
    if (title || desc) {
      cap.innerHTML = '<span class="fig">Fig. ' + n + '</span> <strong></strong> <span class="desc"></span>';
      cap.querySelector("strong").textContent = title || "";
      cap.querySelector(".desc").textContent = desc || "";
    }
    motionStops.push(mountMotion(d, svg, bar.querySelector(".diagram-motion")));
    bar.querySelector(".zoom-btn").addEventListener("click", () => openZoom(d));
    d.closest("pre").append(bar);
  });
}

// Source de chaque diagramme, gardée pour re-rendre au changement de thème
const sources = new Map([...document.querySelectorAll("div.mermaid")].map((d) => [d, d.textContent]));
sources.forEach((_, d) => d.addEventListener("click", () => openZoom(d)));

async function renderAll() {
  // Mermaid mesure les étiquettes au rendu : attendre Inclusive Sans, sinon les cartes
  // sont taillées pour la police de secours et le texte déborde
  await document.fonts.ready;
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  mermaid.initialize({ ...common, themeVariables: themeVariables[theme] });
  motionStops.splice(0).forEach((stop) => stop());
  document.querySelectorAll("pre.diagram > .diagram-bar").forEach((b) => b.remove());
  sources.forEach((src, d) => {
    d.removeAttribute("data-processed");
    d.textContent = src;
  });
  // run() rejette si un seul diagramme a une erreur de syntaxe : on l'affiche
  // en console et on pose quand même les barres sous ceux qui ont été rendus.
  await mermaid.run().catch(console.warn);
  addBars();
}

renderAll();
document.addEventListener("themechange", renderAll);
