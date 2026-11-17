---
titre: "Transferts thermiques : conduction, convection, rayonnement"
description: "Flux et résistance thermiques, bilan radiatif de la Terre, loi de Newton : comment l'énergie thermique circule et comment un corps refroidit."
niveau: terminale
theme: energie
ordre: 19
duree: "30 min"
motsCles: ["transfert thermique", "flux thermique", "résistance thermique", "Stefan-Boltzmann", "effet de serre", "loi de Newton"]
tp: ["refroidissement-newton"]
---

> **L'essentiel.** Un transfert thermique va toujours spontanément du corps **chaud** vers le corps **froid**. Il se fait par conduction, convection ou rayonnement. Sa rapidité se mesure par le **flux thermique** $\Phi$, proportionnel à l'écart de température et inversement proportionnel à la **résistance thermique**. Le bilan radiatif de la Terre (loi de Stefan-Boltzmann, albédo) fixe sa température moyenne, que l'**effet de serre** relève. Un système au contact d'un thermostat voit sa température tendre **exponentiellement** vers celle du thermostat.

## 1. Trois modes de transfert thermique

Un **transfert thermique** $Q$ est un échange d'énergie dû à une différence de température, sans travail mécanique. À l'échelle microscopique, il traduit le partage de l'agitation thermique désordonnée des particules.

| Mode | Support | Mécanisme | Exemple |
|---|---|---|---|
| **Conduction** | solide ou fluide immobile | transmission de proche en proche de l'agitation, sans déplacement de matière | poignée de casserole qui chauffe |
| **Convection** | fluide (liquide, gaz) | déplacement d'ensemble du fluide, qui emporte son énergie | eau qui chauffe dans une casserole, radiateur |
| **Rayonnement** | aucun (possible dans le vide) | émission et absorption d'ondes électromagnétiques | Soleil qui chauffe la Terre |

> **Sens du transfert.** Spontanément, un transfert thermique s'effectue toujours du système de plus haute température vers celui de plus basse température. Il cesse quand les températures sont égales : c'est l'**équilibre thermique**.

Rappel du premier principe pour un système incompressible au repos : $\Delta U = W + Q$, avec $\Delta U = C\,\Delta T = m\,c\,\Delta T$, où $C$ est la capacité thermique (en $\mathrm{J \cdot K^{-1}}$) et $c$ la capacité thermique massique (en $\mathrm{J \cdot kg^{-1} \cdot K^{-1}}$).

## 2. Flux thermique et résistance thermique

> **Définition.** Le **flux thermique** $\Phi$ est l'énergie transférée par unité de temps à travers une paroi. Il s'exprime en watts :
>
> $$
> \Phi = \frac{Q}{\Delta t}
> $$
>
> avec $Q$ en joules et $\Delta t$ en secondes.

À travers une paroi plane dont les faces sont maintenues aux températures $T_1 > T_2$, le flux est proportionnel à l'écart de température :

$$
\Phi = \frac{T_1 - T_2}{R_{\text{th}}}
$$

La **résistance thermique** $R_{\text{th}}$ (en $\mathrm{K \cdot W^{-1}}$) traduit l'aptitude de la paroi à freiner le transfert. Pour une paroi d'épaisseur $e$, de surface $S$, faite d'un matériau de conductivité thermique $\lambda$ (expression fournie en exercice) :

$$
R_{\text{th}} = \frac{e}{\lambda\,S}
$$

| Matériau | $\lambda$ en $\mathrm{W \cdot m^{-1} \cdot K^{-1}}$ |
|---|---|
| Cuivre | $390$ |
| Béton | $1{,}5$ |
| Verre | $1{,}0$ |
| Brique | $0{,}84$ |
| Bois | $0{,}15$ |
| Polystyrène expansé | $0{,}035$ |
| Air immobile | $0{,}025$ |

Un bon **isolant** a une faible conductivité thermique, donc une grande résistance. L'analogie avec l'électricité est fidèle : l'écart de température joue le rôle de la tension, le flux celui de l'intensité, $R_{\text{th}}$ celui de la résistance. Pour des parois **superposées** (traversées par le même flux), les résistances s'**ajoutent** :

$$
R_{\text{th,totale}} = R_1 + R_2 + \dots
$$

