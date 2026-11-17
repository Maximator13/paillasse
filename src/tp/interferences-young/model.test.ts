import { test } from 'node:test';
import assert from 'node:assert/strict';
import { couleur, courbe, differenceMarche, differenceMarcheExacte, frangeBrillante, frangeSombre, intensite, interfrange, longueurOnde, nature } from './model.ts';

// Laser rouge, bifente de 0,20 mm, écran à 2,0 m : i = 650e-9 x 2,0 / 0,20e-3 = 6,5 mm.
const y = { lambda: 650, b: 0.2, D: 2 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('interfrange i = lambda.D / b', () => {
  proche(interfrange(y), 6.5, 1e-9);
  proche(interfrange({ lambda: 532, b: 0.25, D: 1.5 }), 3.192, 1e-9);
  proche(interfrange({ lambda: 450, b: 0.2, D: 1.2 }), 2.7, 1e-9); // question 3 de la fiche
  proche(interfrange({ lambda: 632.8, b: 0.5, D: 1 }), 1.2656, 1e-9); // laser hélium-néon, valeur calculée à la main
  proche(interfrange({ ...y, D: 1 }), 3.25, 1e-9); // proportionnel à D
  proche(interfrange({ ...y, b: 0.4 }), 3.25, 1e-9); // inversement proportionnel à b
});

test('différence de marche : k.lambda sur les franges brillantes, (k + 1/2).lambda sur les sombres', () => {
  assert.equal(differenceMarche(0, y), 0);
  proche(differenceMarche(frangeBrillante(1, y), y), 650, 1e-9);
  proche(differenceMarche(frangeBrillante(-3, y), y), -1950, 1e-9);
  proche(differenceMarche(frangeSombre(0, y), y), 325, 1e-9);
  proche(differenceMarche(frangeSombre(2, y), y), 1625, 1e-9);
});

test('la formule delta = b.x / D est une excellente approximation de S2M - S1M', () => {
  for (const x of [0, 3.25, 6.5, 20]) proche(differenceMarcheExacte(x, y), differenceMarche(x, y), 1e-4 * Math.max(1, differenceMarche(x, y)));
});

test('intensité : maximale au centre et tous les i, nulle entre deux, moitié à i / 4', () => {
  proche(intensite(0, y), 1, 1e-12);
  proche(intensite(6.5, y), 1, 1e-12);
  proche(intensite(-13, y), 1, 1e-12);
  proche(intensite(3.25, y), 0, 1e-12);
  proche(intensite(9.75, y), 0, 1e-12);
  proche(intensite(1.625, y), 0.5, 1e-12);
});

test('nature de l\'interférence', () => {
  assert.equal(nature(0, 650), 'constructive');
  assert.equal(nature(1300, 650), 'constructive');
  assert.equal(nature(325, 650), 'destructive');
  assert.equal(nature(-975, 650), 'destructive');
  assert.equal(nature(200, 650), 'quelconque');
});

test('longueur d\'onde retrouvée à partir de l\'interfrange mesuré', () => {
  proche(longueurOnde(6.5, 0.2, 2), 650, 1e-9);
  proche(longueurOnde(26 / 4, 0.2, 2), 650, 1e-9); // 4 interfranges mesurés : 26,0 mm
  proche(longueurOnde(interfrange({ lambda: 532, b: 0.3, D: 1.7 }), 0.3, 1.7), 532, 1e-9);
});

test('la figure est symétrique et périodique', () => {
  const pts = courbe(y, 20, 400);
  assert.equal(pts.length, 401);
  pts.forEach(([x, v], j) => {
    proche(v, pts[400 - j][1], 1e-9);
    proche(v, intensite(x + interfrange(y), y), 1e-9);
    assert.ok(v >= 0 && v <= 1);
  });
});

test('couleur du laser selon la longueur d\'onde', () => {
  assert.deepEqual(couleur(650), [255, 0, 0]);
  const [rv, gv, bv] = couleur(532);
  assert.ok(gv === 255 && gv > rv && bv === 0);
  const [rb, gb, bb] = couleur(450);
  assert.ok(bb === 255 && bb > gb && rb === 0);
  assert.deepEqual(couleur(1000), [0, 0, 0]);
});
