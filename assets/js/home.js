import {crearDiv, imprimirCategorias, filtrarPorCategoria, buscadorDeTexto, imprimirEventos} from "./module/functions.js"

const contenedorCartas = document.getElementById("contenedor-cartas")
let buscador = document.getElementById("buscador")
let contenedorChecks = document.getElementById("contenedorChecks")
let urlDetails = "./assets/pages/details.html"


let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
    .then( response => response.json() )
    .then( data => {
        /* console.log(data) */
        const eventosTodos = data.events
        /* console.log( eventosTodos ) */

        let template = ""

        for (let evento of eventosTodos){
            template += crearDiv(evento, urlDetails); 
        }
        contenedorCartas.innerHTML = template
        
        let categorias = eventosTodos.map (evento => evento.category)
        /* console.log(categorias) */
        let categoriasFiltrado = new Set (categorias)
        let categoriasFinal = Array.from(categoriasFiltrado)
        /* console.log(categoriasFinal) */

        imprimirCategorias(categoriasFinal, contenedorChecks)
        
        contenedorChecks.addEventListener("change", (e) => {
            let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
            /* console.log(arrayCategorias) */
            let filtro = filtrarPorCategoria(eventosTodos, arrayCategorias)
            let resultados = buscadorDeTexto(filtro, buscador.value)
            imprimirEventos(resultados, contenedorCartas)
        })
        
        buscador.addEventListener("input", (e) => {
            let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
            /* console.log(arrayCategorias) */
            let filtro = filtrarPorCategoria(eventosTodos, arrayCategorias)
            let resultados = buscadorDeTexto(filtro, buscador.value)
            imprimirEventos(resultados, contenedorCartas)
        })

    })
    .catch( err => console.log(err) )