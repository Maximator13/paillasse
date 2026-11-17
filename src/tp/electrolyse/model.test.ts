import { test } from 'node:test';
import assert from 'node:assert/strict';
import { F, charge, lecture, quantiteElectrons, quantiteH2, quantiteO2, tension, volumeGaz, volumeH2, volumeO2 } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('charge : Q = I.Δt (0,50 A pendant 5 min = 150 C)', () => assert.equal(charge(0.5, 300), 150));

test('quantité d\'électrons : n(e-) = Q/F', () => {
  assert.equal(quantiteElectrons(F), 1);
  proche(quantiteElectrons(150), 1.554e-3, 1e-6);
});

test('une mole d\'électrons donne 0,50 mol de H2 (12 L) et 0,25 mol de O2 (6 L)', () => {
  assert.equal(quantiteH2(F), 0.5);
  assert.equal(quantiteO2(F), 0.25);
  proche(volumeGaz(quantiteH2(F)), 12000, 1e-6);
  proche(volumeGaz(quantiteO2(F)), 6000, 1e-6);
});

test('valeur de référence : 0,50 A pendant 300 s', () => {
  proche(volumeH2(0.5, 300), 18.65, 0.01);
  proche(volumeO2(0.5, 300), 9.33, 0.01);
});

test('référence indépendante : 1,00 A pendant 965 s = 0,0100 mol d\'électrons, soit 120 mL de H2 et 60 mL de O2', () => {
  proche(volumeH2(1, 965), 120, 1e-6);
  proche(volumeO2(1, 965), 60, 1e-6);
});

test('le volume de H2 est toujours le double de celui de O2', () => {
  for (const [i, dt] of [[0.2, 120], [0.5, 300], [0.8, 360]]) proche(volumeH2(i, dt), 2 * volumeO2(i, dt), 1e-9);
});

test('cas limites et proportionnalité', () => {
  assert.equal(volumeH2(0, 300), 0);
  assert.equal(volumeO2(0.5, 0), 0);
  proche(volumeH2(0.8, 300), 2 * volumeH2(0.4, 300), 1e-9);
  proche(volumeH2(0.5, 360), 3 * volumeH2(0.5, 120), 1e-9);
});

test('lecture à la graduation (0,2 mL) et tension supérieure au seuil de 1,23 V', () => {
  proche(lecture(18.65), 18.6, 1e-9);
  proche(lecture(9.33), 9.4, 1e-9);
  proche(tension(0.5), 5.7, 1e-9);
  assert.ok(tension(0.2) > 1.23);
});
