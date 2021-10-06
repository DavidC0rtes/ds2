const typeorm = require('typeorm')
const sedesRouter = require('express').Router()
const control = require('../controllers/Control')
const Sedes = require('../entity/Sedes')
const Horario = require('../entity/Horarios')

// Determina si la sede con direccion (pasada por request) existe o no
sedesRouter.head('/:direccion', async (request, response) => {
    const result = await control.getOneBy(Sedes, 'direccion', request.params.direccion)
    if (result) {
        return response.status(204).end()
    }

    return response.status(404).end()
})

// Devuelve a todas las sedes que hay en la BD, responde a un llamado GET
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
                    telefono: sedes[x].telefono,
                    hora_apertura: horario[y].hora_apertura,
                    hora_cierre: horario[y].hora_cierre,
                    descripcion: horario[y].descripcion
                }
                arraySedes.push(newSede)
            }
        }
        
    }
    response.json(arraySedes)
})

sedesRouter.delete('/:id_horario', async(request, response) => {
    await control.borrar(Sedes, { id_horario: request.params.id_horario })
    await control.borrar(Horario, { id: request.params.id_horario })
})



/*
 * Devuelve la sede con direccion especificado. A diferencia del anterior, este
 * responde a una solicitud GET
 */
sedesRouter.get('/:direccion', async (request, response) => {
    console.log("Retornar direccion")
    const sedes = await control.getBy(Sedes, 'direccion', request.params.direccion)
    const horario = await control.getBy(Horario, 'id', sede.id_horario)
    const newSede = {
        id: sedes.id,
        direccion: sedes.direccion,
        telefono: sedes.telefono,
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

/* Creación de sedes, se entiende como una solicitud POST a /api/users,
 * NO existen campos que puedan ser nulos, y la direccion de la sede
 * es unica (No existen 2 sedes con la misma direccion)
 */
sedesRouter.post('/', async (request, response) => {
    const body = request.body

    const newHorario = {
        hora_apertura: body.hora_apertura,
        hora_cierre: body.hora_cierre,
        descripcion: body.descripcion

    }

    const savedHorario = await control.insert(Horario, newHorario)
    console.log(savedHorario);

    const newSede =  {
        direccion: body.direccion,
        id_horario: savedHorario.identifiers[0].id,
        telefono: body.telefono
    }

    const savedSede = await control.insert(Sedes, newSede)
    response.json(savedSede)
})

/**
 * Responde a peticiones PUT. Se utilizan para actualizar la información
 * de sedes
 *
 * El objeto que recibe contiene los campos a actualizar.
 * Como las sedes tocan dos tablas entonces se crean dos entidades,
 * una para la sede y la otra para el horario, toda la informacion viene
 * en el body
 * 
 */

sedesRouter.put('/update/:id_horario', async (request, response) => {
    const body = request.body
    console.log(body)

    const SedeUpdate = {
        id: body.id,
        direccion: body.direccion,
        id_horario: body.id_horario,
        telefono: body.telefono
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
