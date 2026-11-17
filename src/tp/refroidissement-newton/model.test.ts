import { test } from 'node:test';
import assert from 'node:assert/strict';
import { C_EAU, courbe, euler, flux, pente, temperature, tempsCaracteristique } from './model.ts';

// 100 g d'eau à 80 °C dans un bécher (S = 120 cm²), air à 20 °C, h = 20 W/(m².K).
const sys = { m: 0.1, c: C_EAU, h: 20, s: 1.2e-2, tExt: 20, t0: 80 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('temps caractéristique : tau = m.c/(h.S)', () => {
  proche(tempsCaracteristique(sys), 418 / 0.24, 1e-9); // 1742 s, soit 29,0 min
  proche(tempsCaracteristique({ ...sys, m: 0.2 }), 2 * tempsCaracteristique(sys), 1e-9);
  proche(tempsCaracteristique({ ...sys, h: 40 }), tempsCaracteristique(sys) / 2, 1e-9);
});

test('flux thermique : Phi = h.S.(Text - T)', () => {
  proche(flux(80, sys), -14.4, 1e-9); // le système cède 14,4 W à l'air
  assert.equal(flux(20, sys), 0); // équilibre thermique
  assert.ok(flux(10, sys) > 0); // plus froid que l'air : il reçoit de l'énergie
});

test('conditions aux limites : T(0) = T0 et T tend vers Text', () => {
  assert.equal(temperature(0, sys), 80);
  proche(temperature(20 * tempsCaracteristique(sys), sys), 20, 1e-6);
});

test('à t = tau, il reste 37 % de l\'écart initial', () => {
  proche(temperature(tempsCaracteristique(sys), sys), 20 + 60 / Math.E, 1e-9); // 42,1 °C
  proche(temperature(5 * tempsCaracteristique(sys), sys), 20.4, 0.01); // régime quasi permanent à 5 tau
  // Valeurs de la fiche, calculées à la main : tau = 1742 s, 60 x exp(-1) = 22,07 et 60 x exp(-5400/1742) = 2,70.
  proche(temperature(1742, sys), 42.07, 0.01);
  proche(temperature(5400, sys), 22.7, 0.01);
  proche(-flux(42.07, sys), 5.3, 0.01); // flux cédé à t = tau
});

test('la tangente à l\'origine coupe l\'asymptote à t = tau', () => {
  proche(pente(80, sys), -60 / tempsCaracteristique(sys), 1e-12);
  proche(80 + pente(80, sys) * tempsCaracteristique(sys), 20, 1e-9);
});

test('la solution exponentielle vérifie l\'équation différentielle (méthode d\'Euler)', () => {
  for (const t of [600, 1800, 5400]) proche(euler(sys, t, 0.5), temperature(t, sys), 0.02);
});

test('la courbe décroît de moins en moins vite et reste au-dessus de Text', () => {
  const pts = courbe(sys, 5400, 90);
  assert.equal(pts.length, 91);
  for (let i = 2; i < pts.length; i++) {
    const avant = pts[i - 2][1] - pts[i - 1][1], apres = pts[i - 1][1] - pts[i][1];
    assert.ok(apres > 0 && apres < avant && pts[i][1] > 20);
  }
});

test('un système plus froid que le thermostat se réchauffe vers Text', () => {
  const froid = { ...sys, t0: 5 };
  assert.ok(temperature(600, froid) > 5 && temperature(600, froid) < 20);
  proche(temperature(tempsCaracteristique(froid), froid), 20 - 15 / Math.E, 1e-9);
});
