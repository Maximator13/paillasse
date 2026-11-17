import { test } from 'node:test';
import assert from 'node:assert/strict';
import { angleEmergent, caracteristique, cercleOculaire, grossissement, imageIntermediaire, longueur, marche, propager } from './model.ts';

const lun = { f1: 50, f2: 10 };
const deg = Math.PI / 180;
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('grossissement et longueur de la lunette afocale', () => {
  assert.equal(grossissement(lun), 5);
  assert.equal(longueur(lun), 60);
  assert.equal(grossissement({ f1: 40, f2: 8 }), 5);
  // Réglages par défaut de l'animation (40 cm et 8 cm), valeurs de la fiche calculées à la main.
  assert.equal(longueur({ f1: 40, f2: 8 }), 48);
  proche(imageIntermediaire(1 * deg, { f1: 40, f2: 8 }), -0.698, 5e-4); // 40 x 0,017455
  // Question 3 : G = 10, tan(theta') = 10 x 0,017455, soit theta' = 9,90°.
  proche(angleEmergent(1 * deg, { f1: 50, f2: 5 }) / deg, 9.90, 0.01);
});

test('le rayon passant par le centre optique de l\'objectif n\'est pas dévié', () => {
  proche(marche(0, 1 * deg, lun).apresObjectif.pente, -Math.tan(1 * deg), 1e-12);
});

test('des rayons parallèles convergent en B1, dans le plan focal image de l\'objectif', () => {
  // A1B1 = f'1 tan(theta) = 50 x tan(1°) = 0,873 cm, image renversée.
  proche(imageIntermediaire(1 * deg, lun), -0.873, 5e-4);
  for (const h of [-1.5, 0, 0.9, 1.5]) proche(propager(marche(h, 1 * deg, lun).apresObjectif, lun.f1).y, imageIntermediaire(1 * deg, lun), 1e-12);
});

test('lunette afocale : les rayons émergents sont parallèles, inclinés de theta\' tel que tan(theta\') = G tan(theta)', () => {
  const pentes = [-1.5, 0, 1.5].map((h) => marche(h, 1 * deg, lun).apresOculaire.pente);
  for (const p of pentes) proche(p, 5 * Math.tan(1 * deg), 1e-12);
  // Image renversée : l'objet est au-dessus de l'axe, les rayons émergents montent (l'image est vue en dessous).
  assert.ok(pentes[0] > 0);
  proche(angleEmergent(1 * deg, lun) / deg, 4.99, 0.01);
  // Aux petits angles, theta'/theta tend vers G.
  proche(angleEmergent(0.01 * deg, lun) / (0.01 * deg), 5, 1e-4);
});

test('un faisceau parallèle à l\'axe ressort parallèle à l\'axe, G fois plus étroit et renversé', () => {
  const s = marche(1.5, 0, lun).apresOculaire;
  proche(s.pente, 0, 1e-12);
  proche(s.y, -0.3, 1e-12);
});

test('oculaire trop proche (O1O2 = 55 cm) : les rayons émergents divergent depuis une image virtuelle', () => {
  // A1 est à 5 cm devant l'oculaire : 1/O2A' = 1/10 - 1/5, soit O2A' = -10 cm et un grandissement de 2.
  const a = marche(1.5, 1 * deg, lun, 55).apresOculaire, b = marche(-1.5, 1 * deg, lun, 55).apresOculaire;
  assert.ok(Math.abs(a.pente - b.pente) > 0.01);
  const x = (b.y - a.y) / (a.pente - b.pente);
  proche(x, -10, 1e-9);
  proche(propager(a, x).y, 2 * imageIntermediaire(1 * deg, lun), 1e-9);
});

test('cercle oculaire : le rayon passé par O1 recoupe l\'axe à f\'2 (f\'1 + f\'2) / f\'1 de l\'oculaire', () => {
  assert.equal(cercleOculaire(lun), 12);
  proche(propager(marche(0, 1 * deg, lun).apresOculaire, cercleOculaire(lun)).y, 0, 1e-12);
  // Le faisceau y a un diamètre G fois plus petit que l'objectif.
  proche(propager(marche(1.5, 1 * deg, lun).apresOculaire, 12).y, -0.3, 1e-12);
});

test('la caractéristique theta\' = f(theta) part de l\'origine avec une pente G', () => {
  const pts = caracteristique({ f1: 40, f2: 8 }, 1, 10);
  assert.deepEqual(pts[0], [0, 0]);
  proche(pts[1][1] / pts[1][0], 5, 1e-3);
  proche(pts[10][1], 4.99, 0.01);
});
