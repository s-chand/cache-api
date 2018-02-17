const { getCache,addCache, getAllCache} = require('../utils/db');
class CacheController{
    /**
     * Adds a new cache entry using the supplied key value pair.
     * It expects req.body to have a json object with the format {'key':'value'}
     * @param {Request} req A request object containing the data to be stored
     * @param {Response} res A response object returned to the endpoint caller containing the response
     */
    addCacheHandler(req, res){
        let key = req.body.key;
        let value= req.body.value;
        addCache({key, value}).then(data =>{
            return res.status(200).json({'response':'Success'})
        })
        .catch(err=>{
            return res.status(500).json(err)
        })
    }
    /**
     * Gets a cached value using the specified key
     * @param {Request} req A request object which contains a query parameter to be used as the key to get the cache entry
     * @param {Response} res A reponse object return to the endpoint caller containing the response
     */
    getCacheHandler(req, res){
        const key = req.params.key;
        getCache(key).then(data=>{
            console.log('Cache Hit!');
            return res.status(200).json({'value':data})
        })
        .catch(err=>{
            console.log('Cache miss!');
            res.status(404).json({'response':'Cache miss!'})
        })
    }
    getAllCache(req, res){
        getAllCache().then(caches=>{
            res.status(200).json(caches);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }
    /**
     * Updates a cache entry
     * @param {Request} req 
     * @param {Response} res 
     */
    putCacheHandler(req, res){
        const key = req.body.key;
        const value = req.body.value;
    }
    /**
     * Deletes a cache entry
     * @param {Request} req 
     * @param {Response} res 
     */
    deleteCacheHandler(req, res){

    }
}

module.exports = CacheController