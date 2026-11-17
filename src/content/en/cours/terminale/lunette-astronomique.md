---
titre: "Refracting telescope: an afocal system"
description: "Objective, eyepiece and intermediate image: how two converging lenses magnify an object at infinity, and how to calculate the angular magnification."
niveau: terminale
theme: ondes
ordre: 22
duree: "25 min"
motsCles: ["refracting telescope", "thin lens", "afocal system", "angular magnification", "intermediate image", "angular size"]
tp: ["lunette-astronomique"]
---

> **In brief.** A refracting telescope combines two converging lenses: the **objective**, with a long focal length, and the **eyepiece**, with a short focal length. The image focal point of the objective coincides with the object focal point of the eyepiece: the telescope is **afocal**, so it forms, from an object at infinity, an image at infinity that subtends a larger angle. Its angular magnification is $G = \dfrac{f'_1}{f'_2}$.

## 1. Reminders about thin converging lenses

A **thin converging lens** is characterised by its optical centre $O$, its object focal point $F$ and its image focal point $F'$, which are symmetrical about $O$. Its **focal length** $f' = \overline{OF'}$ is positive.

Three particular rays are enough for any construction:

| Incident ray | Emergent ray |
|---|---|
| passing through the optical centre $O$ | not deviated |
| parallel to the optical axis | passes through the image focal point $F'$ |
| passing through the object focal point $F$ | emerges parallel to the optical axis |

> **Lens equation.** For an object $A$ on the axis and its image $A'$:
>
> $$
> \frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'}
> $$
>

The **linear magnification** is $\gamma = \dfrac{\overline{A'B'}}{\overline{AB}} = \dfrac{\overline{OA'}}{\overline{OA}}$.

Two limiting cases are essential for the telescope:

- an object **at infinity** (rays parallel to one another) gives an image in the **image focal plane**;
- an object placed in the **object focal plane** gives an image **at infinity** (emergent rays parallel to one another).

A ray parallel to the optical axis converges at $F'$; more generally, rays that are parallel to one another but inclined converge at a **secondary image focal point**, located at the intersection of the image focal plane and the ray of the beam that passes through $O$.

## 2. Structure of the telescope

A refracting telescope is made of two converging lenses sharing the same optical axis:

| Component | Role | Focal length |
|---|---|---|
| **Objective** $L_1$ | facing the object, it forms a real image of it | long: $f'_1$ of the order of a metre |
| **Eyepiece** $L_2$ | acts as a magnifying glass to observe this image | short: $f'_2$ of a few centimetres |

The object observed (a celestial body) is so distant that it is considered to be **at infinity**: the rays coming from a single point of the object arrive parallel to one another.

> **Definition.** An optical system is **afocal** if it forms, from an object at infinity, an image at infinity. For the telescope, this requires the image focal point of the objective and the object focal point of the eyepiece to coincide: $F'_1 = F_2$.

Advantage: a normal eye observes an image at infinity **without accommodating**, and therefore without strain. The length of the telescope is then $O_1O_2 = f'_1 + f'_2$.

## 3. Intermediate image and construction of the beam

Let $A$ be a point of the object located on the axis and $B$ a point located off the axis. The rays coming from $B$ reach the objective at an angle $\alpha$ to the optical axis (this angle is the angular size of the object, defined in section 4).

The image is formed in two steps:

$$
AB_{\,(\infty)} \xrightarrow{\ L_1\ } A_1B_1 \xrightarrow{\ L_2\ } A'B'_{\,(\infty)}
$$

1. **Through the objective.** Since the object is at infinity, its image $A_1B_1$, called the **intermediate image**, forms in the image focal plane of the objective: $A_1 = F'_1$. To locate $B_1$, draw the ray from $B$ that passes through $O_1$: it is not deviated and meets the image focal plane at $B_1$. All the other rays of the beam coming from $B$ also converge at $B_1$. This image is **real and inverted**.
2. **Through the eyepiece.** $A_1B_1$ lies in the object focal plane of the eyepiece (since $F'_1 = F_2$): its image $A'B'$ is **at infinity**. To find the direction of the emergent beam, draw the ray from $B_1$ passing through $O_2$: it is not deviated, and all the emergent rays are parallel to it.

To construct the **beam** coming from $B$ and limited by the objective, draw the two rays that strike the edges of $L_1$: they converge at $B_1$, then diverge as far as the eyepiece, from which they emerge parallel to the ray $B_1O_2$. The emergent beam is narrower and more inclined than the incident beam.

In the image focal plane of the objective, the size of the intermediate image is obtained from the triangle $O_1F'_1B_1$:

$$
\tan\alpha = \frac{A_1B_1}{f'_1} \quad\Longrightarrow\quad A_1B_1 \approx f'_1\,\alpha \quad (\alpha \text{ small, in radians})
$$

## 4. Angular magnification

The object is at infinity: its size has no meaning for the eye; only the angle it subtends matters.

> **Definition.** The **angular size** $\alpha$ of an object is the angle it subtends when seen with the naked eye. The **angular magnification** $G$ of an instrument is the ratio of the angular size $\alpha'$ of the image seen through the instrument to the angular size $\alpha$ of the object seen with the naked eye:
>
> $$
> G = \frac{\alpha'}{\alpha}
> $$
>

In the triangle $O_2F_2B_1$, the angle subtended by the image on leaving the eyepiece satisfies:

$$
\tan\alpha' = \frac{A_1B_1}{f'_2} \quad\Longrightarrow\quad \alpha' \approx \frac{A_1B_1}{f'_2}
$$

> **Angular magnification of an afocal telescope.** In the small-angle approximation ($\tan\alpha \approx \alpha$, angles in radians):
>
> $$
> G = \frac{\alpha'}{\alpha} = \frac{A_1B_1 / f'_2}{A_1B_1 / f'_1} = \frac{f'_1}{f'_2}
> $$
>

$G$ has no unit. To magnify, an objective with a **long** focal length and an eyepiece with a **short** focal length are needed. Changing the eyepiece therefore changes the angular magnification while keeping the same objective.

The final image is **inverted** relative to the object: this is no inconvenience for observing celestial bodies, but a terrestrial telescope adds an erecting system.

## Worked example

A refracting telescope has an objective of focal length $f'_1 = 900\ \mathrm{mm}$ and an eyepiece of focal length $f'_2 = 25\ \mathrm{mm}$. The Moon is observed; its angular size is $\alpha = 9.0 \times 10^{-3}\ \mathrm{rad}$.

1. What must the distance $O_1O_2$ between the two lenses be for the telescope to be afocal?
2. Calculate the size of the intermediate image $A_1B_1$.
3. Calculate the angular magnification $G$, then the angular size $\alpha'$ of the image of the Moon.

<details>
<summary>Show the solution</summary>

1. The telescope is afocal if $F'_1 = F_2$, so:

$$
O_1O_2 = f'_1 + f'_2 = 900 + 25 = 925\ \mathrm{mm}
$$

2. The intermediate image forms in the image focal plane of the objective, and the angle is small:

$$
A_1B_1 = f'_1\,\alpha = 900 \times 9.0 \times 10^{-3} = 8.1\ \mathrm{mm}
$$

3. The angular magnification is:

$$
G = \frac{f'_1}{f'_2} = \frac{900}{25} = 36
$$

hence $\alpha' = G\,\alpha = 36 \times 9.0 \times 10^{-3} = 0.32\ \mathrm{rad}$. Check: $\alpha' = \dfrac{A_1B_1}{f'_2} = \dfrac{8.1}{25} = 0.32\ \mathrm{rad}$. The Moon subtends an angle 36 times larger than with the naked eye.

</details>

## Key points

- The objective and the eyepiece are two **converging** lenses; $f'_1 \gg f'_2$.
- **Afocal** telescope: $F'_1 = F_2$, object and image at infinity, length $f'_1 + f'_2$.
- The **intermediate image** $A_1B_1$ is real, inverted, in the image focal plane of the objective: $A_1B_1 \approx f'_1\,\alpha$.
- Construction: the ray passing through the optical centre is not deviated and gives the direction of the whole beam.
- Angular magnification: $G = \dfrac{\alpha'}{\alpha} = \dfrac{f'_1}{f'_2}$.

## Common mistakes

- Confusing **angular magnification** (a ratio of angles) with **linear magnification** (a ratio of sizes): for an object at infinity, only the angular magnification has a meaning.
- Swapping the roles: the objective has the **longer** focal length, not the shorter.
- Expressing angles in degrees in $A_1B_1 = f'_1\,\alpha$: the small-angle approximation requires **radians**.
- Drawing an emergent beam that converges, or that is parallel to the optical axis: on leaving the eyepiece, the rays coming from $B$ are **parallel to one another** and to the ray $B_1O_2$.
