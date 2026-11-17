---
titre: "Analyse physique : mesurer sans transformer"
description: "pH-métrie, absorbance, conductivité, gaz parfait et spectroscopies : les mesures physiques qui identifient une espèce et donnent sa concentration."
niveau: terminale
theme: matiere
ordre: 2
duree: "30 min"
motsCles: ["pH-métrie", "Beer-Lambert", "Kohlrausch", "dosage par étalonnage", "gaz parfait", "spectroscopie IR", "UV-visible"]
tp: ["dosage-etalonnage"]
---

> **L'essentiel.** Une grandeur physique mesurable (pH, absorbance, conductivité, pression) dépend de la concentration d'une espèce. En connaissant cette dépendance, on remonte à la concentration **sans consommer l'échantillon**. Les spectroscopies, elles, servent surtout à **identifier** les espèces.

## 1. La pH-métrie

Le pH d'une solution aqueuse diluée est lié à la concentration en ions oxonium :

> **Définition.** $\mathrm{pH} = -\log\left(\dfrac{[\mathrm{H_3O^+}]}{c^\circ}\right)$, soit $[\mathrm{H_3O^+}] = c^\circ \times 10^{-\mathrm{pH}}$, avec $c^\circ = 1\ \mathrm{mol \cdot L^{-1}}$ (concentration standard).

Le pH se mesure avec un **pH-mètre** : une sonde plongée dans la solution délivre une tension qui dépend du pH. L'appareil doit être **étalonné** avant usage avec des solutions tampons de pH connu (par exemple 4,0 et 7,0).

Quelques ordres de grandeur utiles :

| pH | $[\mathrm{H_3O^+}]$ en $\mathrm{mol \cdot L^{-1}}$ |
|---|---|
| 2,0 | $1{,}0 \times 10^{-2}$ |
| 7,0 | $1{,}0 \times 10^{-7}$ |
| 11,0 | $1{,}0 \times 10^{-11}$ |

Le pH est une échelle logarithmique : diviser $[\mathrm{H_3O^+}]$ par 10 augmente le pH d'une unité. La précision d'un pH-mètre de lycée est d'environ 0,05 unité, ce qui limite le nombre de chiffres significatifs de $[\mathrm{H_3O^+}]$.

## 2. Absorbance et loi de Beer-Lambert

Une espèce colorée absorbe une partie de la lumière qui la traverse. Le **spectrophotomètre** mesure l'**absorbance** $A$ (sans unité) de la solution à une longueur d'onde choisie, en général celle du maximum d'absorption $\lambda_{\max}$, pour une meilleure sensibilité.

> **Loi de Beer-Lambert.** Pour une solution diluée d'une seule espèce absorbante :
>
> $$
> A = \varepsilon \, \ell \, c
> $$
>
> avec $\varepsilon$ le coefficient d'absorption molaire (en $\mathrm{L \cdot mol^{-1} \cdot cm^{-1}}$), $\ell$ la longueur de solution traversée (en $\mathrm{cm}$) et $c$ la concentration (en $\mathrm{mol \cdot L^{-1}}$).

À longueur d'onde et cuve fixées, l'absorbance est donc **proportionnelle** à la concentration : $A = k\,c$. Cette loi n'est valable que pour des solutions **diluées** (en pratique $A \lesssim 1{,}5$). Les absorbances de plusieurs espèces absorbantes s'additionnent.

## 3. Conductivité et loi de Kohlrausch

Une solution ionique conduit le courant : ce sont les ions qui se déplacent. Le **conductimètre** mesure sa conductivité $\sigma$ en $\mathrm{S \cdot m^{-1}}$.

> **Loi de Kohlrausch.** Pour une solution diluée :
>
> $$
> \sigma = \sum_i \lambda_i \, [X_i]
> $$
>
> avec $\lambda_i$ la conductivité molaire ionique de l'ion $X_i$ (en $\mathrm{S \cdot m^2 \cdot mol^{-1}}$) et $[X_i]$ sa concentration (en $\mathrm{mol \cdot m^{-3}}$).

