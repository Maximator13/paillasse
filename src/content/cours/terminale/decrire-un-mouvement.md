---
titre: "Décrire un mouvement : position, vitesse et accélération"
description: "Vecteurs position, vitesse et accélération, coordonnées cartésiennes et repère de Frenet pour caractériser les mouvements rectilignes et circulaires."
niveau: terminale
theme: mouvement
ordre: 13
duree: "25 min"
motsCles: ["cinématique", "vecteur vitesse", "vecteur accélération", "repère de Frenet", "mouvement circulaire"]
tp: []
---

> **L'essentiel.** Décrire un mouvement, c'est donner à chaque instant la position d'un point dans un référentiel choisi. Le vecteur vitesse est la dérivée du vecteur position par rapport au temps, le vecteur accélération est la dérivée du vecteur vitesse. Leurs coordonnées, cartésiennes ou dans le repère de Frenet, permettent de nommer le mouvement : rectiligne ou circulaire, uniforme ou non.

## 1. Référentiel et vecteur position

Un mouvement n'a de sens que par rapport à un **référentiel** : un solide de référence auquel on associe un repère d'espace et une horloge. Les plus utilisés sont le référentiel terrestre, le référentiel géocentrique et le référentiel héliocentrique.

On étudie le mouvement d'un point $M$ (souvent le centre de masse du système) dans un repère $(O\,;\vec{i},\vec{j},\vec{k})$ orthonormé lié au référentiel.

> **Définition.** Le vecteur position du point $M$ à l'instant $t$ est $\overrightarrow{OM}(t) = x(t)\,\vec{i} + y(t)\,\vec{j} + z(t)\,\vec{k}$. Les fonctions $x(t)$, $y(t)$ et $z(t)$ sont les **équations horaires** du mouvement.

L'ensemble des positions successives de $M$ forme la **trajectoire**. On obtient son équation en éliminant le temps entre les équations horaires.

## 2. Vecteur vitesse

> **Définition.** Le vecteur vitesse du point $M$ est la dérivée par rapport au temps de son vecteur position, exprimé en $\mathrm{m \cdot s^{-1}}$ :
>
> $$
> \vec{v}(t) = \frac{\mathrm{d}\overrightarrow{OM}}{\mathrm{d}t}
> $$
>

En coordonnées cartésiennes, les vecteurs $\vec{i}$, $\vec{j}$, $\vec{k}$ sont fixes, donc on dérive chaque coordonnée :

$$
\vec{v} \begin{pmatrix} v_x = \dfrac{\mathrm{d}x}{\mathrm{d}t} \\[2mm] v_y = \dfrac{\mathrm{d}y}{\mathrm{d}t} \\[2mm] v_z = \dfrac{\mathrm{d}z}{\mathrm{d}t} \end{pmatrix}
\qquad
v = \|\vec{v}\| = \sqrt{v_x^2 + v_y^2 + v_z^2}
$$

Le vecteur vitesse est toujours **tangent à la trajectoire** et orienté dans le sens du mouvement. Sur une chronophotographie de pas $\tau$, on l'approche par $\vec{v}(t_i) \approx \dfrac{\overrightarrow{M_iM_{i+1}}}{\tau}$.

## 3. Vecteur accélération

> **Définition.** Le vecteur accélération est la dérivée par rapport au temps du vecteur vitesse, exprimé en $\mathrm{m \cdot s^{-2}}$ :
>
> $$
> \vec{a}(t) = \frac{\mathrm{d}\vec{v}}{\mathrm{d}t} = \frac{\mathrm{d}^2\overrightarrow{OM}}{\mathrm{d}t^2}
> $$
>

En coordonnées cartésiennes : $a_x = \dfrac{\mathrm{d}v_x}{\mathrm{d}t} = \dfrac{\mathrm{d}^2x}{\mathrm{d}t^2}$, et de même pour $a_y$ et $a_z$. Sur une chronophotographie, on l'approche par $\vec{a}(t_i) \approx \dfrac{\vec{v}_{i+1} - \vec{v}_i}{\tau}$.

Le vecteur accélération traduit **toute variation du vecteur vitesse** : variation de sa valeur (le mobile accélère ou freine) ou variation de sa direction (la trajectoire tourne). Un mobile qui roule à vitesse de valeur constante dans un virage a donc une accélération non nulle.

Le chemin inverse est aussi utile : connaissant $\vec{a}(t)$ et les conditions initiales ($\vec{v}_0$ et $\overrightarrow{OM}_0$), on retrouve $\vec{v}(t)$ puis $\overrightarrow{OM}(t)$ par recherche de **primitives**.

## 4. Mouvements rectilignes

La trajectoire est une droite : on choisit l'axe $(Ox)$ selon cette droite, et une seule coordonnée suffit.

| Mouvement | Accélération | Vitesse | Position |
|---|---|---|---|
| Rectiligne uniforme | $a_x = 0$ | $v_x = v_0$ | $x(t) = v_0\,t + x_0$ |
| Rectiligne uniformément accéléré | $a_x = a$ (constante) | $v_x(t) = a\,t + v_0$ | $x(t) = \dfrac{1}{2}a\,t^2 + v_0\,t + x_0$ |

