import { test } from 'node:test';
import assert from 'node:assert/strict';
import { conductivite, contributions, deuxDroites, quantites, regression, releve, volumeEquivalent } from './model.ts';

// Sérum physiologique à 9,0 g/L (0,154 mol/L), prise de 10,0 mL, 200 mL d'eau, nitrate d'argent à 0,100 mol/L.
const tit = { c0: 0.154, v0: 10, eau: 200, c1: 0.1 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('volume équivalent : c0.v0 = c1.vE', () => {
  proche(volumeEquivalent(tit), 15.4, 1e-9);
  proche(volumeEquivalent({ ...tit, c0: 0.1 }), 10, 1e-9);
});

test('quantités de matière avant et après l\'équivalence (mmol)', () => {
  const avant = quantites(5, tit), apres = quantites(20, tit);
  proche(avant.Cl, 1.04, 1e-9);
  proche(avant.NO3, 0.5, 1e-9);
  assert.equal(avant.Ag, 0);
  proche(avant.AgCl, 0.5, 1e-9);
  assert.equal(apres.Cl, 0);
  proche(apres.Ag, 0.46, 1e-9);
  proche(apres.AgCl, 1.54, 1e-9);
});

test('la solution reste électriquement neutre', () => {
  for (const v of [0, 7, 15.4, 22]) {
    const n = quantites(v, tit);
    proche(n.Na + n.Ag, n.Cl + n.NO3, 1e-9);
  }
});

test('conductivité initiale : (lambda Na + lambda Cl).c', () => {
  // c = 0,154 x 10 / 210 = 7,333 mol/m³ ; sigma = 12,64e-3 x 7,333 = 0,0927 S/m
  proche(conductivite(0, tit), 0.09269, 1e-4);
});

test('à l\'équivalence, seuls Na+ et NO3- conduisent', () => {
  const c = contributions(15.4, tit);
  proche(c.Cl, 0, 1e-9);
  proche(c.Ag, 0, 1e-9);
  // c = 1,54 mmol / 225,4 mL = 6,832 mol/m³ ; sigma = 12,15e-3 x 6,832 = 0,0830 S/m
  proche(conductivite(15.4, tit), 0.08301, 1e-4);
});

test('sigma décroît faiblement avant l\'équivalence, croît fortement après', () => {
  const pts = releve(tit, 25);
  assert.equal(pts.length, 26);
  for (let i = 1; i <= 15; i++) assert.ok(pts[i][1] < pts[i - 1][1]);
  for (let i = 17; i <= 25; i++) assert.ok(pts[i][1] > pts[i - 1][1]);
  const avant = regression(pts.slice(0, 15)), apres = regression(pts.slice(17));
  assert.ok(Math.abs(apres.pente) > 5 * Math.abs(avant.pente));
});

test('la rupture de pente redonne le volume équivalent', () => {
  // Dilution quasi nulle (eau en très grand excès) : deux droites parfaites.
  proche(deuxDroites(releve({ ...tit, eau: 1e6 }, 25)).vE, 15.4, 0.01);
  // 200 mL d'eau : écart inférieur à 0,2 mL. 50 mL d'eau : les portions se courbent, l'écart grandit.
  const e200 = Math.abs(deuxDroites(releve(tit, 25)).vE - 15.4), e50 = Math.abs(deuxDroites(releve({ ...tit, eau: 50 }, 25)).vE - 15.4);
  assert.ok(e200 < 0.2);
  assert.ok(e50 > e200);
});

test('conductivité en fin de burette, calculée à la main', () => {
  // 25 mL versés : Na+ 1,54 mmol, NO3- 2,50 mmol, Ag+ 0,96 mmol dans 235 mL.
  // sigma = (5,01 x 1,54 + 7,14 x 2,50 + 6,19 x 0,96) / 235 = 31,508 / 235 = 0,1341 S/m
  proche(conductivite(25, tit), 0.13408, 1e-5);
});
