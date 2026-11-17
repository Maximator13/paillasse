// Électrolyse de l'eau acidifiée : transformation forcée par un générateur. Fonctions pures, sans dépendance.
// Cathode (réduction) : 2 H+ + 2 e- = H2.  Anode (oxydation) : 2 H2O = O2 + 4 H+ + 4 e-.

/** Constante de Faraday (C/mol) : charge d'une mole d'électrons. */
export const F = 96500;
/** Volume molaire des gaz à 20 °C sous pression atmosphérique (L/mol). */
export const VM = 24.0;

/** Charge électrique (C) débitée par un courant d'intensité i (A) pendant dt (s) : Q = I.Δt. */
export const charge = (i: number, dt: number) => i * dt;

/** Quantité d'électrons échangés (mol) : n(e-) = Q/F. */
export const quantiteElectrons = (q: number) => q / F;

/** Quantité de dihydrogène formé à la cathode (mol) : 2 électrons par molécule. */
export const quantiteH2 = (q: number) => quantiteElectrons(q) / 2;

/** Quantité de dioxygène formé à l'anode (mol) : 4 électrons par molécule. */
export const quantiteO2 = (q: number) => quantiteElectrons(q) / 4;

/** Volume (mL) occupé par n moles de gaz. */
export const volumeGaz = (n: number, vm = VM) => n * vm * 1000;

/** Volume de dihydrogène (mL) recueilli après dt secondes sous l'intensité i (A). */
export const volumeH2 = (i: number, dt: number) => volumeGaz(quantiteH2(charge(i, dt)));

/** Volume de dioxygène (mL) recueilli après dt secondes sous l'intensité i (A). */
export const volumeO2 = (i: number, dt: number) => volumeGaz(quantiteO2(charge(i, dt)));

/** Lecture d'un volume sur un tube gradué : arrondi à la graduation la plus proche (0,2 mL par défaut). */
export const lecture = (v: number, graduation = 0.2) => Math.round(v / graduation) * graduation;

/**
 * Tension (V) aux bornes de l'électrolyseur traversé par un courant i (A), modèle du récepteur U = E' + r'.I.
 * E' = 1,7 V : seuil d'électrolyse (1,23 V en théorie, plus les surtensions aux électrodes). r' = 8,0 Ω.
 */
export const tension = (i: number) => 1.7 + 8.0 * i;
