const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

it('fails as expected', function (done) {
    chai.request(app)
        .get('/api/users')
        .end(function (err, res) {
            expect(res).to.have.status(200)
            done()
        })
})
