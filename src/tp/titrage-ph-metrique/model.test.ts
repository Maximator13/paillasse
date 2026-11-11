import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pH, volumeEquivalent, derivee, courbe } from './model.ts';

const tit = { ca: 0.1, va: 20, cb: 0.1, pKa: 4.76 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('volume équivalent : ca.va = cb.vE', () => {
  assert.equal(volumeEquivalent(tit), 20);
  proche(volumeEquivalent({ ...tit, ca: 0.08 }), 16, 1e-9);
});

test('pH initial d\'un acide faible 0,10 mol/L (pKa 4,76)', () => proche(pH(0, tit), 2.88, 0.02));
test('pH = pKa à la demi-équivalence', () => proche(pH(10, tit), 4.76, 0.02));
test('pH basique à l\'équivalence', () => proche(pH(20, tit), 8.73, 0.03));
test('excès de soude : pH fixé par HO-', () => proche(pH(25, tit), 14 + Math.log10((0.1 * 5) / 45), 0.02));

test('la courbe est croissante et la dérivée est maximale à l\'équivalence', () => {
  const pts = courbe(tit, 25);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i][1] >= pts[i - 1][1]);
  const vMax = pts.map(([v]) => v).reduce((m, v) => (derivee(v, tit) > derivee(m, tit) ? v : m), 0);
  proche(vMax, 20, 0.11);
});
