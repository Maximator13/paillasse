---
titre: "Stratégie de synthèse : optimiser et concevoir"
description: "Vitesse et rendement, transformations de groupes caractéristiques, protection, protocole au reflux et chimie verte : élaborer une synthèse organique."
niveau: terminale
theme: matiere
ordre: 12
duree: "30 min"
motsCles: ["synthèse organique", "rendement", "chauffage à reflux", "catalyseur", "substitution", "addition", "élimination", "groupe protecteur", "chimie verte"]
tp: ["synthese-ester"]
---

> **L'essentiel.** Une synthèse organique se conçoit comme une suite d'étapes : on choisit les réactions qui modifient la chaîne ou les groupes caractéristiques, on accélère chaque étape (température, catalyseur) et on améliore son rendement (excès d'un réactif, élimination d'un produit). On protège au besoin un groupe qui ne doit pas réagir, et l'on privilégie les procédés écoresponsables.

## 1. Les étapes d'un protocole de synthèse

Tout protocole de synthèse comporte quatre grandes étapes.

| Étape | Objectif | Techniques courantes |
|---|---|---|
| **Transformation** | faire réagir les réactifs | chauffage à reflux, agitation, catalyseur |
| **Séparation** | isoler le produit brut du milieu réactionnel | extraction par solvant (ampoule à décanter), filtration sous vide, distillation |
| **Purification** | éliminer les impuretés restantes | lavage, séchage (sulfate de magnésium anhydre), recristallisation, distillation fractionnée |
| **Analyse** | identifier le produit et contrôler sa pureté | température de fusion, chromatographie sur couche mince, spectroscopie IR, indice de réfraction |

> **Définition.** Le **chauffage à reflux** consiste à chauffer le milieu réactionnel tout en condensant les vapeurs dans un réfrigérant vertical (à boules ou droit) : elles retombent dans le ballon. On travaille ainsi à température élevée **sans perte de matière**.

