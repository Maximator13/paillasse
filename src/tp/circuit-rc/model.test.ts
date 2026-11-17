import { test } from 'node:test';
import assert from 'node:assert/strict';
import { charge, courbe, etat, iCharge, iDecharge, tau, uCharge, uDecharge } from './model.ts';

// R = 2,0 kΩ, C = 500 µF, E = 5,0 V : tau = 1,0 s, E/R = 2,5 mA, C.E = 2,5 mC.
const k = { e: 5, r: 2000, c: 500e-6 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('tau = R.C', () => {
  proche(tau(k), 1, 1e-12);
  proche(tau({ ...k, r: 1000, c: 100e-6 }), 0.1, 1e-12);
});

test('charge : 0 au départ, 63 % de E à tau, plus de 99 % à 5 tau', () => {
  assert.equal(uCharge(0, k), 0);
  proche(uCharge(1, k), 5 * 0.632, 0.001);
  proche(uCharge(2, k), 4.323, 0.001); // 5 × (1 − 0,135335), calculé à la main
  assert.ok(uCharge(5, k) > 0.99 * 5 && uCharge(5, k) < 5);
});

test('décharge : E au départ, 37 % à tau', () => {
  assert.equal(uDecharge(0, k), 5);
  proche(uDecharge(1, k), 5 * 0.368, 0.001);
});

test('intensité : E/R à la fermeture, signe inversé à la décharge', () => {
  proche(iCharge(0, k), 2.5e-3, 1e-12);
  proche(iCharge(1, k), 2.5e-3 * 0.368, 1e-6);
  proche(iDecharge(0, k), -2.5e-3, 1e-12);
});

test('loi des mailles : R.i + uC = E en charge, 0 en décharge', () => {
  for (const t of [0, 0.3, 1, 2.7, 6]) {
    proche(k.r * iCharge(t, k) + uCharge(t, k), k.e, 1e-9);
    proche(k.r * iDecharge(t, k) + uDecharge(t, k), 0, 1e-9);
  }
});

test('i = dq/dt, avec q = C.uC', () => {
  const dt = 1e-5;
  for (const t of [0.2, 1, 3, 5.4, 7]) {
    const dq = etat(t + dt, k, 5).q - etat(t - dt, k, 5).q;
    proche(dq / (2 * dt), etat(t, k, 5).i, 1e-8);
  }
  proche(charge(5, k), 2.5e-3, 1e-12);
});

test('la tangente à l\'origine coupe l\'asymptote uC = E à t = tau', () => {
  const pente = (uCharge(1e-6, k) - uCharge(0, k)) / 1e-6;
  proche(k.e / pente, tau(k), 1e-5);
});

test('séquence : uC continue à la bascule, charge incomplète si tau est grand', () => {
  proche(etat(5 + 1e-9, k, 5).uC, etat(5, k, 5).uC, 1e-6);
  assert.ok(etat(5, k, 5).i > 0 && etat(5.01, k, 5).i < 0);
  const lent = { e: 5, r: 3000, c: 1000e-6 };
  proche(etat(5, lent, 5).uC / 5, 1 - Math.exp(-5 / 3), 1e-9);
  // R = 4,0 kΩ, C = 1000 µF (question 3 de la fiche) : tau = 4,0 s, uC(5 s) = 5 × (1 − 0,2865) = 3,567 V.
  proche(etat(5, { e: 5, r: 4000, c: 1000e-6 }, 5).uC, 3.567, 0.001);
  const pts = courbe(k, 5, 10);
  assert.deepEqual(pts[0], [0, 0]);
  for (let j = 1; j < pts.length; j++) assert.ok(pts[j][0] >= pts[j - 1][0]);
});
