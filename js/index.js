document.addEventListener("DOMContentLoaded", () => {

  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {

      const container = document.querySelector("#characters");
      container.innerHTML = "";

      data.results.forEach(character => {
        container.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card shadow-sm">

              <img src="${character.image}" class="card-img-top">

              <div class="card-body">
                <h5>${character.name}</h5>

                <p>Gender: ${character.gender}</p>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>

                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-outline-primary">Learn more!</button>

                  <button class="btn btn-outline-warning">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;
      });

    })
    .catch(err => console.log("ERROR:", err));

});