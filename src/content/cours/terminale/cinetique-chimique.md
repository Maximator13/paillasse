---
titre: "Cinétique chimique : suivre une transformation dans le temps"
description: "Transformations lentes ou rapides, facteurs cinétiques, catalyse, vitesses volumiques, temps de demi-réaction et loi de vitesse d'ordre 1."
niveau: terminale
theme: matiere
ordre: 4
duree: "25 min"
motsCles: ["cinétique", "vitesse volumique", "temps de demi-réaction", "catalyseur", "ordre 1", "facteurs cinétiques"]
tp: ["suivi-cinetique"]
---

> **L'essentiel.** Une transformation chimique n'est pas instantanée : elle dure de quelques microsecondes à plusieurs années. La cinétique étudie cette durée. On la mesure par la **vitesse volumique** d'apparition ou de disparition d'une espèce, on la résume par le **temps de demi-réaction**, et on la modifie grâce aux **facteurs cinétiques** et aux **catalyseurs**.

## 1. Transformations lentes et rapides

Une transformation est dite **rapide** quand elle semble achevée dès que les réactifs entrent en contact : l'œil ou l'instrument de mesure ne peut pas suivre son évolution. C'est le cas des réactions acide-base, des précipitations ou de la plupart des réactions support de titrage.

Une transformation est dite **lente** quand son évolution dure de quelques secondes à plusieurs heures (ou davantage) et peut être suivie à l'œil nu ou avec un appareil de mesure. Exemples : l'oxydation des ions iodure $\mathrm{I^-}$ par l'eau oxygénée $\mathrm{H_2O_2}$, la décoloration du permanganate par l'acide oxalique, la formation de la rouille.

Pour **suivre** une transformation lente, on mesure au cours du temps une grandeur liée à la concentration d'une espèce :

| Méthode | Grandeur mesurée | Condition |
|---|---|---|
| Spectrophotométrie | absorbance $A$ | une espèce colorée ; $A = \varepsilon\,\ell\,C$ (loi de Beer-Lambert) |
| Conductimétrie | conductivité $\sigma$ | des ions apparaissent ou disparaissent |
| Pression ou volume de gaz | $P$ ou $V$ | un gaz est produit ou consommé |
| Titrages successifs | concentration | prélèvements refroidis (trempe) pour figer la réaction |

Les méthodes physiques (absorbance, conductivité, pression) sont préférées : elles sont continues et ne perturbent pas le milieu.

## 2. Facteurs cinétiques et catalyse

> **Définition.** Un **facteur cinétique** est un paramètre qui modifie la vitesse d'évolution d'un système chimique.

Les principaux facteurs cinétiques sont :

- la **température** : en général, plus elle est élevée, plus la transformation est rapide. On l'utilise pour accélérer (chauffage à reflux) ou pour bloquer une réaction (trempe dans l'eau glacée, conservation des aliments au réfrigérateur) ;
- la **concentration des réactifs** : plus elle est grande, plus la transformation est rapide ;
- la **surface de contact** entre réactifs, quand l'un d'eux est solide : un solide divisé en poudre réagit plus vite qu'un bloc.

Interprétation microscopique : une réaction se produit lors de **chocs efficaces** entre entités réactives. Augmenter la concentration multiplie les chocs ; augmenter la température rend les chocs plus fréquents et plus énergétiques.

> **Définition.** Un **catalyseur** est une espèce qui **accélère** une transformation chimique sans modifier l'état final du système. Il est consommé puis régénéré : il n'apparaît pas dans l'équation de la réaction.

On distingue :

