const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Get the db and be sure data ecists for tests
require('dotenv').config()
const config = require('../utils/config');
const mongoose = require('mongoose');
const db = require('../utils/db');
const cacheModel = require('../models/cache')

let app = require('../app');

let testData = {
    "key": "test",
    "value":"testValue"
}

chai.use(chaiHttp)
const expect = chai.expect;

describe('Routes Tests: routes', () => {
    beforeEach(() => {
        mongoose.createConnection(`mongodb://${config.mongo.host}:${config.mongo.port}/test`).then(response=>{
            console.log('connected');
            db.deleteCache().then(()=>{
                db.addCache(testData)
            }, (err)=>{
                console.log(err)
            })
        })

        })
    describe('Route: GET /api/v1/cache/:key ', () => {
        it('should return a string value representing the cache entry for the given key', () => {
            return chai
                .request(app)
                .get('/api/v1/cache/test')
                .then(res => {
                    expect(res.status)
                        .to
                        .eql(200);
                    expect(res.body)
                        .to
                        .have
                        .property('value');
                });
        });
    });
    describe('Route: GET /api/v1/cache ', () => {
        it('should return an array of all cache keys', () => {
            return chai
                .request(app)
                .get('/api/v1/cache')
                .then(res => {
                    expect(res.status)
                        .to
                        .eql(200);
                    expect(res.body)
                        .length
                        .to
                        .be
                        .greaterThan(0)
                });
        })
    })

    describe('Route: POST /api/v1/cache', () => {
        it('should post a new cache entry')
    })
    describe('Route: PUT /api/v1/cache/key', () => {
        it('should update a cache entry having the supplied key with the PUT-ed data')
    })
    describe('Route: DELETE /api/v1/cache/key', () => {
        it('should delete a cache entry with the specified key')
    })
    describe('Route: DELETE /api/v1/cache', () => {
        it('should delete all entries in the cache')
    })
});