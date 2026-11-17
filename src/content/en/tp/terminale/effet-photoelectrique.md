---
titre: "The photoelectric effect and the Planck constant"
description: "Shine photons of increasing frequency on a cathode, find the emission threshold and obtain the Planck constant from the straight line you plot."
niveau: terminale
theme: ondes
matiere: physique
ordre: 19
duree: "1 h"
chapitre: "effet-photoelectrique"
objectifs:
  - "Show that a threshold frequency exists"
  - "Distinguish the role of frequency from that of light intensity"
  - "Use Einstein's straight line to measure h and the work function"
materiel:
  - "Vacuum photoelectric cell (potassium cathode)"
  - "Mercury vapour lamp and set of coloured filters"
  - "Diaphragm to adjust the light intensity"
  - "Microammeter"
  - "Variable voltage supply and voltmeter (stopping potential)"
  - "Connecting leads"
---

## Principle

Light of frequency $\nu$ is made up of photons, each of energy $E = h\nu$. When a photon is absorbed by the metal of the cathode, it gives all its energy to one electron. If this energy exceeds the **work function** $W$ of the metal, the electron is ejected and carries away the surplus as kinetic energy:

$$
E_{c\,\mathrm{max}} = h\nu - W
$$

Emission therefore occurs only if $\nu > \nu_0$, with the **threshold frequency** $\nu_0 = \dfrac{W}{h}$. The light intensity sets the number of photons received per second, and so the number of electrons emitted, but not their energy.

## Method

1. Connect the cathode and the anode of the cell to the microammeter. Place the lamp facing the cathode.
2. Illuminate with red light ($\nu = 4.3 \times 10^{14}\ \mathrm{Hz}$). Open the diaphragm fully: record the current.
3. Change the filter to increase the frequency, from red towards the ultraviolet. For each frequency, note whether a current appears and measure $E_{c\,\mathrm{max}}$ (using the stopping potential $U_0$ that reduces the current to zero: $E_{c\,\mathrm{max}} = e\,U_0$).
4. At a fixed frequency, vary the light intensity and record the current as well as $E_{c\,\mathrm{max}}$.
5. Plot $E_{c\,\mathrm{max}} = f(\nu)$ and fit a straight line to the rising part.

## Analysis

In red light, the current stays at zero whatever the intensity: a red photon carries $1.78\ \mathrm{eV}$, less than the work function of potassium ($W = 2.3\ \mathrm{eV}$). The wave model, which predicts a gradual build-up of energy, cannot explain this.

Above the threshold, the points lie on a straight line of gradient $h$ and y-intercept $-W$. With the energies in electronvolts, the gradient is $4.14 \times 10^{-15}\ \mathrm{eV \cdot s}$, that is:

$$
h = 4.14 \times 10^{-15} \times 1.602 \times 10^{-19} = 6.63 \times 10^{-34}\ \mathrm{J \cdot s}
$$

The line crosses the horizontal axis at the threshold frequency:

$$
\nu_0 = \frac{W}{h} = \frac{2.3 \times 1.602 \times 10^{-19}}{6.63 \times 10^{-34}} = 5.56 \times 10^{14}\ \mathrm{Hz}
$$

For $\nu = 7.5 \times 10^{14}\ \mathrm{Hz}$, we read $E_{c\,\mathrm{max}} = 3.10 - 2.3 = 0.80\ \mathrm{eV}$, a value that does not move when the intensity varies, whereas the current is proportional to it.

## Questions

1. Why does very intense red light eject no electrons from potassium?
2. In the animation, set the frequency to $7.5 \times 10^{14}\ \mathrm{Hz}$ and then increase the work function. From what value of $W$ does the current fall to zero? Does the gradient of the line change?
3. Raise the light intensity from 20% to 100%. What happens to the current and to $E_{c\,\mathrm{max}}$?

<details>
<summary>Show answers</summary>

1. Each electron interacts with only one photon. A red photon carries $1.78\ \mathrm{eV}$, which is less than $W$: increasing the number of photons makes no difference.
2. A photon of this frequency carries $3.10\ \mathrm{eV}$: the current falls to zero as soon as $W$ exceeds this value (slider at 3.2 eV). The line shifts to the right, but its gradient remains equal to $h$, a universal constant.
3. The current is multiplied by 5 (from 0.16 to 0.80 µA), because five times as many photons arrive each second. $E_{c\,\mathrm{max}}$ stays equal to 0.80 eV: it depends only on the frequency and on the metal.

</details>

## Safety

The mercury vapour lamp emits ultraviolet radiation: never look directly at the source and leave its cover in place. The lamp gets hot, so wait for it to cool down before handling it.
