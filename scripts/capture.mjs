// Capture d'écran d'une page du serveur de développement, avec le Chrome installé.
// Usage : node scripts/capture.mjs <chemin> [sortie.png] [--mobile] [--el <selecteur>] [--bandeau] [--sombre] [--port 4321] [--base paillasse]
// --sombre : thème sombre forcé (réglage de l'appareil et choix mémorisé) ; sans lui, thème clair.
// --base (ou la variable BASE_PATH) : sous-chemin du serveur quand il est lancé avec BASE_PATH ; inutile sinon.
// Exemples :
//   node scripts/capture.mjs "dev/planche/titrage-ph-metrique/?lang=en"                planche en anglais
//   node scripts/capture.mjs en/terminale/                                             page anglaise
//   node scripts/capture.mjs /dev/planche/titrage-ph-metrique/                       planche de toutes les étapes
//   node scripts/capture.mjs "/terminale/tp/titrage-ph-metrique/?etape=3&t=0.6" --el .lecteur   image figée du lecteur
//   node scripts/capture.mjs /terminale/cours/titrages/ --mobile                       page entière en largeur mobile
//   node scripts/capture.mjs "terminale/tp/satellite-kepler/?vue=3d&etape=3&t=0.6" --el .lecteur   vue 3D figée
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const args = process.argv.slice(2);
const opt = (nom) => { const i = args.indexOf(nom); return i < 0 ? null : args.splice(i, 2)[1]; };
const drapeau = (nom) => { const i = args.indexOf(nom); if (i < 0) return false; args.splice(i, 1); return true; };
const port = opt('--port') ?? '4321', baseOpt = opt('--base') ?? process.env.BASE_PATH ?? '', selecteur = opt('--el'), mobile = drapeau('--mobile'), bandeau = drapeau('--bandeau'), sombre = drapeau('--sombre');
if (!args[0]) { console.error('Chemin manquant. Voir l\'en-tête du script.'); process.exit(1); }
// Git Bash transforme "/dev/x" en "C:/Program Files/Git/dev/x" : on retire ce préfixe. Le chemin peut aussi être donné sans "/" initial.
const propre = (c) => '/' + c.replace(/^[A-Za-z]:[\\/].*?[\\/]Git(?=[\\/])/, '').replace(/^[\\/]+/, '');
const chemin = propre(args[0]);
const base = propre(baseOpt).replace(/\/+$/, '');
const sortie = args[1] ?? `.captures/${chemin.replace(/[^a-z0-9]+/gi, '_')}${mobile ? '_mobile' : ''}.png`;

// WebGL sans affichage (vue 3D, ?vue=3d) : rendu logiciel SwiftShader autorisé si le GPU n'est pas accessible.
const nav = await chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await nav.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1360, height: 900 }, deviceScaleFactor: mobile ? 2 : 1, colorScheme: sombre ? 'dark' : 'light' });
// Sans --bandeau, un refus de mesure d'audience est mémorisé avant le chargement : le bandeau ne masque pas le contenu.
await page.addInitScript((t) => { try { localStorage.setItem('paillasse-theme', t); } catch {} }, sombre ? 'dark' : 'light');
if (!bandeau) await page.addInitScript(() => { try { localStorage.setItem('paillasse-consentement', 'refuse'); } catch {} });
const erreurs = [];
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()));
page.on('pageerror', (e) => erreurs.push(String(e)));
await page.goto(`http://localhost:${port}${base}${chemin}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Amène chaque scène à l'écran et attend qu'elle soit montée (les vignettes se chargent à leur entrée dans l'écran).
const nonPretes = await page.evaluate(async () => {
  let n = 0;
  for (const r of document.querySelectorAll('#planche, [data-lecteur]')) {
    r.scrollIntoView({ block: 'center', behavior: 'instant' });
    for (let i = 0; i < 100 && !(r.dataset.pret || r.dataset.erreur); i++) await new Promise((ok) => setTimeout(ok, 100));
    if (!(r.dataset.pret || r.dataset.erreur)) n++;
  }
  scrollTo({ top: 0, behavior: 'instant' });
  return n;
});
if (nonPretes) erreurs.push(nonPretes + ' scène(s) non montée(s) après 10 s');
await page.waitForTimeout(300);
mkdirSync(dirname(sortie), { recursive: true });
if (selecteur) await page.locator(selecteur).first().screenshot({ path: sortie });
else await page.screenshot({ path: sortie, fullPage: true });
await nav.close();
console.log(`Capture : ${sortie}`);
if (erreurs.length) { console.error('ERREURS CONSOLE :\n' + erreurs.join('\n')); process.exit(2); }
