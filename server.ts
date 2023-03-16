import express, { Express } from 'express';
const {connectDB} = require('./config/db')
const {errorHandler}= require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const apiCache = require('apicache')
const cache = apiCache.middleware
const app: Express = express();
const port: Number = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cache('2 minutes'))
connectDB()

app.use('/user', require('./routes/userRoutes'))
app.use('/blog', require('./routes/blogRoutes'))
app.use(errorHandler)
app.listen(port, () => {
    console.log('app is listening at port ' + port)
})