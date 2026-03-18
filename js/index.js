// ESTADO GLOBAL

let favorites = [];

// API
function getCharacters() {
  return fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json());
}

function getCharacterById(id) {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json());
}

// TEMPLATES

function createCharacterCard(character) {
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      <div class="card shadow-sm">

        <img src="${character.image}" class="card-img-top">

        <div class="card-body">
          <h5>${character.name}</h5>

          <p class="mb-1">Gender: ${character.gender}</p>
          <p class="mb-1">Status: ${character.status}</p>
          <p>Species: ${character.species}</p>

          <div class="d-flex justify-content-between mt-3">

            <a href="details.html?id=${character.id}" class="btn btn-outline-primary">
              Learn more!
            </a>

            <button class="btn btn-outline-warning"
              onclick="toggleFavorite(event, ${character.id}, '${character.name}')">
              <i class="fa-regular fa-heart"></i>
            </button>

          </div>
        </div>

      </div>
    </div>
  `;
}

// RENDER

function renderCharacters(characters) {
  const container = document.querySelector("#characters");
  container.innerHTML = "";

  characters.forEach(character => {
    container.innerHTML += createCharacterCard(character);
  });
}

function renderDetail(character) {
  const container = document.getElementById("detail-container");

  container.innerHTML = `
    <div class="row align-items-center">

      <div class="col-md-6">
        <img src="${character.image}" class="img-fluid rounded">
      </div>

      <div class="col-md-6 text-center">
        <h1>${character.name}</h1>

        <p class="mt-3">
          Este personaje está ${character.status} y pertenece a la especie ${character.species}.
        </p>
      </div>

    </div>

    <hr class="my-4">

    <div class="row text-center text-danger fw-bold">

      <div class="col">
        <p>Name</p>
        <p>${character.name}</p>
      </div>

      <div class="col">
        <p>Status</p>
        <p>${character.status}</p>
      </div>

      <div class="col">
        <p>Gender</p>
        <p>${character.gender}</p>
      </div>

      <div class="col">
        <p>Species</p>
        <p>${character.species}</p>
      </div>

    </div>
  `;
}
//  FAVORITOS

function toggleFavorite(event, id, name) {
  const btn = event.currentTarget;
  const index = favorites.findIndex(f => f.id === id);

  if (index === -1) {
    favorites.push({ id, name });
    btn.classList.replace("btn-outline-warning", "btn-warning");
  } else {
    favorites.splice(index, 1);
    btn.classList.replace("btn-warning", "btn-outline-warning");
  }

  renderFavorites();
}
function removeFavorite(id) {
  favorites = favorites.filter(f => f.id !== id);
  renderFavorites();
}

function renderFavorites() {
  const list = document.querySelector(".dropdown-menu");
  const count = document.querySelector(".badge");

  list.innerHTML = "";

  favorites.forEach(fav => {
    list.innerHTML += `
      <li class="d-flex justify-content-between align-items-center">
        <span>${fav.name}</span>
        <i class="fa-solid fa-trash" onclick="removeFavorite(${fav.id})"></i>
      </li>
    `;
  });

  count.textContent = favorites.length;
}

//  INIT

function init() {

  // INDEX
  if (document.getElementById("characters")) {
    getCharacters()
      .then(data => renderCharacters(data.results))
      .catch(err => console.log(err));
  }

  // DETAILS
  if (document.getElementById("detail-container")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    getCharacterById(id)
      .then(character => renderDetail(character))
      .catch(err => console.log(err));
  }

}

init();