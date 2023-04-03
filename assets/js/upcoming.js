console.log(amazingEventsData)

const eventosTodos = amazingEventsData.eventos

console.log( eventosTodos )

const contenedorCartas = document.getElementById("contenedor-cartas")

let template = ""

function crearDiv (eventosTodos){
    return `<div class="card d-flex justify-content-center m-2" style="width: 18rem;">
                <img src="${eventosTodos.image}" class="card-img-top img_card" alt="collectivities">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title">${eventosTodos.name}</h5>
                    <p class="card-text">${eventosTodos.description}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="price">${eventosTodos.price}</p>
                        <a href="./assets/pages/details.html" class="btn btn-light">Ver Más</a>
                    </div>
                </div>
            </div> `
}

const fechaHoy = amazingEventsData.fechaActual

const eventosFiltrados1 = []

for (let evento of eventosTodos)
    if (fechaHoy < evento.date){
    eventosFiltrados1.push(evento);
}

for (let evento of eventosFiltrados1){
    template += crearDiv(evento); 
}

contenedorCartas.innerHTML = template