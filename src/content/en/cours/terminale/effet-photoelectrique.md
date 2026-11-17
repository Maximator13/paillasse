---
titre: "Photoelectric effect: light as a stream of photons"
description: "Photon energy, work function, energy balance, absorption and emission, photovoltaic cells, light sensors and LEDs."
niveau: terminale
theme: ondes
ordre: 23
duree: "30 min"
motsCles: ["photon", "photoelectric effect", "work function", "efficiency", "photovoltaic cell", "LED"]
tp: ["effet-photoelectrique"]
---

> **The essentials.** Light exchanges energy with matter in indivisible packets called **photons**, of energy $E = h\nu$. A photon ejects an electron from a metal only if its energy is at least equal to the **work function** $W$: this is the photoelectric effect, and the excess $h\nu - W$ becomes at most the kinetic energy of the electron. The same model explains the absorption and emission of photons by atoms, light sensors, photovoltaic cells (characterised by their efficiency) and light-emitting diodes.

## 1. The photon, quantum of light energy

The wave model describes diffraction and interference very well, but it fails to explain certain exchanges of energy between light and matter. In 1905, Einstein proposed that light is made up of **photons**.

> **Definition.** The photon is a particle of zero mass, travelling at speed $c$ in a vacuum and carrying a quantum of energy $E = h\nu = \dfrac{hc}{\lambda}$,
> with $h = 6.63 \times 10^{-34}\ \mathrm{J \cdot s}$ (Planck constant), $\nu$ the frequency in $\mathrm{Hz}$ and $\lambda$ the wavelength in a vacuum in $\mathrm{m}$.

At the atomic scale, energies are often expressed in **electronvolts**: $1\ \mathrm{eV} = 1.60 \times 10^{-19}\ \mathrm{J}$. A visible photon carries between about $1.6$ and $3.1\ \mathrm{eV}$: the shorter the wavelength, the more energetic the photon (a UV photon is more energetic than a red photon).

A beam of power $\mathcal{P}$ and frequency $\nu$ is a **stream of photons**: the number of photons carried per second is

$$
N = \frac{\mathcal{P}}{h\nu}
$$

This number is enormous: a red laser ($\lambda = 633\ \mathrm{nm}$) of $1\ \mathrm{mW}$ emits about $3 \times 10^{15}$ photons per second.

## 2. The photoelectric effect

A negatively charged zinc plate discharges when it is illuminated with ultraviolet light, but not with visible light, even very intense visible light. Light ejects electrons from the metal: this is the **photoelectric effect**.

The experimental observations are as follows:

| Observation | What the wave model predicts | What the photon model explains |
|---|---|---|
| There is a **threshold frequency** $\nu_0$ below which no electron is emitted | emission should eventually occur at high intensity | a photon with too little energy cannot eject the electron, however many photons there are |
| Above the threshold, emission is **immediate** | an accumulation time would be needed | the photon-electron interaction is individual and instantaneous |
| The energy of the electrons depends on $\nu$, **not on the intensity** | it should increase with the intensity | each electron receives the energy $h\nu$ of a single photon; the intensity only sets the number of photons, and therefore of electrons emitted |

> **Definition.** The **work function** $W$ of a metal is the minimum energy that must be supplied to eject an electron from that metal. It depends on the metal: about $2.1\ \mathrm{eV}$ for caesium, $2.3\ \mathrm{eV}$ for sodium, $4.3\ \mathrm{eV}$ for zinc.

The photoelectric effect occurs if and only if $h\nu \geq W$. The threshold frequency and the threshold wavelength follow:

$$
\nu_0 = \frac{W}{h}
\qquad\text{and}\qquad
\lambda_0 = \frac{hc}{W}
$$

The effect takes place for $\nu \geq \nu_0$, that is, for $\lambda \leq \lambda_0$.

## 3. Energy balance

During the interaction, a photon gives up **all** its energy to **a single** electron. Part of it is used to extract the electron, the rest ends up as kinetic energy:

> **Law.** The maximum kinetic energy of an electron emitted by the photoelectric effect is $E_{c,\max} = h\nu - W$.

The word "maximum" is a reminder that $W$ is the minimum energy required: a more tightly bound electron leaves with less energy. The curve $E_{c,\max} = f(\nu)$ is a **straight line** of gradient $h$ (the same for all metals) which crosses the horizontal axis at $\nu_0$.

From this we obtain the maximum speed of the emitted electrons, with $m_e = 9.11 \times 10^{-31}\ \mathrm{kg}$:

$$
v_{\max} = \sqrt{\frac{2\,E_{c,\max}}{m_e}}
$$

## 4. Absorption and emission of photons

The photon model applies to all exchanges of energy between light and matter. The energy of an atom is **quantised**: it can only take certain values $E_1, E_2, E_3, \dots$ called energy levels.

- **Absorption**: an atom in the state of energy $E_p$ absorbs a photon and moves to the higher level $E_n$ only if the energy of the photon exactly matches the gap, $h\nu = E_n - E_p$.
- **Emission**: when de-exciting from $E_n$ to $E_p$, the atom emits a photon of frequency $\nu = \dfrac{E_n - E_p}{h}$.

