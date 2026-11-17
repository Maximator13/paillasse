import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ACIDE, ALCOOL, ESTER, K_ESTER, avancementA, avancementEquilibre, cinetique, constanteVitesse, quotient, rendementEquilibre, vitesse, volume } from './model.ts';

const equi = { nAcide: 0.2, nAlcool: 0.2, K: K_ESTER };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('mélange équimolaire, K = 4 : rendement de 2/3', () => {
  proche(avancementEquilibre(equi), 0.4 / 3, 1e-12);
  proche(rendementEquilibre(equi), 0.667, 1e-3);
});

test('un excès d\'acide augmente le rendement (84,5 % puis 90,3 %)', () => {
  proche(rendementEquilibre({ ...equi, nAcide: 0.4 }), 2 - Math.sqrt(48) / 6, 1e-9);
  proche(rendementEquilibre({ ...equi, nAcide: 0.6 }), 0.9028, 1e-4);
});

test('à l\'équilibre, Qr = K et la vitesse est nulle', () => {
  for (const m of [equi, { ...equi, nAcide: 0.5 }, { ...equi, K: 1 }]) {
    const x = avancementEquilibre(m);
    proche(quotient(x, m), m.K, 1e-9);
    proche(vitesse(x, m, 0.5), 0, 1e-12);
  }
});

test('cinétique : part de 0, croît, tend vers l\'équilibre', () => {
  const pts = cinetique(equi, 0.5, 600);
  assert.equal(pts[0][1], 0);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i][1] >= pts[i - 1][1] - 1e-12);
  proche(pts.at(-1)![1], avancementEquilibre(equi), 1e-9);
});

test('la moitié de l\'avancement final est atteinte à t = ln(5/3) / (k.n0)', () => {
  const k = 0.5;
  proche(avancementA(Math.log(5 / 3) / (k * 0.2), equi, k), 0.2 / 3, 1e-12);
});

test('la solution vérifie la loi de vitesse', () => {
  const m = { ...equi, nAcide: 0.3 }, k = 0.5, dt = 1e-4;
  for (const t of [0, 2, 10, 30]) {
    const pente = (avancementA(t + dt, m, k) - avancementA(Math.max(0, t - dt), m, k)) / (t + dt - Math.max(0, t - dt));
    proche(pente, vitesse(avancementA(t, m, k), m, k), 1e-6);
  }
});

test('température et catalyseur changent la vitesse, pas l\'état final', () => {
  proche(constanteVitesse(120, 5), 0.5, 1e-12);
  proche(constanteVitesse(120, 5) / constanteVitesse(60, 5), 15.72, 0.05);
  assert.ok(constanteVitesse(120, 0) < constanteVitesse(120, 5) / 50);
  proche(avancementA(1e6, equi, constanteVitesse(60, 0)), avancementA(1e6, equi, constanteVitesse(120, 10)), 1e-9);
});

test('valeurs de la fiche : volumes, masse du produit, rendements après 60 min', () => {
  proche(volume(0.2, ALCOOL), 21.8, 0.05);
  proche(volume(0.2, ACIDE), 11.45, 0.01); // 0,20 x 60,05 / 1,049, noté 11,4 mL
  proche((0.4 / 3) * ESTER.M, 17.4, 0.05);
  // Mélange équimolaire : x(t) = n0 (E - 1) / (1,5 E - 0,5) avec E = exp(k n0 t), calculé à la main.
  proche(avancementA(60, equi, constanteVitesse(120, 5)) / 0.2, 0.667, 2e-3);
  proche(avancementA(60, equi, constanteVitesse(60, 5)) / 0.2, 0.274, 2e-3);
  proche(avancementA(60, equi, constanteVitesse(120, 0)) / 0.2, 0.056, 2e-3);
});
