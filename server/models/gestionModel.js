import mongoose from 'mongoose'

const gestionSchema = mongoose.Schema({
    folio: {
        type: Number,
        required: true,
        unique:true
    },
    descripcion:{
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true
    },
    nombre_ciudadano: {
        type: String,
        required: true
    },
    clave_lector: {
        type: String,
        required: true,
        unique:true
    },
    procedencia: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    dependencia: {
        type: String,
        required: true
    },
    registra: {
        type: String,
        required: true
    },
    vencimiento: {
        type: Date,
        required: true
    },
    folio_interno: {
        type: String,
        required: true
    },
    cant_familias_benef: {
        type: Number,
        required: true
    },
    cant_personas_benef: {
        type: Number,
        required: true
    },
    evento: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Number
    },
    notas: {
        type: String
    },
    seguimiento: {
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
        }
    },

}, {
    timestamps: false
})

const Gestion = mongoose.model('Gestion', gestionSchema)

export default Gestion