/**
 * SOLUCIONADO 
 * Bug:: al marcar un elemento como favorito y luego ingresar al botón
 * "Learn more!" (para ver la información del personaje o planeta),
 * al regresar se pierden los favoritos previamente seleccionados.
 */
// ESTADO GLOBAL
/**
 * let favorites = [];
 * Antes los favoritos lo guardaban en una variable (let favorites = []),
 * pero esa variable se reinicia cada vez que cambiamos de página.
 * Por eso al entrar a "details" y volver, se perdían los favoritos
 */
// FAVORITOS CAMBIOS
function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
//SOLUCION DEL BUG LOCALSTORAGE
function guardarFavoritos(favs) {
  //guardar los datos en el navegador.
// Así los favoritos se mantienen aunque recargues o navegues entre páginas.
  localStorage.setItem("favorites", JSON.stringify(favs));
}

// PERSONAJES API
function apiCharacters() {
  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => renderCharacters(data.results))
    .catch(err => console.log(err));
}

function apiCharacterById(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(character => renderDetail(character));
}

// PLANETAS API
function apiPlanets() {
  fetch("https://rickandmortyapi.com/api/location")
    .then(res => res.json())
    .then(data => renderPlanets(data.results))
    .catch(err => console.log(err));
}

function apiPlanetById(id) {
  fetch(`https://rickandmortyapi.com/api/location/${id}`)
    .then(res => res.json())
    .then(planet => renderPlanetDetail(planet));
}

// RENDER PERSONAJES 
function renderCharacters(characters) {

  const container = document.querySelector("#characters");
  if (!container) return;

  container.innerHTML = "";

//estados de colores si esta vivo verde o rojo muerto
  for (let i = 0; i < characters.length; i++) {

    let character = characters[i];

    let statusText = "";
    let statusClass = "";

    if (character.status === "Alive") {
      statusText = "Vivo";
      statusClass = "text-success";
    } else if (character.status === "Dead") {
      statusText = "Muerto";
      statusClass = "text-danger";
    } else {
      statusText = "Desconocido";
      statusClass = "text-secondary";
    }

    container.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="card shadow-sm">

          <img src="${character.image}" class="card-img-top">

          <div class="card-body">
            <h5>${character.name}</h5>

            <p class="${statusClass}">${statusText}</p>
            <p>Species: ${character.species}</p>
            <p>Dimension: ${character.origin.name}</p>

            <div class="d-flex justify-content-between mt-3">

              <a href="details.html?id=${character.id}" class="btn btn-outline-primary">
                Learn more!
              </a>

              <button class="btn btn-outline-warning"
                onclick="toggleFavorite(event, ${character.id}, '${character.name}', 'character')">
                <i class="fa-regular fa-heart"></i>
              </button>

            </div>
          </div>

        </div>
      </div>
    `;
  }
}

// RENDER PLANETAS
function renderPlanets(planets) {

  const container = document.querySelector("#planets");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < planets.length; i++) {

    let planet = planets[i];

    container.innerHTML += `
      <div style="min-width: 300px;">
        <div class="card shadow-sm">

          <img src="https://picsum.photos/400/200?random=${planet.id}" 
              class="card-img-top" 
              style="height: 200px; object-fit: cover;">

          <div class="card-body">
            <h5>${planet.name}</h5>

            <p>Type: ${planet.type}</p>
            <p>Dimension: ${planet.dimension}</p>

            <div class="d-flex justify-content-between mt-3">

              <a href="details.html?planetId=${planet.id}" class="btn btn-outline-primary">
                Learn more!
              </a>

              <button class="btn btn-outline-warning"
                onclick="toggleFavorite(event, ${planet.id}, '${planet.name}', 'planet')">
                <i class="fa-regular fa-heart"></i>
              </button>

            </div>
          </div>

        </div>
      </div>
    `;
  }
}

// DETAIL SIN CAMBIOS
function renderDetail(character) {
  const container = document.getElementById("detail-container");

  container.innerHTML = `
    <div class="container">

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

      <div class="row text-center fw-bold text-danger">

        <div class="col-6 col-md">
          <p class="text-muted">Name</p>
          <p>${character.name}</p>
        </div>

        <div class="col-6 col-md">
          <p class="text-muted">Dimension</p>
          <p>${character.origin.name}</p>
        </div>

        <div class="col-6 col-md">
          <p class="text-muted">Status</p>
          <p>${character.status}</p>
        </div>

        <div class="col-6 col-md">
          <p class="text-muted">Gender</p>
          <p>${character.gender}</p>
        </div>

        <div class="col-6 col-md">
          <p class="text-muted">Species</p>
          <p>${character.species}</p>
        </div>

        <div class="col-6 col-md">
          <p class="text-muted">Location</p>
          <p>${character.location.name}</p>
        </div>

      </div>

    </div>
  `;
}

function renderPlanetDetail(planet) {
  const container = document.getElementById("detail-container");

  container.innerHTML = `
    <div class="text-center">

      <img src="https://picsum.photos/500/300?random=${planet.id}" 
          class="img-fluid rounded mb-3">

      <h1>${planet.name}</h1>

      <p>Tipo: ${planet.type}</p>
      <p>Dimensión: ${planet.dimension}</p>
      <p>Habitantes: ${planet.residents.length}</p>

    </div>
  `;
}
// FAVORITOS 
function toggleFavorite(event, id, name, type) {

  const btn = event.currentTarget;

  let favorites = obtenerFavoritos();

  const index = favorites.findIndex(f => f.id === id && f.type === type);

  if (index === -1) {
    favorites.push({ id, name, type });
    btn.classList.replace("btn-outline-warning", "btn-warning");
  } else {
    favorites.splice(index, 1);
    btn.classList.replace("btn-warning", "btn-outline-warning");
  }

  guardarFavoritos(favorites);
  renderFavorites();
}

function removeFavorite(id, type) {
  let favorites = obtenerFavoritos();

  favorites = favorites.filter(f => !(f.id === id && f.type === type));

  guardarFavoritos(favorites);
  renderFavorites();
}

function renderFavorites() {

  const list = document.querySelector(".dropdown-menu");
  const count = document.querySelector(".badge");

  if (!list || !count) return;

  let favorites = obtenerFavoritos();

  list.innerHTML = "";

  favorites.forEach(fav => {
    list.innerHTML += `
      <li class="d-flex justify-content-between">
        <span>${fav.name} (${fav.type})</span>
        <i class="fa-solid fa-trash" onclick="removeFavorite(${fav.id}, '${fav.type}')"></i>
      </li>
    `;
  });

  count.textContent = favorites.length;
}

// INIT
function init() {

  if (document.getElementById("characters")) {
    apiCharacters();
  }

  if (document.getElementById("planets")) {
    apiPlanets();
  }

  if (document.getElementById("detail-container")) {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");
    const planetId = params.get("planetId");

    if (id) {
      apiCharacterById(id);
    }

    if (planetId) {
      apiPlanetById(planetId);
    }
  }

  renderFavorites();
}

init();