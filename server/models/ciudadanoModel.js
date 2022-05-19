import mongoose from 'mongoose'

const ciudadanoSchema = mongoose.Schema({
    claveElector: {
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
        localidad: {
        type: String,
        required: true
    },
        municipio: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Ciudadano = mongoose.model('Ciudadano', ciudadanoSchema)

export default Ciudadano