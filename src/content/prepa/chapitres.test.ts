// Contrôle de tous les chapitres de prépa (format décrit dans docs/CONTRAT.md, section Prépa).
// Exécution : node --test src/content/prepa/chapitres.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { formule, texteMaths } from '../../lib/maths.ts';

const ici = dirname(fileURLToPath(import.meta.url));
const fichiers = readdirSync(ici, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.md'));
const PREFIXES: Record<string, string> = { phys: 'physique', chim: 'chimie', maths: 'maths', si: 'si' };
const descriptions = new Map<string, string>();


for (const rel of fichiers) {
  test(rel, () => {
    const brut = readFileSync(join(ici, rel), 'utf8').replace(/\r\n/g, '\n');
    const m = brut.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    assert.ok(m, 'frontmatter --- ... --- absent');
    const d = parse(m[1]);
    const corps = m[2];
    const [filiere, nom] = rel.split(/[\\/]/);

    // Emplacement et slug : <filiere>/<prefixe><annee>-<nom>.md
    assert.equal(d.filiere, filiere, 'filiere différente du dossier');
    const s = nom.match(/^(phys|chim|maths|si)([12])-[a-z0-9-]+\.md$/);
    assert.ok(s, `slug invalide : ${nom} (attendu phys1-..., chim2-..., maths1-..., si2-...)`);
    assert.equal(d.matiere, PREFIXES[s[1]], 'matiere incohérente avec le préfixe du slug');
    assert.equal(d.annee, Number(s[2]), 'annee incohérente avec le préfixe du slug');

    // Typographie : ni tiret cadratin ni demi-cadratin, nulle part.
    const tirets = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);
    assert.ok(!tirets.test(brut), 'tiret cadratin ou demi-cadratin interdit');

    assert.ok(!descriptions.has(d.description), `description identique à ${descriptions.get(d.description)}`);
    descriptions.set(d.description, rel);

    // Un \theta, \frac, \rho ou \nu entre guillemets doubles YAML devient tabulation, saut de page, retour ou saut de ligne.
    const textes = [...d.formules.flatMap((f: Record<string, string>) => [f.nom, f.conditions ?? '']), ...d.qcm.flatMap((q: { question: string; choix: string[]; explication: string }) => [q.question, q.explication, ...q.choix])];
    for (const t of textes) assert.ok(!/[\x00-\x1f\x7f]/.test(t), `caractère de contrôle (LaTeX entre guillemets doubles ?) : ${JSON.stringify(t)}`);
    for (const f of d.formules) assert.ok(!/[\x00-\x09\x0b-\x1f\x7f]/.test(f.formule), `caractère de contrôle dans la formule : ${JSON.stringify(f.formule)}`);

    // Formules : au moins 6, LaTeX valide.
    assert.ok(Array.isArray(d.formules) && d.formules.length >= 6, 'au moins 6 formules');
    for (const f of d.formules) {
      assert.ok(f.nom && f.formule, 'formule sans nom ou sans formule');
      assert.doesNotThrow(() => texteMaths(f.nom), `nom : ${f.nom}`);
      assert.doesNotThrow(() => formule(f.formule), `formule : ${f.formule}`);
      if (f.conditions) assert.doesNotThrow(() => texteMaths(f.conditions), `conditions : ${f.conditions}`);
    }

    // QCM : au moins 10 questions, 3 à 5 choix distincts, reponse dans les bornes, LaTeX valide.
    assert.ok(Array.isArray(d.qcm) && d.qcm.length >= 10, 'au moins 10 questions');
    d.qcm.forEach((q: { question: string; choix: string[]; reponse: number; explication: string }, i: number) => {
      const n = `question ${i + 1}`;
      assert.ok(q.question && q.explication, `${n} : question ou explication vide`);
      assert.ok(Array.isArray(q.choix) && q.choix.length >= 3 && q.choix.length <= 5, `${n} : 3 à 5 choix`);
      assert.equal(new Set(q.choix).size, q.choix.length, `${n} : choix en double`);
      assert.ok(Number.isInteger(q.reponse) && q.reponse >= 0 && q.reponse < q.choix.length, `${n} : reponse hors des bornes`);
      for (const t of [q.question, q.explication, ...q.choix]) assert.doesNotThrow(() => texteMaths(t), `${n} : ${t}`);
    });

    // Corps : l'essentiel, puis la fiche, puis les exercices type concours, chacun avec son corrigé.
    assert.ok(corps.trimStart().startsWith("> **L'essentiel.**"), "le corps commence par > **L'essentiel.**");
    assert.ok(!/^# /m.test(corps), 'pas de titre # (la page le génère)');
    // Délimiteurs de formules : un bloc s'ouvre et se ferme par $$ seul sur sa ligne (y compris dans un encadré « > »).
    assert.ok(!/^(> ?)*\$[ \t]*$/m.test(corps), 'ligne avec un seul $ : un bloc de formule se ferme par $$');
    const blocsMaths = corps.match(/^(> ?)*\$\$[ \t]*$/gm) ?? [];
    assert.ok(blocsMaths.length % 2 === 0, `nombre impair de lignes $$ (${blocsMaths.length}) : bloc de formule non fermé`);
    const [fiche, exercices] = corps.split(/^## Exercices type concours\s*$/m);
    assert.ok(exercices !== undefined, 'section ## Exercices type concours absente');
    assert.ok(/^## /m.test(fiche), 'fiche sans section ##');
    assert.ok(!/^## /m.test(exercices), 'la section des exercices doit être la dernière');
    const blocs = exercices.split(/^### /m).slice(1);
    assert.ok(blocs.length >= 2 && blocs.length <= 3, '2 ou 3 exercices');
    blocs.forEach((b, i) => {
      assert.match(b, new RegExp(`^Exercice ${i + 1} : .+ \\((facile|moyen|difficile), \\d+ min\\)\\s*\\n`), `titre de l'exercice ${i + 1} : ### Exercice ${i + 1} : titre (niveau, durée)`);
      assert.equal(b.match(/<details>/g)?.length, 1, `exercice ${i + 1} : un seul <details>`);
      assert.ok(b.includes('<summary>Corrigé</summary>') && b.includes('</details>'), `exercice ${i + 1} : <summary>Corrigé</summary> ... </details>`);
    });
  });
}
