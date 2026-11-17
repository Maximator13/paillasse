---
titre: "Doppler effect: measuring a speed with a microphone"
description: "Move a sound source past a microphone, watch the wavefronts bunch up ahead of it and work out its speed from the frequency shift."
niveau: terminale
theme: ondes
matiere: physique
ordre: 15
duree: "1 h"
chapitre: "ondes-sonores"
objectifs:
  - "Describe the Doppler effect qualitatively using wavefronts"
  - "Analyse a recording of the frequency perceived by a stationary receiver"
  - "Determine the speed of a source from the Doppler shift"
materiel:
  - "Moving sound source (buzzer or horn) of fixed frequency"
  - "Straight track travelled at constant speed"
  - "Microphone and data-logging interface"
  - "Spectrum analysis software (frequency against time)"
  - "Measuring tape to position the microphone"
---

## Principle

A source emits a sound of frequency $f_E$ which travels through air at speed $c = 340\ \mathrm{m \cdot s^{-1}}$. Each wavefront is a circle centred on the point where it was emitted. If the source moves forward at speed $v$, it partly catches up with its own wavefronts: they are bunched together ahead of it and spread apart behind it.

> **Doppler effect.** The frequency perceived by a receiver differs from the emitted frequency when the source and the receiver are in relative motion.

For a stationary microphone and a source that moves towards it, then away from it:

$$
f_A = f_E\,\frac{c}{c - v} \qquad\text{and}\qquad f_B = f_E\,\frac{c}{c + v}
$$

The sound is higher in pitch on approach ($f_A > f_E$) and lower in pitch as the source moves away ($f_B < f_E$).

## Method

1. Place the microphone at distance $d$ from the track and connect it to the data-logging interface.
2. With the source at rest, record the sound and check that the measured frequency is indeed $f_E$ (here $680\ \mathrm{Hz}$).
3. Move the source past the microphone at constant speed. The time $t = 0$ corresponds to the point of closest approach to the microphone.
4. Plot the perceived frequency against time and read off the two plateaus: $f_A$ before the source passes, $f_B$ after.
5. Calculate the speed of the source.

## Analysis

Dividing one relation by the other eliminates the emitted frequency:

$$
\frac{f_A}{f_B} = \frac{c + v}{c - v} \quad\Longrightarrow\quad v = c\,\frac{f_A - f_B}{f_A + f_B}
$$

For $f_E = 680\ \mathrm{Hz}$ and $v = 25\ \mathrm{m \cdot s^{-1}}$, the theoretical plateaus are $f_A = 734\ \mathrm{Hz}$ and $f_B = 633\ \mathrm{Hz}$. With the microphone $10\ \mathrm{m}$ from the track, the 4 s recording gives $f_A = 733\ \mathrm{Hz}$ and $f_B = 634\ \mathrm{Hz}$, hence:

$$
v = 340 \times \frac{733 - 634}{733 + 634} \approx 24.6\ \mathrm{m \cdot s^{-1}}
$$

That is about 89 km/h. The animation, which keeps the decimal places of the frequencies, displays 24.5 m/s (88 km/h). The value is slightly below 25 m/s because, 2 s before it passes, the source is not yet heading exactly towards the microphone.

The wavelengths confirm the diagram: $\lambda = \dfrac{c}{f_E} = 0.50\ \mathrm{m}$ at rest, $\dfrac{c - v}{f_E} = 0.46\ \mathrm{m}$ ahead of the source and $\dfrac{c + v}{f_E} = 0.54\ \mathrm{m}$ behind it. In the animation, the sound is slowed down three times and only a few wavefronts are drawn, so that this difference can be seen with the naked eye; the values displayed, however, are the real values.

The switch is not instantaneous: only the component of the velocity directed towards the microphone matters, and it is zero at the point of closest approach. The perceived frequency is then $f_E$.

## Questions

1. Why does the relation giving $v$ not involve $f_E$? What is the practical advantage?
2. In the animation, increase the speed of the source to $40\ \mathrm{m \cdot s^{-1}}$. How do the wavefronts and the gap between the two plateaus change?
3. Move the microphone out to $30\ \mathrm{m}$ with a slow source ($10\ \mathrm{m \cdot s^{-1}}$). What happens to the switch? Is the measured speed still correct?

<details>
<summary>Show answers</summary>

1. The ratio $f_A / f_B$ eliminates $f_E$: the speed of a vehicle can be measured without knowing the frequency of its horn.
2. The wavefronts bunch together more ahead of the source and spread further apart behind it. The gap $f_A - f_B$, close to $2 f_E\,v/c$, increases: on the recording, it goes from about 99 Hz to 161 Hz (100 Hz and 162 Hz for the theoretical plateaus).
3. The switch is spread over the whole duration of the recording and the plateaus are not reached: the source never heads squarely towards the microphone. The measured speed is a clear underestimate (less than 6 m/s instead of 10). The microphone must be placed close to the track, or the recording must last longer.

</details>
