export function crearDiv (eventosTodos, url){
    return `<div class="card d-flex justify-content-center m-2" style="width: 18rem;">
                <img src="${eventosTodos.image}" class="card-img-top img_card" alt="collectivities">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title">${eventosTodos.name}</h5>
                    <p class="card-text">${eventosTodos.description}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="price">Price: $${eventosTodos.price}</p>
                        <a href="${url}?id=${eventosTodos._id}" class="btn btn-light">More Details</a>
                    </div>
                </div>
            </div> `
}

export function imprimirCategorias(array, contenedor){
    let template = ""
    for (let categoria of array){
        template += `<input class="form-check-input m-2" type="checkbox" name="${categoria}" value="${categoria}" id="">
        <label class="form-check-label m-2" for="${categoria}">${categoria}</label>`
    }
    contenedor.innerHTML = template
}

export function filtrarPorCategoria(array, categorias){
    if ( categorias.length === 0 ){
        return array
    }else{
        return array.filter( array => categorias.includes(array.category) );
    }
}

export function buscadorDeTexto(array, texto){
    if (!texto){
        return array;
    }else{
        let textoMin = texto.toLowerCase();
        return array.filter( nota => nota.name.toLowerCase().includes(textoMin) || nota.description.toLowerCase().includes(textoMin) )
    }
}

export function imprimirEventos(parametro, contenedor){
    if (parametro.length === 0){
        contenedor.innerHTML = '<h1 class"sinEventos">No hay eventos</h1>';
    }else{
        let nota = parametro.map(crearDiv)
        contenedor.innerHTML = nota;
    }
}

// funcion de details

export function pintarEvento (eventosTodos, contenedor){
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