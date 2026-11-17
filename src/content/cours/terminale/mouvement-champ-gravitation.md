---
titre: "Mouvement dans un champ de gravitation : satellites et planètes"
description: "Orbite circulaire uniforme, vitesse et période d'un satellite, lois de Kepler et satellite géostationnaire : la mécanique céleste au programme."
niveau: terminale
theme: mouvement
ordre: 16
duree: "30 min"
motsCles: ["gravitation", "satellite", "orbite circulaire", "lois de Kepler", "géostationnaire", "période de révolution"]
tp: ["satellite-kepler"]
---

> **L'essentiel.** Un satellite ou une planète n'est soumis qu'à la force de gravitation exercée par l'astre attracteur. Appliquée à une orbite circulaire, la deuxième loi de Newton impose un mouvement **uniforme** dont la vitesse et la période ne dépendent que du rayon de l'orbite et de la masse de l'astre central. On retrouve ainsi la troisième loi de Kepler : $\dfrac{T^2}{r^3}$ est le même pour tous les corps qui tournent autour d'un même astre. Les lois de Kepler décrivent aussi les orbites elliptiques, et un satellite géostationnaire tourne dans le plan de l'équateur, à environ $36\,000\ \mathrm{km}$ d'altitude.

## 1. Le cadre de l'étude

On étudie le mouvement d'un corps de masse $m$ (satellite, planète) autour d'un astre de masse $M$ (la Terre, le Soleil) à **répartition de masse à symétrie sphérique**. On néglige toute autre action (frottements, attraction des autres astres).

Le choix du référentiel dépend du système :

| Système étudié | Astre attracteur | Référentiel |
|---|---|---|
| Planète, comète | Soleil | **héliocentrique** (centre du Soleil, axes vers trois étoiles lointaines) |
| Lune, satellite artificiel | Terre | **géocentrique** (centre de la Terre, axes vers trois étoiles lointaines) |

Ces référentiels sont supposés **galiléens** sur la durée de l'étude.

> **Loi de la gravitation universelle.** L'astre de masse $M$, de centre $O$, exerce sur le corps de masse $m$, de centre $S$, situé à la distance $r = OS$, la force $\vec{F} = -\,G\,\dfrac{M\,m}{r^2}\,\vec{u}$, où $\vec{u}$ est le vecteur unitaire dirigé de $O$ vers $S$ et $G = 6{,}67 \times 10^{-11}\ \mathrm{N \cdot m^2 \cdot kg^{-2}}$ la constante de gravitation universelle.

$$
\vec{F} = -\,G\,\frac{M\,m}{r^2}\,\vec{u}
$$

Pour un satellite terrestre à l'altitude $h$, on a $r = R_T + h$, où $R_T$ est le rayon de la Terre. C'est la distance au **centre** de l'astre qui compte, pas l'altitude.

## 2. Le repère de Frenet

Pour un mouvement circulaire, on utilise le **repère de Frenet** $(S, \vec{u}_t, \vec{u}_n)$, lié au corps en mouvement :

- $\vec{u}_t$ est **tangent** à la trajectoire, orienté dans le sens du mouvement ;
- $\vec{u}_n$ est **normal** à la trajectoire, dirigé vers le centre $O$ du cercle (donc $\vec{u}_n = -\vec{u}$).

Dans ce repère, l'accélération d'un point en mouvement circulaire de rayon $r$ s'écrit :

$$
\vec{a} = \frac{\mathrm{d}v}{\mathrm{d}t}\,\vec{u}_t + \frac{v^2}{r}\,\vec{u}_n
$$

La composante tangentielle traduit la variation de la valeur de la vitesse ; la composante normale, toujours dirigée vers le centre, traduit le changement de direction.

## 3. Le mouvement circulaire est uniforme

On applique la deuxième loi de Newton au corps, dans le référentiel galiléen choisi : $m\,\vec{a} = \vec{F}$. Dans le repère de Frenet, la force s'écrit $\vec{F} = G\,\dfrac{Mm}{r^2}\,\vec{u}_n$, d'où :

$$
\vec{a} = G\,\frac{M}{r^2}\,\vec{u}_n
$$

L'accélération ne dépend pas de la masse $m$ du satellite. En identifiant composante par composante :

