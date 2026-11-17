---
titre: "Gaz parfait, énergie interne et premier principe"
description: "Équation d'état pV = nRT et ses limites, travail et transfert thermique, capacité thermique : faire le bilan énergétique d'un système."
niveau: terminale
theme: energie
ordre: 18
duree: "30 min"
motsCles: ["gaz parfait", "équation d'état", "énergie interne", "premier principe", "capacité thermique", "transfert thermique"]
tp: []
---

> **L'essentiel.** Un gaz peu dense se décrit par une seule relation entre pression, volume, température et quantité de matière : l'**équation d'état des gaz parfaits** $pV = nRT$. L'énergie d'un système fermé au repos est stockée sous forme d'**énergie interne** $U$, qui ne varie que par **travail** $W$ ou **transfert thermique** $Q$ : c'est le **premier principe**, $\Delta U = W + Q$. Pour un liquide ou un solide (incompressible), $\Delta U = m\,c\,\Delta T$.

## 1. Le modèle du gaz parfait

Un **système thermodynamique** est la portion de matière que l'on étudie, séparée du reste (le milieu extérieur) par une frontière réelle ou fictive. On le décrit à l'échelle macroscopique par des **variables d'état** : pression $p$, volume $V$, température $T$, quantité de matière $n$.

À l'échelle microscopique, un gaz est constitué d'entités (molécules, atomes) en mouvement désordonné incessant. La **pression** résulte des chocs de ces entités sur les parois ; la **température** traduit l'agitation thermique : plus elle est élevée, plus les entités vont vite en moyenne.

> **Définition.** Le **gaz parfait** est un modèle dans lequel les entités sont considérées comme ponctuelles (leur volume propre est négligeable) et sans interaction entre elles, hormis lors des chocs.

Ce modèle décrit bien les gaz réels lorsqu'ils sont **peu denses** : les entités sont alors très éloignées les unes des autres par rapport à leur taille.

## 2. L'équation d'état des gaz parfaits

> **Loi.** Pour une quantité de matière $n$ de gaz parfait, la pression, le volume et la température sont reliés par :
>
> $$
> pV = nRT
> $$
>
> avec $p$ en pascal ($\mathrm{Pa}$), $V$ en mètre cube ($\mathrm{m^3}$), $n$ en mole ($\mathrm{mol}$), $T$ en kelvin ($\mathrm{K}$) et $R = 8{,}314\ \mathrm{J \cdot mol^{-1} \cdot K^{-1}}$ la constante des gaz parfaits.

La température absolue s'obtient à partir de la température en degrés Celsius par $T = \theta + 273{,}15$. Quelques conséquences utiles :

| Transformation | Grandeurs constantes | Relation |
|---|---|---|
| Isotherme | $n$, $T$ | $pV = \text{constante}$ (loi de Mariotte) |
| Isochore | $n$, $V$ | $\dfrac{p}{T} = \text{constante}$ |
| Isobare | $n$, $p$ | $\dfrac{V}{T} = \text{constante}$ |

Conséquence remarquable : dans les mêmes conditions de pression et de température, une mole de n'importe quel gaz parfait occupe le même volume, le **volume molaire** $V_m = \dfrac{RT}{p}$. À $20\ \mathrm{^\circ C}$ et $1{,}013 \times 10^5\ \mathrm{Pa}$, $V_m \approx 24{,}1\ \mathrm{L \cdot mol^{-1}}$.

**Limites du modèle.** Lorsque la pression augmente ou que la température diminue, le gaz devient dense : le volume propre des entités et leurs interactions ne sont plus négligeables. L'équation d'état n'est alors plus vérifiée, et le modèle ne permet pas de décrire la **liquéfaction**. Le modèle est en revanche excellent pour l'air dans les conditions usuelles (quelques bars, température ambiante).

## 3. L'énergie interne d'un système

