---
titre: "Sound waves: intensity, decibels and the Doppler effect"
description: "Sound intensity, level in decibels, geometric attenuation and attenuation by absorption, then the Doppler effect: frequency shift and applications."
niveau: terminale
theme: ondes
ordre: 20
duree: "30 min"
motsCles: ["sound intensity", "decibel", "attenuation", "Doppler effect", "frequency shift"]
tp: ["effet-doppler"]
---

> **The essentials.** A sound wave carries energy: it is measured by the **sound intensity** $I$ (in $\mathrm{W \cdot m^{-2}}$), but the ear perceives it on a logarithmic scale, the **sound intensity level** $L$ (in decibels). This level decreases with distance (geometric attenuation) and through absorption in the medium. When the source and the observer are in relative motion, the perceived frequency differs from the emitted frequency: this is the **Doppler effect**.

## 1. Sound intensity

A sound wave is a progressive mechanical wave: it carries energy without carrying matter. A source of **sound power** $P$ (in watts) spreads this energy over larger and larger surfaces as the wave travels away.

> **Definition.** The sound intensity $I$ is the sound power received per unit area perpendicular to the direction of propagation:
>
> $$
> I = \dfrac{P}{S} \qquad I \text{ in } \mathrm{W \cdot m^{-2}},\ P \text{ in } \mathrm{W},\ S \text{ in } \mathrm{m^2}
> $$
>

For a point source that emits identically in all directions (an **isotropic** source), the power is spread over a sphere of radius $r$, of surface area $4\pi r^2$:

$$
I = \frac{P}{4\pi r^2}
$$

The human ear perceives an extraordinarily wide range of intensities: from $I_0 = 1.0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}$ (the **threshold of hearing** at $1\ \mathrm{kHz}$) up to about $1\ \mathrm{W \cdot m^{-2}}$ (the **threshold of pain**), that is twelve orders of magnitude. A linear scale would be unusable.

## 2. Sound intensity level

The sensation of hearing varies roughly as the logarithm of the intensity. A logarithmic quantity is therefore defined.

> **Definition.** The sound intensity level $L$, expressed in decibels ($\mathrm{dB}$), is:
>
> $$
> L = 10 \log\left(\dfrac{I}{I_0}\right) \qquad \text{with } I_0 = 1.0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}
> $$
>

Conversely, $I = I_0 \times 10^{L/10}$.

| Situation | $I$ ($\mathrm{W \cdot m^{-2}}$) | $L$ ($\mathrm{dB}$) |
|---|---|---|
| Threshold of hearing | $10^{-12}$ | $0$ |
| Conversation | $10^{-6}$ | $60$ |
| Busy street | $10^{-4}$ | $80$ |
| Danger threshold (prolonged exposure) | about $3 \times 10^{-4}$ | $85$ |
| Concert, nightclub | $10^{-2}$ | $100$ |
| Threshold of pain | $1$ | $120$ |

Important consequences of the logarithmic nature of the scale:

- **multiplying $I$ by 2** adds about $3\ \mathrm{dB}$ (because $10 \log 2 \approx 3.0$);
- **multiplying $I$ by 10** adds exactly $10\ \mathrm{dB}$;
- **levels do not add up**: it is the intensities that add. Two identical sources of $70\ \mathrm{dB}$ together produce $73\ \mathrm{dB}$, not $140\ \mathrm{dB}$.

## 3. Attenuation of a sound wave

> **Definition.** The attenuation $A$ (in $\mathrm{dB}$) between two points is the decrease in the sound intensity level:
>
> $$
> A = L_1 - L_2 = 10 \log\left(\dfrac{I_1}{I_2}\right)
> $$
>

Two phenomena are responsible for it.

**Geometric attenuation.** Even with no loss of energy at all, the intensity decreases because the power is spread over a larger and larger surface. For an isotropic source, $I$ is proportional to $\dfrac{1}{r^2}$:

$$
A = 10 \log\left(\frac{r_2^2}{r_1^2}\right) = 20 \log\left(\frac{r_2}{r_1}\right)
$$

Doubling the distance from the source therefore reduces the level by $20 \log 2 \approx 6\ \mathrm{dB}$.

**Attenuation by absorption.** Part of the energy of the wave is transferred to the medium it passes through and converted into thermal energy. It depends on the material (porous, soft materials, such as rock wool or foam, absorb a great deal) and on the frequency: in air, high-pitched sounds are absorbed more than low-pitched sounds. This is why it is mostly the bass of a distant concert that can be heard. **Hearing protection** and the **sound insulation** of buildings make use of this phenomenon.

## 4. The Doppler effect

When an ambulance approaches, its siren sounds higher-pitched; when it moves away, lower-pitched. Yet the emitted frequency does not change.

> **Definition.** The Doppler effect is the change in the frequency perceived by a receiver when the emitter and the receiver are moving relative to each other. The **Doppler shift** is $\Delta f = f_R - f_E$.

**Deriving the expression (moving emitter, stationary receiver, in one dimension).** An emitter produces a wave of frequency $f_E$, of period $T_E = \dfrac{1}{f_E}$, which propagates at speed $c$. It moves towards the receiver at speed $v$ (with $v < c$).

- Between two successive emitted maxima, the wave travels the distance $c\,T_E$.
- During this time, the emitter moves forward by $v\,T_E$ in the same direction.
- The two maxima are therefore separated, in front of the emitter, by $\lambda_R = c\,T_E - v\,T_E = (c - v)\,T_E$.

