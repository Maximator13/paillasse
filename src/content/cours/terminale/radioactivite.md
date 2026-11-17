---
titre: "Radioactivité : transformations nucléaires et décroissance"
description: "Stabilité des noyaux, désintégrations alpha et bêta, loi de décroissance, demi-vie et activité : de la datation au carbone 14 à la médecine nucléaire."
niveau: terminale
theme: matiere
ordre: 6
duree: "30 min"
motsCles: ["radioactivité", "demi-vie", "activité", "décroissance", "datation", "noyau"]
tp: ["decroissance-radioactive"]
---

> **L'essentiel.** Un noyau instable se désintègre spontanément en émettant une particule ($\alpha$, $\beta^-$ ou $\beta^+$), souvent accompagnée d'un rayonnement $\gamma$. Ce phénomène est **aléatoire** pour un noyau isolé, mais une population de noyaux décroît de façon parfaitement prévisible : **exponentiellement**, avec une **demi-vie** propre à chaque isotope. C'est la clé de la datation et de nombreuses applications médicales, qui imposent des règles de radioprotection.

## 1. Stabilité des noyaux

Un noyau ${}^{A}_{Z}\mathrm{X}$ contient $A$ nucléons : $Z$ protons et $N = A - Z$ neutrons. Des noyaux de même $Z$ mais de $A$ différents sont des **isotopes** (par exemple ${}^{12}_{6}\mathrm{C}$ et ${}^{14}_{6}\mathrm{C}$).

Sur le **diagramme $(N, Z)$** ($N$ en abscisse, $Z$ en ordonnée), chaque noyau connu est représenté par un point. Les noyaux stables se regroupent dans une bande étroite, la **vallée de stabilité** :

- pour $Z < 20$ environ, elle suit la droite $N = Z$ ;
- pour les noyaux plus lourds, elle s'incurve vers $N > Z$ : il faut davantage de neutrons pour assurer la cohésion du noyau ;
- au-delà de $Z = 82$ (plomb), aucun noyau n'est stable.

> **Définition.** Un noyau **radioactif** est un noyau instable qui se transforme spontanément en un autre noyau, plus stable, en émettant une ou plusieurs particules. La position du noyau sur le diagramme $(N, Z)$ permet de prévoir son type de désintégration.

## 2. Les différents types de radioactivité

Une équation de réaction nucléaire obéit aux **lois de conservation** (lois de Soddy) :

> **Loi.** Au cours d'une transformation nucléaire, il y a conservation du **nombre de nucléons** $A$ et conservation du **nombre de charge** $Z$.

| Type | Particule émise | Noyaux concernés | Équation générale |
|---|---|---|---|
| $\alpha$ | noyau d'hélium ${}^{4}_{2}\mathrm{He}$ | noyaux lourds ($A > 200$) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A-4}_{Z-2}\mathrm{Y} + {}^{4}_{2}\mathrm{He}$ |
| $\beta^-$ | électron ${}^{0}_{-1}\mathrm{e}$ | excès de neutrons (sous la vallée) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A}_{Z+1}\mathrm{Y} + {}^{0}_{-1}\mathrm{e}$ |
| $\beta^+$ | positon ${}^{0}_{1}\mathrm{e}$ | excès de protons (au-dessus de la vallée) | ${}^{A}_{Z}\mathrm{X} \rightarrow {}^{A}_{Z-1}\mathrm{Y} + {}^{0}_{1}\mathrm{e}$ |

Exemples :

$$
{}^{238}_{92}\mathrm{U} \rightarrow {}^{234}_{90}\mathrm{Th} + {}^{4}_{2}\mathrm{He}
\qquad
{}^{60}_{27}\mathrm{Co} \rightarrow {}^{60}_{28}\mathrm{Ni} + {}^{0}_{-1}\mathrm{e}
\qquad
{}^{18}_{9}\mathrm{F} \rightarrow {}^{18}_{8}\mathrm{O} + {}^{0}_{1}\mathrm{e}
$$

En $\beta^-$, un neutron du noyau se transforme en proton ; en $\beta^+$, un proton se transforme en neutron. Ces émissions s'accompagnent aussi d'une particule de masse quasi nulle (neutrino ou antineutrino) qu'on n'écrit pas au lycée.

