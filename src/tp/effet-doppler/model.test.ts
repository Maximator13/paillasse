import { test } from 'node:test';
import assert from 'node:assert/strict';
import { courbePassage, decalageApproche, frequenceApproche, frequenceEloignement, frequencePercue, frontsOnde, longueurOnde, vitesseSource } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const passage = { fE: 680, v: 25, d: 3 };

test('source immobile : aucune modification de la fréquence', () => {
  assert.equal(frequenceApproche(680, 0), 680);
  assert.equal(frequenceEloignement(680, 0), 680);
  assert.equal(frequencePercue(-1, { ...passage, v: 0 }), 680);
});

test('680 Hz à 25 m/s : 734 Hz à l\'approche, 633 Hz à l\'éloignement', () => {
  proche(frequenceApproche(680, 25), (680 * 340) / 315, 1e-9);
  proche(frequenceApproche(680, 25), 733.97, 0.01);
  proche(frequenceEloignement(680, 25), 633.42, 0.01);
});

test('décalage approché fE.v/c, valable pour v petit devant c', () => {
  assert.equal(decalageApproche(680, 25), 50);
  // v = 1 % de c : l'écart entre décalage exact et approché est de l'ordre de 1 %.
  const exact = frequenceApproche(680, 3.4) - 680;
  proche(exact / decalageApproche(680, 3.4), 1, 0.011);
});

test('la vitesse se retrouve à partir des deux fréquences perçues', () => {
  proche(vitesseSource(frequenceApproche(680, 25), frequenceEloignement(680, 25)), 25, 1e-9);
  proche(vitesseSource(734, 633), 25.12, 0.01);
  // Réglages par défaut de l'animation (micro à 10 m, relevés à -2 s et +2 s).
  // Référence calculée à la main : à t = -2 s, le son reçu a été émis à te = -2,16 s, source à 54,0 m en amont,
  // distance 54,9 m, vitesse radiale -24,6 m/s, d'où 680/(1 - 24,6/340) = 733 Hz. De même 634 Hz à t = +2 s.
  const reglages = { fE: 680, v: 25, d: 10 };
  const fA = frequencePercue(-2, reglages), fB = frequencePercue(2, reglages);
  proche(fA, 733.0, 0.2);
  proche(fB, 634.4, 0.2);
  proche(vitesseSource(fA, fB), 24.5, 0.05);
  proche(vitesseSource(733, 634), 24.62, 0.01);
});

test('longueur d\'onde : c/f au repos, raccourcie devant, allongée derrière', () => {
  proche(longueurOnde(680), 0.5, 1e-12);
  proche(longueurOnde(680, 25, 1), 315 / 680, 1e-12);
  proche(longueurOnde(680, 25, -1), 365 / 680, 1e-12);
});

test('passage devant le micro : paliers, fréquence émise au plus près, décroissance', () => {
  proche(frequencePercue(-60, passage), frequenceApproche(680, 25), 0.01);
  proche(frequencePercue(60, passage), frequenceEloignement(680, 25), 0.01);
  // Le son émis au plus près (vitesse radiale nulle) arrive à t = d/c sans décalage.
  proche(frequencePercue(3 / 340, passage), 680, 1e-6);
  const pts = courbePassage(passage, -2, 2);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i][1] <= pts[i - 1][1]);
});

test('micro sur la trajectoire : bascule franche au passage', () => {
  const p = { fE: 680, v: 25, d: 0 };
  proche(frequencePercue(-0.5, p), frequenceApproche(680, 25), 1e-9);
  proche(frequencePercue(0.5, p), frequenceEloignement(680, 25), 1e-9);
  assert.equal(frequencePercue(0, p), 680);
});

test('fronts d\'onde : cercles resserrés de (c - v).T devant, écartés de (c + v).T derrière', () => {
  const o = { v: 25, c: 340, periode: 1 / 680, rayonMax: 5 };
  const [f0, f1, f2] = frontsOnde(0.01, o);
  proche(f0.rayon, 340 * f0.age, 1e-12);
  proche(f0.x, 25 * (0.01 - f0.age), 1e-12);
  proche(f1.x + f1.rayon - (f0.x + f0.rayon), 315 / 680, 1e-9);
  proche(f1.x - f1.rayon - (f2.x - f2.rayon), 365 / 680, 1e-9);
  // Source immobile : cercles concentriques. Émission commencée à t = 0 : 4 fronts à t = 3,5 périodes.
  assert.ok(frontsOnde(0.01, { ...o, v: 0 }).every((f) => f.x === 0));
  assert.equal(frontsOnde(3.5 / 680, { ...o, depuis: 0 }).length, 4);
});