## 3. Bilan radiatif de la Terre

Tout corps émet un rayonnement électromagnétique qui dépend de sa température. Pour un corps noir (modèle d'émetteur et d'absorbeur idéal) :

> **Loi de Stefan-Boltzmann (fournie).** La puissance surfacique rayonnée par un corps noir de température $T$ (en kelvins) vaut
>
> $$
> p = \sigma\,T^4 \qquad \text{avec } \sigma = 5{,}67 \times 10^{-8}\ \mathrm{W \cdot m^{-2} \cdot K^{-4}}
> $$

La puissance totale émise par une surface $S$ est $P = \sigma\,S\,T^4$. Le Soleil (environ $5\,800\ \mathrm{K}$) a son maximum d'émission dans le visible ; la Terre, à environ $288\ \mathrm{K}$, émet dans l'**infrarouge**.

**Puissance reçue.** Hors atmosphère, la Terre reçoit en moyenne $p_{\text{reçue}} \approx 340\ \mathrm{W \cdot m^{-2}}$ (le quart de la constante solaire $1361\ \mathrm{W \cdot m^{-2}}$, car le disque éclairé $\pi R^2$ vaut le quart de la sphère $4\pi R^2$).

> **Définition.** L'**albédo** $A$ est la fraction de la puissance solaire incidente directement réfléchie vers l'espace (nuages, glaces, sols clairs). Pour la Terre, $A \approx 0{,}30$.

La puissance surfacique absorbée vaut donc $(1 - A)\,p_{\text{reçue}} \approx 240\ \mathrm{W \cdot m^{-2}}$. À l'équilibre, la Terre émet autant qu'elle absorbe. Sans atmosphère :

$$
\sigma\,T^4 = (1 - A)\,p_{\text{reçue}}
\quad\Rightarrow\quad
T = \left(\frac{240}{5{,}67 \times 10^{-8}}\right)^{1/4} \approx 255\ \mathrm{K}
$$

soit environ $-18\,^{\circ}\mathrm{C}$, alors que la température moyenne observée est $15\,^{\circ}\mathrm{C}$.

**Effet de serre.** L'atmosphère est presque transparente au rayonnement solaire visible, mais certains gaz ($\mathrm{H_2O}$, $\mathrm{CO_2}$, $\mathrm{CH_4}$) absorbent une grande partie de l'infrarouge émis par le sol. L'atmosphère réchauffée rayonne à son tour, en partie vers le sol, qui reçoit ainsi une puissance supplémentaire : sa température d'équilibre s'élève. L'augmentation de la concentration de ces gaz renforce cet effet.

## 4. Loi de Newton et évolution de la température

Un système de température $T$ est en contact avec un **thermostat** : un milieu (air ambiant, bain) dont la température $T_{\text{ext}}$ reste constante quels que soient les échanges.

> **Loi de Newton (fournie).** Le flux thermique conducto-convectif reçu par le système à travers sa surface $S$ vaut
>
> $$
> \Phi = h\,S\,(T_{\text{ext}} - T)
> $$
>
> où $h$ (en $\mathrm{W \cdot m^{-2} \cdot K^{-1}}$) est le coefficient d'échange.

**Bilan d'énergie.** Entre $t$ et $t + \Delta t$, sans travail, le système incompressible reçoit $Q = \Phi\,\Delta t$, d'où $C\,\Delta T = h\,S\,(T_{\text{ext}} - T)\,\Delta t$. En divisant par $\Delta t$ et en faisant tendre $\Delta t$ vers 0 :

$$
\frac{\mathrm{d}T}{\mathrm{d}t} + \frac{T}{\tau} = \frac{T_{\text{ext}}}{\tau}
\qquad\text{avec}\qquad
\tau = \frac{C}{h\,S} = \frac{m\,c}{h\,S}
$$

Avec la condition initiale $T(0) = T_0$, la solution est :

$$
T(t) = T_{\text{ext}} + (T_0 - T_{\text{ext}})\,e^{-t/\tau}
$$

