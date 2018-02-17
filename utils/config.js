require('dotenv').config()
module.exports = {
    mongo: {
        port: process.env.DBPORT || 27017,
        host: process.env.DBHOST || 'localhost',
        db: process.env.DBNAME || 'cache',
        user: process.env.DBUSER || '',
        password: process.env.DBPASS || ''
      }
}