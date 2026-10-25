// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

const grid = document.getElementById("grid");
const panneau = document.getElementById("panneau");
const search = document.getElementById("search");


function affichage(liste){
grid.innerHTML = "";

for (let i = 0; i < liste.length; i++) {
    const c = liste[i];
    const card = `
  <article data-id="${c.id}" class="flex flex-col cursor-pointer gap-3 rounded-card bg-white p-3 pb-4">
    <img src="${c.image}" alt="${c.name}" class="h-28 w-28 mx-auto">
    <h3 class="font-display text-xl font-semibold">${c.name}</h3>
    <p class="text-sm text-muted">Type: ${c.type}</p>
    <p class="text-sm text-muted">HP: ${c.stats.hp}</p>
    <button type="button" data-id="${c.id}" data-action="add" class="btn-outline">Ajouter à l'équipe</button>
  </article>
`;
grid.innerHTML += card;
}
}
affichage(creatures)

function detail(c) {
  document.getElementById("detail-id").textContent = c.id + " · Détail";
  document.getElementById("detail-name").textContent = c.name;
  document.getElementById("detail-type").textContent = c.type.join(", ");
  document.getElementById("detail-level").textContent = c.level;
  document.getElementById("detail-description").textContent = c.description;
  document.getElementById("detail-image").src = c.image;
  document.getElementById("detail-image").alt = c.name;

  const noms = ["hp", "attack", "defence"];
  for (let i = 0; i < noms.length; i++) {
    const nom = noms[i];
    const valeur = c.stats[nom];
    const pourcentage = Math.min((valeur / 255) * 100, 100);
    document.getElementById("detail-" + nom + "-value").textContent = valeur;
    document.getElementById("detail-" + nom + "-bar").style.width = pourcentage + "%";
  }

  panneau.classList.remove("hidden");
  panneau.classList.add("flex");
}

grid.addEventListener("click", function (event) {
  if (event.target.closest("[data-action='add']")) return;

  const carte = event.target.closest("article");
  if (!carte) return;

  const c = creatures.find(function (item) {
    return String(item.id) === carte.dataset.id;
  });

  detail(c);
});

function recherche(event) {
  const texte = event.target.value.trim().toLowerCase();
  const resultats = [];
  for (let i = 0; i < creatures.length; i++) {
    const nom = creatures[i].name.toLowerCase();
    if (nom.includes(texte)) {
      resultats.push(creatures[i]);
    }
  }
  affichage(resultats);
}

search.addEventListener("input", recherche);

function filter() {};

function creeCreature() {};

function monEquipe() {};

function regleEquipe() {};

