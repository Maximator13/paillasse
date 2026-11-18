// Palette unique des scènes, en deux versions : sombre (fond nuit) et claire (fond blanc).
// Toute scène pioche ici pour garder un rendu homogène. Valeurs hexadécimales uniquement : mix() de anim.ts les analyse.
// Contrastes vérifiés par scripts/contrastes.mjs : texte et couleurs vives à 4,5:1 au moins sur le fond.

const SOMBRE = {
  /** Fond de la scène. Sert aussi à « évider » un objet (cercle creux) ou à détourer un point posé sur une courbe. */
  fond: '#0b1022',
  /** Fond d'un encart ou d'un cadran d'appareil. */
  panneau: '#141a36',
  /** Lignes discrètes : graduations, séparateurs. */
  grille: '#232a4d',
  /** Teinte du verre et des liquides incolores (aplats, souvent avec une opacité). */
  verre: '#dfe6ff',
  /** Contour de la verrerie et des objets. */
  trait: '#dfe6ff',
  metal: '#7d86ad',
  /** Texte principal, et repère qui doit trancher au maximum sur le fond. */
  texte: '#eef1ff',
  /** Texte secondaire, légendes. */
  discret: '#8f97bd',
  /** Lumière et reflets (éclat, surface d'un liquide, bulle) : blanc dans les deux thèmes, à poser sur un objet coloré, jamais seul sur le fond. */
  blanc: '#ffffff',
  /** Ombre portée, toujours avec une faible opacité. */
  ombre: '#000000',
  cyan: '#4dd0e1',
  menthe: '#3ddc97',
  jaune: '#ffd166',
  orange: '#ff9f43',
  corail: '#ff6b6b',
  rose: '#ff7ac6',
  violet: '#a78bfa',
  bleu: '#5b8cff',
};

export type CleCouleur = keyof typeof SOMBRE;

const CLAIR: Record<CleCouleur, string> = {
  fond: '#ffffff',
  panneau: '#f3f5fa',
  grille: '#e1e5ef',
  verre: '#c9d3ea',
  trait: '#5d6886',
  metal: '#7a829f',
  texte: '#141a33',
  discret: '#535b7b',
  blanc: '#ffffff',
  ombre: '#29304d',
  cyan: '#00788a',
  menthe: '#0b7a4e',
  jaune: '#946b00',
  orange: '#b04f00',
  corail: '#c8302f',
  rose: '#b8327a',
  violet: '#6d48d6',
  bleu: '#2f5bd3',
};

/** Les deux palettes, pour les outils de contrôle. Les scènes lisent C. */
export const PALETTES = { clair: CLAIR, sombre: SOMBRE } as const;

const mqSombre = typeof matchMedia === 'undefined' ? null : matchMedia('(prefers-color-scheme: dark)');

/** Thème effectif : choix mémorisé (attribut data-theme de <html>), sinon réglage de l'appareil. Hors navigateur : clair. */
export function themeSombre() {
  if (typeof document === 'undefined') return false;
  const t = document.documentElement.dataset.theme;
  return t ? t === 'dark' : !!mqSombre?.matches;
}

/**
 * Couleurs des scènes : C.cyan renvoie la valeur du thème courant au moment de la lecture.
 * Lire C dans monter() ou dessiner(), jamais dans une constante de module : le lecteur ré-instancie
 * la scène au changement de thème, une valeur figée au chargement garderait l'ancien thème.
 */
export const C = new Proxy(SOMBRE, {
  get: (_, k) => (themeSombre() ? SOMBRE : CLAIR)[k as CleCouleur],
}) as Readonly<Record<CleCouleur, string>>;

export const POLICE = "'Instrument Sans Variable', system-ui, sans-serif";
export const MONO = "'JetBrains Mono Variable', ui-monospace, monospace";
/** Épaisseur de trait standard de la verrerie et des objets. */
export const TRAIT = 2.5;
