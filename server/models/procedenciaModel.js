import mongoose from 'mongoose'

const procedenciaSchema = mongoose.Schema({
    nombre_procedencia: {
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
    timestamps: true
})

const Procedencia = mongoose.model('Procedencia', procedenciaSchema)

export default Procedencia