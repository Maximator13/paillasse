---
titre: "Ondes sonores : intensité, décibels et effet Doppler"
description: "Intensité sonore, niveau en décibels, atténuation géométrique et par absorption, puis effet Doppler : décalage en fréquence et applications."
niveau: terminale
theme: ondes
ordre: 20
duree: "30 min"
motsCles: ["intensité sonore", "décibel", "atténuation", "effet Doppler", "décalage en fréquence"]
tp: ["effet-doppler"]
---

> **L'essentiel.** Une onde sonore transporte de l'énergie : on la mesure par l'**intensité sonore** $I$ (en $\mathrm{W \cdot m^{-2}}$), mais l'oreille la perçoit selon une échelle logarithmique, le **niveau d'intensité sonore** $L$ (en décibels). Ce niveau diminue avec la distance (atténuation géométrique) et par absorption dans le milieu. Quand la source et l'observateur sont en mouvement relatif, la fréquence perçue diffère de la fréquence émise : c'est l'**effet Doppler**.

## 1. L'intensité sonore

Une onde sonore est une onde mécanique progressive : elle transporte de l'énergie sans transport de matière. Une source de **puissance sonore** $P$ (en watts) répartit cette énergie sur des surfaces de plus en plus grandes à mesure que l'onde s'éloigne.

> **Définition.** L'intensité sonore $I$ est la puissance sonore reçue par unité de surface perpendiculaire à la direction de propagation :
>
> $$
> I = \dfrac{P}{S} \qquad I \text{ en } \mathrm{W \cdot m^{-2}},\ P \text{ en } \mathrm{W},\ S \text{ en } \mathrm{m^2}
> $$
>

Pour une source ponctuelle qui émet de façon identique dans toutes les directions (source **isotrope**), la puissance se répartit sur une sphère de rayon $r$, de surface $4\pi r^2$ :

$$
I = \frac{P}{4\pi r^2}
$$

L'oreille humaine perçoit des intensités extraordinairement variées : de $I_0 = 1{,}0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}$ (**seuil d'audibilité** à $1\ \mathrm{kHz}$) jusqu'à environ $1\ \mathrm{W \cdot m^{-2}}$ (**seuil de douleur**), soit douze ordres de grandeur. Une échelle linéaire serait inutilisable.

## 2. Le niveau d'intensité sonore

La sensation auditive varie à peu près comme le logarithme de l'intensité. On définit donc une grandeur logarithmique.

> **Définition.** Le niveau d'intensité sonore $L$, exprimé en décibels ($\mathrm{dB}$), est :
>
> $$
> L = 10 \log\left(\dfrac{I}{I_0}\right) \qquad \text{avec } I_0 = 1{,}0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}
> $$
>

Réciproquement, $I = I_0 \times 10^{L/10}$.

| Situation | $I$ ($\mathrm{W \cdot m^{-2}}$) | $L$ ($\mathrm{dB}$) |
|---|---|---|
| Seuil d'audibilité | $10^{-12}$ | $0$ |
| Conversation | $10^{-6}$ | $60$ |
| Rue animée | $10^{-4}$ | $80$ |
| Seuil de danger (exposition prolongée) | $3 \times 10^{-4}$ environ | $85$ |
| Concert, discothèque | $10^{-2}$ | $100$ |
| Seuil de douleur | $1$ | $120$ |

Conséquences importantes du caractère logarithmique :

- **multiplier $I$ par 2** ajoute environ $3\ \mathrm{dB}$ (car $10 \log 2 \approx 3{,}0$) ;
- **multiplier $I$ par 10** ajoute exactement $10\ \mathrm{dB}$ ;
- les **niveaux ne s'additionnent pas** : ce sont les intensités qui s'ajoutent. Deux sources identiques de $70\ \mathrm{dB}$ produisent ensemble $73\ \mathrm{dB}$, pas $140\ \mathrm{dB}$.

## 3. L'atténuation d'une onde sonore

> **Définition.** L'atténuation $A$ (en $\mathrm{dB}$) entre deux points est la diminution du niveau d'intensité sonore :
>
> $$
> A = L_1 - L_2 = 10 \log\left(\dfrac{I_1}{I_2}\right)
> $$
>

