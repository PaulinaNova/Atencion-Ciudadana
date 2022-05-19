import mongoose from 'mongoose'
import userModel from '../models/usersModel.js'
import gestionModel from '../models/gestionModel.js'
import procedenciaModel from '../models/procedenciaModel.js'
import dependenciaModel from '../models/dependenciaModel.js'
import ciudadanoModel from '../models/ciudadanoModel.js'
import gestorModel from '../models/gestorModel.js'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='atencionCiudadana';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { 
   
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB