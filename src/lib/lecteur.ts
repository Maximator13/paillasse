// Lecteur de TP : étapes guidées, lecture/pause, barre de progression, curseurs de paramètres.
import { L, clamp, fmt } from './anim';
import { creerGraphique } from './graphique';
import type { Mesure, Scene } from './scene';

const chargeurs = import.meta.glob<{ default: Scene }>('../tp/*/scene.ts');

export const slugsScenes = () => Object.keys(chargeurs).map((k) => k.split('/')[2]);

export async function chargerScene(slug: string): Promise<Scene> {
  const f = chargeurs[`../tp/${slug}/scene.ts`];
  if (!f) throw new Error(L(`Scène introuvable : ${slug}`, `Scene not found: ${slug}`));
  return (await f()).default;
}

/** Monte une scène dans ses SVG et renvoie sa fonction de dessin. */
export function instancier(scene: Scene, svgScene: SVGSVGElement, svgGraph: SVGSVGElement | null) {
  svgScene.replaceChildren();
  svgScene.setAttribute('viewBox', '0 0 640 480');
  const graphique = scene.graphique && svgGraph ? creerGraphique(svgGraph, scene.graphique) : null;
  return scene.monter({ scene: svgScene, graphique });
}

export const valeursDefaut = (scene: Scene) =>
  Object.fromEntries((scene.parametres ?? []).map((p) => [p.id, p.valeur]));

const decimalesDe = (pas: number) => Math.max(0, -Math.floor(Math.log10(pas) + 1e-9));

