let favorites = [];
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// SI ESTÁS EN DETAILS.HTML
if (document.getElementById("detail-container")) {

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(character => {

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
    });

}


//  SI ESTÁS EN INDEX.HTML
if (document.getElementById("characters")) {

  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {

      const container = document.querySelector("#characters");
      container.innerHTML = "";

      data.results.forEach(character => {
        container.innerHTML += `
          <div style="min-width: 300px;">
            <div class="card shadow-sm">

              <img src="${character.image}" class="card-img-top">

              <div class="card-body">
                <h5>${character.name}</h5>

                <p class="mb-1">Gender: ${character.gender}</p>
                <p class="mb-1">Status: ${character.status}</p>
                <p>Species: ${character.species}</p>

                <div class="d-flex justify-content-between mt-3">

                  <!-- LINK A DETAILS -->
                  <a href="details.html?id=${character.id}" class="btn btn-outline-primary">
                    Learn more!
                  </a>

                  <button class="btn btn-outline-warning" onclick="toggleFavorite(${character.id},
                  '${character.name}')">
                    <i class="fa-regular fa-heart"></i>
                  </button>

                </div>
              </div>

            </div>
          </div>
        `;
      });

    })
    .catch(err => console.log(err));
}
// FUNCIONES DE FAVORITOS
function toggleFavorite(id, name) {
  const index = favorites.findIndex(f => f.id === id);

  if (index === -1) {
    favorites.push({ id, name });
  } else {
    favorites.splice(index, 1);
  }

  renderFavorites();
}
//MOSTRAR FAVORITOS EN EL DROPDOWN
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
//ELIMINAR FAVORITO
function removeFavorite(id) {
  favorites = favorites.filter(f => f.id !== id);
  renderFavorites();
}