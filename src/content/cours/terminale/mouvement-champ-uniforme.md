---
titre: "Mouvement dans un champ uniforme"
description: "Chute parabolique, particule chargée dans un condensateur plan, équations horaires, trajectoire et bilan énergétique, jusqu'à l'accélérateur linéaire."
niveau: terminale
theme: mouvement
ordre: 15
duree: "30 min"
motsCles: ["champ de pesanteur", "champ électrique", "condensateur plan", "équations horaires", "trajectoire parabolique", "énergie mécanique", "accélérateur linéaire"]
tp: ["chute-parabolique"]
---

> **L'essentiel.** Dans un champ uniforme, un système soumis à une seule force constante a une **accélération constante**. En intégrant deux fois la deuxième loi de Newton, on obtient les équations horaires, puis la trajectoire : une droite ou une **parabole**. Le théorème de l'énergie cinétique donne, sans calcul de trajectoire, la vitesse acquise entre deux points.

## 1. Deux champs uniformes à connaître

Un champ est **uniforme** dans une région de l'espace lorsque son vecteur a la même direction, le même sens et la même valeur en tout point de cette région.

**Le champ de pesanteur** $\overrightarrow{g}$ est uniforme à l'échelle d'un terrain de sport ou d'une salle de TP : vertical, orienté vers le bas, de valeur $g = 9{,}81\ \mathrm{m \cdot s^{-2}}$ à Paris. Un système de masse $m$ y subit son poids :

$$
\overrightarrow{P} = m\,\overrightarrow{g}
$$

**Le champ électrique d'un condensateur plan** est uniforme entre deux armatures planes et parallèles, distantes de $d$ et soumises à une tension $U$. Il est perpendiculaire aux armatures, orienté de l'armature positive vers l'armature négative (dans le sens des potentiels décroissants), et a pour valeur :

$$
E = \frac{U}{d}
\qquad\text{avec } E \text{ en } \mathrm{V \cdot m^{-1}},\ U \text{ en } \mathrm{V},\ d \text{ en } \mathrm{m}
$$

Une particule de charge $q$ y subit la force électrique :

$$
\overrightarrow{F} = q\,\overrightarrow{E}
$$

Si $q > 0$, $\overrightarrow{F}$ a le sens de $\overrightarrow{E}$ ; si $q < 0$ (électron), $\overrightarrow{F}$ est de sens opposé.

| Champ | Force | Accélération (force seule) |
|---|---|---|
| Pesanteur $\overrightarrow{g}$ | $\overrightarrow{P} = m\,\overrightarrow{g}$ | $\overrightarrow{a} = \overrightarrow{g}$ |
| Électrique $\overrightarrow{E}$ | $\overrightarrow{F} = q\,\overrightarrow{E}$ | $\overrightarrow{a} = \dfrac{q}{m}\,\overrightarrow{E}$ |

Pour une particule chargée (électron, proton, ion), le poids est **négligeable** devant la force électrique : pour un électron dans un champ de $10^4\ \mathrm{V \cdot m^{-1}}$, $eE \approx 1{,}6 \times 10^{-15}\ \mathrm{N}$ alors que $mg \approx 9 \times 10^{-30}\ \mathrm{N}$.

## 2. Des équations horaires à la trajectoire

La méthode est toujours la même :

1. définir le **système** et le **référentiel** (terrestre, supposé galiléen) ;
2. faire le **bilan des forces** ;
3. appliquer la **deuxième loi de Newton** : $\sum \overrightarrow{F} = m\,\overrightarrow{a}$ ;
4. **projeter** dans un repère adapté, puis **intégrer** deux fois en utilisant les conditions initiales.

> **Méthode.** Les primitives successives font apparaître des constantes : la vitesse initiale $\overrightarrow{v}_0$ fixe les constantes de $\overrightarrow{v}(t)$, la position initiale fixe celles de $\overrightarrow{OM}(t)$.

Prenons un projectile lancé depuis l'origine $O$ avec une vitesse $\overrightarrow{v}_0$ faisant un angle $\alpha$ avec l'horizontale, frottements négligés. Repère $(O, x, z)$ avec $z$ vers le haut. Seul le poids agit, donc $\overrightarrow{a} = \overrightarrow{g}$ :

$$
\overrightarrow{a}\ \begin{cases} a_x = 0 \\ a_z = -g \end{cases}
\qquad
\overrightarrow{v}\ \begin{cases} v_x = v_0 \cos\alpha \\ v_z = -g\,t + v_0 \sin\alpha \end{cases}
\qquad
\overrightarrow{OM}\ \begin{cases} x = v_0 \cos\alpha \; t \\ z = -\dfrac{1}{2}\,g\,t^2 + v_0 \sin\alpha \; t \end{cases}
$$

Le mouvement horizontal est **uniforme**, le mouvement vertical est **uniformément varié**.

