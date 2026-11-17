// Vérifie les contrastes WCAG des jetons de couleur (clair et sombre) et de la scène des TP.
// Usage : node scripts/contrastes.mjs   (sort en code 1 si un couple est sous son seuil)
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/global.css', 'utf8');
const jetons = (bloc) => Object.fromEntries([...bloc.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)].map((m) => [m[1], m[2]]));
const clair = jetons(css.slice(css.indexOf(':root'), css.indexOf('@media (prefers-color-scheme: dark)')));
const sombre = { ...clair, ...jetons(css.slice(css.indexOf('@media (prefers-color-scheme: dark)'), css.indexOf('*, *::before'))) };

const lum = (hex) => {
  const h = hex.replace('#', ''), f = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [texte, fond, seuil, usage]. 4,5 pour le texte courant, 3 pour le grand texte et les composants d'interface.
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
];
const scene = [
  ['#eef1ff', '#0b1022', 4.5, 'scène : texte'], ['#9aa2c8', '#0b1022', 4.5, 'scène : texte secondaire'], ['#cdd3f2', '#0b1022', 4.5, 'scène : texte d\'étape'],
  ['#4dd0e1', '#0b1022', 4.5, 'scène : valeur de curseur'], ['#8f97bd', '#0b1022', 4.5, 'scène : graduations'], ['#8f97bd', '#141a36', 4.5, 'scène : titre d\'appareil'],
  ['#0b1022', '#eef1ff', 4.5, 'scène : bouton lecture'], ['#232a4d', '#0b1022', 1.2, 'scène : quadrillage décoratif'],
];
let echecs = 0;
for (const [nom, liste] of [['CLAIR', couples(clair)], ['SOMBRE', couples(sombre)], ['SCÈNE', scene]]) {
  console.log(nom);
  for (const [a, b, seuil, usage] of liste) {
    const r = ratio(a, b), ok = r >= seuil;
    if (!ok) echecs++;
    console.log(`  ${ok ? 'ok  ' : 'ÉCHEC'} ${r.toFixed(2).padStart(5)} (seuil ${seuil})  ${usage}  ${a} sur ${b}`);
  }
}
process.exit(echecs ? 1 : 0);
