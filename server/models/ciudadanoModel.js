import mongoose from 'mongoose'

const ciudadanoSchema = mongoose.Schema({
    curp: {
        type: String,
        unique:true
    },
    nombre: {
        type: String
    },
    apellidoPaterno:{
        type: String
    },
    apellidoMaterno:{
        type: String
    },
    fechaNacimiento: {
        type: Date
    },
    telefono: {
        type: String
    },
    
    codigoPostal: {
        type: Number,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    caracteristica: {
        type: String,
        required: true
    },
        localidad: {
        type: String,
        required: true
    },
        municipio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true
    }
}, {
    timestamps: false
})

const Ciudadano = mongoose.model('Ciudadano', ciudadanoSchema)

export default Ciudadano