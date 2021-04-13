const typeorm = require('typeorm')
const supertest = require('supertest')
const app = require('../app')
const User = require('../entity/Usuarios')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const api = supertest(app)
let control = null 

beforeAll(async () => {
    await typeorm.createConnection(config.DBNAME)
    control = require('../controllers/Control')
})

describe('cuando hay inicialmente un usuario en la db', () => {
    test('un usuario mal hecho devuelve http 400', async () => {
        const invalidUser = {
            username: 'bad',
            password: '42'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
    })
})

// Al finalizar de correr todos los tests
afterAll(async () => {
    await typeorm.getConnection('local').close()
})
