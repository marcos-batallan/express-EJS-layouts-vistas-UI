
export function renderizarSuperheroe (superheroe) {
    return {
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos
    };
}

export function renderizarListaSuperheroes (superheroes) {
    // Se recorre un array y tranforma cada elemento
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}


/*****
Este archivo se encarga de transformar los datos crudos de la base y convertirlos 
en respuestas formateadas para el cliente, desacoplando la estructura interna de la API.
*****/