import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absorbance, arrhenius, concentration, constanteVitesse, demiReaction, regression, releves, transmission } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const K = constanteVitesse(25, 0.05);

test('constante de vitesse à 25 °C : k0 sans catalyseur, k0 + kc.[H3O+] avec', () => {
  proche(constanteVitesse(25, 0), 5.0e-3, 1e-12);
  // 5,0e-3 + 0,10 x 0,050 = 1,0e-2 1/s
  proche(K, 1.0e-2, 1e-12);
});

test('temps de demi-réaction : ln 2 / k = 69 s avec catalyseur, 139 s sans', () => {
  proche(demiReaction(K), 69.31, 0.01);
  proche(demiReaction(constanteVitesse(25, 0)), 138.63, 0.01);
});

test('ordre 1 : concentration divisée par 2 à chaque t1/2, quelle que soit c0', () => {
  const t12 = demiReaction(K);
  assert.equal(concentration(0, 1e-5, K), 1e-5);
  for (const c0 of [5e-6, 1e-5, 2e-5]) {
    proche(concentration(t12, c0, K) / c0, 0.5, 1e-12);
    proche(concentration(3 * t12, c0, K) / c0, 0.125, 1e-12);
  }
});

test('Beer-Lambert : 1,0e-5 mol/L de bleu de méthylène donne A = 0,74, soit 18 % de lumière transmise', () => {
  proche(absorbance(1e-5), 0.74, 1e-9);
  proche(transmission(0.74), 0.182, 0.001);
  assert.equal(transmission(0), 1);
  proche(transmission(1), 0.1, 1e-12);
});

test('Arrhenius : entre 25 et 35 °C, k est multipliée par 1,92 sans catalyseur', () => {
  // exp(50000 / 8,314 x (1/298,15 - 1/308,15)) = exp(0,6546) = 1,92
  proche(constanteVitesse(35, 0) / constanteVitesse(25, 0), 1.92, 0.01);
  assert.equal(arrhenius(0.10, 40e3, 298.15), 0.10);
  assert.ok(constanteVitesse(15, 0.05) < K);
});

test('valeurs annoncées dans la fiche et réglages extrêmes des curseurs', () => {
  // 35 °C, 0,05 mol/L : k = 5,0e-3 x 1,924 + 0,10 x 1,688 x 0,05 = 1,806e-2 1/s, t1/2 = 0,693 / 1,806e-2 = 38,4 s
  proche(constanteVitesse(35, 0.05), 1.806e-2, 2e-5);
  proche(demiReaction(constanteVitesse(35, 0.05)), 38.4, 0.1);
  proche(absorbance(2e-5), 1.48, 1e-9);
  // 15 °C sans catalyseur : exp(-50000 / 8,314 x (1/288,15 - 1/298,15)) = exp(-0,700) = 0,497, t1/2 = 139 / 0,497 = 279 s
  proche(demiReaction(constanteVitesse(15, 0)), 279, 1);
  // 40 °C, 0,10 mol/L : 5,0e-3 x 2,627 + 0,10 x 2,166 x 0,10 = 3,48e-2 1/s, t1/2 = 20 s
  proche(demiReaction(constanteVitesse(40, 0.1)), 19.9, 0.1);
});

test('catalyseur : k croît linéairement avec [H3O+], par un chemin moins sensible à la température', () => {
  const k0 = constanteVitesse(25, 0);
  proche(constanteVitesse(25, 0.25) - k0, 5 * (K - k0), 1e-12);
  // Chemin catalysé seul : exp(40000 / 8,314 x (1/298,15 - 1/308,15)) = exp(0,5237) = 1,69
  proche((constanteVitesse(35, 0.25) - constanteVitesse(35, 0)) / (constanteVitesse(25, 0.25) - k0), 1.69, 0.01);
});

test('ln A = f(t) est une droite de pente -k et d\'ordonnée ln A0', () => {
  const pts = releves(1e-5, K, 300, 10);
  assert.equal(pts.length, 31);
  assert.deepEqual(pts[0], [0, absorbance(1e-5)]);
  const { pente, ordonnee } = regression(pts.map(([t, a]) => [t, Math.log(a)]));
  proche(pente, -K, 1e-9);
  proche(ordonnee, Math.log(0.74), 1e-9);
});
