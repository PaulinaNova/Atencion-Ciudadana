import mongoose from 'mongoose'

const dependenciaSchema = mongoose.Schema({
    nombre_dependencia: {
        type: Number,
        required: true,
        unique:true
    },
    nombre_encargado:{
        type: String,
        required: true,
    },
    contacto_encargado: {
        type: Date,
        required: true
    },

}, {
    timestamps: false
})

const Dependencia = mongoose.model('Dependencia', dependenciaSchema)

export default Dependencia