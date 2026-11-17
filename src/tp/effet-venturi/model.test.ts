import { test } from 'node:test';
import assert from 'node:assert/strict';
import { G, RHO, TUBE, debitSI, debitVenturi, diametre, ecartPression, hauteur, positionAuTemps, pressionRelative, section, tempsParcours, vitesse, volumes } from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);
const dv = debitSI(10), d = 0.012; // 10 L/min, col de 12 mm
const s1 = section(TUBE.D), s2 = section(d);

test('conservation du débit : v1.S1 = v2.S2, le fluide accélère dans le col', () => {
  proche(s1, 3.1416e-4, 1e-8);
  proche(vitesse(dv, s1), 0.531, 0.001);
  proche(vitesse(dv, s2), 1.474, 0.001);
  proche(vitesse(dv, s1) * s1, vitesse(dv, s2) * s2, 1e-12);
});

test('Bernoulli : P1 - P2 = rho.(v2² - v1²)/2, soit 945 Pa et 9,6 cm d\'eau', () => {
  proche(ecartPression(dv, d), 945, 1);
  proche(ecartPression(dv, d) / (RHO * G), 0.0963, 0.0002);
  proche(pressionRelative(vitesse(dv, s1), 0.36) - pressionRelative(vitesse(dv, s2), 0.36), ecartPression(dv, d), 1e-6);
});

test('sans étranglement ou sans écoulement, la pression est uniforme', () => {
  assert.equal(ecartPression(dv, TUBE.D), 0);
  assert.equal(hauteur(0, 0.36), 0.36);
  proche(pressionRelative(0, 0.36), 3532, 1);
});

test('l\'écart de pression varie comme le carré du débit', () => proche(ecartPression(2 * dv, d) / ecartPression(dv, d), 4, 1e-9));

test('débitmètre de Venturi : la dénivellation redonne le débit', () => {
  const dh = hauteur(vitesse(dv, s1), 0.36) - hauteur(vitesse(dv, s2), 0.36);
  proche(debitVenturi(dh, d) * 60000, 10, 1e-6);
});

test('profil du tube : D en amont et en aval, d dans le col, convergent monotone', () => {
  assert.equal(diametre(0, d), TUBE.D);
  assert.equal(diametre(0.19, d), d);
  assert.equal(diametre(0.4, d), TUBE.D);
  for (let x = 0.12; x < 0.17; x += 0.005) assert.ok(diametre(x + 0.005, d) <= diametre(x, d));
});

test('tube uniforme : temps de parcours L/v et volume S.L', () => {
  const vol = volumes(TUBE.D);
  proche(vol.at(-1)!, s1 * TUBE.L, 1e-12);
  proche(tempsParcours(TUBE.L, dv, vol), TUBE.L / vitesse(dv, s1), 1e-9);
  proche(positionAuTemps(0.2, dv, vol), 0.2 * vitesse(dv, s1), 1e-9);
});

test('la position inversée respecte v.S constant : la particule va à v2 dans le col', () => {
  const vol = volumes(d);
  for (const x of [0.03, 0.15, 0.19, 0.26, 0.38]) proche(positionAuTemps(tempsParcours(x, dv, vol), dv, vol), x, 1e-9);
  const t = tempsParcours(0.19, dv, vol), dt = 1e-4;
  proche((positionAuTemps(t + dt, dv, vol) - positionAuTemps(t - dt, dv, vol)) / (2 * dt), vitesse(dv, s2), 1e-3);
  assert.ok(tempsParcours(TUBE.L, dv, vol) < tempsParcours(TUBE.L, dv, volumes(TUBE.D)));
});

test('réponses de la fiche : 2,4 cm à 5 L/min, puis 0,83 m/s et 2,1 cm avec un col de 16 mm', () => {
  proche(ecartPression(debitSI(5), d) / (RHO * G), 0.0241, 0.0001);
  proche(vitesse(dv, section(0.016)), 0.829, 0.001);
  proche(ecartPression(dv, 0.016) / (RHO * G), 0.0207, 0.0001);
});

test('réglages extrêmes : la colonne du col reste positive (11 L/min, col de 10 mm)', () => {
  const v = vitesse(debitSI(11), section(0.01));
  proche(v, 2.334, 0.001);
  proche(hauteur(v, 0.36), 0.0823, 0.0005);
});