- selon $\vec{u}_t$ : $\dfrac{\mathrm{d}v}{\mathrm{d}t} = 0$, donc $v$ est constante : **le mouvement est uniforme** ;
- selon $\vec{u}_n$ : $\dfrac{v^2}{r} = G\,\dfrac{M}{r^2}$.

> **Vitesse sur une orbite circulaire.** Un corps en orbite circulaire de rayon $r$ autour d'un astre de masse $M$ a une vitesse de valeur constante $v = \sqrt{\dfrac{G\,M}{r}}$.

$$
v = \sqrt{\frac{G\,M}{r}}
$$

Plus l'orbite est haute, plus le satellite est **lent**. La vitesse ne dépend ni de la masse du satellite, ni de sa forme.

## 4. La période de révolution

La **période de révolution** $T$ est la durée d'un tour complet. Le mouvement étant uniforme, le satellite parcourt le périmètre $2\pi r$ à la vitesse $v$ :

$$
T = \frac{2\pi r}{v} = 2\pi\sqrt{\frac{r^3}{G\,M}}
$$

En élevant au carré, on obtient une relation remarquable :

$$
\frac{T^2}{r^3} = \frac{4\pi^2}{G\,M}
$$

Le rapport $\dfrac{T^2}{r^3}$ ne dépend que de la masse de l'astre attracteur : c'est la **troisième loi de Kepler**, établie ici dans le cas d'une orbite circulaire. Elle permet, en mesurant la période et le rayon de l'orbite d'un satellite, de **déterminer la masse de l'astre central** (masse de Jupiter grâce à ses lunes, masse du Soleil grâce aux planètes).

## 5. Les trois lois de Kepler

Au début du XVIIe siècle, à partir des observations de Tycho Brahe, Johannes Kepler énonce trois lois empiriques sur le mouvement des planètes autour du Soleil. Elles s'appliquent à tout corps en orbite autour d'un astre, dans le référentiel centré sur cet astre.

> **Première loi (loi des orbites).** La trajectoire d'une planète est une **ellipse** dont le centre du Soleil occupe l'un des **foyers**.

Le cercle est un cas particulier d'ellipse dont les deux foyers sont confondus au centre. Le point de l'orbite le plus proche du Soleil est le **périhélie**, le plus éloigné l'**aphélie** (périgée et apogée pour un satellite de la Terre).

> **Deuxième loi (loi des aires).** Le segment qui relie le centre du Soleil au centre de la planète balaie des **aires égales pendant des durées égales**.

