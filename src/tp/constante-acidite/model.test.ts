import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fractionBase, ka, pH, pHRelation, rapport, regression } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const melange = (vb: number, pKa = 4.76) => ({ va: 20 - vb, vb, c: 0.1, pKa });

test('Ka de l\'acide éthanoïque : 10^-4,76 = 1,7e-5', () => proche(ka(4.76), 1.74e-5, 1e-7));

test('rapport [A-]/[AH] = Vb/Va et relation pH = pKa + log du rapport', () => {
  assert.equal(rapport({ va: 10, vb: 10 }), 1);
  proche(rapport({ va: 18, vb: 2 }), 1 / 9, 1e-12);
  assert.equal(pHRelation(4.76, 1), 4.76);
  proche(pHRelation(4.76, 10), 5.76, 1e-12);
});

test('mélange équimolaire : pH = pKa', () => proche(pH(melange(10)), 4.76, 0.01));

test('mélange 18 mL d\'acide + 2 mL de base : pH = 3,81', () => proche(pH(melange(2)), 3.81, 0.01));

test('référence indépendante : 18 + 2 mL, pKa 4,80, équation du second degré h(0,010 + h) = Ka(0,090 - h)', () => {
  const k = 10 ** -4.8, b = 0.01 + k, h = (-b + Math.sqrt(b * b + 4 * k * 0.09)) / 2;
  proche(pH(melange(2, 4.8)), -Math.log10(h), 1e-4);
  proche(pH(melange(2, 4.8)), 3.85, 0.005);
});

test('le pH réel suit la relation à 0,02 près pour tous les mélanges du TP', () => {
  for (const vb of [2, 6, 10, 14, 18]) proche(pH(melange(vb)), pHRelation(4.76, vb / (20 - vb)), 0.02);
});

test('diagramme de distribution : 50 % à pH = pKa, 1/11 et 10/11 à une unité de pH', () => {
  assert.equal(fractionBase(4.76, 4.76), 0.5);
  proche(fractionBase(3.76, 4.76), 1 / 11, 1e-9);
  proche(fractionBase(5.76, 4.76), 10 / 11, 1e-9);
});

test('la droite pH = f(log du rapport) a une pente 1 et le pKa pour ordonnée à l\'origine', () => {
  const { pente, ordonnee } = regression([2, 6, 10, 14, 18].map((vb) => [Math.log10(vb / (20 - vb)), pH(melange(vb))]));
  proche(pente, 1, 0.02);
  proche(ordonnee, 4.76, 0.02);
});

test('acide plus fort (pKa 3,6) : la dissociation n\'est plus négligeable, le pH dépasse la relation', () => {
  const ecart = pH(melange(2, 3.6)) - pHRelation(3.6, 2 / 18);
  assert.ok(ecart > 0.05 && ecart < 0.12, `écart ${ecart}`);
});
