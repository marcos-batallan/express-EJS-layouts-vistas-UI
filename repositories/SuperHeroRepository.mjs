// Se importa el esquema definido en el modelo para consultar la DB
import SuperHero from "../models/SuperHero.mjs";

// Se importa la interfaz base
import IRepository from "./IRepository.mjs";

// Esta repo debe cumplir con el contrato de herencia de IRepository
class SuperHeroRepository extends IRepository {
    async obtenerMayoresDe30 () {
        return await SuperHero.find({ 
            // Se utliza el operador de comparación $gt (mayor que) de MongoDB para traer documentos cuya edad sea mayor a 30.
            edad: { $gt: 30 },
            // También filtra para que sean sólo del planeta Tierra
            planetaOrigen: "Tierra",
            // Los arrays empiezan en índice 0. Existe un segundo elemento y por lo tanto, hay al menos 2 poderes.
            "poderes.1": { $exists: true }
        });
    }
    
    async buscarPorAtributo (atributo, valor) {
    // Los corchetes indican que el nombre del campo “atributo” lo tengo en una variable
    return await SuperHero.find({ [atributo]: valor });
    }
    
    async obtenerPorId (id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos () {
        return await SuperHero.find({});
    }

    /***** A PARTIR DE AQUÍ SE AGREGAN LOS METODOS POST, PUT Y DELETE
    SOLICITADOS PARA EL TP1 DEL SPRINT 3 *****/

    async crear (datos) {
        const nuevo = new SuperHero (datos); // Se crea una nueva instancia
        return await nuevo.save(); // Se guarda el nuevo objeto en la DB con la validación correspondiente
    }

    async actualizar (id, datos) {
        return await SuperHero.findOneAndReplace(
            { _id: id },
            datos,
            { returnDocument: 'after', runValidators: true }
        );
    }

    async actualizarParcial (id, datos) {
        return await SuperHero.findByIdAndUpdate(
            id,
            datos,
            { returnDocument: 'after', runValidators: true }
        );
    }

    async eliminarPorNombre (nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }

    async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);
    }
}

//Devuelve los datos de la DB
export default new SuperHeroRepository();


/*****
Este archivo encapsula el acceso a los datos y centraliza las consultas a la DB
*****/