Deux phénomènes en sont responsables.

**L'atténuation géométrique.** Même sans aucune perte d'énergie, l'intensité diminue car la puissance se répartit sur une surface de plus en plus grande. Pour une source isotrope, $I$ est proportionnelle à $\dfrac{1}{r^2}$ :

$$
A = 10 \log\left(\frac{r_2^2}{r_1^2}\right) = 20 \log\left(\frac{r_2}{r_1}\right)
$$

Doubler la distance à la source fait donc perdre $20 \log 2 \approx 6\ \mathrm{dB}$.

**L'atténuation par absorption.** Une partie de l'énergie de l'onde est cédée au milieu traversé et convertie en énergie thermique. Elle dépend du matériau (les matériaux poreux et mous, comme la laine de roche ou la mousse, absorbent beaucoup) et de la fréquence : dans l'air, les sons aigus sont plus absorbés que les sons graves. C'est pourquoi on entend surtout les basses d'un concert lointain. Les **protections auditives** et l'**isolation phonique** des bâtiments exploitent ce phénomène.

## 4. L'effet Doppler

Quand une ambulance s'approche, sa sirène paraît plus aiguë ; quand elle s'éloigne, plus grave. Pourtant la fréquence émise ne change pas.

> **Définition.** L'effet Doppler est la modification de la fréquence perçue par un récepteur lorsque l'émetteur et le récepteur sont en mouvement l'un par rapport à l'autre. Le **décalage Doppler** est $\Delta f = f_R - f_E$.

**Établissement de l'expression (émetteur mobile, récepteur fixe, à une dimension).** Un émetteur produit une onde de fréquence $f_E$, de période $T_E = \dfrac{1}{f_E}$, qui se propage à la célérité $c$. Il se rapproche du récepteur à la vitesse $v$ (avec $v < c$).

- Entre deux maxima successifs émis, l'onde parcourt la distance $c\,T_E$.
- Pendant ce temps, l'émetteur avance de $v\,T_E$ dans le même sens.
- Les deux maxima sont donc séparés, devant l'émetteur, de $\lambda_R = c\,T_E - v\,T_E = (c - v)\,T_E$.

Le récepteur fixe reçoit ces maxima à la célérité $c$, d'où $f_R = \dfrac{c}{\lambda_R} = \dfrac{c}{(c - v)\,T_E}$.

Si l'émetteur s'approche :

$$
f_R = f_E \times \frac{c}{c - v}
$$

Si l'émetteur s'éloigne (même raisonnement, derrière lui) :

$$
f_R = f_E \times \frac{c}{c + v}
$$

Lorsque l'émetteur s'approche, $f_R > f_E$ : le son est plus aigu. Lorsqu'il s'éloigne, $f_R < f_E$ : le son est plus grave.

**Cas d'une vitesse faible devant la célérité.** Si $v \ll c$, on peut approcher le décalage par :

$$
\frac{|\Delta f|}{f_E} \approx \frac{v}{c} \qquad \text{soit} \qquad v \approx c \times \frac{|\Delta f|}{f_E}
$$

Le décalage relatif est proportionnel à la vitesse : mesurer $\Delta f$ permet donc de **mesurer une vitesse**.

## 5. Applications de l'effet Doppler

L'effet Doppler concerne toutes les ondes, sonores comme électromagnétiques (avec $c = 3{,}00 \times 10^{8}\ \mathrm{m \cdot s^{-1}}$ pour la lumière).

| Domaine | Onde utilisée | Grandeur mesurée |
|---|---|---|
| Radar routier | ondes radio | vitesse des véhicules |
| Échographie Doppler | ultrasons | vitesse du sang dans les vaisseaux |
| Astrophysique | lumière | vitesse radiale des étoiles et galaxies, détection d'exoplanètes |
| Météorologie | ondes radio | vitesse des gouttes de pluie, des vents |

Dans un radar ou une échographie, l'onde est **réfléchie** par la cible mobile : le décalage se produit deux fois et vaut, pour $v \ll c$, $|\Delta f| \approx 2 f_E \dfrac{v}{c}$.

