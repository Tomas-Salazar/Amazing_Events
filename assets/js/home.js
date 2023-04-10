console.log(amazingEventsData)

const eventosTodos = amazingEventsData.eventos

console.log( eventosTodos )

const contenedorCartas = document.getElementById("contenedor-cartas")

/* datos
Imagen -> image
Titulo -> name
Descripcion -> description
Precio -> price */

let template = ""

function crearDiv (eventosTodos){
    return `<div class="card d-flex justify-content-center m-2" style="width: 18rem;">
                <img src="${eventosTodos.image}" class="card-img-top img_card" alt="collectivities">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title">${eventosTodos.name}</h5>
                    <p class="card-text">${eventosTodos.description}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="price">Price: $${eventosTodos.price}</p>
                        <a href="./assets/pages/details.html?name=${eventosTodos.name}" class="btn btn-light">More Details</a>
                    </div>
                </div>
            </div> `
}

for (let evento of eventosTodos){
    template += crearDiv(evento); 
}

contenedorCartas.innerHTML = template


//-----------------------------------


let buscador = document.getElementById("buscador")
let contenedorChecks = document.getElementById("contenedorChecks")

let categorias = eventosTodos.map (evento => evento.category)
/* console.log(categorias) */
let categoriasFiltrado = new Set (categorias)
let categoriasFinal = Array.from(categoriasFiltrado)
/* console.log(categoriasFinal) */

imprimirCategorias(categoriasFinal, contenedorChecks)

function imprimirCategorias(array, contenedor){
    let template = ""
    for (let categoria of array){
        template += `<input class="form-check-input m-2" type="checkbox" name="${categoria}" value="${categoria}" id="">
        <label class="form-check-label m-2" for="${categoria}">${categoria}</label>`
    }
    contenedor.innerHTML = template
}

contenedorChecks.addEventListener("change", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventosTodos, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados)
})

buscador.addEventListener("input", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventosTodos, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados)
})

function filtrarPorCategoria(array, categorias){
    if ( categorias.length === 0 ){
        return array
    }else{
        return array.filter( array => categorias.includes(array.category) );
    }
}

function buscadorDeTexto(array, texto){
    if (!texto){
        return array;
    }else{
        let textoMin = texto.toLowerCase();
        return array.filter( nota => nota.name.toLowerCase().includes(textoMin) || nota.description.toLowerCase().includes(textoMin) )
    }
}

function imprimirEventos(parametro){
    if (parametro.length === 0){
        contenedorCartas.innerHTML = '<h1 class"sinEventos">No hay eventos</h1>';
    }else{
        let nota = parametro.map(crearDiv)
        contenedorCartas.innerHTML = nota;
    }
}