const { getCache,addCache, getAllCache, updateCache, deleteCache} = require('../utils/db');
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
            if(!data || data === false){
                return res.status(400).json({'response':'Max cache entries exceeded'})
            }
            return res.status(201).json({'response':'Success'})
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
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
           if(!data){
            console.log('Cache miss!');
            return res.status(404).json({'response':'Cache miss!'})
           }
            console.log('Cache Hit!');
            return res.status(200).json({'value':data})
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
        })
    }
    getAllCache(req, res){
        getAllCache().then(caches=>{
            res.status(200).json(caches);
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
        })
    }
    /**
     * Updates a cache entry
     * @param {Request} req 
     * @param {Response} res 
     */
    putCacheHandler(req, res){
        const key = req.params.key;
        const value = req.body.value;
        updateCache({key, value})
        .then(response=>{
            if(!response) res.status(422).json(null)
            return res.status(200).json({'key': response})
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
        })

    }
    /**
     * Deletes a cache entry
     * @param {Request} req 
     * @param {Response} res 
     */
    deleteCacheHandler(req, res){
        const key = req.params.key;
        deleteCache(key).then(response=>{
            return res.status(201).json(response)
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
        })

    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    deleteAllCachesHandler(req, res){
        deleteCache().then(response=>{
            return res.status(201).json({'response':'true'})
        })
        .catch(err=>{
            return res.status(500).json({'response':'An error occurred. Please try again'})
        })
    }

}

module.exports = CacheController