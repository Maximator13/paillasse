---
titre: "Afocal refracting telescope"
description: "Build a refracting telescope on an optical bench, follow the rays from the objective to the eye and measure the magnification from the angles."
niveau: terminale
theme: ondes
matiere: physique
ordre: 18
duree: "1 h 30"
chapitre: "lunette-astronomique"
objectifs:
  - "Model a refracting telescope with two thin converging lenses"
  - "Trace the path of a beam coming from an object at infinity"
  - "Adjust the telescope to make it afocal"
  - "Measure the magnification and compare it with f'1/f'2"
materiel:
  - "Graduated optical bench and riders"
  - "Converging lens of focal length 40 cm (objective)"
  - "Converging lens of focal length 8 cm (eyepiece)"
  - "Object at infinity: light source, test target and collimating lens"
  - "Ground-glass screen on a stand"
  - "Model eye (10 cm lens and screen) or viewing telescope"
  - "Graduated ruler"
---

## Principle

A refracting telescope combines two converging lenses with the same optical axis: an **objective** $L_1$ with a long focal length $f'_1$, pointed towards the celestial object, and an **eyepiece** $L_2$ with a short focal length $f'_2$, behind which the eye is placed.

The celestial object is so far away that the light from any one of its points arrives as a parallel beam, inclined at an angle $\theta$ to the axis. The objective forms an **intermediate image** $A_1B_1$ of it, real and inverted, in its image focal plane. The eyepiece then acts as a magnifying glass. If its object focal point $F_2$ coincides with $F'_1$, the final image is sent to infinity: the telescope is **afocal** and a normal eye observes without accommodating. The image is seen at an angle $\theta'$, and the magnification is:

$$
G = \frac{\theta'}{\theta}
$$

## Method

1. Place the objective on the bench, facing the object at infinity. Move the screen until a sharp image is obtained: it forms at the distance $f'_1$ from $O_1$. Measure its size $A_1B_1$.
2. Remove the screen and fit the eyepiece. Move it closer until the emergent beam is parallel (sharp image on the screen of the model eye). Then record the distance $O_1O_2$.
3. On the diagram, draw the ray that passes through $B_1$ and $O_2$: it is not deviated and gives the direction of the emergent beam. Mark the angles $\theta$ and $\theta'$.
4. Vary the direction of the object, record $\theta'$ for each value of $\theta$, then plot $\theta' = f(\theta)$.
5. Look at the object with the naked eye, then through the telescope. Compare the apparent size and the orientation of the image.

## Analysis

In the triangles $O_1A_1B_1$ and $O_2A_1B_1$, right-angled at $A_1$:

$$
\tan\theta = \frac{A_1B_1}{f'_1} \qquad\text{and}\qquad \tan\theta' = \frac{A_1B_1}{f'_2}
$$

Since the angles are small, $\tan\theta \approx \theta$ (in radians), hence:

$$
G = \frac{\theta'}{\theta} = \frac{f'_1}{f'_2}
$$

With $f'_1 = 40\ \mathrm{cm}$ and $f'_2 = 8.0\ \mathrm{cm}$, the afocal telescope has a length $O_1O_2 = f'_1 + f'_2 = 48\ \mathrm{cm}$ and $G = 5.0$. For $\theta = 1.0°$, the intermediate image measures $A_1B_1 = f'_1 \tan\theta = 7.0\ \mathrm{mm}$ and the reading is $\theta' = 5.0°$.

The points on the graph lie on a straight line through the origin: its gradient is the magnification. The dashed line of gradient 1 corresponds to observation with the naked eye.

On the diagram in the animation, heights are stretched ten times so that the angles remain visible: straight lines and points of intersection are preserved, but the angles cannot be measured with a protractor on the screen.

## Questions

1. Why does the intermediate image form in the image focal plane of the objective?
2. In the animation, increase $f'_1$ to 50 cm without changing the eyepiece. How do the length of the telescope, the size of $A_1B_1$ and the magnification change?
3. Then set $f'_2$ to 5.0 cm. What does the gradient of the line become? What practical drawback comes with this gain?

<details>
<summary>Show answers</summary>

1. The object is at infinity: the rays from any one point arrive parallel to each other and, after the objective, converge at a point in the image focal plane.
2. The telescope gets longer ($O_1O_2 = 58\ \mathrm{cm}$), the intermediate image gets larger ($A_1B_1 = 8.7\ \mathrm{mm}$ for $\theta = 1.0°$) and the magnification rises from 5.0 to 6.3.
3. The gradient is $G = 50/5.0 = 10$. The emergent beam is ten times narrower than the incident beam: the eye must be placed closer to the eyepiece and more precisely, and the image of an extended object is dimmer.

</details>

## Safety

Never point a telescope at the Sun: the objective concentrates the light and the burn to the retina is immediate and irreversible. Handle the lenses by their mounts.