Pour obtenir l'**équation de la trajectoire** $z(x)$, on élimine le temps : $t = \dfrac{x}{v_0 \cos\alpha}$, d'où

$$
z(x) = -\frac{g}{2\,v_0^2 \cos^2\alpha}\,x^2 + x \tan\alpha
$$

C'est une **parabole** tournée vers le bas. Deux grandeurs se déduisent des équations horaires :

- la **flèche** (altitude maximale) est atteinte quand $v_z = 0$, soit à $t_S = \dfrac{v_0 \sin\alpha}{g}$ ;
- la **portée** (retour à $z = 0$) vaut $x_P = \dfrac{v_0^2 \sin(2\alpha)}{g}$, maximale pour $\alpha = 45^\circ$.

## 3. Particule chargée dans un condensateur plan

**Vitesse initiale parallèle au champ.** Un ion positif entre sans vitesse ou avec une vitesse colinéaire à $\overrightarrow{E}$ : l'accélération $\overrightarrow{a} = \dfrac{q}{m}\overrightarrow{E}$ est colinéaire à la vitesse, le mouvement est **rectiligne uniformément accéléré** (ou freiné si la force s'oppose au mouvement).

**Vitesse initiale perpendiculaire au champ : la déviation.** Un électron (charge $-e$, masse $m_e$) entre en $O$ entre les armatures avec $\overrightarrow{v}_0$ horizontale selon $x$. Le champ $\overrightarrow{E}$ est vertical, orienté vers le bas selon $-y$ : la force $\overrightarrow{F} = -e\,\overrightarrow{E}$ est donc dirigée vers le haut. Avec $a_y = \dfrac{eE}{m_e}$ :

$$
x = v_0\,t
\qquad
y = \frac{eE}{2\,m_e}\,t^2
\qquad\Longrightarrow\qquad
y(x) = \frac{eE}{2\,m_e\,v_0^2}\,x^2
$$

La trajectoire est un **arc de parabole** tant que l'électron est entre les plaques, puis une **droite** à la sortie (plus aucune force). C'est le principe de la déviation d'un faisceau d'électrons dans un oscilloscope analogique ou dans l'expérience de J. J. Thomson qui a permis de mesurer le rapport $\dfrac{e}{m_e}$.

## 4. Aspects énergétiques

> **Définition.** L'énergie cinétique d'un système de masse $m$ et de vitesse $v$ vaut $E_c = \dfrac{1}{2}\,m\,v^2$ (en joules). L'énergie mécanique est $E_m = E_c + E_p$.

Deux énergies potentielles sont associées aux champs uniformes :

| Champ | Énergie potentielle | Travail de la force de $A$ à $B$ |
|---|---|---|
| Pesanteur | $E_{pp} = m\,g\,z$ ($z$ vers le haut) | $W_{AB}(\overrightarrow{P}) = m\,g\,(z_A - z_B)$ |
| Électrique | $E_{pe} = q\,V$ ($V$ potentiel électrique) | $W_{AB}(\overrightarrow{F}) = q\,(V_A - V_B) = q\,U_{AB}$ |

Ces deux forces sont **conservatives** : leur travail ne dépend pas du chemin suivi, seulement des positions de départ et d'arrivée.

> **Théorème de l'énergie cinétique.** Dans un référentiel galiléen, la variation d'énergie cinétique d'un système entre deux positions $A$ et $B$ est égale à la somme des travaux des forces qui s'exercent sur lui :
>
> $$
> \Delta E_c = E_c(B) - E_c(A) = \sum W_{AB}(\overrightarrow{F})
> $$
>

Si seules des forces conservatives travaillent, l'**énergie mécanique se conserve** : $E_m(A) = E_m(B)$. Pour un projectile sans frottement, ce que l'énergie cinétique perd en montant est gagné en énergie potentielle de pesanteur, et réciproquement. Avec des frottements, $E_m$ diminue : $\Delta E_m = W(\overrightarrow{f}) < 0$.

## 5. L'accélérateur linéaire de particules

Un accélérateur linéaire utilise une succession de champs électriques pour augmenter l'énergie cinétique de particules chargées. Dans sa version la plus simple, une particule de charge $q$ entre sans vitesse en $A$ et sort en $B$ après avoir traversé une tension $U_{AB}$. Le poids étant négligeable, le théorème de l'énergie cinétique donne :

$$
\frac{1}{2}\,m\,v_B^2 - 0 = q\,U_{AB}
\qquad\Longrightarrow\qquad
v_B = \sqrt{\frac{2\,q\,U_{AB}}{m}}
$$

Pour un électron accéléré sous $U = 2{,}0\ \mathrm{kV}$ ($q = -e$ et $U_{AB} = -U$, donc $q\,U_{AB} = e\,U > 0$) :

