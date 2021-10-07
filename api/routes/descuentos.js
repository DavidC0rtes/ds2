const dctoRouter = require('express').Router()
const Descuentos = require('../entity/Descuentos')
const control = require('../controllers/Control')

dctoRouter.get('/', async (req, res) => {
    const promos = await control.getAll(Descuentos)
    res.json(promos)
})

dctoRouter.get('/:product_id', async (req, res) => {
    const promos = await control.getBy(Descuentos, 'id_producto', req.params.product_id)

    if (promos) {
        res.json(promos)
    }
    return res.status(404).end()
})
/**
 * fecha_inicio:
 * fecha_fin:
 * dcto: 
 * id_producto:
 */
dctoRouter.post('/', async (req, res) => {
    const body = req.body
    const result = await control.insert(Descuentos, body)
    if (result.id) {
        res.json(result)
    }
    return res.status(500).end()
})

dctoRouter.put('/:id', async (req, res) => {
    const body = req.body
    const result = await control.update(Descuentos, {id: req.params.id}, body)
    if (result) { 
        return res.status(200).end()
    }
    return res.status(500).end()
})

module.exports = dctoRouter
