import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  G, M_TERRE, R_TERRE, JOUR_SIDERAL, vitesse, periode, constanteKepler, masseDepuisPente, rayonPourPeriode,
  pente, anomalieExcentrique, positionEllipse, vitesseEllipse, aireBalayee,
} from './model.ts';

const proche = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) < tol, `${a} attendu proche de ${b}`);

test('ISS (altitude 408 km) : 7,66 km/s et un tour en 92,6 min', () => {
  const r = R_TERRE + 408e3;
  proche(vitesse(r) / 1e3, 7.66, 0.02);
  proche(periode(r) / 60, 92.6, 0.3);
});

test('satellite géostationnaire : rayon 42 200 km, altitude 35 800 km', () => {
  const r = rayonPourPeriode(JOUR_SIDERAL);
  proche(r / 1e3, 42164, 30);
  proche((r - R_TERRE) / 1e3, 35790, 30);
  proche(periode(r), JOUR_SIDERAL, 1e-6);
});

test('Lune (r = 384 400 km) : environ 27,4 jours', () => proche(periode(3.844e8) / 86400, 27.4, 0.2));

test('troisième loi : T²/r³ identique pour tous les satellites d\'un même astre', () => {
  const k = constanteKepler();
  proche(k * 1e14, 9.905, 0.01);
  for (const h of [408e3, 20200e3, 35786e3]) {
    const r = R_TERRE + h;
    proche(periode(r) ** 2 / r ** 3 / k, 1, 1e-12);
  }
});

test('la pente de T² = f(r³) redonne la masse de la Terre, et celle du Soleil avec l\'orbite terrestre', () => {
  const pts = [408e3, 12000e3, 20200e3, 35786e3].map((h) => [(R_TERRE + h) ** 3, periode(R_TERRE + h) ** 2] as [number, number]);
  proche(masseDepuisPente(pente(pts)) / M_TERRE, 1, 1e-9);
  const annee = 365.25 * 86400, ua = 1.496e11;
  proche(masseDepuisPente(annee ** 2 / ua ** 3) / 1e30, 1.99, 0.01);
});

test('équation de Kepler : périgée, apogée et solution exacte', () => {
  const a = 2.66e7, e = 0.7;
  assert.equal(anomalieExcentrique(1.3, 0), 1.3);
  for (const m of [0.2, 1, 2.5, 4, 6, 9]) {
    const E = anomalieExcentrique(m, e);
    proche(E - e * Math.sin(E), m, 1e-10);
  }
  proche(positionEllipse(0, a, e).r, a * (1 - e), 1e-3);
  proche(positionEllipse(Math.PI, a, e).r, a * (1 + e), 1e-3);
});

test('deuxième loi : aires égales balayées en des durées égales', () => {
  const a = 2.66e7, e = 0.6, T = periode(a), dt = 7200;
  // Aire du secteur balayé entre t0 et t0 + dt, par somme de triangles de sommet le foyer.
  const secteur = (t0: number, n = 4000) => {
    let s = 0, p = positionEllipse((2 * Math.PI * t0) / T, a, e);
    for (let i = 1; i <= n; i++) {
      const q = positionEllipse((2 * Math.PI * (t0 + (dt * i) / n)) / T, a, e);
      s += (p.x * q.y - q.x * p.y) / 2;
      p = q;
    }
    return s;
  };
  const auPerigee = secteur(-dt / 2), aLApogee = secteur(T / 2 - dt / 2), attendu = aireBalayee(a, e, dt);
  proche(auPerigee / attendu, 1, 1e-5);
  proche(aLApogee / attendu, 1, 1e-5);
});

test('ellipse : plus rapide au périgée, et vitesse circulaire retrouvée si r = a', () => {
  const a = 2.66e7, e = 0.6, rp = a * (1 - e), ra = a * (1 + e);
  proche(vitesseEllipse(a, a), vitesse(a), 1e-9);
  // Conservation du moment cinétique : rp.vp = ra.va.
  proche((rp * vitesseEllipse(rp, a)) / (ra * vitesseEllipse(ra, a)), 1, 1e-12);
  assert.ok(vitesseEllipse(rp, a) > vitesseEllipse(ra, a));
  proche(Math.sqrt((G * M_TERRE) / a), vitesse(a), 1e-9);
});