En astrophysique, une galaxie qui s'éloigne présente des raies spectrales décalées vers les grandes longueurs d'onde : c'est le **décalage vers le rouge**, qui a mis en évidence l'expansion de l'Univers.

## Exercice type

Une enceinte, assimilée à une source isotrope, émet une puissance sonore $P = 0{,}50\ \mathrm{W}$. Dans l'air, $c = 340\ \mathrm{m \cdot s^{-1}}$.

1. Calculer l'intensité sonore $I$ et le niveau $L$ à $r = 10\ \mathrm{m}$ de l'enceinte.
2. Quelle atténuation géométrique subit-on en passant de $10\ \mathrm{m}$ à $40\ \mathrm{m}$ ?
3. Une ambulance dont la sirène émet à $f_E = 680\ \mathrm{Hz}$ s'approche d'un piéton immobile à $v = 25\ \mathrm{m \cdot s^{-1}}$ ($90\ \mathrm{km \cdot h^{-1}}$). Calculer la fréquence perçue, puis comparer avec l'approximation $v \ll c$.

<details>
<summary>Voir la correction</summary>

1. La puissance se répartit sur une sphère de rayon $r$ :

$$
I = \frac{P}{4\pi r^2} = \frac{0{,}50}{4\pi \times 10^2} = 4{,}0 \times 10^{-4}\ \mathrm{W \cdot m^{-2}}
$$

$$
L = 10 \log\left(\frac{4{,}0 \times 10^{-4}}{1{,}0 \times 10^{-12}}\right) = 10 \log\left(4{,}0 \times 10^{8}\right) = 86\ \mathrm{dB}
$$

2. La distance est multipliée par 4 :

$$
A = 20 \log\left(\frac{40}{10}\right) = 20 \log 4 = 12\ \mathrm{dB}
$$

Le niveau passe donc de $86\ \mathrm{dB}$ à $74\ \mathrm{dB}$ (sans tenir compte de l'absorption).

3. L'émetteur s'approche du récepteur fixe :

$$
f_R = f_E \times \frac{c}{c - v} = 680 \times \frac{340}{340 - 25} = 734\ \mathrm{Hz}
$$

Avec l'approximation $v \ll c$ : $\Delta f \approx f_E \dfrac{v}{c} = 680 \times \dfrac{25}{340} = 50\ \mathrm{Hz}$, soit $f_R \approx 730\ \mathrm{Hz}$. L'écart avec la valeur exacte est inférieur à $1\ \%$ : l'approximation est justifiée car $\dfrac{v}{c} \approx 0{,}07$.

</details>

## À retenir

- Intensité sonore : $I = \dfrac{P}{S}$, et pour une source isotrope $I = \dfrac{P}{4\pi r^2}$.
- Niveau d'intensité sonore : $L = 10 \log\left(\dfrac{I}{I_0}\right)$ avec $I_0 = 1{,}0 \times 10^{-12}\ \mathrm{W \cdot m^{-2}}$.
- Atténuation : $A = L_1 - L_2$ ; géométrique (dilution sur une surface croissante, $-6\ \mathrm{dB}$ quand la distance double) ou par absorption (dépend du milieu et de la fréquence).
- Effet Doppler : $f_R = f_E \dfrac{c}{c \mp v}$ (signe moins si l'émetteur s'approche) ; pour $v \ll c$, $\dfrac{|\Delta f|}{f_E} \approx \dfrac{v}{c}$.

## Erreurs fréquentes

- **Additionner des décibels** : on additionne les intensités, puis on calcule le niveau.
- Croire que l'intensité est inversement proportionnelle à $r$ : elle varie en $\dfrac{1}{r^2}$.
- Penser que la fréquence **émise** change : seule la fréquence **perçue** est modifiée.
- Se tromper de signe : un émetteur qui s'approche donne toujours $f_R > f_E$, vérifier le sens du résultat.
- Oublier le facteur 2 du décalage lorsque l'onde est réfléchie par une cible mobile (radar, échographie).
