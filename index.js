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
const ResponseRouter = require('./routers/responseRouter')

app.use('/account', accountRouter)
app.use('/dinas', checkToken, dinasRouter)
app.use('/title', checkToken, titleRouter)
app.use('/coordinate', checkToken, CoordinateRouter)
app.use('/subdistrict', checkToken, SubdistrictRouter)

// Public API
app.use('/v2/api/dinas', dinasRouter)
app.use('/v2/api/judul-data', titleRouter)
app.use('/v2/api/coordinate', CoordinateRouter)
app.use('/v2/api/kecamatan', SubdistrictRouter)
app.use('/v2/response-user', ResponseRouter)
    
app.get('/test', (req, res) => {
    res.send('test success!')   
})

// Running test
app.listen(portServer,() => {
    console.log(`Running on port ${portServer}`)
})