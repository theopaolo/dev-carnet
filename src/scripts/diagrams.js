import { render } from "pele";

// Rendu Pele + barre légende/zoom sous chaque diagramme.
// Les couleurs viennent des variables --pele-* de diagrams.css : le SVG suit
// le changement de thème et l'impression sans nouveau rendu.

const zoom = document.createElement("dialog");
zoom.className = "zoom";
zoom.innerHTML =
  '<div class="zoom-controls cluster"></div><button type="button" class="button zoom-close">Fermer</button><div class="zoom-body"></div>';
document.body.append(zoom);
// Un clic ferme, sauf sur le diagramme au téléphone : il s'y parcourt au doigt
zoom.addEventListener("click", (event) => {
  if (event.target.closest(".zoom-controls")) return;
  if (!event.target.closest(".zoom-body svg") || !matchMedia("(max-width: 760px)").matches)
    zoom.close();
});

let stopZoomMotion = () => {};

// Seulement sur les flowcharts marqués ```mermaid play : l'ordre des flèches y a un sens
function mountMotion(diagram, svg, controls) {
  if (!diagram.closest("pre[data-play]") || !svg.classList.contains("pele-flowchart"))
    return () => {};
  const edges = [...svg.querySelectorAll(".pele-edge")];
  if (!edges.length) return () => {};
  // Pele ne pose une étiquette que sur les flèches qui ont un texte, avec le data-id de la flèche
  const labels = new Map(
    [...svg.querySelectorAll(".pele-edge-label")].map((label) => [label.dataset.id, label]),
  );
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
      labels.get(edge.dataset.id)?.classList.toggle("revealed", i < step);
    });
    controls.querySelector(".seq-count").textContent = `${step} / ${edges.length}`;
    controls.querySelector('[data-act="prev"]').disabled = step === 0;
    controls.querySelector('[data-act="next"]').disabled = step === edges.length;

    if (forward && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Le trait, sans la pointe .pele-marker
      const edge = edges[step - 1].querySelector("path:not(.pele-marker)");
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
    // Pele limite le SVG à 100 % de la colonne. diagrams.css convertit sa largeur
    // naturelle en rem : le diagramme grandit avec A+ et avec le mode Focus
    svg.style.removeProperty("max-width");
    svg.style.setProperty("--w", svg.viewBox.baseVal.width);
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
    mountMotion(diagram, svg, bar.querySelector(".diagram-motion"));
    bar.querySelector(".zoom-btn").addEventListener("click", () => openZoom(diagram));
    diagram.closest("pre").append(bar);
  });
}

async function renderAll() {
  // Pele mesure les étiquettes au rendu : attendre Inclusive Sans, sinon les cartes
  // sont taillées pour la police de secours et le texte déborde
  await document.fonts.ready;
  const styles = getComputedStyle(document.documentElement);
  const options = {
    fontFamily: styles.getPropertyValue("--font-sans").trim(),
    fontFamilyMono: styles.getPropertyValue("--font-mono").trim(),
    fontSize: 15,
  };
  document.querySelectorAll("div.mermaid").forEach((diagram, i) => {
    try {
      // idPrefix : title et desc ont un id unique sur la page d'impression d'un cours
      diagram.innerHTML = render(diagram.textContent, { ...options, idPrefix: `fig${i}` }).svg;
    } catch (error) {
      // Erreur de syntaxe : la source reste affichée, le détail part en console
      console.warn(error);
      return;
    }
    diagram.addEventListener("click", () => openZoom(diagram));
  });
  addBars();
}

renderAll();
