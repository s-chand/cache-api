// All db queries come through this module
const model = require('../models/cache');
const {generateString} = require('./random-string-generator');
const {EXPIRY_DURATION, MAX_CACHE_ENTRIES} = require('./constants');

const getCache = (key)=>{
    // const cacheModel = new model();
    return model.findOne({'key': key}).then(cache => {
        // check if the cache entry has expired
        // if it hasn't, update the expiry date
        //if it has, generate a new cache value and update the expiry date. Return the new value
        if(_checkExpiry(cache.expiryDate)){
            // Expired! Let's generate a new string
            const newValue = generateString();
            model.findOneAndUpdate({key:key},{$set:{value: newValue, expiryDate:new Date(Date.now()+EXPIRY_DURATION)}})
            .then(res=>{
                return newValue;
            })

        }
        return cache.value;

    })
    .catch(err => {
        return null
    })
};

const getAllCache = () => {
    // Potentially we could paginate this data
    return model.find({}).then(caches=>{
        return caches.map(cache => cache.key);
    })
};
/**
 * Adds a new cache entry to the store. 
 * @param {Object} cacheObject - has a structure of {'key':'value'}
 */
const addCache = (cacheObject) => {

    // Check for max cache entries
    let cache = new model();
    cache.key = cacheObject.key;
    cache.value= cacheObject.value;
    cache.expiryDate = new Date(Date.now()+EXPIRY_DURATION);
    
    return cache.save().then(res=>{
        return res
    })
    .catch(err=>{
        return null
    })
};
const updateCache = (cache)=>{
    return model.findOneAndUpdate({key: cache.key}, {value: cache.value}).then(response=>{
        return response.key
    })
    .catch(err=>{
        return null
    });
};

const deleteCache = (key) => {
    return model.findOneAndRemove({key:key}).then(response=>{
        console.log(response)
        return response
    })
    .catch(err=>{
        console.log(err)
        return null
    })
}

const _checkExpiry = (date) => {
    const expiryDate = new Date(date)
    const currentDate = new Date(Date.now())
    if(expiryDate === currentDate || expiryDate < currentDate)
    {
        return true
    }
    else {
        return false
    }
};
const _checkMaxCacheEntries = () =>{
    
}

module.exports = {
    getCache,
    addCache,
    getAllCache,
    updateCache,
    deleteCache
}