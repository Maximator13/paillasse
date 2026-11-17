---
titre: "Parabolic motion: video tracking of a projectile"
description: "Track a ball frame by frame, draw its velocity and acceleration vectors, then compare the trajectory with the parabola predicted by the model."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 10
duree: "1 h 30"
chapitre: "mouvement-champ-uniforme"
objectifs:
  - "Produce the chronophotograph of a motion by video tracking"
  - "Draw the velocity and acceleration vectors from the positions"
  - "Compare the tracked trajectory with the parabola predicted by the model"
  - "Measure the maximum height and the range of a shot"
materiel:
  - "Adjustable spring launcher, with protractor"
  - "Small, dense ball"
  - "Camera or smartphone on a tripod (25 frames per second)"
  - "1.00 m reference rule"
  - "Plain background and sufficient lighting"
  - "Computer with tracking software and a spreadsheet"
---

## Principle

A ball launched with an initial velocity $\vec{v_0}$, inclined at an angle $\alpha$ above the horizontal, is subject only to its weight if the effect of the air is neglected. Newton's second law then gives $\vec{a} = \vec{g}$: the acceleration is vertical, directed downwards, and does not depend on the mass.

In the frame $(O\,;x,y)$, with $O$ on the ground vertically below the launcher and $h$ the launch height, the equations of motion are:

$$
x(t) = v_0 \cos\alpha \; t
$$

$$
y(t) = -\tfrac{1}{2}\,g\,t^2 + v_0 \sin\alpha \; t + h
$$

Video tracking gives the successive positions of the ball. The velocities are deduced from them, then the trajectory is compared with the model.

## Method

1. Place the camera on its tripod, facing the motion squarely, several metres from the plane of the motion. Set the reference rule in this plane, adjust the angle of the launcher and film the shot.
2. In the software, define the scale using the reference rule and the origin of the frame, then mark the centre of the ball on each image: this gives the chronophotograph, with $\Delta t = 40\ \mathrm{ms}$ between two positions (the animation switches to 80 ms for the longest flights).
3. Calculate the components of the velocity at point $i$ using $v_x = \dfrac{x_{i+1} - x_{i-1}}{2\,\Delta t}$ (and similarly for $v_y$). Draw a few velocity vectors, then the acceleration vectors.
4. Superimpose the parabola of the model on the points and locate the highest point $S$.
5. Measure the maximum height and the range.

## Analysis

The graph shows that $v_x$ remains constant and that $v_y$ is a linear function of time: $v_y = -g\,t + v_0 \sin\alpha$. The gradient of this straight line is $-g$, that is $-9.81\ \mathrm{m \cdot s^{-2}}$.

Eliminating $t$ gives the equation of the trajectory:

$$
y = -\frac{g}{2\,v_0^2 \cos^2\alpha}\,x^2 + x\,\tan\alpha + h
$$

With $v_0 = 5.0\ \mathrm{m \cdot s^{-1}}$, $\alpha = 50°$ and $h = 0.80\ \mathrm{m}$ (default settings of the animation):

- the highest point is reached when $v_y = 0$, at $t_S = \dfrac{v_0 \sin\alpha}{g} = 0.39\ \mathrm{s}$;
- the maximum height is $y_S = h + \dfrac{(v_0 \sin\alpha)^2}{2g} = 1.55\ \mathrm{m}$;
- the ball hits the ground at $t_P = 0.95\ \mathrm{s}$, hence the range $x_P = v_0 \cos\alpha \; t_P = 3.06\ \mathrm{m}$.

## Questions

1. Why are the points of the chronophotograph evenly spaced horizontally, but not vertically?
2. In the animation, vary the launch angle from 20° to 70° without touching the other sliders. How do the maximum height and the range change? Is the range greatest at 45°?
3. Increase the initial speed. Does the gradient of the line $v_y(t)$ change? What happens to the acceleration vectors?

<details>
<summary>Show answers</summary>

1. No force acts horizontally: $v_x$ is constant and the ball covers the same horizontal distance during each $\Delta t$. Vertically, the weight changes $v_y$: the points get closer together on the way up, then spread apart on the way down.
2. The maximum height increases with the angle. The range passes through a maximum, obtained here at about 38° and not 45°: the ball starts from a non-zero height $h$, which favours slightly flatter shots.
3. No: the line shifts upwards (its intercept $v_0 \sin\alpha$ increases), but its gradient remains $-g$. The acceleration vectors all remain identical, equal to $\vec{g}$.

</details>

## Safety

Never stand in line with the launcher, and never aim at anyone. Clear the landing area before each shot.
