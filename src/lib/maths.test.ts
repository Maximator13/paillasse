import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formule, texteMaths } from './maths.ts';

test('texte sans LaTeX : échappé, inchangé sinon', () => {
  assert.equal(texteMaths("L'intensité i"), "L'intensité i");
  assert.equal(texteMaths('a < b & "c"'), 'a &lt; b &amp; &quot;c&quot;');
});

test('espace insécable avant ? ! ; : hors LaTeX', () => {
  assert.equal(texteMaths('Valable ? Oui : $a : b$ ; non !'), `Valable ? Oui : ${texteMaths('$a : b$')} ; non !`);
});

test('LaTeX en ligne entre $...$ rendu par KaTeX, texte autour conservé', () => {
  const h = texteMaths('Avec $u = R i$, on trouve');
  assert.ok(h.startsWith('Avec <span class="katex">'));
  assert.ok(h.endsWith(', on trouve'));
  assert.ok(!h.includes('$'));
  assert.ok(!h.includes('katex-display'));
});

test('plusieurs formules dans une même chaîne', () => {
  assert.equal(texteMaths('$a$ et $b$').match(/class="katex"/g)?.length, 2);
});

test('formule en bloc', () => {
  assert.ok(formule('P = R i^2').includes('katex-display'));
});

test('erreurs : $ non fermé ou LaTeX invalide', () => {
  assert.throws(() => texteMaths('prix $5'));
  assert.throws(() => texteMaths('$\\frac{1}{$'));
  assert.throws(() => formule('\\nimportequoi'));
});
