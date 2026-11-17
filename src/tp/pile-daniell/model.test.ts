import { test } from 'node:test';
import assert from 'node:assert/strict';
import { F, capacite, charge, concentrationCuivre, dureeVie, intensite, masseCuivre, masseZinc, quantiteElectrons, tension, type Pile } from './model.ts';

// Pile de référence : 50 mL de sulfate de cuivre à 0,10 mol/L, conducteur ohmique de 30 ohms.
const pile: Pile = { e: 1.1, r: 10, R: 30, c: 0.1, v: 0.05 };
const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('intensité et tension en charge : I = E / (R + r), U = R.I', () => {
  proche(intensite(pile), 0.0275, 1e-12);
  proche(tension(pile), 0.825, 1e-12);
  proche(tension(pile), pile.R * intensite(pile), 1e-12);
});

test('circuit ouvert : aucun courant, tension à vide', () => {
  const ouverte = { ...pile, R: Infinity };
  assert.equal(intensite(ouverte), 0);
  assert.equal(tension(ouverte), 1.1);
});

test('capacité : 5,0 mmol de Cu2+, 2 électrons par ion', () => {
  proche(capacite(pile), 964.85, 1e-9);
  proche(capacite(pile) / 3600, 0.268, 0.001); // en A.h
});

test('charge débitée en 6 h : Q = I.t', () => {
  const q = charge(6 * 3600, pile);
  proche(q, 594, 1e-9);
  proche(quantiteElectrons(q) * 1000, 6.16, 0.005); // mmol
});

test('une mole d\'électrons consomme 32,7 g de zinc et dépose 31,75 g de cuivre', () => {
  proche(masseZinc(F), 32.7, 1e-9);
  proche(masseCuivre(F), 31.75, 1e-9);
  proche(masseZinc(594) * 1000, 201.3, 0.1); // mg
  proche(masseCuivre(594) * 1000, 195.5, 0.1);
});

test('la solution s\'appauvrit en ions Cu2+', () => {
  assert.equal(concentrationCuivre(0, pile), 0.1);
  proche(concentrationCuivre(594, pile), 0.0384, 0.0001);
});

test('usure : la charge plafonne à la capacité quand Cu2+ est épuisé', () => {
  proche(dureeVie(pile) / 3600, 9.75, 0.01);
  proche(charge(dureeVie(pile), pile), capacite(pile), 1e-9);
  assert.equal(charge(20 * 3600, pile), capacite(pile));
  assert.equal(concentrationCuivre(charge(20 * 3600, pile), pile), 0);
  proche(masseCuivre(capacite(pile)) * 1000, 317.5, 0.01); // 5,0 mmol de cuivre
});

// Valeurs de référence indépendantes : équivalents électrochimiques tabulés (0,3294 mg/C pour le cuivre, 0,3388 mg/C pour le zinc).
test('loi de Faraday : 1 A pendant 1 h dépose 1,185 g de cuivre et consomme 1,220 g de zinc', () => {
  proche(masseCuivre(3600), 1.185, 0.002);
  proche(masseZinc(3600), 1.22, 0.002);
  proche(masseCuivre(1) * 1000, 0.3294, 0.0005);
  proche(masseZinc(1) * 1000, 0.3388, 0.0005);
});