- La température tend vers $T_{\text{ext}}$ : l'écart $T - T_{\text{ext}}$ décroît exponentiellement.
- À $t = \tau$, il reste $37\ \%$ de l'écart initial ; au bout de $5\tau$, moins de $1\ \%$ : l'équilibre est pratiquement atteint.
- La tangente à l'origine coupe l'asymptote $T = T_{\text{ext}}$ à l'instant $t = \tau$.
- Un système de grande capacité thermique ou de petite surface d'échange (grand $\tau$) évolue lentement.

## Exercice type

**A.** Un mur de brique ($\lambda = 0{,}84\ \mathrm{W \cdot m^{-1} \cdot K^{-1}}$) a une épaisseur $e = 20\ \mathrm{cm}$ et une surface $S = 10\ \mathrm{m^2}$. Il fait $20\,^{\circ}\mathrm{C}$ à l'intérieur et $5\,^{\circ}\mathrm{C}$ dehors. Calculer le flux thermique, puis le recalculer après ajout de $10\ \mathrm{cm}$ de polystyrène ($\lambda = 0{,}035\ \mathrm{W \cdot m^{-1} \cdot K^{-1}}$).

**B.** Un thé à $80\,^{\circ}\mathrm{C}$ refroidit dans une pièce à $20\,^{\circ}\mathrm{C}$ selon la loi de Newton, avec $\tau = 15\ \mathrm{min}$. Au bout de combien de temps atteint-il $50\,^{\circ}\mathrm{C}$ ?

<details>
<summary>Voir la correction</summary>

**A.** Résistance du mur seul :

$$
R_1 = \frac{e}{\lambda\,S} = \frac{0{,}20}{0{,}84 \times 10} = 2{,}4 \times 10^{-2}\ \mathrm{K \cdot W^{-1}}
\qquad
\Phi_1 = \frac{20 - 5}{2{,}4 \times 10^{-2}} \approx 6{,}3 \times 10^{2}\ \mathrm{W}
$$

Résistance de l'isolant : $R_2 = \dfrac{0{,}10}{0{,}035 \times 10} = 0{,}29\ \mathrm{K \cdot W^{-1}}$. Les parois sont superposées, les résistances s'ajoutent : $R = R_1 + R_2 = 0{,}31\ \mathrm{K \cdot W^{-1}}$.

$$
\Phi_2 = \frac{15}{0{,}31} \approx 48\ \mathrm{W}
$$

L'isolant divise les pertes par environ 13.

**B.** On cherche $t$ tel que $50 = 20 + (80 - 20)\,e^{-t/\tau}$, soit $e^{-t/\tau} = \dfrac{30}{60} = \dfrac{1}{2}$ :

$$
t = \tau \ln 2 = 15 \times 0{,}693 \approx 10\ \mathrm{min}
$$

</details>

## À retenir

- Transfert thermique spontané : du chaud vers le froid, par **conduction**, **convection** ou **rayonnement**.
- Flux thermique : $\Phi = \dfrac{Q}{\Delta t} = \dfrac{T_1 - T_2}{R_{\text{th}}}$, avec $R_{\text{th}} = \dfrac{e}{\lambda\,S}$ ; résistances en série additives.
- Stefan-Boltzmann : $p = \sigma\,T^4$. Équilibre radiatif de la Terre : $\sigma\,T^4 = (1 - A)\,p_{\text{reçue}}$.
- L'effet de serre provient de l'absorption de l'infrarouge terrestre par l'atmosphère.
- Loi de Newton : $\Phi = h\,S\,(T_{\text{ext}} - T)$ ; au contact d'un thermostat, $T(t) = T_{\text{ext}} + (T_0 - T_{\text{ext}})\,e^{-t/\tau}$, avec $\tau = \dfrac{m\,c}{h\,S}$.

## Erreurs fréquentes

- Utiliser des degrés Celsius dans la loi de Stefan-Boltzmann : la température doit être en **kelvins** (dans un écart de température, en revanche, $1\ \mathrm{K} = 1\,^{\circ}\mathrm{C}$).
- Confondre **chaleur** et **température** : la température est une grandeur d'état, le transfert thermique une énergie échangée.
- Additionner les conductivités au lieu des **résistances** pour des couches superposées.
- Oublier l'albédo, ou diviser la constante solaire par 2 au lieu de 4.
- Croire que la température atteint $T_{\text{ext}}$ à $t = \tau$ : il reste encore $37\ \%$ de l'écart.
