import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activite, age, compterRestants, constanteRadioactive, demiVie, instantDesintegration, noyauxRestants } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const RADON = 55.6; // s, demi-vie du radon 220

test('constante radioactive du radon 220 : λ = ln 2 / t1/2', () => {
  proche(constanteRadioactive(RADON), 0.01247, 1e-5);
  proche(demiVie(constanteRadioactive(RADON)), RADON, 1e-9);
});

test('il reste N0/2 après une demi-vie, N0/4 après deux, N0/1024 après dix', () => {
  const l = constanteRadioactive(RADON);
  assert.equal(noyauxRestants(300, l, 0), 300);
  proche(noyauxRestants(300, l, RADON), 150, 1e-9);
  proche(noyauxRestants(300, l, 2 * RADON), 75, 1e-9);
  proche(noyauxRestants(1024, l, 10 * RADON), 1, 1e-9);
});

test('activité A = λN : 300 noyaux de demi-vie 56 s', () => {
  const l = constanteRadioactive(56);
  proche(activite(300, l), 3.71, 0.01);
  proche(activite(noyauxRestants(300, l, 56), l), 3.71 / 2, 0.01);
});

test('instant de désintégration : la médiane de la loi exponentielle est la demi-vie', () => {
  const l = constanteRadioactive(RADON);
  proche(instantDesintegration(0, l), 0, 1e-12);
  proche(instantDesintegration(0.5, l), RADON, 1e-9);
  proche(instantDesintegration(0.75, l), 2 * RADON, 1e-9);
});

test('une population tirée uniformément suit la loi de décroissance', () => {
  const l = constanteRadioactive(RADON), n = 1000;
  const instants = Array.from({ length: n }, (_, k) => instantDesintegration((k + 0.5) / n, l));
  assert.equal(compterRestants(instants, 0), n);
  assert.equal(compterRestants(instants, RADON), n / 2);
  assert.equal(compterRestants(instants, 2 * RADON), n / 4);
  proche(compterRestants(instants, 100), noyauxRestants(n, l, 100), 1);
});

test('datation : âge déduit de la fraction restante', () => {
  const l = constanteRadioactive(RADON);
  proche(age(75, 300, l), 2 * RADON, 1e-9);
  proche(age(300, 300, l), 0, 1e-12);
  // Carbone 14 (demi-vie 5 730 ans) : il reste 25 % des noyaux après 11 460 ans.
  proche(age(0.25, 1, constanteRadioactive(5730)), 11460, 1e-6);
});

test('valeurs de la fiche (N0 = 160, demi-vie 56 s), calculées à la main', () => {
  const l = constanteRadioactive(56);
  proche(l, 1.238e-2, 1e-5); // 0,6931 / 56
  proche(activite(160, l), 1.98, 0.005);
  proche(noyauxRestants(160, l, 112), 40, 1e-9);
  proche(noyauxRestants(160, l, 168), 20, 1e-9);
  proche(noyauxRestants(160, l, 300), 3.9, 0.05); // 160 x exp(-3,713)
});
