import { test } from 'node:test';
import assert from 'node:assert/strict';
import { angle, couleurLaser, intensite, largeurTache, longueurOnde, pente, serie } from './model.ts';

// Laser rouge 650 nm, fente de 100 µm, écran à 2,00 m.
const LAMBDA = 650e-9, A = 100e-6, D = 2;
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('angle caractéristique : theta = lambda / a', () => proche(angle(LAMBDA, A), 6.5e-3, 1e-12));

test('largeur de la tache centrale : L = 2.lambda.D / a', () => {
  proche(largeurTache(LAMBDA, A, D), 26e-3, 1e-12);
  proche(largeurTache(LAMBDA, A / 2, D), 52e-3, 1e-12); // fente deux fois plus fine, tache deux fois plus large
  proche(largeurTache(532e-9, 40e-6, 1.5), 39.9e-3, 1e-9);
  proche(largeurTache(450e-9, A, D), 18e-3, 1e-12); // laser bleu : tache plus étroite
  proche(largeurTache(LAMBDA, A, 2.5), 32.5e-3, 1e-12); // écran reculé à 2,50 m
});

test('profil en sinus cardinal au carré : maximum au centre, figure symétrique', () => {
  assert.equal(intensite(0, LAMBDA, A, D), 1);
  proche(intensite(-7e-3, LAMBDA, A, D), intensite(7e-3, LAMBDA, A, D), 1e-12);
});

test('extinctions en x = k.lambda.D / a : la tache centrale a bien pour largeur L', () => {
  const L = largeurTache(LAMBDA, A, D);
  for (const k of [0.5, 1, 1.5, -0.5]) proche(intensite(k * L, LAMBDA, A, D), 0, 1e-12);
});

test('première tache secondaire : 4,7 % de l\'intensité centrale', () => {
  // Maximum secondaire du sinus cardinal au carré pour u = 1,4303.pi
  proche(intensite((1.4303 * LAMBDA * D) / A, LAMBDA, A, D), 0.0472, 2e-4);
});

test('pente d\'une droite passant par l\'origine', () => {
  proche(pente([[1, 2.6], [2, 5.2], [4, 10.4]]), 2.6, 1e-12);
  proche(pente([[1, 1], [2, 3]]), 1.4, 1e-12); // (1x1 + 2x3) / (1 + 4)
});

test('la série de mesures redonne la longueur d\'onde à mieux que 1 %', () => {
  const pts = serie(LAMBDA, D, [200e-6, 120e-6, 100e-6, 70e-6, 50e-6, 40e-6]);
  proche(pts[0][0], 5000, 1e-6);
  proche(pts[0][1], 13e-3, 1e-12);
  proche(pts[1][1], 22e-3, 1e-12); // 21,7 mm lus 22 mm à la règle
  const lambda = longueurOnde(pente(pts), D);
  assert.ok(Math.abs(lambda - LAMBDA) / LAMBDA < 0.01, `lambda = ${lambda}`);
});

test('couleur du faisceau selon la longueur d\'onde', () => {
  assert.deepEqual(couleurLaser(650), [255, 0, 0]);
  assert.deepEqual(couleurLaser(450), [0, 70, 255]);
  const [r, v, b] = couleurLaser(532);
  assert.ok(v === 255 && r < 128 && b === 0);
});
