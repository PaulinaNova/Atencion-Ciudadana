import mongoose from 'mongoose'

const gestorSchema = mongoose.Schema({
    
    
    rfc: {
        type: String,
        required: true,
        unique:true
    },
    curp: {
        type: String,
        required: true,
        unique:true
    },
    dependencia: {
        type: String,
        required: true,
        
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
    telefono: {
        type: String
    },
    municipio: {
        type: String,
        required: true
    },
    localidad: {
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
    calle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
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