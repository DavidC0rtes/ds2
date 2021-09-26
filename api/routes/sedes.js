const typeorm = require('typeorm')
const sedesRouter = require('express').Router()
const control = require('../controllers/Control')
const Sedes = require('../entity/Sedes')
const Horario = require('../entity/Horarios')

// Determina si el usuario con correo email existe. No devuelve al usuario 
sedesRouter.head('/:direccion', async (request, response) => {
    const result = await control.getOneBy(Sedes, 'direccion', request.params.direccion)
    console.log("Head retornar direccion")
    if (result) {
        return response.status(204).end()
    }

    return response.status(404).end()
})

// Devuelve todos los usuarios del proyecto cuando se hace un get
sedesRouter.get('/', async (request, response) => {
    console.log("Retornar todos")
    const sedes = await control.getAll(Sedes)
    const horario = await control.getAll(Horario)
    const arraySedes = [];
    for(var x = 0; x < sedes.length; x++){
        for(var y = 0; y < horario.length; y++){
            if(sedes[x].id_horario == horario[y].id){
                const newSede = {
                    id: sedes[x].id,
                    direccion: sedes[x].direccion,
                    id_horario: horario[y].id,
                    hora_apertura: horario[y].hora_apertura,
                    hora_cierre: horario[y].hora_cierre,
                    descripcion: horario[y].descripcion
                }
                arraySedes.push(newSede)
            }
        }
        
    }
    console.log(arraySedes)
    response.json(arraySedes)
})

sedesRouter.delete('/:id_horario', async(request, response) => {
    await control.borrar(Sedes, { id_horario: request.params.id_horario })
    await control.borrar(Horario, { id: request.params.id_horario })
})



/*
 * Devuelve el usuario con email especificado. A diferencia del anterior, este
 * responde a una solicitud GET
 */
sedesRouter.get('/:direccion', async (request, response) => {
    console.log("Retornar direccion")
    const sedes = await control.getBy(Sedes, 'direccion', request.params.direccion)
    const horario = await control.getBy(Horario, 'id', sede.id_horario)
    const newSede = {
        id: sedes.id,
        direccion: sedes.direccion,
        id_horario: horario.id_horario,
        hora_apertura: horario.hora_apertura,
        hora_cierre: horario.hora_cierre,
        descripcion: horario.descripcion,
    }
    if (result) {
        response.json(newSede)
    } else {
        return response.status(404).end()
    }
})

/* Creación de usuarios, se entiende como una solicitud POST a /api/users,
 * el json de la petición debe tener la sgte estructura:
 * "email": "xxx",
 * "password": "zzz",
 * "id_rol": 0,
 * "info": {
 *      "primer_nombre": "aaaa",
 *      etc...
 *  }
 *  
 *  Los campos que pueden ser nulos son: segundo_nombre, direccion, cumpleaños y telefono.
 */
sedesRouter.post('/', async (request, response) => {
    console.log("Creacion de sede")
    const body = request.body
    console.log("antes de guardar");
    console.log(body);

    const newHorario = {
        hora_apertura: body.hora_apertura,
        hora_cierre: body.hora_cierre,
        descripcion: body.descripcion

    }

    
    const savedHorario = await control.insert(Horario, newHorario)
    console.log("Despues de guardar Horario ");
    console.log(savedHorario);

    const newSede =  {
        direccion: body.direccion,
        id_horario: savedHorario.identifiers[0].id
    }

    const savedSede = await control.insert(Sedes, newSede)
    console.log("Despues de guardar sede ");
    console.log(savedSede);
    response.json(savedSede)
})

/**
 * Responde a peticiones PUT. Se utilizan para actualizar la información
 * de usuarios. 
 *
 * El objeto que recibe contiene los campos a actualizar.
 * Como los usuarios tocan dos tablas, debe revisarse que tablas
 * deben actualizarse en base a los campos del objeto de la petición.
 */

sedesRouter.put('/update/:id_horario', async (request, response) => {
    const body = request.body
    console.log(body)

    const SedeUpdate = {
        id: body.id,
        direccion: body.direccion,
        id_horario: body.id_horario
    }

    const HorarioUpdate = {
        id: body.id_horario,
        hora_apertura: body.hora_apertura,
        hora_cierre: body.hora_cierre,
        descripcion: body.descripcion
    }

    console.log(await control.update(Sedes, { id_horario: body.id_horario}, SedeUpdate))
    console.log(await control.update(Horario, { id: body.id_horario}, HorarioUpdate))

    response.status(200).end()
})


module.exports = sedesRouter
