import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EPSILON_MAX, absorbance, concentration, dilution, epsilon, gamme, pente, transmittance } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('Beer-Lambert : 6,0 µmol/L dans une cuve de 1,0 cm à 640 nm', () => {
  proche(absorbance(6e-6, EPSILON_MAX, 1), 0.636, 1e-9);
  assert.equal(absorbance(0, EPSILON_MAX, 1), 0);
});

test('A est proportionnelle à la concentration et à l\'épaisseur de cuve', () => {
  const a = absorbance(4e-6, EPSILON_MAX, 1);
  proche(absorbance(8e-6, EPSILON_MAX, 1), 2 * a, 1e-12);
  proche(absorbance(4e-6, EPSILON_MAX, 0.5), a / 2, 1e-12);
});

test('epsilon est maximal à 640 nm et divisé par deux à une demi-largeur (29,4 nm)', () => {
  assert.equal(epsilon(640), 1.06e5);
  proche(epsilon(640 + 29.43) / EPSILON_MAX, 0.5, 1e-3);
  proche(epsilon(600), epsilon(680), 1e-6);
  assert.ok(epsilon(580) < 0.1 * EPSILON_MAX);
  // À 600 nm (1,6 écart type) : exp(-1,28) = 0,2780, soit 2,95e4 L/mol/cm.
  proche(epsilon(600), 2.947e4, 10);
});

test('transmittance : A = 1 laisse passer 10 % de la lumière', () => {
  assert.equal(transmittance(0), 1);
  proche(transmittance(1), 0.1, 1e-12);
  proche(transmittance(0.301), 0.5, 1e-3);
  // Solution X par défaut : A = 0,678 laisse passer 21 % de la lumière.
  proche(transmittance(0.678), 0.21, 1e-3);
});

test('dilution : 4,0 mL de solution mère à 50 µmol/L dans une fiole de 50,0 mL', () => {
  proche(dilution(50, 4, 50), 4, 1e-12);
  proche(dilution(50, 10, 50), 10, 1e-12);
});

test('pente de la droite d\'étalonnage par les moindres carrés', () => {
  // Points parfaitement alignés : on retrouve k = epsilon.l.
  const gamme = [2, 4, 6, 8, 10].map((c) => [c, absorbance(c * 1e-6, EPSILON_MAX, 1)] as [number, number]);
  proche(pente(gamme), 0.106, 1e-12);
  // Points dispersés, calcul à la main : somme(xy) = 14,5 et somme(x²) = 14.
  proche(pente([[1, 1.1], [2, 1.9], [3, 3.2]]), 14.5 / 14, 1e-12);
});

test('gamme étalon : points dispersés de quelques pour cent, pente ajustée inchangée', () => {
  const pts = gamme(1);
  // Étalon à 2,0 µmol/L préparé 5 % trop concentré : A = 2,0e-6 x 1,05 x 1,06e5.
  proche(pts[0][1], 0.2226, 1e-9);
  proche(pts[4][1], 1.070176, 1e-9);
  pts.forEach(([c, a]) => assert.ok(Math.abs(a / absorbance(c, EPSILON_MAX, 1) - 1) <= 0.05 + 1e-9));
  proche(pente(pts) / EPSILON_MAX, 1, 1e-9);
  proche(pente(gamme(0.5)) / EPSILON_MAX, 0.5, 1e-9);
});

test('concentration de l\'inconnue : C = A / k', () => {
  proche(concentration(0.678, 1.06e5), 6.396e-6, 1e-9);
  proche(concentration(absorbance(6.4e-6, EPSILON_MAX, 1), EPSILON_MAX * 1), 6.4e-6, 1e-15);
});