Le montage comprend un chauffe-ballon, un ballon contenant quelques grains de pierre ponce (pour régulariser l'ébullition) et un réfrigérant dans lequel l'eau entre par le bas et sort par le haut. La température du milieu est alors fixée par l'ébullition du solvant.

## 2. Optimiser la vitesse d'une étape

La durée d'une synthèse a un coût (énergie, occupation du matériel). On accélère une transformation en agissant sur les **facteurs cinétiques** :

- la **température** : l'agitation thermique augmente le nombre de chocs efficaces entre entités réactives. C'est l'intérêt principal du chauffage à reflux ;
- la **concentration** des réactifs : plus elle est élevée, plus les chocs sont fréquents ;
- le **catalyseur** : il accélère la réaction sans être consommé et sans modifier l'état final. Il ouvre un autre chemin réactionnel, plus rapide ;
- le **choix du solvant**, qui doit dissoudre les réactifs pour les mettre en contact.

Pour l'estérification, l'acide sulfurique concentré (ou l'acide paratoluènesulfonique, APTS) joue le rôle de catalyseur : il fournit des ions $\mathrm{H^+}$ qui activent l'acide carboxylique.

> **À noter.** Un catalyseur accélère aussi bien la réaction directe que la réaction inverse : il permet d'atteindre plus vite l'état d'équilibre, mais **ne change pas le rendement**.

## 3. Optimiser le rendement

> **Définition.** Le **rendement** $\eta$ d'une synthèse est le rapport de la quantité de produit obtenue à la quantité maximale que l'on pourrait obtenir si la réaction était totale.

$$
\eta = \frac{n_{\text{obtenue}}}{n_{\max}}
$$

$n_{\max}$ se calcule à partir du **réactif limitant** et de la stœchiométrie. Pour une synthèse en plusieurs étapes, le rendement global est le produit des rendements de chaque étape : $\eta = \eta_1 \times \eta_2 \times \dots$

Une réaction non totale aboutit à un équilibre chimique. Le rendement est alors limité, par exemple à environ 67 % pour l'estérification d'un alcool primaire avec des quantités équimolaires :

$$
\mathrm{R{-}COOH + R'{-}OH \rightleftharpoons R{-}COO{-}R' + H_2O}
$$

On **déplace l'équilibre** dans le sens direct de deux façons :

1. **Introduire un réactif en excès**, de préférence le moins cher : le quotient de réaction $Q_r$ diminue, devient inférieur à $K$, et le système évolue dans le sens direct.
2. **Éliminer un produit** au fur et à mesure de sa formation, par exemple l'eau avec un appareil de Dean-Stark ou l'ester par distillation : $Q_r$ reste inférieur à $K$ et la transformation se poursuit.

On peut aussi remplacer un réactif par un autre plus réactif (un anhydride d'acide à la place de l'acide carboxylique) : la réaction devient totale. Enfin, une partie du produit se perd lors de la séparation et de la purification : un protocole soigné limite ces pertes.

## 4. Modifier une chaîne ou un groupe caractéristique

Une synthèse modifie soit le **squelette carboné** (allongement, raccourcissement, ramification, cyclisation, polymérisation), soit les **groupes caractéristiques**. On classe les réactions en trois catégories selon la façon dont les liaisons évoluent.

| Catégorie | Ce qui se passe | Exemple |
|---|---|---|
| **Substitution** | un atome ou groupe d'atomes est remplacé par un autre | $\mathrm{CH_3{-}CH_2{-}Br + HO^- \rightarrow CH_3{-}CH_2{-}OH + Br^-}$ |
| **Addition** | deux molécules s'unissent ; une liaison multiple devient simple | $\mathrm{CH_2{=}CH_2 + H_2O \rightarrow CH_3{-}CH_2{-}OH}$ |
| **Élimination** | une petite molécule est retirée ; une liaison multiple apparaît | $\mathrm{CH_3{-}CH_2{-}OH \rightarrow CH_2{=}CH_2 + H_2O}$ |

On reconnaît la catégorie en comparant réactifs et produits : une addition fait **disparaître** une double liaison, une élimination en **crée** une, une substitution conserve la structure en échangeant un groupe. L'estérification est une réaction de substitution : le groupe $\mathrm{{-}OH}$ de l'acide est remplacé par le groupe $\mathrm{{-}O{-}R'}$.

## 5. Protection et déprotection

Une molécule polyfonctionnelle possède plusieurs groupes caractéristiques. Un réactif peut alors attaquer un groupe que l'on veut conserver : la réaction n'est pas **sélective**.

> **Définition.** **Protéger** un groupe caractéristique, c'est le transformer temporairement en un groupe inerte vis-à-vis du réactif utilisé. Après la réaction voulue, on le **déprotège** pour retrouver le groupe initial.

La stratégie suit trois étapes : protection, transformation du groupe visé, déprotection. Une bonne protection doit être facile à mettre en place, résister aux conditions de l'étape suivante et s'éliminer facilement avec un bon rendement.

Exemple classique : en synthèse peptidique, pour former la liaison amide entre deux acides aminés choisis, on protège le groupe amine de l'un et le groupe carboxyle de l'autre, sinon on obtiendrait un mélange de dipeptides.

Le prix à payer : deux étapes supplémentaires, donc un rendement global plus faible, plus de réactifs et plus de déchets.

## 6. Vers une synthèse écoresponsable

La **chimie verte** cherche à réduire l'impact d'une synthèse sur l'environnement et la santé. Ses principes guident les choix de stratégie :

- limiter le **nombre d'étapes** (et donc les protections inutiles) ;
- utiliser des **catalyseurs** plutôt que des réactifs en quantité stœchiométrique ;
- choisir des **solvants** peu toxiques (eau, éthanol) ou travailler sans solvant ;
- économiser l'énergie (température ambiante, chauffage par micro-ondes) ;
- préférer des réactifs issus de **ressources renouvelables** ;
- maximiser l'**économie d'atomes** : la plus grande partie des atomes des réactifs doit se retrouver dans le produit. Une addition est idéale de ce point de vue ; une substitution ou une élimination produit des sous-produits.

## Exercice type

On synthétise l'éthanoate de 3-méthylbutyle (arôme de banane) par chauffage à reflux d'un mélange de $V_1 = 20{,}0\ \mathrm{mL}$ de 3-méthylbutan-1-ol, de $V_2 = 30{,}0\ \mathrm{mL}$ d'acide éthanoïque et de quelques gouttes d'acide sulfurique concentré. Après séparation et purification, on obtient $m = 16{,}8\ \mathrm{g}$ d'ester.

Données : 3-méthylbutan-1-ol : $\rho_1 = 0{,}81\ \mathrm{g \cdot mL^{-1}}$, $M_1 = 88{,}1\ \mathrm{g \cdot mol^{-1}}$ ; acide éthanoïque : $\rho_2 = 1{,}05\ \mathrm{g \cdot mL^{-1}}$, $M_2 = 60{,}1\ \mathrm{g \cdot mol^{-1}}$ ; ester : $M = 130{,}2\ \mathrm{g \cdot mol^{-1}}$.

1. Quel est le rôle de l'acide sulfurique ? Pourquoi chauffer à reflux ?
2. Déterminer le réactif limitant.
3. Calculer le rendement de la synthèse.

<details>
<summary>Voir la correction</summary>

1. L'acide sulfurique est un **catalyseur** : il accélère la réaction sans modifier l'état final. Le chauffage à reflux accélère la transformation (température élevée) sans perte de réactifs ni de produits.

2. Les quantités de matière initiales valent :

$$
n_1 = \frac{\rho_1 V_1}{M_1} = \frac{0{,}81 \times 20{,}0}{88{,}1} = 0{,}184\ \mathrm{mol}
\qquad
n_2 = \frac{\rho_2 V_2}{M_2} = \frac{1{,}05 \times 30{,}0}{60{,}1} = 0{,}524\ \mathrm{mol}
$$

Les nombres stœchiométriques valent 1 : l'alcool est le **réactif limitant**, l'acide est en excès pour déplacer l'équilibre.

3. La quantité maximale d'ester est $n_{\max} = n_1 = 0{,}184\ \mathrm{mol}$. La quantité obtenue vaut :

$$
n_{\text{obtenue}} = \frac{m}{M} = \frac{16{,}8}{130{,}2} = 0{,}129\ \mathrm{mol}
\qquad\text{d'où}\qquad
\eta = \frac{0{,}129}{0{,}184} = 0{,}70 \text{ soit } 70\ \%
$$

</details>

## À retenir

- Protocole : **transformation, séparation, purification, analyse**.
- Le **chauffage à reflux** accélère la réaction sans perte de matière.
- La vitesse augmente avec la **température**, la **concentration** et un **catalyseur** ; le catalyseur ne modifie pas le rendement.
- Le rendement $\eta = \dfrac{n_{\text{obtenue}}}{n_{\max}}$ augmente avec un **réactif en excès** ou l'**élimination d'un produit**.
- Trois catégories de réactions : **substitution, addition, élimination**.
- Une **protection** rend une synthèse sélective, au prix de deux étapes en plus.

## Erreurs fréquentes

- Croire qu'un catalyseur augmente le rendement : il ne fait qu'atteindre l'équilibre plus vite.
- Calculer $n_{\max}$ avec le réactif en excès au lieu du réactif **limitant**.
- Oublier la masse volumique : un volume de liquide pur se convertit en masse par $m = \rho V$, pas par $m = C_m V$.
- Confondre **addition** (une liaison double disparaît) et **élimination** (une liaison double apparaît).