The stationary receiver receives these maxima at speed $c$, hence $f_R = \dfrac{c}{\lambda_R} = \dfrac{c}{(c - v)\,T_E}$.

If the emitter is approaching:

$$
f_R = f_E \times \frac{c}{c - v}
$$

If the emitter is moving away (same reasoning, behind it):

$$
f_R = f_E \times \frac{c}{c + v}
$$

When the emitter approaches, $f_R > f_E$: the sound is higher-pitched. When it moves away, $f_R < f_E$: the sound is lower-pitched.

**Case of a speed that is small compared with the wave speed.** If $v \ll c$, the shift can be approximated by:

$$
\frac{|\Delta f|}{f_E} \approx \frac{v}{c} \qquad \text{that is} \qquad v \approx c \times \frac{|\Delta f|}{f_E}
$$

The relative shift is proportional to the speed: measuring $\Delta f$ therefore makes it possible to **measure a speed**.

## 5. Applications of the Doppler effect

The Doppler effect applies to all waves, sound waves as well as electromagnetic waves (with $c = 3.00 \times 10^{8}\ \mathrm{m \cdot s^{-1}}$ for light).

| Field | Wave used | Quantity measured |
|---|---|---|
| Speed camera radar | radio waves | speed of vehicles |
| Doppler ultrasound scan | ultrasound | speed of blood in the vessels |
| Astrophysics | light | radial velocity of stars and galaxies, detection of exoplanets |
| Meteorology | radio waves | speed of raindrops, of winds |

In a radar or an ultrasound scan, the wave is **reflected** by the moving target: the shift occurs twice and, for $v \ll c$, is $|\Delta f| \approx 2 f_E \dfrac{v}{c}$.

In astrophysics, a galaxy that is moving away shows spectral lines shifted towards longer wavelengths: this is the **redshift**, which revealed the expansion of the Universe.

## Worked example

A loudspeaker, treated as an isotropic source, emits a sound power $P = 0.50\ \mathrm{W}$. In air, $c = 340\ \mathrm{m \cdot s^{-1}}$.

1. Calculate the sound intensity $I$ and the level $L$ at $r = 10\ \mathrm{m}$ from the loudspeaker.
2. What geometric attenuation is experienced on going from $10\ \mathrm{m}$ to $40\ \mathrm{m}$?
3. An ambulance whose siren emits at $f_E = 680\ \mathrm{Hz}$ approaches a stationary pedestrian at $v = 25\ \mathrm{m \cdot s^{-1}}$ ($90\ \mathrm{km \cdot h^{-1}}$). Calculate the perceived frequency, then compare with the approximation $v \ll c$.

<details>
<summary>Show the solution</summary>

1. The power is spread over a sphere of radius $r$:

$$
I = \frac{P}{4\pi r^2} = \frac{0.50}{4\pi \times 10^2} = 4.0 \times 10^{-4}\ \mathrm{W \cdot m^{-2}}
$$

$$
L = 10 \log\left(\frac{4.0 \times 10^{-4}}{1.0 \times 10^{-12}}\right) = 10 \log\left(4.0 \times 10^{8}\right) = 86\ \mathrm{dB}
$$

2. The distance is multiplied by 4:

$$
A = 20 \log\left(\frac{40}{10}\right) = 20 \log 4 = 12\ \mathrm{dB}
$$

The level therefore goes from $86\ \mathrm{dB}$ to $74\ \mathrm{dB}$ (not taking absorption into account).

3. The emitter is approaching the stationary receiver:

$$
f_R = f_E \times \frac{c}{c - v} = 680 \times \frac{340}{340 - 25} = 734\ \mathrm{Hz}
$$

With the approximation $v \ll c$: $\Delta f \approx f_E \dfrac{v}{c} = 680 \times \dfrac{25}{340} = 50\ \mathrm{Hz}$, that is $f_R \approx 730\ \mathrm{Hz}$. The difference from the exact value is less than $1\ \%$: the approximation is justified because $\dfrac{v}{c} \approx 0.07$.

</details>

## Key points

- Sound intensity: $I = \dfrac{P}{S}$, and for an isotropic source $I = \dfrac{P}{4\pi r^2}$.
- Sound intensity level: $L = 10 \log\left(\dfrac{I}{I_0}\right)$ with $I_0 = 1.0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}$.
- Attenuation: $A = L_1 - L_2$; geometric (spreading over an increasing surface, $-6\ \mathrm{dB}$ when the distance doubles) or by absorption (depends on the medium and on the frequency).
- Doppler effect: $f_R = f_E \dfrac{c}{c \mp v}$ (minus sign if the emitter is approaching); for $v \ll c$, $\dfrac{|\Delta f|}{f_E} \approx \dfrac{v}{c}$.

## Common mistakes

- **Adding decibels**: add the intensities, then calculate the level.
- Believing that the intensity is inversely proportional to $r$: it varies as $\dfrac{1}{r^2}$.
- Thinking that the **emitted** frequency changes: only the **perceived** frequency is modified.
- Getting the sign wrong: an approaching emitter always gives $f_R > f_E$, check that the result makes sense.
- Forgetting the factor of 2 in the shift when the wave is reflected by a moving target (radar, ultrasound scan).
