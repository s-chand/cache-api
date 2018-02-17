const express = require('express');
// validation
const {buildSanitizeFunction} = require('express-validator/filter');
const sanitizer = buildSanitizeFunction(["body","query"]);

// cacheController
const controller = require('../controllers/CacheController');
const cacheController = new controller()

const router = express.Router();

/**
 * GET cache
 */
router.get('/cache/:key', sanitizer('key').trim(), (req,res) => cacheController.getCacheHandler(req, res));
router.get('/cache', (req, res)=>cacheController.getAllCache(req, res))
router.post('/cache',(req, res)=>cacheController.addCacheHandler(req, res));

module.exports = router;