- la **catalyse homogène** : catalyseur et réactifs sont dans la même phase (ions $\mathrm{Fe^{3+}}$ dissous pour la dismutation de $\mathrm{H_2O_2}$) ;
- la **catalyse hétérogène** : le catalyseur est dans une autre phase, souvent un solide (fil de platine, pot catalytique d'une voiture) ;
- la **catalyse enzymatique** : le catalyseur est une enzyme (catalase du sang pour $\mathrm{H_2O_2}$), très efficace et très **sélective**.

On identifie un catalyseur expérimentalement : la transformation est plus rapide en sa présence, et on le retrouve intact à la fin.

## 3. Vitesses volumiques de disparition et d'apparition

On suit la concentration d'un réactif $\mathrm{A}$ ou d'un produit $\mathrm{B}$ au cours du temps, à volume constant.

> **Définition.** La **vitesse volumique de disparition** d'un réactif $\mathrm{A}$ et la **vitesse volumique d'apparition** d'un produit $\mathrm{B}$ sont :
>
> $$\displaystyle v_{\text{disp}}(\mathrm{A}) = -\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} \qquad v_{\text{app}}(\mathrm{B}) = \frac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t}$$
>
> Elles s'expriment en $\mathrm{mol \cdot L^{-1} \cdot s^{-1}}$ et sont positives.

Le signe moins compense la diminution de $[\mathrm{A}]$ : $\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t}$ est négatif.

**Lecture graphique.** À un instant $t$, la vitesse est la **valeur absolue du coefficient directeur de la tangente** à la courbe $[\mathrm{A}] = f(t)$ (ou $[\mathrm{B}] = f(t)$) au point d'abscisse $t$.

En général, la courbe s'aplatit au cours du temps : les réactifs s'épuisent et la vitesse **diminue** jusqu'à s'annuler à l'état final. La vitesse est alors maximale au début.

## 4. Temps de demi-réaction

> **Définition.** Le **temps de demi-réaction** $t_{1/2}$ est la durée au bout de laquelle l'avancement atteint la moitié de sa valeur finale : $x(t_{1/2}) = \dfrac{x_f}{2}$.

Pour une transformation totale où $\mathrm{A}$ est limitant, c'est aussi la durée au bout de laquelle la moitié de $\mathrm{A}$ a été consommée : $[\mathrm{A}](t_{1/2}) = \dfrac{[\mathrm{A}]_0}{2}$.

Il se lit sur la courbe : on repère l'ordonnée $\dfrac{[\mathrm{A}]_0}{2}$ (ou $\dfrac{x_f}{2}$) puis on lit l'abscisse correspondante. Il donne un **ordre de grandeur de la durée** de la transformation : on considère qu'elle est pratiquement achevée au bout de quelques $t_{1/2}$. Il sert aussi à choisir la méthode de suivi : la mesure doit être bien plus rapide que $t_{1/2}$.

## 5. Loi de vitesse d'ordre 1

> **Définition.** Une réaction suit une **loi de vitesse d'ordre 1** par rapport au réactif $\mathrm{A}$ si sa vitesse volumique de disparition est proportionnelle à sa concentration :
>
> $$\displaystyle v_{\text{disp}}(\mathrm{A}) = -\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} = k\,[\mathrm{A}]$$
>
> La constante de vitesse $k$, positive, s'exprime en $\mathrm{s^{-1}}$ et dépend de la température.

L'équation $\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} + k\,[\mathrm{A}] = 0$ est une équation différentielle linéaire du premier ordre. Sa solution, avec $[\mathrm{A}](0) = [\mathrm{A}]_0$, est :

$$
[\mathrm{A}](t) = [\mathrm{A}]_0\,\mathrm{e}^{-kt}
$$

En posant $[\mathrm{A}](t_{1/2}) = \dfrac{[\mathrm{A}]_0}{2}$, on obtient $\mathrm{e}^{-k t_{1/2}} = \dfrac{1}{2}$, soit :

$$
t_{1/2} = \frac{\ln 2}{k}
$$

Pour une loi d'ordre 1, **le temps de demi-réaction ne dépend pas de la concentration initiale** : la concentration est divisée par 2 toutes les $t_{1/2}$, quel que soit le point de départ.

**Reconnaître l'ordre 1 à partir de mesures.** Trois tests équivalents :

