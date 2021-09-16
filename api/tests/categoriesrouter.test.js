const request = require('supertest');

const app = require('../app');
const api = request(app)

describe('El servidor retorna 401 cuando', () => {

    test('No se le envia un nombre de categoria.', () => {
        api
        .post('/api/categories')
        .set('Content-Type', 'application/json/')
        .send({nombre: null})
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
        });
    })

    test('No se le envia una descripcion de categoria', () => {
        api
        .post('/api/categories')
        .set('Content-Type', 'application/json/')
        .send({nombre: 'Prueba Unitaria Desc.', password: null})
        .expect(401)
        .end(function(err, res) {
            console.log(res)
            if (err) throw err;
        });
    })
})


describe('El servidor retorna 200 cuando', () => {
    test(' El nombre y descripcion de la categoria son recibidos correctamente.', () => {
        
        api
        .post('/api/categories')
        .set('Content-Type', 'application/json/')
        .send({nombre: 'Prueba Unitaria', descripcion: 'categoria test unitario', activo: true})
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
    })
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
