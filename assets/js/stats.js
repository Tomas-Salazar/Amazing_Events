let contenedorTabla = document.getElementById("contenedor-tabla");

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
    .then( response => response.json() )
    .then( data => {
        console.log(data)
let eventosTodos = data.events;

console.log(eventosTodos)

let eventosPasados = eventosTodos.filter( elemento => elemento.date < data.currentDate )
let eventosFuturos = eventosTodos.filter( elemento => elemento.date > data.currentDate )
/* console.log(eventosPasados, eventosFuturos) */

contenedorTabla.innerHTML = imprimirTabla()

function imprimirTabla(){
    let tabla = ""
    return tabla = `<table>
                        <thead>
                            <tr>
                                <th colspan="3">Event statistics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="color-dark">Events with the highest percentage of attendance</td>
                                <td>Events with the lowest percentage of attendance</td>
                                <td>Event with larger capacity</td>
                            </tr>
                            <tr>
                                <td>${calcularEventoMayorAsistencia(eventosPasados)}</td>
                                <td>${calcularEventoMenorAsistencia(eventosPasados)}</td>
                                <td>${calcularEventoMayorCapacidad(eventosTodos)}</td>
                            </tr>
                        </tbody>

                        <thead>
                            <tr>
                                <th colspan="3">Upcoming events statistics by category</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>Categories</td>
                            <td>Revenues</td>
                            <td>Percentage of attendance</td>
                        </tr>
                        <tbody id="eventos-futuros">

                        </tbody>
                        
                        <thead>
                            <tr>
                                <th colspan="3">Past events statistics by category</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>Categories</td>
                            <td>Revenues</td>
                            <td>Percentage of attendance</td>
                        </tr>
                        <tbody id="eventos-pasados">

                        </tbody>
                    </table>`
}



let estadisticas;

function estadisticasTodas(array){
    estadisticas = array.map( (e) => {
        return{
            categoria : e.category,
            revenues : e.price * (e.assistance ? e.assistance : e.estimate),
            porcentajeAsist : (e.assistance ? e.assistance : e.estimate) * 100 / e.capacity
        }
    })
    return estadisticas
}
console.log( estadisticasTodas(eventosPasados) )

let estadisticasFuturos = estadisticasTodas(eventosFuturos)
let estadisticasPasados = estadisticasTodas(eventosPasados)

let arrayFiltrado
function estadisticasFinal(arrayOriginal, estadisticasArray){
    arrayFiltrado = [...new Set(arrayOriginal.map(elemento => elemento.category) )].map(categoria => {
        let array = estadisticasArray.filter(elemento => elemento.categoria == categoria)

        let acumulado = {categoria : categoria, revenues : 0, porcentaje : 0, cantidad : 0}

        for (let elemento of array) {
            acumulado.revenues += elemento.revenues
            acumulado.porcentaje += elemento.porcentajeAsist
            acumulado.cantidad ++
        }
        acumulado.porcentaje = acumulado.porcentaje / acumulado.cantidad
        return acumulado
    })
    return arrayFiltrado
}

let estadisticasFinalFuturos = estadisticasFinal(eventosFuturos, estadisticasFuturos)
let estadisticasFinalPasados = estadisticasFinal(eventosPasados, estadisticasPasados)
console.log(estadisticasFinalFuturos)
console.log(estadisticasFinalPasados)

let contenedorTablaFuturos = document.getElementById("eventos-futuros")
let contenedorTablaPasados = document.getElementById("eventos-pasados")

function imprimirTablitas(array, contenedor){
    let template = array.reduce( (acumulador, actual) => {
        return acumulador + `
        <tr>
            <td>${actual.categoria}</td>
            <td>$${actual.revenues}</td>
            <td>${actual.porcentaje.toFixed(2)}%</td>
        </tr>
        `
    }, "")
    contenedor.innerHTML = template
}

imprimirTablitas(estadisticasFinalFuturos, contenedorTablaFuturos)
imprimirTablitas(estadisticasFinalPasados, contenedorTablaPasados)

} )
    .catch( err => console.log(err) )

function calcularEventoMayorAsistencia(data) {
        let mayorPorcentajeAsistencia = 0;
        let eventoMayorAsistencia = null;
        for (let evento of data) {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
            
            if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
                mayorPorcentajeAsistencia = porcentajeAsistencia;
                eventoMayorAsistencia = evento;
            }
        }
        if (eventoMayorAsistencia) {
            return `${eventoMayorAsistencia.name} with: ${mayorPorcentajeAsistencia.toFixed(2)}%`;
        }
}

function calcularEventoMenorAsistencia(data) {
        let menorPorcentajeAsistencia = Infinity;
        let eventoMenorAsistencia = null;
        for (let evento of data) {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
            
            if (porcentajeAsistencia < menorPorcentajeAsistencia) {
                menorPorcentajeAsistencia = porcentajeAsistencia;
                eventoMenorAsistencia = evento;
            }
        }
        if (eventoMenorAsistencia) {
            return `${eventoMenorAsistencia.name} with: ${menorPorcentajeAsistencia.toFixed(2)}%`;
        }
}

function calcularEventoMayorCapacidad(data) {
        let mayorCapacidad = 0;
        let eventoMayorCapacidad = null;
        for (let evento of data) {
            const capacidad = evento.type === "past" ? evento.assistance : evento.estimate;
            if (capacidad > mayorCapacidad) {
                mayorCapacidad = capacidad;
                eventoMayorCapacidad = evento;
            }
        }
        if (eventoMayorCapacidad) {
            return `${eventoMayorCapacidad.name} with: ${mayorCapacidad}`;
        }
}