1. la courbe $v_{\text{disp}} = f([\mathrm{A}])$ est une **droite passant par l'origine**, de pente $k$ ;
2. la courbe $\ln [\mathrm{A}] = f(t)$ est une **droite** de pente $-k$, car $\ln [\mathrm{A}] = \ln [\mathrm{A}]_0 - k\,t$ ;
3. le temps de demi-réaction est le même pour plusieurs concentrations initiales.

## Exercice type

On étudie la décomposition d'une espèce $\mathrm{A}$ en solution, de concentration initiale $[\mathrm{A}]_0 = 2{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$. Des mesures à concentrations initiales différentes donnent toutes $t_{1/2} = 140\ \mathrm{s}$.

1. Que peut-on en déduire sur l'ordre de la réaction ? Calculer $k$.
2. Calculer la vitesse volumique de disparition initiale de $\mathrm{A}$.
3. Quelle est la concentration de $\mathrm{A}$ au bout de $7$ minutes ?
4. Au bout de combien de temps reste-t-il $1\ \%$ de $\mathrm{A}$ ?

<details>
<summary>Voir la correction</summary>

1. Le temps de demi-réaction ne dépend pas de la concentration initiale : la réaction est compatible avec une loi d'ordre 1. Alors :

$$
k = \frac{\ln 2}{t_{1/2}} = \frac{0{,}693}{140} = 4{,}95 \times 10^{-3}\ \mathrm{s^{-1}}
$$

2. À $t = 0$ : $v_0 = k\,[\mathrm{A}]_0 = 4{,}95 \times 10^{-3} \times 2{,}0 \times 10^{-2} = 9{,}9 \times 10^{-5}\ \mathrm{mol \cdot L^{-1} \cdot s^{-1}}$.

3. $7\ \mathrm{min} = 420\ \mathrm{s} = 3\,t_{1/2}$ : la concentration a été divisée par $2^3 = 8$.

$$
[\mathrm{A}] = \frac{2{,}0 \times 10^{-2}}{8} = 2{,}5 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}
$$

4. On cherche $t$ tel que $\mathrm{e}^{-kt} = 0{,}01$, soit $t = \dfrac{\ln 100}{k}$ :

$$
t = \frac{4{,}61}{4{,}95 \times 10^{-3}} = 9{,}3 \times 10^{2}\ \mathrm{s}
$$

soit environ $16\ \mathrm{min}$, c'est-à-dire un peu moins de $7\,t_{1/2}$.

</details>

## À retenir

- Une transformation **lente** se suit dans le temps par une mesure physique (absorbance, conductivité, pression).
- Température, concentration des réactifs et surface de contact sont des **facteurs cinétiques**. Un **catalyseur** accélère la réaction sans modifier l'état final et sans être consommé.
- $v_{\text{disp}}(\mathrm{A}) = -\dfrac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t}$ et $v_{\text{app}}(\mathrm{B}) = \dfrac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t}$ : pente de la tangente, en valeur absolue.
- $t_{1/2}$ : durée pour atteindre la moitié de l'avancement final.
- Ordre 1 : $v = k\,[\mathrm{A}]$, $[\mathrm{A}] = [\mathrm{A}]_0\,\mathrm{e}^{-kt}$ et $t_{1/2} = \dfrac{\ln 2}{k}$, indépendant de $[\mathrm{A}]_0$.

## Erreurs fréquentes

- Oublier le **signe moins** dans la vitesse de disparition, ce qui donne une vitesse négative.
- Définir $t_{1/2}$ comme la moitié de la durée totale de la réaction : c'est la durée pour atteindre **la moitié de l'avancement final**.
- Croire qu'un catalyseur augmente la quantité de produit obtenue : il ne change que la **vitesse**, pas l'état final.
- Calculer la pente d'une **corde** entre deux points au lieu de la **tangente** au point voulu.
- Confondre $\ln$ et $\log$ : $t_{1/2} = \dfrac{\ln 2}{k}$ fait intervenir le logarithme népérien.