Attention aux unités : $1\ \mathrm{mol \cdot L^{-1}} = 10^{3}\ \mathrm{mol \cdot m^{-3}}$.

Exemple : pour une solution de chlorure de sodium à $1{,}0 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$, soit $1{,}0\ \mathrm{mol \cdot m^{-3}}$, avec $\lambda(\mathrm{Na^+}) = 5{,}01 \times 10^{-3}$ et $\lambda(\mathrm{Cl^-}) = 7{,}63 \times 10^{-3}\ \mathrm{S \cdot m^2 \cdot mol^{-1}}$ :

$$
\sigma = (5{,}01 + 7{,}63) \times 10^{-3} \times 1{,}0 = 1{,}3 \times 10^{-2}\ \mathrm{S \cdot m^{-1}}
$$

Pour un soluté ionique unique, entièrement dissocié, $\sigma$ est proportionnelle à sa concentration apportée : $\sigma = k\,c$.

## 4. Le dosage par étalonnage

Un **dosage par étalonnage** détermine une concentration par comparaison avec des solutions de concentrations connues. Contrairement au titrage, il est **non destructif**.

Méthode :

1. Préparer, par dilution d'une solution mère, une gamme de **solutions étalons** de concentrations connues.
2. Mesurer la grandeur physique ($A$ ou $\sigma$) pour chaque étalon, dans les mêmes conditions.
3. Tracer la **courbe d'étalonnage** $A = f(c)$ ou $\sigma = f(c)$ : une droite passant par l'origine si la loi est vérifiée. Modéliser pour obtenir le coefficient $k$.
4. Mesurer la grandeur pour la solution inconnue et en déduire $c = \dfrac{A}{k}$ (ou $\dfrac{\sigma}{k}$), par le calcul ou par lecture graphique.

La concentration inconnue doit se trouver **dans la gamme** des étalons : en dehors, rien ne garantit que la relation reste linéaire. Si la solution est trop concentrée, on la dilue d'abord en tenant compte du facteur de dilution.

## 5. Gaz parfait et volume molaire

Pour une espèce gazeuse, la quantité de matière se déduit de mesures de pression, de volume et de température.

> **Équation d'état du gaz parfait.**
>
> $$
> P\,V = n\,R\,T
> $$
>
> avec $P$ en $\mathrm{Pa}$, $V$ en $\mathrm{m^3}$, $n$ en $\mathrm{mol}$, $T$ en $\mathrm{K}$ et $R = 8{,}314\ \mathrm{J \cdot mol^{-1} \cdot K^{-1}}$.

Ce modèle décrit bien les gaz réels à **faible pression** (les molécules interagissent peu). On en déduit le **volume molaire**, volume occupé par une mole de gaz, identique pour tous les gaz parfaits dans les mêmes conditions :

$$
V_m = \frac{V}{n} = \frac{R\,T}{P}
$$

À $T = 293\ \mathrm{K}$ et $P = 1{,}013 \times 10^{5}\ \mathrm{Pa}$, on obtient $V_m \approx 24{,}0\ \mathrm{L \cdot mol^{-1}}$. On peut ainsi suivre une réaction qui produit un gaz par mesure de pression dans une enceinte fermée.

## 6. Spectroscopies infrarouge et UV-visible

Ces techniques servent principalement à **identifier** une espèce ou un groupe caractéristique.

**Spectroscopie UV-visible.** Une espèce qui absorbe dans le visible est colorée : elle prend la **couleur complémentaire** de celle qu'elle absorbe le plus (cercle chromatique). Une solution qui absorbe vers 600 nm (orangé) paraît bleue. Le spectre $A = f(\lambda)$ donne $\lambda_{\max}$, utile pour choisir la longueur d'onde d'un dosage.

**Spectroscopie infrarouge.** Les liaisons d'une molécule absorbent certains rayonnements infrarouges. Le spectre représente la transmittance en fonction du **nombre d'onde** $\sigma = \dfrac{1}{\lambda}$, exprimé en $\mathrm{cm^{-1}}$ (ne pas confondre avec la conductivité). Chaque bande signale une liaison :

