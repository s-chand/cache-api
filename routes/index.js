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
 * GET cache - Gets a route using the specified key
 */
router.get('/cache/:key', [sanitizer('key').trim(), check('key').isEmpty()], (req,res) => cacheController.getCacheHandler(req, res));
/**
 * PUT cache - Updates a cache at the specified key
 */
router.put('/cache/:key',[
sanitizer('key'), check('value').isEmpty()
], (req, res) => cacheController.putCacheHandler(req, res));

/**
 * DELETE cache - Deletes a cache at the specified key
 */
router.delete('/cache/:key', [sanitizer('key'), check('key').isEmpty()], (req, res)=>cacheController.deleteCacheHandler(req, res));

/**
 * GET cache - Gets all cache keys in the store
 */
router.get('/cache', (req, res)=>cacheController.getAllCache(req, res));

/**
 * POST cache - Adds a new cache to the store
 */
router.post('/cache',[sanitizer(['key','value']),check(['key','value'])],(req, res)=>cacheController.addCacheHandler(req, res));

router.delete('/cache', (req, res)=>cacheController.deleteAllCachesHandler(req, res));

module.exports = router;
