import Seguimiento from '../models/seguimientoModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getSeguimientos = asyncHandler(async(req, res) => {
    const seguimientos = await Seguimiento.find({})
    res.json(seguimientos)
})

export const getSeguimientosParam = asyncHandler(async(req, res) => {
    const seguimientos = await Seguimiento.find({})
    if(seguimientos){
        res.json(seguimientos)
    }else{
        res.status(404).json({message: "Seguimiento no encontrado"})
        res.status(404)
        throw new Error('Seguimiento no encontrado')
    }
})

//getUserById function to retrieve user by id
export const getSeguimientoById  = asyncHandler(async(req, res) => {
    const seguimiento = await Seguimiento.findById(req.params.id)

    //if user id match param id send user else throw error
    if(seguimiento){
        res.json(seguimiento)
    }else{
        res.status(404).json({message: "Seguimiento no encontrado"})
        res.status(404)
        throw new Error('Seguimiento no encontrado')
    }
})