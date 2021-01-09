import mongoose, { Connection, ConnectOptions } from 'mongoose'
import * as dotenv from 'dotenv'

import { isNullUndefinedOrEmpty } from '../utils/validation'

class dbConnection {
    
    
    constructor() {
        const dbUrl: string | undefined = process.env.DB_URL
        const user: string | undefined = process.env.DB_USER
        const password: string | undefined = process.env.DB_PASSWORD
        let connectData: ConnectOptions = {useNewUrlParser: true, useUnifiedTopology: true}

        if (!isNullUndefinedOrEmpty(user) && !isNullUndefinedOrEmpty(password)) {
            connectData.user = user
            connectData.pass = password
        }

        //add optional config option for prod use...
        if (!isNullUndefinedOrEmpty(dbUrl)) {
            mongoose.connect(dbUrl!, connectData)

            mongoose.connection.on('connected', () => {
                console.log(`Mongoose has successfully connected to the db at ${Date.now()}`)
            })
            
            mongoose.connection.on('error', (err) => {
                console.log(`You tried to do something with the db and a thing happened: ${err}`)
            })

            mongoose.connection.on('disconnected', () => {
                console.log('We have disconnected from the db.')
            })

            process.on('SIGINT', function () {
                mongoose.connection.close(() => {
                    console.log(`Closing the connection to the database at ${Date.now()}`)
                    process.exit(0);
                })
            })
        } else {
            console.error("You can not connect to a database when its URL is not defined properly.")
        }
    }
}

export default dbConnection