Dans le mouvement **rectiligne uniforme**, le vecteur vitesse est constant : les points d'une chronophotographie sont alignés et équidistants. Dans le mouvement **rectiligne uniformément accéléré**, le vecteur accélération est constant et colinéaire à la trajectoire : les écarts entre points successifs augmentent régulièrement si $\vec{a}$ et $\vec{v}$ sont de même sens, diminuent s'ils sont de sens contraires (freinage).

## 5. Repère de Frenet et mouvements circulaires

Pour un mouvement circulaire de centre $O$ et de rayon $R$, les axes cartésiens sont peu adaptés. On utilise le **repère de Frenet** $(M\,;\vec{u}_T,\vec{u}_N)$, attaché au point mobile :

- $\vec{u}_T$ est **tangent** à la trajectoire, orienté dans le sens du mouvement ;
- $\vec{u}_N$ est **normal** à la trajectoire, orienté vers le centre $O$ du cercle.

> **Propriété.** Dans le repère de Frenet, pour un mouvement circulaire de rayon $R$ :
>
> $$
> \vec{v} = v\,\vec{u}_T \qquad \vec{a} = \frac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_T + \frac{v^2}{R}\,\vec{u}_N
> $$
>

La composante tangentielle $a_T = \dfrac{\mathrm{d}v}{\mathrm{d}t}$ rend compte de la variation de la valeur de la vitesse. La composante normale $a_N = \dfrac{v^2}{R}$, toujours positive, rend compte du changement de direction : elle est dirigée vers le centre.

| Mouvement circulaire | $a_T$ | $a_N$ | Direction de $\vec{a}$ |
|---|---|---|---|
| **Uniforme** ($v$ constante) | $0$ | $\dfrac{v^2}{R}$ constante | radiale, vers le centre (centripète) |
| **Non uniforme** ($v$ variable) | $\dfrac{\mathrm{d}v}{\mathrm{d}t} \neq 0$ | $\dfrac{v^2}{R}$ variable | inclinée vers l'intérieur du cercle |

Dans un mouvement circulaire uniforme, la valeur $a = \dfrac{v^2}{R}$ est constante mais le **vecteur** $\vec{a}$ ne l'est pas : il tourne avec le mobile en pointant toujours vers le centre.

## Exercice type

Partie A. Un chariot se déplace sur un rail rectiligne horizontal. Son abscisse vaut $x(t) = 1{,}5\,t^2 + 2{,}0\,t$, avec $x$ en mètres et $t$ en secondes.

1. Établir l'expression de $v_x(t)$ et de $a_x(t)$. Nommer le mouvement.
2. Calculer la vitesse à $t = 2{,}0\ \mathrm{s}$.

Partie B. Un TGV aborde une courbe circulaire de rayon $R = 5{,}0\ \mathrm{km}$ à la vitesse de valeur constante $v = 300\ \mathrm{km \cdot h^{-1}}$. Calculer la valeur de son accélération et préciser sa direction.

<details>
<summary>Voir la correction</summary>

**A.1.** En dérivant : $v_x(t) = 3{,}0\,t + 2{,}0$ (en $\mathrm{m \cdot s^{-1}}$), puis $a_x(t) = 3{,}0\ \mathrm{m \cdot s^{-2}}$. L'accélération est constante, la trajectoire est une droite et $a_x$ a le même signe que $v_x$ : le mouvement est **rectiligne uniformément accéléré**.

**A.2.** $v_x(2{,}0) = 3{,}0 \times 2{,}0 + 2{,}0 = 8{,}0\ \mathrm{m \cdot s^{-1}}$.

**B.** Conversion : $v = \dfrac{300}{3{,}6} = 83{,}3\ \mathrm{m \cdot s^{-1}}$. Le mouvement est circulaire uniforme, donc $a_T = 0$ et :

$$
a = a_N = \frac{v^2}{R} = \frac{(83{,}3)^2}{5{,}0 \times 10^{3}} = 1{,}4\ \mathrm{m \cdot s^{-2}}
$$

Le vecteur accélération est dirigé selon $\vec{u}_N$, vers le centre de la courbe (accélération centripète). Comme $a_N$ varie en $v^2$, les lignes à grande vitesse n'ont que des courbes de très grand rayon, et leurs voies sont inclinées vers l'intérieur pour le confort des passagers.

</details>

## À retenir

- $\vec{v} = \dfrac{\mathrm{d}\overrightarrow{OM}}{\mathrm{d}t}$ et $\vec{a} = \dfrac{\mathrm{d}\vec{v}}{\mathrm{d}t}$ : en cartésien, on dérive chaque coordonnée.
- Rectiligne uniforme : $\vec{a} = \vec{0}$. Rectiligne uniformément accéléré : $\vec{a}$ constant, colinéaire à la trajectoire.
- Repère de Frenet : $\vec{a} = \dfrac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_T + \dfrac{v^2}{R}\,\vec{u}_N$.
- Circulaire uniforme : $a = \dfrac{v^2}{R}$, accélération **centripète**.

## Erreurs fréquentes

- Croire qu'une vitesse de valeur constante implique une accélération nulle : c'est faux dès que la trajectoire est courbe.
- Oublier de convertir les $\mathrm{km \cdot h^{-1}}$ en $\mathrm{m \cdot s^{-1}}$ (diviser par $3{,}6$) avant de calculer $\dfrac{v^2}{R}$.
- Orienter $\vec{u}_N$ vers l'extérieur du cercle : il pointe toujours vers le centre.
- Confondre la trajectoire $y = f(x)$ avec une équation horaire $x(t)$.
