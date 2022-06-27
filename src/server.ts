import 'dotenv/config'
import express from 'express'
const server = express()
import RabbitMQServer from './messages/server'
import mongoose from "mongoose"
import modules from '~/routes'

server.use(express.json())

mongoose.connect(String(process.env.MONGODB_URI)).then(() => {
    console.log('connecting to database successful')
}).catch(err => console.error('could not connect to mongo DB', err))

server.use('/api/v1', modules)

server.listen(process.env.APP_PORT, async () => {
    var rabbit = new RabbitMQServer()
    await rabbit.start()
    await rabbit.receiveInQueue(process.env.RABBIT_QUEUE!)
    console.log(`Server listen on port ${process.env.APP_PORT}`)
})
