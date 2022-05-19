import connectDB from './config/db.js'
import dotenv  from 'dotenv'
import userRoutes from '../server/routes/userRoute.js'
import ciudadanoRoutes from '../server/routes/ciudadanoRoute.js'
import gestorRoutes from '../server/routes/gestorRoute.js'
import express from 'express'

connectDB()
dotenv.config()

const app = express()

//Creating API for user
app.use('/api/users', userRoutes)
app.use('/api/ciudadano', ciudadanoRoutes)
app.use('/api/gestor', ciudadanoRoutes)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))