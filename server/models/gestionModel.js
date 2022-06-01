import mongoose from 'mongoose'

const gestionSchema = mongoose.Schema({
    
    folio: {
        type: Number,
        unique:true
    },
    nombre_ciudadano: {
        type: String
    },
    curp: {
        type: String,
        unique:true
    },
    descripcion:{
        type: String
    },
    fecha: {
        type: Date
    },
    procedencia: {
        type: String
    },
    periodo: {
        type: String
    },
    prioridad: {
        type: String
    },
    tipo: {
        type: String
    },
    dependencia: {
        type: String
    },
    registra: {
        type: String
    },
    vencimiento: {
        type: Date
    },
    periodico: {
        type: String
    },
    folio_interno: {
        type: String
    },
    cant_benef: {
        type: Number
    },
    evento: {
        type: String
    },
    estado: {
        type: String
    },
    presupuesto: {
        type: Number
    },
    notas: {
        type: String
    },
    seguimiento: {
        fecha_seguimiento:{
            type:Date
        },
        descripcion_seguimiento:{
            type:String
        },
        gestor:{
            type:String
        }
    },

}, {
    timestamps: false
})

const Gestion = mongoose.model('Gestion', gestionSchema)

export default Gestion