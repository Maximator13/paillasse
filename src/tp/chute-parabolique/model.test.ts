import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dureeVol, energies, intervalle, pointage, portee, position, sommet, trajectoire, vitesse, vitessePointee } from './model.ts';

// Tir de référence des tests : valeurs calculées à la main.
const tir = { v0: 4, alpha: 60, g: 9.8, h: 0.25 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('tir à 45° depuis le sol : portée v0²/g, flèche v0²/(4g), durée v0.√2/g', () => {
  const t45 = { v0: 10, alpha: 45, g: 10, h: 0 };
  proche(portee(t45), 10, 1e-9);
  proche(sommet(t45).y, 2.5, 1e-9);
  proche(dureeVol(t45), Math.SQRT2, 1e-9);
});

test('tir de référence (4 m/s, 60°, h = 0,25 m) : durée, portée, flèche', () => {
  proche(dureeVol(tir), 0.773, 1e-3); // (3,464 + √(12 + 4,9)) / 9,8
  proche(portee(tir), 1.546, 1e-3); // 2,00 × 0,773
  proche(sommet(tir).y, 0.862, 1e-3); // 0,25 + 12 / 19,6
  proche(sommet(tir).t, 0.353, 1e-3);
});

test('réglages par défaut de la scène (5,0 m/s, 50°, h = 0,80 m, g = 9,81) : valeurs de la fiche', () => {
  const defaut = { v0: 5, alpha: 50, g: 9.81, h: 0.8 };
  proche(sommet(defaut).t, 0.39, 5e-3); // 3,830 / 9,81
  proche(sommet(defaut).y, 1.55, 5e-3); // 0,80 + 3,830² / 19,62
  proche(dureeVol(defaut), 0.95, 5e-3); // (3,830 + √(14,67 + 15,70)) / 9,81
  proche(portee(defaut), 3.06, 5e-3); // 3,214 × 0,952
  assert.equal(intervalle(defaut), 0.04);
});

test('tir vertical : x reste nul, flèche h + v0²/(2g)', () => {
  const vertical = { ...tir, alpha: 90 };
  proche(position(0.3, vertical).x, 0, 1e-12);
  proche(sommet(vertical).y, 0.25 + 16 / 19.6, 1e-9);
});

test('vx constante, vy nulle au sommet et opposée de part et d\'autre', () => {
  const s = sommet(tir);
  proche(vitesse(s.t, tir).vy, 0, 1e-12);
  proche(vitesse(s.t - 0.1, tir).vy, -vitesse(s.t + 0.1, tir).vy, 1e-12);
  for (const t of [0, 0.2, 0.7]) proche(vitesse(t, tir).vx, 2, 1e-12);
});

test('la trajectoire y(x) coïncide avec les équations horaires et s\'annule à la portée', () => {
  for (const t of [0, 0.1, 0.4, 0.7]) {
    const { x, y } = position(t, tir);
    proche(trajectoire(x, tir), y, 1e-12);
  }
  proche(trajectoire(portee(tir), tir), 0, 1e-12);
});

test('l\'énergie mécanique se conserve', () => {
  const m = 0.045, em0 = energies(0, tir, m).em;
  proche(em0, 0.5 * m * 16 + m * 9.8 * 0.25, 1e-12); // 0,470 J
  for (const t of [0.2, sommet(tir).t, dureeVol(tir)]) proche(energies(t, tir, m).em, em0, 1e-12);
  proche(energies(dureeVol(tir), tir, m).epp, 0, 1e-12);
});

test('sur la Lune (g six fois plus faible), portée et flèche sont six fois plus grandes depuis le sol', () => {
  const terre = { v0: 4, alpha: 60, g: 9.6, h: 0 }, lune = { ...terre, g: 1.6 };
  proche(portee(lune) / portee(terre), 6, 1e-9);
  proche(sommet(lune).y / sommet(terre).y, 6, 1e-9);
});

test('pointage : intervalle multiple de 40 ms, points au-dessus du sol, vitesse par différence centrée exacte', () => {
  assert.equal(intervalle(tir), 0.04);
  for (const g of [9.8, 3.7, 1.6]) {
    const cas = { ...tir, v0: 5, alpha: 75, g }, dt = intervalle(cas), pts = pointage(cas, dt);
    proche((dt * 25) % 1, 0, 1e-9);
    assert.ok(pts.length >= 10 && pts.length <= 25, `${pts.length} points`);
    assert.ok(pts.every((q) => q.y >= 0));
    const v = vitessePointee(pts, 3), exacte = vitesse(pts[3].t, cas);
    proche(v.vx, exacte.vx, 1e-9);
    proche(v.vy, exacte.vy, 1e-9);
  }
});
