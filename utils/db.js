// All db queries come through this module
const model = require('../models/cache');
const {generateString} = require('./random-string-generator');
const {EXPIRY_DURATION} = require('./constants');

const getCache = (key)=>{
    // const cacheModel = new model();
    return model.findOne({'key': key}).then(cache => {
        // check if the cache entry has expired
        // if it hasn't, update the expiry date
        //if it has, generate a new cache value and update the expiry date. Return the new value
        if(_checkExpiry(cache.expiryDate)){
            // Expired! Let's generate a new string
            const newValue = generateString();
            cache.value = newValue;
            cache.expiryDate = new Date(Date.now()+EXPIRY_DURATION);
            newCache.save().then(respone =>{
                return newValue;
            })

        }
        console.log('Cache Hit!')
        return cache.value;

    })
    .catch(err => {
        console.log(err)
        return null
    })
};

const getAllCache = () => {
    // Potentially we could paginate this data
    return cacheModel.find({})
};
/**
 * Adds a new cache entry to the store. 
 * @param {Object} cacheObject - has a structure of {'key':'value'}
 */
const addCache = (cacheObject) => {
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
    return cacheModel.findOneAndUpdate(cache).then(response=>{

    })
    .catch(err=>{

    });
};
  

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

module.exports = {
    getCache,
    addCache
}