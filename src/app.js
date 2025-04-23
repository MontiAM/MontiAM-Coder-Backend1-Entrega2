import express from 'express'
import { Server } from "socket.io"
import http from "http"
import path from "path"

// Routes
import productsRouter from '../routes/products.routes.js'
import cartsRouter from '../routes/carts.routes.js'
import realTimeProductsRouter from '../routes/realTimeProducts.routes.js'

// Configurations
import configHandlebars from "../configuration/handlebars.config.js"
import __dirname from "../configuration/__dirname.js"

// Socket
import configSockets from "../sockets/socketServer.js"


const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../public')))

// Socket
configSockets(io)

// Handlebars
configHandlebars(app)

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', realTimeProductsRouter)
app.use( (req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})