    fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {

        const container = document.querySelector(".row");
        container.innerHTML = "";

        data.results.forEach(character => {
        container.innerHTML += `
            <div class="col-md-4">
            <div class="card shadow-sm">

                <img src="${character.image}" class="card-img-top" alt="">

                <div class="card-body">
                <h5 class="card-title">${character.name}</h5>

                <p class="card-text mb-1">Gender: ${character.gender}</p>
                <p class="card-text mb-1">Status: ${character.status}</p>
                <p class="card-text">Species: ${character.species}</p>

                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-outline-primary">Learn more!</button>

                    <button class="btn btn-outline-warning">
                    <i class="fa fa-heart"></i>
                    </button>
                </div>
                </div>

            </div>
            </div>
        `;
        });

    })
    .catch(err => console.log("ERROR:", err));