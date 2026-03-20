// paso 1 Funcion para traer los datos Fetch a la API
function getCharactares() {
    fetch('https://rickandmortyapi.com/api/character', { method: 'GET' })
        .then(response => response.json())// Convertimos la respuesta a JSON
        .then(data => {// pasamos solo el array de personajes (data.results) a la funcion de render
            renderCharacters(data.results)
        })
        .catch(error => console.log(error))
}
//paso 2 Ejecutamos la funcion apenas carga el script
getCharactares()
//paso 3 Funcion para dibujar los personajes en el HTML
function renderCharacters(arr) {
    for (let index = 0; index < arr.length; index++) {
        // Esta línea es la que dibuja en el HTML
        document.querySelector(".items").innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${arr[index].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${arr[index].name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
    }
}