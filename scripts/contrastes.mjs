// Vérifie les contrastes WCAG des jetons de couleur (clair et sombre) et des deux palettes de scène des TP.
// Usage : node scripts/contrastes.mjs   (sort en code 1 si un couple est sous son seuil)
import { readFileSync } from 'node:fs';
import { PALETTES } from '../src/lib/palette.ts';

// Jetons écrits --nom: light-dark(#clair, #sombre) ; les valeurs non hexadécimales (transparences) sont ignorées.
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const bloc = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')));
const paires = [...bloc.matchAll(/--([\w-]+):\s*light-dark\(\s*(#[0-9a-fA-F]{3,8})\s*,\s*(#[0-9a-fA-F]{3,8})\s*\)/g)];
const clair = Object.fromEntries(paires.map((m) => [m[1], m[2]]));
const sombre = Object.fromEntries(paires.map((m) => [m[1], m[3]]));

const lum = (hex) => {
  const h = hex.replace('#', ''), f = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [texte, fond, seuil, usage]. 4,5 pour le texte courant, 3 pour le grand texte, les traits et les composants d'interface.
const couples = (j) => [
  [j.encre, j.fond, 4.5, 'texte sur fond'], [j.encre, j.surface, 4.5, 'texte sur carte'],
  [j.doux, j.fond, 4.5, 'texte secondaire sur fond'], [j.doux, j.surface, 4.5, 'texte secondaire sur carte'],
  [j.accent, j.fond, 4.5, 'lien sur fond'], [j.accent, j.surface, 4.5, 'lien sur carte'],
  [j['accent-encre'], j.accent, 4.5, 'bouton principal'], [j.fond, j.encre, 4.5, 'onglet actif'],
  ...['matiere', 'mouvement', 'energie', 'ondes'].flatMap((t) => [
    [j[`t-${t}`], j.fond, 4.5, `pastille ${t} sur fond`], [j[`t-${t}`], j.surface, 4.5, `pastille ${t} sur carte`],
    [j.fond, j[`t-${t}`], 4.5, `filtre actif ${t}`],
  ]),
  [j.ligne, j.fond, 1.2, 'bordure décorative (information non portée par la bordure)'],
  // Habillage du lecteur de TP.
  [j['scene-texte'], j.scene, 4.5, 'lecteur : texte'], [j['scene-doux'], j.scene, 4.5, 'lecteur : texte secondaire'],
  [j['scene-etape'], j.scene, 4.5, 'lecteur : texte d\'étape'], [j['scene-accent'], j.scene, 4.5, 'lecteur : valeur de curseur'],
  [j['scene-erreur'], j.scene, 4.5, 'lecteur : message d\'erreur'], [j.scene, j['scene-texte'], 4.5, 'lecteur : bouton lecture'],
];
const VIVES = ['cyan', 'menthe', 'jaune', 'orange', 'corail', 'rose', 'violet', 'bleu'];
// Palette des scènes : les couleurs vives servent aussi d'étiquettes, d'où 4,5 sur le fond ; 3 sur un panneau (traits, encadrés).
const scene = (c) => [
  [c.texte, c.fond, 4.5, 'texte'], [c.texte, c.panneau, 4.5, 'texte sur panneau'],
  [c.discret, c.fond, 4.5, 'texte discret'], [c.discret, c.panneau, 4.5, 'texte discret sur panneau'],
  [c.trait, c.fond, 3, 'contour de verrerie'], [c.metal, c.fond, 3, 'métal'],
  ...VIVES.flatMap((k) => [[c[k], c.fond, 4.5, `${k} sur fond`], [c[k], c.panneau, 3, `${k} sur panneau`]]),
];
let echecs = 0;
const listes = [
  ['SITE CLAIR', couples(clair)], ['SITE SOMBRE', couples(sombre)],
  ['SCÈNE CLAIRE (src/lib/palette.ts)', scene(PALETTES.clair)], ['SCÈNE SOMBRE (src/lib/palette.ts)', scene(PALETTES.sombre)],
];
for (const [nom, liste] of listes) {
  console.log(nom);
  for (const [a, b, seuil, usage] of liste) {
    if (!a || !b) { echecs++; console.log(`  ÉCHEC jeton absent : ${usage}`); continue; }
    const r = ratio(a, b), ok = r >= seuil;
    if (!ok) echecs++;
    console.log(`  ${ok ? 'ok  ' : 'ÉCHEC'} ${r.toFixed(2).padStart(5)} (seuil ${seuil})  ${usage}  ${a} sur ${b}`);
  }
}
process.exit(echecs ? 1 : 0);
