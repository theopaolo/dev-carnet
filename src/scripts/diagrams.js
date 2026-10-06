import mermaid from "mermaid";

// Rendu Mermaid + barre légende/zoom sous chaque diagramme.
// Les flowcharts sont stylés par diagrams.css. Les autres types (séquence, état,
// entités) prennent leurs couleurs des themeVariables : on re-rend au changement de thème.
const common = {
  startOnLoad: false,
  theme: "base",
  look: "classic",
  // id numérotés : avec Date.now(), deux diagrammes rendus dans la même milliseconde
  // (page d'impression d'un cours) partagent leurs id, leurs marqueurs et leurs styles
  deterministicIds: true,
  flowchart: { htmlLabels: true, padding: 16, nodeSpacing: 48, rankSpacing: 56, curve: "basis" },
  sequence: { actorMargin: 60, messageMargin: 40, mirrorActors: false },
};

function themeVariables() {
  const styles = getComputedStyle(document.documentElement);
  const color = (token) => styles.getPropertyValue(token).trim();
  return {
    fontFamily: styles.getPropertyValue("--font-sans").trim(),
    fontSize: "15px",
    background: color("--bg-canvas"),
    mainBkg: color("--node-fill"),
    primaryColor: color("--node-fill"),
    primaryTextColor: color("--node-text"),
    primaryBorderColor: color("--node-stroke"),
    secondaryColor: color("--accent-fill"),
    tertiaryColor: color("--store-fill"),
    lineColor: color("--link"),
    textColor: color("--text"),
    noteBkgColor: color("--accent-fill"),
    noteTextColor: color("--accent-text"),
    noteBorderColor: color("--accent-stroke"),
    actorBkg: color("--node-fill"),
    actorBorder: color("--node-stroke"),
    actorTextColor: color("--node-text"),
    actorLineColor: color("--cluster-stroke"),
    signalColor: color("--link"),
    signalTextColor: color("--text"),
    labelBoxBkgColor: color("--bg-canvas"),
    labelBoxBorderColor: color("--border-strong"),
    labelTextColor: color("--text"),
    loopTextColor: color("--text"),
    activationBkgColor: color("--accent-fill"),
    activationBorderColor: color("--accent-stroke"),
    attributeBackgroundColorOdd: color("--bg-surface"),
    attributeBackgroundColorEven: color("--bg-canvas"),
  };
}

// Tout de suite, avant toute attente : sinon Mermaid lance son propre rendu au
// chargement de la page et les diagrammes se rendent deux fois, mélangés
mermaid.initialize(common);
mermaid.startOnLoad = false;

const zoom = document.createElement("dialog");
zoom.className = "zoom mermaid";
zoom.dataset.processed = "true"; // ignoré par mermaid.run()
zoom.innerHTML =
  '<div class="zoom-controls cluster"></div><button type="button" class="button zoom-close">Fermer</button><div class="zoom-body"></div>';
document.body.append(zoom);
// Un clic ferme, sauf sur le diagramme au téléphone : il s'y parcourt au doigt
zoom.addEventListener("click", (event) => {
  if (event.target.closest(".zoom-controls")) return;
  if (!event.target.closest(".zoom-body svg") || !matchMedia("(max-width: 760px)").matches)
    zoom.close();
});

const motionStops = [];
let stopZoomMotion = () => {};

