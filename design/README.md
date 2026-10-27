# Mon Dex

Un petit Pokédex réalisé en HTML, Tailwind CSS et JavaScript, dans le cadre d'une formation (projet individuel Simplonline).

**Démo en ligne :** https://ayoubkourdini.github.io/Mon-Dex/
**Dépôt GitHub :https://github.com/ayoubkourdini/Mon-Dex.git** 

## Univers choisi

**Pokémon.** Le Dex contient 12 créatures au départ (Bulbasaur, Charmander, Charizard, Squirtle, Pikachu, Jigglypuff, Meowth, Psyduck, Machop, Geodude, Gastly, Gengar). Le thème graphique reprend les couleurs de l'univers : jaune dominant, bleu et rouge en couleurs secondaires, bordures noires épaisses.

## Fonctionnalités

1. **Affichage** : la grille est construite avec JavaScript à partir du tableau `creatures` (fichier `data.js`).
2. **Détail** : un clic sur une carte ouvre un panneau avec l'image, la description, le niveau et les statistiques en barres.
3. **Recherche** : la liste se met à jour pendant la saisie du nom, sans tenir compte des majuscules.
4. **Filtre** : les boutons de type n'affichent que les créatures du type choisi. « Tous » réinitialise le filtre. La recherche et le filtre fonctionnent ensemble.
5. **Création d'une créature** : un formulaire validé par expressions régulières. Les messages d'erreur s'affichent sous chaque champ et une créature invalide n'est jamais ajoutée.
6. **Mon équipe** : les boutons « Ajouter à l'équipe » (grille et panneau de détail) et « Retirer » sont gérés par la délégation d'événements, avec un seul écouteur sur la grille et un seul sur l'équipe.
7. **Règles de l'équipe** : 6 créatures au maximum, pas de doublon, une alerte claire quand une action est refusée, un compteur x/6, et les boutons « Ajouter à l'équipe » disparaissent quand l'équipe est complète.

## Structure du projet

```
Mon-Dex/
├── index.html      # la page
├── data.js         # le tableau creatures (12 Pokémon)
├── script.js       # la logique JavaScript
├── style.css       # le thème Pokémon
├── dist/
│   └── output.css  # CSS généré par Tailwind
└── README.md
```

## Sources des images

Les images viennent du dépôt **PokeAPI/sprites** (artworks officiels), hébergé sur GitHub :
https://github.com/PokeAPI/sprites

Exemple d'URL utilisée :
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`

Projet de fans réalisé à des fins pédagogiques. Pokémon et ses personnages sont des marques de Nintendo, Game Freak et Creatures Inc.

## Format des données

Chaque créature de `data.js` suit ce format :

```js
{
  id: "#025",
  name: "Pikachu",
  type: ["Électrik"],
  level: "Intermédiaire",
  stats: { hp: 35, attack: 55, defence: 40 },
  image: "https://…/25.png",
  description: "Une souris électrique qui stocke l'énergie dans les poches de ses joues."
}
```

## Règles de validation du formulaire

| Champ | Règle | Expression régulière |
|---|---|---|
| Numéro | `#` suivi de 3 chiffres, pas déjà utilisé (le `#` est ajouté par le code) | `/^#\d{3}$/` |
| Nom | 2 à 30 caractères (lettres, chiffres, espaces, `.` `'` `-`), commence par une lettre ou un chiffre | `/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/` |
| Type | liste déroulante, un choix obligatoire | aucune (comparaison avec `""`) |
| Niveau | liste déroulante, un choix obligatoire | aucune (comparaison avec `""`) |
| PV, Attaque, Défense | entier de 0 à 999 | `/^\d{1,3}$/` |
| Image | lien `https` finissant par png, jpg, jpeg, webp ou gif | `/^https:\/\/\S+\.(png\|jpe?g\|webp\|gif)$/i` |
| Description | 10 à 200 caractères | `/^[\s\S]{10,200}$/` |

## Tests des expressions régulières

Les tests ont été faits dans la console du navigateur (F12), avec la méthode `.test()`. Chaque champ a au moins 2 valeurs valides et 2 valeurs invalides.

Pour les refaire, collez ceci dans la console :

```js
const regexNumero = /^#\d{3}$/;
const regexNom = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/;
const regexStat = /^\d{1,3}$/;
const regexImage = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
const regexDescription = /^[\s\S]{10,200}$/;

console.log(regexNumero.test("#010"));   // true
console.log(regexNumero.test("010"));    // false
```

### Numéro

| Valeur testée | Résultat attendu | Résultat obtenu |
|---|---|---|
| `#010` | valide | `true` |
| `#123` | valide | `true` |
| `010` (sans `#`) | invalide | `false` |
| `#12` (2 chiffres) | invalide | `false` |
| `#1234` (4 chiffres) | invalide | `false` |

### Nom

| Valeur testée | Résultat attendu | Résultat obtenu |
|---|---|---|
| `Pikachu` | valide | `true` |
| `Mr. Mime` | valide | `true` |
| `A` (1 caractère) | invalide | `false` |
| `-Pika` (commence par un tiret) | invalide | `false` |
| `Pika@` (caractère interdit) | invalide | `false` |
| 31 fois la lettre `a` | invalide | `false` |

### Statistiques (PV, Attaque, Défense)

| Valeur testée | Résultat attendu | Résultat obtenu |
|---|---|---|
| `0` | valide | `true` |
| `45` | valide | `true` |
| `999` | valide | `true` |
| `1000` | invalide | `false` |
| `-5` | invalide | `false` |
| `abc` | invalide | `false` |
| (vide) | invalide | `false` |

### Image

| Valeur testée | Résultat attendu | Résultat obtenu |
|---|---|---|
| `https://example.com/001.png` | valide | `true` |
| `https://site.fr/img/pika.JPG` | valide | `true` |
| `http://example.com/001.png` (pas https) | invalide | `false` |
| `https://example.com/001.pdf` (extension interdite) | invalide | `false` |
| `image.png` (pas un lien) | invalide | `false` |

### Description

| Valeur testée | Résultat attendu | Résultat obtenu |
|---|---|---|
| `Une courte description.` (23 caractères) | valide | `true` |
| texte de 200 caractères | valide | `true` |
| `Court` (5 caractères) | invalide | `false` |
| texte de 201 caractères | invalide | `false` |
| (vide) | invalide | `false` |

## Lancer le projet en local

1. Cloner le dépôt : `git clone https://github.com/ayoubkourdini/Mon-Dex.git`
2. Ouvrir `index.html` dans le navigateur (ou utiliser l'extension Live Server de VS Code).
3. Pour modifier les styles Tailwind, relancer la compilation vers `dist/output.css`.

## Organisation du travail

- Une carte GitHub Projects par fonctionnalité.
- Au moins un commit par fonctionnalité, avec des messages de la forme `feat(team): …`, `fix(team): …` ou `style: …`.
- Publication avec GitHub Pages.

## Auteur

Ayoub Kourdini, projet de formation Simplonline.