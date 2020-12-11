'use strict'

const CONFIG= require('./config')

module.exports = {
  
  development: {
    client: process.env.CLIENT_DB_CONNECTION || 'mysql',
    connection: {
      host : process.env.CLIENT_DB_HOST,
      user : process.env.CLIENT_DB_USERNAME,
      password : process.env.CLIENT_DB_PASSWORD,
      database : process.env.CLIENT_DB_DATABASE,
      charset  : 'utf8'
    },
    
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: process.env.CLIENT_DB_CONNECTION,
    connection: {
      host : process.env.CLIENT_DB_HOST,
      user : process.env.CLIENT_DB_USERNAME,
      password : process.env.CLIENT_DB_PASSWORD,
      database : process.env.CLIENT_DB_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.CLIENT_DB_CONNECTION || 'mysql',
    connection: {
      host : process.env.CLIENT_DB_HOST,
      user : process.env.CLIENT_DB_USERNAME,
      password : process.env.CLIENT_DB_PASSWORD,
      database : process.env.CLIENT_DB_DATABASE
    }
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