// Seulement sur les flowcharts marqués ```mermaid play : l'ordre des flèches y a un sens
function mountMotion(diagram, svg, controls) {
  if (!diagram.closest("pre[data-play]") || !svg.classList.contains("flowchart")) return () => {};
  const edges = [...svg.querySelectorAll(".edgePaths path.flowchart-link")];
  if (!edges.length) return () => {};
  const labels = [...svg.querySelectorAll(".edgeLabels > .edgeLabel")];
  controls.innerHTML =
    '<button type="button" class="button seq-btn" data-act="prev" aria-label="Connexion précédente">‹</button>' +
    '<button type="button" class="button seq-btn" data-act="play" aria-pressed="false">Lecture</button>' +
    '<button type="button" class="button seq-btn" data-act="next" aria-label="Connexion suivante">›</button>' +
    '<span class="seq-count" aria-live="polite"></span>';
  let currentStep = edges.length;
  let timer;
  let drawing;
  const play = controls.querySelector('[data-act="play"]');

  function clearDrawing() {
    if (!drawing) return;
    drawing.animation.cancel();
    drawing.edge.style.removeProperty("stroke-dasharray");
    drawing = null;
  }

  function show(step) {
    const forward = step > currentStep;
    clearDrawing();
    currentStep = step;
    svg.classList.add("diagram-stepping");
    edges.forEach((edge, i) => {
      edge.classList.toggle("revealed", i < step);
      edge.classList.toggle("current", i === step - 1);
    });
    labels.forEach((label, i) => label.classList.toggle("revealed", i < step));
    controls.querySelector(".seq-count").textContent = `${step} / ${edges.length}`;
    controls.querySelector('[data-act="prev"]').disabled = step === 0;
    controls.querySelector('[data-act="next"]').disabled = step === edges.length;

    if (forward && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const edge = edges[step - 1];
      const length = edge.getTotalLength();
      edge.style.setProperty("stroke-dasharray", `${length}`, "important");
      const animation = edge.animate(
        [
          { strokeDashoffset: length, opacity: 0.35 },
          { strokeDashoffset: 0, opacity: 1 },
        ],
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

  controls.addEventListener("click", (event) => {
    const act = event.target.closest("[data-act]")?.dataset.act;
    if (act === "play") {
      if (timer) return stop();
      if (currentStep === edges.length) show(0);
      play.textContent = "Pause";
      play.setAttribute("aria-pressed", "true");
      show(currentStep + 1);
      timer = setInterval(
        () => (currentStep < edges.length ? show(currentStep + 1) : stop()),
        1100,
      );
    }
    if (act === "prev" || act === "next") {
      stop();
      show(Math.max(0, Math.min(edges.length, currentStep + (act === "next" ? 1 : -1))));
    }
  });
  controls.querySelector(".seq-count").textContent = `${currentStep} / ${edges.length}`;
  controls.querySelector('[data-act="next"]').disabled = true;
  return stop;
}

function openZoom(diagram) {
  stopZoomMotion();
  const svg = diagram.querySelector("svg").cloneNode(true);
  zoom.setAttribute(
    "aria-label",
    svg.querySelector(":scope > title")?.textContent || "Diagramme agrandi",
  );
  svg.classList.remove("diagram-stepping");
  svg
    .querySelectorAll(".revealed, .current")
    .forEach((el) => el.classList.remove("revealed", "current"));
  zoom.querySelector(".zoom-body").replaceChildren(svg);
  const controls = zoom.querySelector(".zoom-controls");
  controls.replaceChildren();
  stopZoomMotion = mountMotion(diagram, svg, controls);
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
  document.querySelectorAll("div.mermaid").forEach((diagram) => {
    const figure = all.indexOf(diagram.closest(".diagram")) + 1;
    const svg = diagram.querySelector("svg");
    if (!svg) return;
    // Mermaid bloque le SVG à sa largeur naturelle en px. diagrams.css la convertit
    // en rem : le diagramme grandit avec A+ et avec le mode Focus
    svg.style.removeProperty("max-width");
    svg.style.setProperty("--w", svg.viewBox.baseVal.width);
    // Flèche sans texte : Mermaid pose quand même une étiquette vide
    svg.querySelectorAll(".edgeLabel .labelBkg").forEach((label) => {
      if (!label.textContent.trim()) label.style.display = "none";
    });
    const title = svg.querySelector(":scope > title")?.textContent.trim();
    const desc = svg.querySelector(":scope > desc")?.textContent.trim();
    const bar = document.createElement("div");
    bar.className = "diagram-bar";
    bar.innerHTML =
      '<p class="diagram-caption"></p>' +
      '<div class="diagram-motion cluster"></div>' +
      '<button type="button" class="button zoom-btn">' +
      expandIcon +
      " Agrandir</button>";
    const caption = bar.querySelector(".diagram-caption");
    if (title || desc) {
      caption.innerHTML =
        '<span class="fig">Fig. ' + figure + '</span> <strong></strong> <span class="desc"></span>';
      caption.querySelector("strong").textContent = title || "";
      caption.querySelector(".desc").textContent = desc || "";
    }
    motionStops.push(mountMotion(diagram, svg, bar.querySelector(".diagram-motion")));
    bar.querySelector(".zoom-btn").addEventListener("click", () => openZoom(diagram));
    diagram.closest("pre").append(bar);
  });
}

// Source de chaque diagramme, gardée pour re-rendre au changement de thème
const sources = new Map(
  [...document.querySelectorAll("div.mermaid")].map((diagram) => [diagram, diagram.textContent]),
);
sources.forEach((_, diagram) => diagram.addEventListener("click", () => openZoom(diagram)));

async function renderAll() {
  // Mermaid mesure les étiquettes au rendu : attendre Inclusive Sans, sinon les cartes
  // sont taillées pour la police de secours et le texte déborde
  await document.fonts.ready;
  mermaid.initialize({ ...common, themeVariables: themeVariables() });
  motionStops.splice(0).forEach((stop) => stop());
  document.querySelectorAll("pre.diagram > .diagram-bar").forEach((bar) => bar.remove());
  sources.forEach((source, diagram) => {
    diagram.removeAttribute("data-processed");
    diagram.textContent = source;
  });
  // run() rejette si un seul diagramme a une erreur de syntaxe : on l'affiche
  // en console et on pose quand même les barres sous ceux qui ont été rendus.
  await mermaid.run().catch(console.warn);
  addBars();
}

renderAll();
document.addEventListener("themechange", renderAll);
