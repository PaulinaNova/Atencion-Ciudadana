import mongoose from 'mongoose'
import userModel from '../models/usersModel.js'
import ciudadanoModel from '../models/ciudadanoModel.js'

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