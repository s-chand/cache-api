const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

let app = require('../app');

chai.use(chaiHttp)
const expect = chai.expect;

describe(' Server: App.js', ()=> {
    it('should return 200 for the index route', ()=>{
        return chai.request(app).get('/')
        .then(res => {
            expect(res.status).to.eql(200)
        });
    });
    it('should return a 404 for non existing routes', ()=>{
        return chai.request(app).get('/non-existing-route')
        .catch(err => {
            expect(err).to.not.be.eql(null)
            expect(err.status).to.eql(404)
        })
        ;
    });
});