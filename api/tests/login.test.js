const request = require('supertest');

const app = require('../app');
const api = request(app)


describe('El servidor retorna 401 cuando', () => {

    test('el usuario no existe', () => {
        api
        .post('/api/login')
        .set('Content-Type', 'application/json/')
        .send({email: 'este usuario no existe'})
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
        });
    })
    
    test('el usuario no está activo', () => {
      api
        .post('/api/login')
        .set('Content-Type', 'application/json/')
        .send({email: 'pepito'})
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
        });
    })

    test('la contraseña es incorrecta', () => {
        api
        .post('/api/login')
        .set('Content-Type', 'application/json/')
        .send({email: 'admin', password: 'esta no es la contraseña'})
        .expect(401)
        .end(function(err, res) {
            console.log(res)
            if (err) throw err;
        });
    })
})


describe('El servidor devuelve retorna 200 cuando', () => {
    test(' el correo y la contraseña son correctos', () => {
        
        api
        .post('/api/login')
        .set('Content-Type', 'application/json/')
        .send({email: 'admin', password: 'admin'})
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
    })
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
