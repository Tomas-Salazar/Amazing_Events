// Recuperamos el value de un objeto a traves de get y su clave
console.log([document]);

let urlParams = location.search
console.log(urlParams);

let params = new URLSearchParams(urlParams)
console.log(new URLSearchParams);

let Name = params.get("name")
console.log(Name);

const eventosTodos = amazingEventsData.eventos
let eventosFiltrados = eventosTodos.find ( evento => evento.name === Name )
console.log(eventosFiltrados)
let contenedorCartas = document.getElementById("contenedor-cartas");

function pintarEvento (eventosTodos){
    let cards = ""
    cards = `<div class="div-det row d-flex justify-content-center align-items-center">
                <img class="img-det col-md-5 " src="${eventosTodos.image}" alt="jurassic">
                <div class="div-det2 col-md-5 d-flex-column justify-content-center">
                    <h3>${eventosTodos.name}</h3>
                    <p><strong>Category</strong>: ${eventosTodos.category}</p>
                    <p><strong>Capacity(max)</strong>: ${eventosTodos.capacity}</p>
                    <p>${eventosTodos.description}</p>
                    <p><strong>Assistance</strong>: ${eventosTodos.assistance}</p>
                    <p><strong>Place</strong>: ${eventosTodos.place}</p>
                    <p><strong>Price</strong>: $${eventosTodos.price}</p>
                    <p>${eventosTodos.date}</p>
                </div>
            </div>`
            contenedorCartas.innerHTML = cards
}

pintarEvento(eventosFiltrados)

