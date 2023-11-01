const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

//security
const helmet = require('helmet')
const xssCleaner = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')

//middlewares
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(xssCleaner())
app.use(mongoSanitize())
app.use(hpp())

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'connect to the server',
    })
})

//Routes
const midBannerRoutes = require('./routes/MiddleBannerRoute.js')
const PostMiddleWare = require('./routes/PostMiddleWareRoute.js')
const MainSlidersRoute = require('./routes/MainSlidersRoute.js')
const CategoryRoutes = require('./routes/CategoryRoutes.js')
const ProductRoutes = require('./routes/ProductRoutes.js')

//Routes Middleware

app.use('/api', midBannerRoutes)
app.use('/api', PostMiddleWare)
app.use('/api', MainSlidersRoute)
app.use('/api', CategoryRoutes)
app.use('/api', ProductRoutes)


const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
    .then(result => {
        app.listen(PORT)
    })
    .catch(err => console.log(err))