Conséquence : la planète va **plus vite près du Soleil** (au périhélie) que loin de lui (à l'aphélie). Sur une orbite circulaire, la loi des aires redonne un mouvement uniforme.

> **Troisième loi (loi des périodes).** Pour toutes les planètes du système solaire, le carré de la période de révolution $T$ est proportionnel au cube du demi-grand axe $a$ de l'orbite : $\dfrac{T^2}{a^3}$ est une constante.

$$
\frac{T^2}{a^3} = \text{constante}
$$

Pour une orbite circulaire, le demi-grand axe est le rayon $r$ et la constante vaut $\dfrac{4\pi^2}{G\,M}$. Attention : la constante change d'un astre attracteur à l'autre. Elle n'est pas la même pour les planètes du Soleil et pour les satellites de la Terre.

## 6. Le satellite géostationnaire

> **Définition.** Un satellite **géostationnaire** reste en permanence à la verticale du même point de la surface terrestre. Il est donc **immobile dans le référentiel terrestre**.

Trois conditions sont nécessaires :

1. son orbite est **circulaire** et située dans le **plan de l'équateur** ;
2. il tourne **dans le même sens** que la Terre (d'ouest en est) ;
3. sa période de révolution dans le référentiel géocentrique est égale à la période de rotation propre de la Terre, le **jour sidéral** : $T = 86\,164\ \mathrm{s}$ (environ $23\ \mathrm{h}\ 56\ \mathrm{min}$).

La troisième loi de Kepler impose alors un rayon d'orbite unique, donc une altitude unique, d'environ $36\,000\ \mathrm{km}$. Ces satellites servent aux télécommunications et à la météorologie : une antenne fixe au sol peut les viser en permanence.

## Exercice type

La Station spatiale internationale (ISS) décrit une orbite circulaire à l'altitude $h = 400\ \mathrm{km}$.

Données : $G = 6{,}67 \times 10^{-11}\ \mathrm{N \cdot m^2 \cdot kg^{-2}}$, $M_T = 5{,}97 \times 10^{24}\ \mathrm{kg}$, $R_T = 6{,}38 \times 10^{3}\ \mathrm{km}$, jour sidéral $T_0 = 86\,164\ \mathrm{s}$.

1. Calculer la vitesse de l'ISS dans le référentiel géocentrique.
2. En déduire sa période de révolution, en minutes.
3. Déterminer l'altitude d'un satellite géostationnaire.

<details>
<summary>Voir la correction</summary>

**1.** Le rayon de l'orbite vaut $r = R_T + h = 6{,}38 \times 10^{6} + 0{,}400 \times 10^{6} = 6{,}78 \times 10^{6}\ \mathrm{m}$. Le produit $G M_T = 6{,}67 \times 10^{-11} \times 5{,}97 \times 10^{24} = 3{,}98 \times 10^{14}\ \mathrm{m^3 \cdot s^{-2}}$.

$$
v = \sqrt{\frac{G\,M_T}{r}} = \sqrt{\frac{3{,}98 \times 10^{14}}{6{,}78 \times 10^{6}}} = 7{,}66 \times 10^{3}\ \mathrm{m \cdot s^{-1}}
$$

soit environ $27\,600\ \mathrm{km \cdot h^{-1}}$.

**2.** Le mouvement est uniforme :

$$
T = \frac{2\pi r}{v} = \frac{2\pi \times 6{,}78 \times 10^{6}}{7{,}66 \times 10^{3}} = 5{,}56 \times 10^{3}\ \mathrm{s} \approx 93\ \mathrm{min}
$$

L'ISS fait le tour de la Terre en une heure et demie environ, soit une quinzaine de tours par jour.

**3.** D'après la troisième loi de Kepler, $r_{\text{géo}}^3 = \dfrac{G\,M_T\,T_0^2}{4\pi^2}$ :

$$
r_{\text{géo}} = \left(\frac{3{,}98 \times 10^{14} \times (86\,164)^2}{4\pi^2}\right)^{1/3} = 4{,}21 \times 10^{7}\ \mathrm{m}
$$

L'altitude vaut $h_{\text{géo}} = r_{\text{géo}} - R_T = 4{,}21 \times 10^{7} - 0{,}638 \times 10^{7} = 3{,}58 \times 10^{7}\ \mathrm{m}$ (calcul mené avec la valeur non arrondie de $r_{\text{géo}}$), soit environ $35\,800\ \mathrm{km}$.

</details>

## À retenir

- Seule la force de gravitation agit : $\vec{a} = G\,\dfrac{M}{r^2}\,\vec{u}_n$, indépendante de la masse du satellite.
- Une orbite circulaire est parcourue d'un **mouvement uniforme** à la vitesse $v = \sqrt{\dfrac{GM}{r}}$.
- Période : $T = \dfrac{2\pi r}{v}$, d'où $\dfrac{T^2}{r^3} = \dfrac{4\pi^2}{GM}$ (troisième loi de Kepler).
- Kepler : orbite elliptique avec l'astre à un foyer, loi des aires, $\dfrac{T^2}{a^3}$ constant autour d'un même astre.
- Géostationnaire : orbite circulaire équatoriale, même sens que la Terre, $T = 86\,164\ \mathrm{s}$, altitude d'environ $36\,000\ \mathrm{km}$.

## Erreurs fréquentes

- Utiliser l'**altitude** $h$ au lieu du rayon $r = R_T + h$ dans les formules.
- Oublier de convertir les **kilomètres en mètres** et les durées en secondes avant le calcul.
- Croire qu'un satellite plus lourd doit aller plus vite : $v$ et $T$ sont **indépendantes de sa masse**.
- Appliquer une même constante $\dfrac{T^2}{r^3}$ à des corps qui tournent autour d'astres **différents**.
- Prendre $T = 24\ \mathrm{h}$ pour le géostationnaire : en toute rigueur, c'est le jour **sidéral** qu'il faut utiliser (l'écart reste faible, une centaine de kilomètres sur l'altitude, et certains sujets donnent 24 h).
- Placer le Soleil au **centre** de l'ellipse : il occupe l'un des **foyers**.