$$
v_B = \sqrt{\frac{2 \times 1{,}60 \times 10^{-19} \times 2{,}0 \times 10^{3}}{9{,}11 \times 10^{-31}}} \approx 2{,}7 \times 10^{7}\ \mathrm{m \cdot s^{-1}}
$$

Pour que la particule soit accélérée, il faut $q\,U_{AB} > 0$ : un électron doit aller vers les potentiels **croissants**. En enchaînant plusieurs étages, les gains d'énergie s'additionnent. Les énergies s'expriment souvent en **électronvolts** : $1\ \mathrm{eV} = 1{,}60 \times 10^{-19}\ \mathrm{J}$, énergie acquise par une charge $e$ sous $1\ \mathrm{V}$. Ces accélérateurs servent en radiothérapie, en recherche et en imagerie médicale.

## Exercice type

Un ballon, assimilé à un point matériel, est lancé depuis le sol avec une vitesse $v_0 = 8{,}0\ \mathrm{m \cdot s^{-1}}$ faisant un angle $\alpha = 30^\circ$ avec l'horizontale. On néglige les frottements et on prend $g = 9{,}81\ \mathrm{m \cdot s^{-2}}$.

1. Déterminer la date $t_S$ à laquelle le ballon atteint son altitude maximale, puis la valeur de cette altitude $h$.
2. Calculer la portée $x_P$ du lancer.
3. Retrouver $h$ par un raisonnement énergétique.

<details>
<summary>Voir la correction</summary>

**1.** Composantes initiales : $v_{0x} = 8{,}0 \cos 30^\circ = 6{,}9\ \mathrm{m \cdot s^{-1}}$ et $v_{0z} = 8{,}0 \sin 30^\circ = 4{,}0\ \mathrm{m \cdot s^{-1}}$. Au sommet $v_z = 0$ :

$$
t_S = \frac{v_0 \sin\alpha}{g} = \frac{4{,}0}{9{,}81} = 0{,}41\ \mathrm{s}
$$

En reportant $t_S$ dans $z(t)$ :

$$
h = -\frac{1}{2}\,g\,t_S^2 + v_0 \sin\alpha\; t_S = \frac{(v_0 \sin\alpha)^2}{2\,g} = \frac{4{,}0^2}{2 \times 9{,}81} = 0{,}82\ \mathrm{m}
$$

**2.** Le ballon retombe à $z = 0$ à la date $2\,t_S$ (trajectoire symétrique) :

$$
x_P = \frac{v_0^2 \sin(2\alpha)}{g} = \frac{8{,}0^2 \times \sin 60^\circ}{9{,}81} = 5{,}6\ \mathrm{m}
$$

**3.** Seul le poids travaille : l'énergie mécanique se conserve entre le sol et le sommet, où la vitesse se réduit à sa composante horizontale $v_0 \cos\alpha$ :

$$
\frac{1}{2}\,m\,v_0^2 = \frac{1}{2}\,m\,(v_0 \cos\alpha)^2 + m\,g\,h
\quad\Longrightarrow\quad
h = \frac{v_0^2 (1 - \cos^2\alpha)}{2\,g} = \frac{(v_0 \sin\alpha)^2}{2\,g} = 0{,}82\ \mathrm{m}
$$

On retrouve bien le même résultat.

</details>

## À retenir

- Dans un champ uniforme, une force unique constante donne une **accélération constante** : $\overrightarrow{a} = \overrightarrow{g}$ ou $\overrightarrow{a} = \dfrac{q}{m}\overrightarrow{E}$.
- Condensateur plan : $E = \dfrac{U}{d}$, $\overrightarrow{E}$ orienté vers les potentiels décroissants.
- Si $\overrightarrow{v}_0$ n'est pas colinéaire au champ, la trajectoire est une **parabole**.
- Théorème de l'énergie cinétique : $\Delta E_c = \sum W_{AB}(\overrightarrow{F})$, avec $W(\overrightarrow{P}) = m\,g\,(z_A - z_B)$ et $W(\overrightarrow{F}) = q\,U_{AB}$.
- Accélérateur linéaire : $v_B = \sqrt{\dfrac{2\,q\,U_{AB}}{m}}$ pour une particule partant au repos.

## Erreurs fréquentes

- Oublier le **signe de la charge** : pour un électron, la force électrique est opposée au champ.
- Oublier la **vitesse initiale** ou la **position initiale** lors de l'intégration.
- Garder la solution $t = 0$ de l'équation $z(t) = 0$ : la portée correspond à l'autre solution, $t = 2\,t_S$.
- Écrire $W(\overrightarrow{P}) = m\,g\,(z_B - z_A)$ : le poids fournit un travail **positif** quand le système descend.
- Prendre en compte le poids d'un électron ou d'un ion dans un condensateur : il est négligeable.
