const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

let app = require('../app');

chai.use(chaiHttp)
const expect = chai.expect;

describe('Routes Tests: routes',()=>{
    describe('Route: /api/v1/cache/{key} ', () => {
        it('should return a string')
    })
    
})