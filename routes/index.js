const express = require('express');
// validation
const {buildSanitizeFunction} = require('express-validator/filter');
const {buildCheckFunction} = require('express-validator/check');
const sanitizer = buildSanitizeFunction(["body","query"]);
const check = buildCheckFunction(["body","query"]);

// cacheController
const controller = require('../controllers/CacheController');
const cacheController = new controller()

const router = express.Router();

/**
 * GET cache
 */
router.get('/cache/:key', [sanitizer('key').trim(), check('key').isEmpty()], (req,res) => cacheController.getCacheHandler(req, res));
router.put('/cache/:key',[
sanitizer('key'), check('value').isEmpty()
], (req, res) => cacheController.putCacheHandler(req, res));
router.get('/cache', (req, res)=>cacheController.getAllCache(req, res));
router.post('/cache',[sanitizer(['key','value']),check(['key','value'])],(req, res)=>cacheController.addCacheHandler(req, res));

module.exports = router;
