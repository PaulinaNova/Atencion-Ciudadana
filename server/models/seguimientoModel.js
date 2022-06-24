import mongoose from 'mongoose'

const seguimientoSchema = mongoose.Schema({
    folio: {
        type: Number
    },
    fecha_seguimiento:{
        type:Date
    },
    descripcion_seguimiento:{
        type:String
    },
    gestor:{
        type:String
    },
    estado: {
    type: String
    },
    presupuesto: {
        type: Number
    }
}, {
    timestamps: false
})

const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema)

export default Seguimiento