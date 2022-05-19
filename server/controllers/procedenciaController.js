import Procedencia from '../models/procedenciaModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getProcedencias = asyncHandler(async(req, res) => {
    const procedencias = await Procedencia.find({})
    res.json(procedencias)
})

//getUserById function to retrieve user by id
export const getProcedenciaById  = asyncHandler(async(req, res) => {
    const procedencia = await Procedencia.findById(req.params.id)

    //if user id match param id send user else throw error
    if(procedencia){
        res.json(procedencia)
    }else{
        res.status(404).json({message: "Procedencia no encontrada"})
        res.status(404)
        throw new Error('Procedencia no encontrada')
    }
})