| Liaison | Nombre d'onde ($\mathrm{cm^{-1}}$) | Allure de la bande |
|---|---|---|
| O-H alcool (liée) | 3200 à 3400 | forte, large |
| O-H acide carboxylique | 2500 à 3200 | forte, très large |
| N-H amine, amide | 3100 à 3500 | moyenne |
| C-H | 2800 à 3100 | moyenne à forte |
| C=O | 1650 à 1750 | forte, fine |

La présence simultanée d'une bande C=O vers $1700\ \mathrm{cm^{-1}}$ et d'une très large bande O-H entre 2500 et $3200\ \mathrm{cm^{-1}}$ signe un **acide carboxylique**.

## Exercice type

On dose un colorant alimentaire bleu dans une boisson par spectrophotométrie, à $\lambda_{\max}$. Les solutions étalons donnent :

| $c$ ($10^{-6}\ \mathrm{mol \cdot L^{-1}}$) | 2,0 | 4,0 | 6,0 | 8,0 |
|---|---|---|---|---|
| $A$ | 0,26 | 0,52 | 0,78 | 1,04 |

La boisson, analysée sans dilution dans la même cuve, a une absorbance $A = 0{,}65$.

1. La loi de Beer-Lambert est-elle vérifiée ? Déterminer le coefficient $k$.
2. En déduire la concentration du colorant dans la boisson.
3. Pourquoi mesure-t-on à $\lambda_{\max}$ ?

<details>
<summary>Voir la correction</summary>

1. Le rapport $\dfrac{A}{c}$ est constant pour tous les étalons : la courbe d'étalonnage est une droite passant par l'origine, la loi est vérifiée.

$$
k = \frac{0{,}52}{4{,}0 \times 10^{-6}} = 1{,}3 \times 10^{5}\ \mathrm{L \cdot mol^{-1}}
$$

2. La valeur $A = 0{,}65$ est dans la gamme des étalons, donc :

$$
c = \frac{A}{k} = \frac{0{,}65}{1{,}3 \times 10^{5}} = 5{,}0 \times 10^{-6}\ \mathrm{mol \cdot L^{-1}}
$$

3. À $\lambda_{\max}$, l'absorbance est la plus grande pour une concentration donnée : la mesure est plus sensible et moins affectée par une petite erreur de réglage de la longueur d'onde.

</details>

## À retenir

- $\mathrm{pH} = -\log\left(\dfrac{[\mathrm{H_3O^+}]}{c^\circ}\right)$ et $[\mathrm{H_3O^+}] = c^\circ \times 10^{-\mathrm{pH}}$.
- Beer-Lambert : $A = \varepsilon\,\ell\,c$ ; Kohlrausch : $\sigma = \sum_i \lambda_i\,[X_i]$. Les deux ne valent qu'en solution diluée.
- Dosage par étalonnage : gamme d'étalons, droite $A = k\,c$ ou $\sigma = k\,c$, lecture de l'inconnue **dans la gamme**.
- Gaz parfait : $P\,V = n\,R\,T$ en unités SI ; $V_m = \dfrac{R\,T}{P}$.
- IR : identification des liaisons (O-H, C=O, N-H...) ; UV-visible : couleur complémentaire et $\lambda_{\max}$.

## Erreurs fréquentes

- Utiliser la loi de Kohlrausch avec des concentrations en $\mathrm{mol \cdot L^{-1}}$ : il faut des $\mathrm{mol \cdot m^{-3}}$.
- Mettre la température en degrés Celsius ou le volume en litres dans $P\,V = n\,R\,T$.
- Exploiter une absorbance hors de la gamme d'étalonnage, ou trop élevée pour que la loi de Beer-Lambert reste valable.
- Confondre couleur absorbée et couleur perçue : une solution qui absorbe le rouge paraît bleu-vert.
- Confondre la bande O-H d'un alcool (centrée vers $3300\ \mathrm{cm^{-1}}$) et celle d'un acide carboxylique (beaucoup plus large, jusqu'à $2500\ \mathrm{cm^{-1}}$).
