const request = require('supertest');
const express = require('express');

const app = require('../app');
const api = request(app)


describe('El servidor retorna 401 cuando', () => {

    test('El usuario no existe', () => {

        api
        .post('/api/login')
        .set('Content-Type', 'application/json/')
        .send({email: 'este usuario no existe'})
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
        });
    })
})


