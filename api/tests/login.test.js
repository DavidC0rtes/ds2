const request = require('supertest')
const app = require('../app')
let server, agent


beforeEach( async(done) => {
    server = app.listen(4000, (err) => {
        if (err) return done(err)

        agent = request.agent(server)
        done()
    })
})

afterEach((done) => {
    return server && server.close(done)
})

test('whatever', async() => {
    await agent.get('/api/users').expect(200)
})