This is the origin of **line spectra**, of absorption or emission, which characterise each chemical element. In semiconductor solids, the levels form bands separated by a **band gap** of energy $E_g$ (the "gap"), which plays the same role as the gap between two levels.

## 5. Applications: photovoltaic cells, sensors and LEDs

**Photovoltaic cell.** A photon of energy $h\nu \geq E_g$ absorbed in the semiconductor (often silicon, $E_g = 1.1\ \mathrm{eV}$) frees an electron which contributes to a current: this is the **internal photoelectric effect**. The cell converts light energy into electrical energy.

> **Definition.** The efficiency of a photovoltaic cell is the ratio of the electrical power supplied to the light power received.

$$
\eta = \frac{\mathcal{P}_{\text{elec}}}{\mathcal{P}_{\text{light}}} = \frac{U\,I}{E \cdot S}
$$

where $E$ is the irradiance in $\mathrm{W \cdot m^{-2}}$ (not to be confused with the energy $E$ of a photon) and $S$ the illuminated area in $\mathrm{m^2}$.

The efficiency of commercial silicon cells is of the order of 15 to 22%. It is limited because photons of energy lower than $E_g$ are not absorbed and the excess energy of more energetic photons is lost as heat.

**Sensors.** Photodiodes, photoresistors and the CCD or CMOS sensors of cameras use the same principle: the number of electrons freed is proportional to the number of photons received, and therefore to the irradiance. Each pixel thus measures a quantity of light.

**Light-emitting diode (LED).** This is the reverse phenomenon: an electron that crosses the band gap in the opposite direction emits a photon of energy close to $E_g$. The colour of the LED therefore depends on the semiconductor material: $\lambda \approx \dfrac{hc}{E_g}$. An LED converts electrical energy into light with a much better efficiency than an incandescent lamp.

## Worked example

A sodium plate, of work function $W = 2.28\ \mathrm{eV}$, is illuminated with monochromatic light of wavelength $\lambda = 400\ \mathrm{nm}$.

Data: $h = 6.63 \times 10^{-34}\ \mathrm{J \cdot s}$, $c = 3.00 \times 10^{8}\ \mathrm{m \cdot s^{-1}}$, $1\ \mathrm{eV} = 1.60 \times 10^{-19}\ \mathrm{J}$, $m_e = 9.11 \times 10^{-31}\ \mathrm{kg}$.

1. Calculate the energy of a photon, in joules then in electronvolts.
2. Does the photoelectric effect occur? Calculate the threshold wavelength of sodium.
3. Calculate the maximum kinetic energy and the maximum speed of the emitted electrons.

<details>
<summary>Show the solution</summary>

1. Energy of the photon:

$$
E = \frac{hc}{\lambda} = \frac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{400 \times 10^{-9}} = 4.97 \times 10^{-19}\ \mathrm{J}
$$

that is, $E = \dfrac{4.97 \times 10^{-19}}{1.60 \times 10^{-19}} = 3.11\ \mathrm{eV}$.

2. $E = 3.11\ \mathrm{eV} > W = 2.28\ \mathrm{eV}$: the photoelectric effect occurs. With $W = 2.28 \times 1.60 \times 10^{-19} = 3.65 \times 10^{-19}\ \mathrm{J}$:

$$
\lambda_0 = \frac{hc}{W} = \frac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{3.65 \times 10^{-19}} = 5.45 \times 10^{-7}\ \mathrm{m} = 545\ \mathrm{nm}
$$

This confirms that $\lambda = 400\ \mathrm{nm} < \lambda_0$.

3. Energy balance:

$$
E_{c,\max} = E - W = 4.97 \times 10^{-19} - 3.65 \times 10^{-19} = 1.32 \times 10^{-19}\ \mathrm{J}\ (0.83\ \mathrm{eV})
$$

$$
v_{\max} = \sqrt{\frac{2 \times 1.32 \times 10^{-19}}{9.11 \times 10^{-31}}} = 5.38 \times 10^{5}\ \mathrm{m \cdot s^{-1}}
$$

</details>

## Key points

- Energy of a photon: $E = h\nu = \dfrac{hc}{\lambda}$; a beam of power $\mathcal{P}$ carries $N = \dfrac{\mathcal{P}}{h\nu}$ photons per second.
- Photoelectric effect if $h\nu \geq W$, that is, $\lambda \leq \lambda_0 = \dfrac{hc}{W}$.
- Energy balance: $E_{c,\max} = h\nu - W$.
- Absorption or emission between two levels: $h\nu = E_n - E_p$.
- Efficiency of a photovoltaic cell: $\eta = \dfrac{\mathcal{P}_{\text{elec}}}{E \cdot S}$.

## Common mistakes

- Believing that **more intense** light makes it possible to cross the threshold: only the frequency matters, the intensity only changes the number of electrons emitted.
- Mixing joules and electronvolts in the same calculation: convert before subtracting.
- Forgetting to convert nanometres to metres in $E = \dfrac{hc}{\lambda}$.
- Reversing the direction of the inequality: the effect occurs for $\lambda$ **less than** $\lambda_0$, not greater.
