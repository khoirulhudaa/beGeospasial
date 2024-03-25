// Call all library
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

// 3 on use start (cors, express.json(), bodyParser.urlencoded)
app.use(cors())

// Get variable environment
const portServer = process.env.PORT_SERVER_RUNNING

// Connected on database ft mongodb
mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Successfully connect on database')
})
.catch((error) => {
    console.log(error)
})

// Middleware untuk mengatur timeout
app.use((req, res, next) => {
    res.setTimeout(20000, () => {
        res.status(408).send('Request timeout');
    });
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
const checkToken = require('./middlewares/verifyToken')

// Routers
const accountRouter = require('./routers/accountRouter')
const dinasRouter = require('./routers/dinasRouter')
const titleRouter = require('./routers/titleRouter')
const CoordinateRouter = require('./routers/coordinateRouter')
const SubdistrictRouter = require('./routers/SubdistrictRouter')

// Router Open API
const API_SUBDISTRICT = require('./routers/APISUBDISTRICTROUTER')
const API_DINAS = require('./routers/APIDINASROUTER')
const API_TITLE = require('./routers/APITITLEROUTER')

app.use('/account', accountRouter)
app.use('/dinas', checkToken, dinasRouter)
app.use('/title', checkToken, titleRouter)
app.use('/coordinate', checkToken, CoordinateRouter)
app.use('/subdistrict', checkToken, SubdistrictRouter)

// Public API
app.use('/v2/dinas', dinasRouter)
app.use('/v2/title', titleRouter)
app.use('/v2/coordinate', CoordinateRouter)
app.use('/v2/subdistrict', SubdistrictRouter)

// Open API
app.use('/api-geospasial-cirebonkab/v1/kecamatan', API_SUBDISTRICT)
app.use('/api-geospasial-cirebonkab/v1/dinas', API_DINAS)
app.use('/api-geospasial-cirebonkab/v1/title', API_TITLE)
    
app.get('/test', (req, res) => {
    res.send('test success!')   
})

// Running test
app.listen(portServer,() => {
    console.log(`Running on port ${portServer}`)
})