import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  descentePour, flotte, forceDynamometre, fractionImmergee, hauteurImmergee, monteeNiveau, poids, poussee, pression, resultantePression,
} from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const ALU = 2700, EAU = 1000, V = 40e-6; // cylindre d'aluminium de 40 cm³

test('poids d\'un cylindre d\'aluminium de 40 cm³ (108 g)', () => proche(poids(ALU, V), 1.059, 0.001));

test('poussée dans l\'eau : poids de 40 cm³ d\'eau, proportionnelle à rho et au volume immergé', () => {
  proche(poussee(EAU, V), 0.392, 0.001);
  proche(poussee(1260, V), 1.26 * poussee(EAU, V), 1e-12);
  proche(poussee(EAU, V / 2), poussee(EAU, V) / 2, 1e-12);
});

test('dynamomètre : P dans l\'air, P - PA immergé, jamais négatif', () => {
  assert.equal(forceDynamometre(ALU, EAU, V, 0), poids(ALU, V));
  proche(forceDynamometre(ALU, EAU, V, V), 0.667, 0.001);
  assert.equal(forceDynamometre(600, EAU, V, V), 0);
});

test('flottaison : le bois (600 kg/m³) flotte dans l\'eau, immergé à 60 %, et alors PA = P', () => {
  assert.equal(flotte(600, EAU), true);
  assert.equal(flotte(ALU, EAU), false);
  proche(fractionImmergee(600, EAU), 0.6, 1e-12);
  assert.equal(fractionImmergee(ALU, EAU), 1);
  proche(poussee(EAU, V * fractionImmergee(600, EAU)), poids(600, V), 1e-12);
});

test('statique des fluides : +981 Pa à 10 cm sous l\'eau, pression atmosphérique en surface', () => {
  proche(pression(EAU, 0.1), 101325 + 981, 1e-6);
  assert.equal(pression(EAU, -0.02), 101325);
});

test('la résultante des forces pressantes vaut rho.V.g, quelle que soit la profondeur', () => {
  const s = 1e-3, h = 0.04; // V = s.h = 40 cm³
  proche(resultantePression(EAU, s, 0.01, 0.01 + h), poussee(EAU, s * h), 1e-9);
  proche(resultantePression(EAU, s, 0.2, 0.2 + h), poussee(EAU, s * h), 1e-9);
});

test('immersion : le niveau monte à la rencontre du solide', () => {
  const rigide = { s: 1e-3, S: 2e-3, h: 0.04, rhoFluide: EAU, raideur: Infinity };
  proche(hauteurImmergee(0.01, rigide), 0.02, 1e-12); // s/S = 1/2 : 1 cm de descente immerge 2 cm
  proche(monteeNiveau(0.02, rigide), 0.01, 1e-12);
  assert.equal(hauteurImmergee(-0.01, rigide), 0);
  assert.equal(hauteurImmergee(0.5, rigide), 0.04);
  assert.equal(hauteurImmergee(0.5, rigide, 0.024), 0.024);
});

test('immersion : un ressort souple impose de descendre davantage, descentePour est la réciproque', () => {
  const m = { s: 1e-3, S: 2e-3, h: 0.04, rhoFluide: EAU, raideur: 80 };
  assert.ok(hauteurImmergee(0.01, m) < 0.02);
  proche(hauteurImmergee(descentePour(0.03, m), m), 0.03, 1e-12);
});
