let contenedorCartas = document.getElementById("contenedor-cartas");

let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then( response => response.json() )
    .then( data => {
                // Recuperamos el value de un objeto a traves de get y su clave
console.log([document]);

let urlParams = location.search
console.log(urlParams);

let params = new URLSearchParams(urlParams)
console.log(new URLSearchParams);

let Id = params.get("id")
console.log(Id);

const eventosTodos = data.events
console.log(eventosTodos)
let eventosFiltrados = eventosTodos.find ( evento => evento._id == Id )
console.log(eventosFiltrados)


pintarEvento(eventosFiltrados, contenedorCartas)
    } )
    .catch( err => console.log(err) )





function pintarEvento (eventosTodos, contenedor){
    let cards = ""
    cards = `<div class="div-det row d-flex justify-content-center align-items-center">
                <img class="img-det col-md-5 object-fit-contain border rounded" src="${eventosTodos.image}" alt="jurassic">
                <div class="div-det2 col-md-5 d-flex-column justify-content-center">
                    <h3>${eventosTodos.name}</h3>
                    <p><strong>Category</strong>: ${eventosTodos.category}</p>
                    <p><strong>Capacity(max)</strong>: ${eventosTodos.capacity}</p>
                    <p>${eventosTodos.description}</p>
                    ${eventosTodos.assistance ? `<p class="card-text">Assistance: ${eventosTodos.assistance}</p>` : ''}
                    ${eventosTodos.estimate ? `<p class="card-text">Estimate: ${eventosTodos.estimate}</p>` : ''}
                    <p><strong>Place</strong>: ${eventosTodos.place}</p>
                    <p><strong>Price</strong>: $${eventosTodos.price}</p>
                    <p>${eventosTodos.date}</p>
                </div>
            </div>`
            contenedor.innerHTML = cards
}



