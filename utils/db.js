// All db queries come through this module
const model = require('../models/cache');
const {generateString} = require('./random-string-generator');
const {EXPIRY_DURATION, MAX_CACHE_ENTRIES} = require('./constants');

const getCache = (key) => {
    // const cacheModel = new model();
    return model
        .findOne({'key': key})
        .then(cache => {
            // check if the cache entry has expired if it hasn't, update the expiry date if
            // it has, generate a new cache value and update the expiry date. Return the
            // new value
            if(!cache){
                return null
            }
            if (_checkExpiry(cache.expiryDate)) {
                // Expired! Let's generate a new string
                const newValue = generateString();
                model.findOneAndUpdate({
                    key: key
                }, {
                    $set: {
                        value: newValue,
                        expiryDate: new Date(Date.now() + EXPIRY_DURATION)
                    }
                }).then(res => {
                    return newValue;
                })

            }
            /**
             * Here the cache expiry time hasn't been reached. We updated the expiryDate (ie. Time to Live and then return the value tor the user)
             */
            return model.findOneAndUpdate({key: key},{
                $set: {expiryDate: new Date(Date.now() + EXPIRY_DURATION)}
            }).then(res=>{
                return res.value
            });

        })
        .catch(err => {
            return null
        })
};

const getAllCache = () => {
    // Potentially we could paginate this data
    return model
        .find({})
        .then(caches => {
            return caches.map(cache => cache.key);
        })
};
/**
 * Adds a new cache entry to the store.
 * @param {Object} cacheObject - has a structure of {'key':'value'}
 */
const addCache = (cacheObject) => {

    // Check for max cache entries. If the cache entries are not exceeded or no data exist, carry on with the add
    // This fails for empty db. will think up a new approach later
    // model
        model.find().then(response=>{
            if (_checkMaxCacheEntriesExceeded(response.length)) {
                return false
            }
            
            let cache = new model();
            cache.key = cacheObject.key;
            cache.value = cacheObject.value;
            cache.expiryDate = new Date(Date.now() + EXPIRY_DURATION);

            return cache
                .save()
                .then(res => {
                    cacheCount++
                    return res
                })
                .catch(err => {
                    return null
                })
        })
        .catch(err=>{
            console.log(err)
            return false
        })

};
const updateCache = (cache) => {
    return model.findOneAndUpdate({
        key: cache.key
    }, {value: cache.value})
        .then(response => {
        return response.key
    })
        .catch(err => {
            return null
        });
};

const deleteCache = (key) => {
    if (!key) {
        // no key, means delete all
        return model
            .remove({})
            .then(response => {
                return response.key;
            })
            .catch(err => {
                return null
            })
    }
    return model
        .findOneAndRemove({key: key})
        .then(response => {
            return response.length
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

const _checkExpiry = (date) => {
    const expiryDate = new Date(date)
    const currentDate = new Date(Date.now())
    if (expiryDate === currentDate || expiryDate < currentDate) {
        return true
    } else {
        return false
    }
};
const _checkMaxCacheEntriesExceeded = (count) => {
    if (parseInt(count) === MAX_CACHE_ENTRIES) {
        return true
    }
    return false
}

module.exports = {
    getCache,
    addCache,
    getAllCache,
    updateCache,
    deleteCache
}