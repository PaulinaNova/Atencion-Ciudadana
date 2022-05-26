import mongoose from 'mongoose'

const gestorSchema = mongoose.Schema({
    
    
    dependencia: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true,
        unique:true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidoPaterno:{
        type: String
    },
    apellidoMaterno:{
        type: String
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    codigoPostal: {
        type: Number,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: Number,
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
    municipio: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        defualt: false
    }
}, {
    timestamps: true
})

const Gestor = mongoose.model('Gestor', gestorSchema)

export default Gestor