**Émission $\gamma$.** Le noyau fils est souvent produit dans un état **excité**, noté ${}^{A}_{Z}\mathrm{Y}^*$. Il retourne à son état fondamental en émettant un photon de très haute énergie :

$$
{}^{A}_{Z}\mathrm{Y}^* \rightarrow {}^{A}_{Z}\mathrm{Y} + \gamma
$$

Ni $A$ ni $Z$ ne changent : l'émission $\gamma$ ne modifie pas la nature du noyau.

## 3. Loi de décroissance radioactive

On ne peut pas prévoir l'instant où **un** noyau donné se désintégrera. En revanche, pour un grand nombre $N$ de noyaux, le nombre de désintégrations pendant une durée $\mathrm{d}t$ est proportionnel à $N$ et à $\mathrm{d}t$ :

$$
\mathrm{d}N = -\lambda\,N\,\mathrm{d}t
\qquad\text{soit}\qquad
\frac{\mathrm{d}N}{\mathrm{d}t} = -\lambda\,N
$$

> **Définition.** La **constante radioactive** $\lambda$ (en $\mathrm{s^{-1}}$) caractérise un isotope : c'est la probabilité de désintégration d'un noyau par unité de temps. Elle ne dépend ni de la température, ni de la pression, ni de l'environnement chimique.

La solution de cette équation différentielle, avec $N(0) = N_0$, est la **loi de décroissance** :

$$
N(t) = N_0\,\mathrm{e}^{-\lambda t}
$$

> **Définition.** La **demi-vie** $t_{1/2}$ est la durée au bout de laquelle la moitié des noyaux initialement présents se sont désintégrés.

En écrivant $N(t_{1/2}) = \dfrac{N_0}{2}$, on obtient $\mathrm{e}^{-\lambda t_{1/2}} = \dfrac{1}{2}$, d'où :

$$
t_{1/2} = \frac{\ln 2}{\lambda}
$$

Après $n$ demi-vies, il reste $\dfrac{N_0}{2^n}$ noyaux : environ $3\ \%$ après 5 demi-vies, $0{,}1\ \%$ après 10.

| Isotope | Type | Demi-vie |
|---|---|---|
| Fluor 18 | $\beta^+$ | $110\ \mathrm{min}$ |
| Iode 131 | $\beta^-$ | $8{,}0\ \mathrm{jours}$ |
| Carbone 14 | $\beta^-$ | $5\,730\ \mathrm{ans}$ |
| Uranium 238 | $\alpha$ | $4{,}5 \times 10^{9}\ \mathrm{ans}$ |

## 4. Activité d'un échantillon

> **Définition.** L'**activité** $A$ d'un échantillon est le nombre de désintégrations par seconde. Elle s'exprime en **becquerels** ($1\ \mathrm{Bq} = 1$ désintégration par seconde).

$$
A(t) = -\frac{\mathrm{d}N}{\mathrm{d}t} = \lambda\,N(t)
\qquad\text{donc}\qquad
A(t) = A_0\,\mathrm{e}^{-\lambda t}
$$

L'activité décroît avec la même demi-vie que le nombre de noyaux. Elle se **mesure** directement avec un compteur (compteur Geiger), ce qui permet de suivre la décroissance sans compter les noyaux. Ordres de grandeur : le corps humain a une activité d'environ $8\ \mathrm{kBq}$ (potassium 40 et carbone 14), une source scolaire quelques $\mathrm{kBq}$.

## 5. Datation et applications médicales

**Datation.** Si l'on connaît l'activité initiale $A_0$ et que l'on mesure $A(t)$, on en déduit l'âge :

$$
t = \frac{1}{\lambda}\ln\frac{A_0}{A} = \frac{t_{1/2}}{\ln 2}\ln\frac{A_0}{A}
$$

Un organisme vivant échange du carbone avec l'atmosphère : sa proportion de carbone 14 est constante. À sa mort, les échanges cessent et le carbone 14 décroît. Cette méthode date des restes organiques jusqu'à environ $50\,000$ ans. Pour les roches, on utilise des isotopes de très longue demi-vie (uranium 238, potassium 40). On choisit un isotope dont la demi-vie est du même ordre que l'âge recherché.