L'énergie totale d'un système est la somme de son énergie mécanique macroscopique (cinétique et potentielle d'ensemble) et de son **énergie interne** $U$.

> **Définition.** L'énergie interne $U$ d'un système est la somme des énergies cinétiques microscopiques de ses entités (agitation thermique) et des énergies potentielles d'interaction entre ces entités. Elle s'exprime en joule ($\mathrm{J}$).

On ne sait pas mesurer $U$ elle-même, mais seulement sa **variation** $\Delta U = U_{\text{final}} - U_{\text{initial}}$ au cours d'une transformation. Pour un système au repos à l'échelle macroscopique, toute variation d'énergie se fait sous forme d'énergie interne.

Pour un gaz parfait, les interactions sont négligées : pour une quantité de matière donnée, l'énergie interne ne dépend que de la température. Une élévation de température s'accompagne donc toujours d'une augmentation de $U$.

## 4. Le premier principe de la thermodynamique

Un système fermé échange de l'énergie avec l'extérieur de deux façons :

- par **travail** $W$ : transfert lié à une action mécanique (piston qui comprime un gaz, agitation par une hélice) ou électrique (courant qui traverse un conducteur) ;
- par **transfert thermique** $Q$ : transfert désordonné, au niveau microscopique, qui se fait spontanément du corps chaud vers le corps froid.

> **Premier principe.** Pour un système fermé au repos macroscopique, entre un état initial et un état final :
>
> $$
> \Delta U = W + Q
> $$
>
> $W$ et $Q$ sont des grandeurs algébriques : positives si le système **reçoit** de l'énergie, négatives s'il en **cède**.

Le premier principe exprime la **conservation de l'énergie** : l'énergie ne se crée pas, elle s'échange. Un système isolé (aucun échange) a donc une énergie interne constante.

Exemples de lecture des signes :

- un gaz comprimé par un piston reçoit du travail : $W > 0$ ;
- une boisson qui refroidit au réfrigérateur cède de l'énergie par transfert thermique : $Q < 0$ ;
- un radiateur électrique reçoit un travail électrique et cède autant d'énergie par transfert thermique à la pièce (en régime permanent, $\Delta U = 0$, donc $Q = -W$).

## 5. Capacité thermique d'un système incompressible

Un liquide ou un solide est considéré comme **incompressible** : son volume ne varie pratiquement pas. Il ne reçoit alors aucun travail des forces de pression et la variation de son énergie interne est proportionnelle à sa variation de température.

> **Loi.** Pour un système incompressible de capacité thermique $C$ (en $\mathrm{J \cdot K^{-1}}$), passant de la température $T_i$ à $T_f$ :
>
> $$
> \Delta U = C\,(T_f - T_i) = m\,c\,(T_f - T_i)
> $$
>
> où $m$ est la masse (en $\mathrm{kg}$) et $c$ la **capacité thermique massique** (en $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$).

Une variation de température a la même valeur en kelvin et en degré Celsius : on peut calculer $T_f - T_i$ directement avec des $\mathrm{^\circ C}$.

| Matériau | $c$ en $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$ |
|---|---|
| Eau liquide | $4{,}18 \times 10^3$ |
| Aluminium | $8{,}97 \times 10^2$ |
| Fer | $4{,}49 \times 10^2$ |
| Cuivre | $3{,}85 \times 10^2$ |

L'eau a une capacité thermique massique particulièrement élevée : il faut beaucoup d'énergie pour la chauffer, ce qui en fait un excellent fluide de stockage et de transport de chaleur (chauffage central, régulation du climat par les océans).

## Exercice type

**a.** Un pneu de vélo de volume intérieur $V = 2{,}00\ \mathrm{L}$ est gonflé à la pression $p = 5{,}00 \times 10^5\ \mathrm{Pa}$ à la température $\theta = 20{,}0\ \mathrm{^\circ C}$. On assimile l'air à un gaz parfait. Calculer la quantité de matière d'air dans le pneu.

**b.** Une bouilloire électrique contient $m = 1{,}50\ \mathrm{kg}$ d'eau à $20{,}0\ \mathrm{^\circ C}$. On la porte à $80{,}0\ \mathrm{^\circ C}$. Calculer la variation d'énergie interne de l'eau, puis la durée de chauffage si la résistance fournit à l'eau une puissance $P = 2{,}00\ \mathrm{kW}$ (pertes négligées). Donnée : $c_{\text{eau}} = 4{,}18 \times 10^3\ \mathrm{J \cdot kg^{-1} \cdot K^{-1}}$.

<details>
<summary>Voir la correction</summary>

**a.** On convertit dans les unités SI : $V = 2{,}00 \times 10^{-3}\ \mathrm{m^3}$ et $T = 20{,}0 + 273{,}15 = 293{,}2\ \mathrm{K}$. D'après l'équation d'état :

$$
n = \frac{pV}{RT} = \frac{5{,}00 \times 10^5 \times 2{,}00 \times 10^{-3}}{8{,}314 \times 293{,}2} = 0{,}410\ \mathrm{mol}
$$

**b.** L'eau liquide est un système incompressible :

$$
\Delta U = m\,c\,(\theta_f - \theta_i) = 1{,}50 \times 4{,}18 \times 10^3 \times (80{,}0 - 20{,}0) = 3{,}76 \times 10^5\ \mathrm{J}
$$

L'eau ne reçoit pas de travail ($W = 0$) : d'après le premier principe, $Q = \Delta U$. L'énergie est fournie à la puissance $P$ pendant la durée $\Delta t$, donc $Q = P\,\Delta t$ :

$$
\Delta t = \frac{Q}{P} = \frac{3{,}76 \times 10^5}{2{,}00 \times 10^3} = 188\ \mathrm{s} \approx 3\ \mathrm{min}\ 8\ \mathrm{s}
$$

</details>

## À retenir

- Gaz parfait : entités ponctuelles sans interaction, valable pour un gaz **peu dense**.
- Équation d'état : $pV = nRT$, toujours en **unités SI** ($\mathrm{Pa}$, $\mathrm{m^3}$, $\mathrm{K}$).
- L'énergie interne $U$ regroupe les énergies microscopiques (agitation et interactions).
- Premier principe : $\Delta U = W + Q$, avec $W$ et $Q$ comptés positivement quand le système reçoit.
- Système incompressible : $\Delta U = m\,c\,\Delta T$.

## Erreurs fréquentes

- Utiliser des degrés Celsius ou des litres dans $pV = nRT$ : la température doit être en **kelvin** et le volume en **mètre cube**.
- Confondre **température** et **transfert thermique** : la température est une variable d'état, le transfert thermique est une énergie échangée.
- Se tromper de signe : un système qui **cède** de l'énergie a un $Q$ ou un $W$ **négatif**.
- Appliquer le modèle du gaz parfait à un gaz très comprimé ou proche de sa liquéfaction.