async function initLecteur(root: HTMLElement) {
  const mode = root.dataset.mode ?? 'complet';
  const scene = await chargerScene(root.dataset.slug!);
  const q = <T extends Element>(s: string) => root.querySelector<T>(s);
  const svgGraph = q<SVGSVGElement>('[data-graph]');
  if (!scene.graphique) {
    svgGraph?.remove();
    root.classList.add('sans-graph');
  }
  const dessiner = instancier(scene, q<SVGSVGElement>('[data-scene]')!, scene.graphique ? svgGraph : null);
  const p: Record<string, number> = valeursDefaut(scene);
  const n = scene.etapes.length;

  if (mode === 'affiche') {
    const a = scene.affiche ?? { etape: n - 1, t: 1 };
    dessiner({ etape: a.etape, t: a.t, T: 2, p });
    root.dataset.pret = '1';
    return;
  }

  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let etape = 0, t = 0, T = 0, attente = 0;
  let joue = false, gele = reduit, auto = mode === 'demo', sale = true, visible = false, demarre = false;

  // Capture déterministe : ?etape=3&t=0.5 fige l'image (etape commence à 1). Tout autre paramètre d'URL portant l'id d'un curseur fixe sa valeur.
  const url = new URLSearchParams(location.search);
  const fige = mode === 'complet' && url.has('etape');
  if (mode === 'complet') {
    for (const k in p) if (url.has(k)) p[k] = Number(url.get(k));
  }
  if (fige) {
    etape = clamp(Number(url.get('etape')) - 1, 0, n - 1);
    t = clamp(Number(url.get('t') ?? 1));
    T = 2;
    gele = true;
    demarre = true;
  }

  const elNum = q<HTMLElement>('[data-num]'), elTitre = q<HTMLElement>('[data-titre]'), elTexte = q<HTMLElement>('[data-texte]');
  const elMesures = q<HTMLElement>('[data-mesures]'), elBarre = q<HTMLElement>('[data-barre]');
  const bJouer = q<HTMLButtonElement>('[data-jouer]'), bSuiv = q<HTMLButtonElement>('[data-suiv]');
  const segments: HTMLElement[] = [];
  if (elBarre) {
    elBarre.setAttribute('aria-valuemax', String(n));
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'seg';
      s.appendChild(document.createElement('i'));
      elBarre.appendChild(s);
      segments.push(s);
    }
  }

  let etapeAffichee = -1;
  function majInterface(mesures: Mesure[] | void) {
    if (etape !== etapeAffichee) {
      etapeAffichee = etape;
      const e = scene.etapes[etape];
      const position = L(`Étape ${etape + 1} sur ${n}`, `Step ${etape + 1} of ${n}`);
      if (elNum) elNum.textContent = position;
      if (elTitre) elTitre.textContent = e.titre;
      if (elTexte) elTexte.innerHTML = e.texte;
      elBarre?.setAttribute('aria-valuenow', String(etape + 1));
      elBarre?.setAttribute('aria-valuetext', `${position}${L(' : ', ': ')}${e.titre}`);
    }
    segments.forEach((s, i) => {
      (s.firstChild as HTMLElement).style.width = `${(i < etape ? 1 : i > etape ? 0 : t) * 100}%`;
    });
    root.classList.toggle('en-lecture', joue);
    const fini = t >= 1 && !joue;
    bSuiv?.classList.toggle('appel', fini && etape < n - 1);
    if (bJouer) bJouer.setAttribute('aria-label', joue ? 'Pause' : fini && etape === n - 1 ? L('Rejouer depuis le début', 'Replay from the start') : L('Lecture', 'Play'));
    if (elMesures && mesures) {
      while (elMesures.children.length > mesures.length) elMesures.lastChild!.remove();
      mesures.forEach((m, i) => {
        let d = elMesures.children[i] as HTMLElement | undefined;
        if (!d) {
          d = document.createElement('div');
          d.append(document.createElement('dt'), document.createElement('dd'));
          elMesures.appendChild(d);
        }
        if (d.children[0].textContent !== m.label) d.children[0].textContent = m.label;
        if (d.children[1].textContent !== m.valeur) d.children[1].textContent = m.valeur;
      });
    }
  }

  const rendu = () => {
    majInterface(dessiner({ etape, t, T, p }));
    sale = false;
    root.dataset.pret = '1';
  };
  const aller = (i: number, tt = 0, lecture = true) => {
    etape = clamp(i, 0, n - 1);
    t = tt;
    attente = 0;
    joue = lecture;
    gele = !lecture;
    sale = true;
  };

  q('[data-prec]')?.addEventListener('click', () => aller(t > 0.3 || etape === 0 ? etape : etape - 1));
  bSuiv?.addEventListener('click', () => (etape < n - 1 ? aller(etape + 1) : aller(etape, 1, false)));
  q('[data-rejouer]')?.addEventListener('click', () => aller(0));
  bJouer?.addEventListener('click', () => {
    if (joue) { joue = false; gele = true; sale = true; }
    else if (t >= 1) aller(etape < n - 1 ? etape + 1 : 0);
    else { joue = true; gele = false; }
  });
  const cAuto = q<HTMLInputElement>('[data-auto]');
  cAuto?.addEventListener('change', () => { auto = cAuto.checked; });

  if (elBarre) {
    const viser = (ev: PointerEvent) => {
      const r = elBarre.getBoundingClientRect();
      const f = clamp((ev.clientX - r.left) / r.width, 0, 0.9999) * n;
      aller(Math.floor(f), f - Math.floor(f), false);
    };
    elBarre.addEventListener('pointerdown', (ev) => { elBarre.setPointerCapture(ev.pointerId); viser(ev); });
    elBarre.addEventListener('pointermove', (ev) => { if (elBarre.hasPointerCapture(ev.pointerId)) viser(ev); });
    elBarre.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') aller(etape + 1);
      else if (ev.key === 'ArrowLeft') aller(etape - 1);
      else return;
      ev.preventDefault();
    });
  }

  const form = q<HTMLElement>('[data-params]');
  if (form && scene.parametres?.length) {
    for (const prm of scene.parametres) {
      const dec = prm.decimales ?? decimalesDe(prm.pas);
      const id = `${root.dataset.slug}-${prm.id}`;
      const ligne = document.createElement('div');
      ligne.className = 'param';
      ligne.innerHTML = `<label for="${id}">${prm.label}</label><output for="${id}"></output><input type="range" id="${id}" min="${prm.min}" max="${prm.max}" step="${prm.pas}" value="${p[prm.id]}">`;
      const out = ligne.querySelector('output')!, input = ligne.querySelector('input')!;
      const ecrire = () => { out.textContent = `${fmt(p[prm.id], dec)}${prm.unite ? ' ' + prm.unite : ''}`; };
      input.addEventListener('input', () => { p[prm.id] = Number(input.value); ecrire(); sale = true; });
      ecrire();
      form.appendChild(ligne);
    }
  } else {
    form?.closest('[data-bloc-params]')?.remove();
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !demarre && !reduit) { demarre = true; joue = true; }
  }, { threshold: 0.35 }).observe(root);

  let dernier = performance.now();
  function boucle(maintenant: number) {
    const dt = Math.min(0.1, (maintenant - dernier) / 1000);
    dernier = maintenant;
    if (visible || sale) {
      if (joue) {
        if (t < 1) t = Math.min(1, t + dt / scene.etapes[etape].duree);
        else if (auto) {
          attente += dt;
          if (attente > 1.4) {
            if (etape < n - 1) aller(etape + 1);
            else if (mode === 'demo') aller(0);
            else joue = false;
          }
        } else joue = false;
      }
      if (!gele) T += dt;
      if (!gele || sale) rendu();
    }
    requestAnimationFrame(boucle);
  }
  rendu();
  requestAnimationFrame(boucle);
}

/** Initialise tous les lecteurs de la page, chacun à son entrée dans l'écran. */
export function initTous() {
  const io = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      initLecteur(e.target as HTMLElement).catch((err) => {
        console.error(err);
        (e.target as HTMLElement).dataset.erreur = String(err);
      });
    }
  }, { rootMargin: '300px' });
  document.querySelectorAll<HTMLElement>('[data-lecteur]:not([data-vu])').forEach((r) => {
    r.dataset.vu = '1';
    io.observe(r);
  });
}