**Médecine nucléaire.**

- **Imagerie (TEP)** : on injecte une molécule marquée au fluor 18, émetteur $\beta^+$. Le positon s'annihile avec un électron en émettant deux photons $\gamma$ détectés autour du patient. La courte demi-vie limite la dose reçue.
- **Radiothérapie** : un faisceau de rayonnements ionisants (photons X ou $\gamma$, électrons) détruit les cellules tumorales. En radiothérapie interne, l'iode 131, fixé par la thyroïde, traite certains cancers de cet organe.

**Radioprotection.** Les rayonnements sont **ionisants** : ils peuvent endommager l'ADN. On se protège selon trois principes : limiter la **durée** d'exposition, augmenter la **distance** à la source, interposer un **écran**. Les particules $\alpha$ sont arrêtées par une feuille de papier, les $\beta$ par quelques millimètres d'aluminium, les $\gamma$ nécessitent plusieurs centimètres de plomb ou un mur de béton.

## Exercice type

Un fragment de bois trouvé sur un site archéologique présente une activité due au carbone 14 égale à $60\ \%$ de celle d'un bois actuel de même masse. La demi-vie du carbone 14 est $t_{1/2} = 5\,730\ \mathrm{ans}$.

1. Écrire l'équation de la désintégration $\beta^-$ du carbone 14.
2. Calculer la constante radioactive $\lambda$ en $\mathrm{s^{-1}}$ (on prendra $1\ \mathrm{an} = 3{,}156 \times 10^{7}\ \mathrm{s}$).
3. Estimer l'âge du fragment.

<details>
<summary>Voir la correction</summary>

1. Par conservation de $A$ et de $Z$ :

$$
{}^{14}_{6}\mathrm{C} \rightarrow {}^{14}_{7}\mathrm{N} + {}^{0}_{-1}\mathrm{e}
$$

2. $t_{1/2} = 5\,730 \times 3{,}156 \times 10^{7} = 1{,}808 \times 10^{11}\ \mathrm{s}$, donc :

$$
\lambda = \frac{\ln 2}{t_{1/2}} = \frac{0{,}693}{1{,}808 \times 10^{11}} = 3{,}83 \times 10^{-12}\ \mathrm{s^{-1}}
$$

3. On a $\dfrac{A}{A_0} = 0{,}60$. L'âge vaut :

$$
t = \frac{t_{1/2}}{\ln 2}\ln\frac{A_0}{A} = \frac{5\,730}{0{,}693} \times \ln\frac{1}{0{,}60} = 8\,268 \times 0{,}511 \approx 4{,}2 \times 10^{3}\ \mathrm{ans}
$$

Vérification : $0{,}60$ est compris entre $1$ et $0{,}5$, l'âge doit être inférieur à une demi-vie, ce qui est le cas.

</details>

## À retenir

- Lois de conservation : le nombre de nucléons $A$ et le nombre de charge $Z$ se conservent.
- $\alpha$ : noyaux lourds ; $\beta^-$ : excès de neutrons ; $\beta^+$ : excès de protons ; $\gamma$ : désexcitation sans changement de noyau.
- Loi de décroissance : $N(t) = N_0\,\mathrm{e}^{-\lambda t}$ et $A(t) = \lambda N(t) = A_0\,\mathrm{e}^{-\lambda t}$.
- Demi-vie : $t_{1/2} = \dfrac{\ln 2}{\lambda}$, indépendante de la quantité initiale.
- Datation : $t = \dfrac{t_{1/2}}{\ln 2}\ln\dfrac{A_0}{A}$.

## Erreurs fréquentes

- Croire qu'au bout de deux demi-vies tous les noyaux ont disparu : il en reste un quart.
- Oublier de convertir $t_{1/2}$ en secondes avant de calculer $\lambda$ en $\mathrm{s^{-1}}$ ou une activité en $\mathrm{Bq}$.
- Confondre positon ${}^{0}_{1}\mathrm{e}$ et électron ${}^{0}_{-1}\mathrm{e}$, ou écrire une équation sans vérifier la conservation de $A$ et de $Z$.
- Penser que chauffer ou dissoudre un échantillon modifie sa demi-vie : la décroissance est un phénomène purement nucléaire.
