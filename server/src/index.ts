import express from 'express'
import http from 'http'
import cors from 'cors'

import { router } from './routers'
import { dbConnect } from "./database/mongo"
import { responseMiddleware } from './middlewares/responseFormatMiddleware'
import { errorHandling } from './middlewares/errorHandling'
import config from './config'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())
app.use(responseMiddleware)
app.use(router)
app.use(errorHandling)

dbConnect().then(() => console.log("Conexion Ready"));

server.listen(config.PORT, ()=> console.log(`SERVER LISTENING ON ${config.URL}`))