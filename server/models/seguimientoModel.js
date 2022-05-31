import mongoose from 'mongoose'

const seguimientoSchema = mongoose.Schema({
    folio: {
        type: Number,
        required: true,
        unique:true
    },
    fecha_seguimiento:{
        type:Date,
        require:true
    },
    descripcion_seguimiento:{
        type:String,
        require:true
    },
    gestor:{
        type:String,
        require:true
    },
    estado: {
    type: String,
    required: true
    },
    presupuesto: {
        type: Number
    }
}, {
    timestamps: false
})

const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema)

export default Seguimiento