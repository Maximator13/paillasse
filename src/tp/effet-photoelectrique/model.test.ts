import { test } from 'node:test';
import assert from 'node:assert/strict';
import { courant, droite, ecMax, energiePhoton, frequenceSeuil, longueurOnde, metal, vitesseMax } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('photon vert de 500 nm : nu = 6,00e14 Hz, E = 2,48 eV', () => {
  proche(longueurOnde(6.0e14) * 1e9, 500, 0.5);
  proche(energiePhoton(6.0e14), 2.48, 0.005);
});

test('fréquence seuil : césium dans le visible, zinc dans l\'ultraviolet', () => {
  proche(frequenceSeuil(2.1) / 1e14, 5.08, 0.01);
  proche(frequenceSeuil(4.3) / 1e14, 10.4, 0.01);
  proche(longueurOnde(frequenceSeuil(4.3)) * 1e9, 288, 1);
});

test('sous le seuil : ni énergie cinétique ni courant, quelle que soit l\'intensité', () => {
  assert.equal(ecMax(4.3e14, 2.1), 0);
  assert.equal(courant(5e15, 4.3e14, 2.1), 0);
  assert.equal(courant(5e18, 4.3e14, 2.1), 0);
});

test('relation d\'Einstein : Ec max = h.nu - W', () => {
  proche(ecMax(7.5e14, 2.1), 1.0, 0.005);
  proche(ecMax(1.2e15, 4.3), 0.66, 0.005);
  // Réglages par défaut de l'animation, valeurs de la fiche : potassium éclairé à 7,5e14 Hz.
  proche(energiePhoton(7.5e14), 3.10, 0.005);
  proche(ecMax(7.5e14, 2.3), 0.80, 0.005);
});

test('vitesse maximale pour Ec max = 1,00 eV : 5,94e5 m/s', () => {
  proche(vitesseMax(7.5e14, 2.1) / 1e5, 5.94, 0.02);
});

test('le courant suit le débit de photons, pas la fréquence', () => {
  proche(courant(5e15, 7.5e14, 2.1) * 1e6, 0.80, 0.002);
  assert.equal(courant(5e15, 1.1e15, 2.1), courant(5e15, 7.5e14, 2.1));
  proche(courant(2.5e15, 7.5e14, 2.1) / courant(5e15, 7.5e14, 2.1), 0.5, 1e-12);
  // Fiche, question 3 : 20 % puis 100 % de 5e15 photons par seconde, et 60 % par défaut.
  proche(courant(0.2 * 5e15, 7.5e14, 2.3) * 1e6, 0.16, 0.002);
  proche(courant(0.6 * 5e15, 7.5e14, 2.3) * 1e6, 0.48, 0.002);
});

test('la droite Ec max = f(nu) redonne h, nu0 et W', () => {
  const pts = [6, 7, 8, 9, 10, 11].map((f) => [f * 1e14, ecMax(f * 1e14, 2.3)] as [number, number]);
  const r = droite(pts);
  proche(r.h / 1e-34, 6.626, 0.001);
  proche(r.nu0 / 1e14, 5.56, 0.01);
  proche(r.w, 2.3, 1e-6);
});

test('identification du métal par son travail d\'extraction', () => {
  assert.equal(metal(2.1), 'césium');
  assert.equal(metal(4.3), 'zinc');
  assert.equal(metal(3.2), null);
});
