console.log(amazingEventsData)

const eventosTodos = amazingEventsData.eventos

console.log( eventosTodos )

const contenedorCartas = document.getElementById("contenedor-cartas")

/* datos
Imagen -> image
Titulo -> name
Descripcion -> description
Precio -> price */

/* let template = crearDiv( amazingEventsData.eventos[0] )  como queremos crear a todos:*/
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

for (let evento of eventosTodos){
    template += crearDiv(evento); 
}

contenedorCartas.innerHTML = template



/* <div class="card d-flex justify-content-center m-2" style="width: 18rem;">
    <img src="./assets/images/Festival_of_the_collectivities.jpg" class="card-img-top img_card" alt="collectivities">
    <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title">Festival of the collectivities</h5>
        <p class="card-text">Enjoy your favorite dishes from different countries in a unique event for the whole family.</p>
        <div class="d-flex flex-row justify-content-between">
            <p class="price">Price $0000</p>
            <a href="./assets/pages/details.html" class="btn btn-light">Ver Más</a>
        </div>
    </div>
</div> */