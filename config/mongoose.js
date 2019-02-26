'use strict'

const mongoose = require('mongoose')

// Load DB connection string from .env-file to environment.
require('dotenv').config()

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise}
*/
module.exports.connect = async () => {
  // Bind connection to events (to get notifications).
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Check that .env file with key exists.
  if (!process.env.DB_CONN) throw new Error('You need an .env file with the database connection string')

  // Connect to the server.
  return mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true })
}
