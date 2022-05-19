import Gestion from '../models/gestionModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getGestions = asyncHandler(async(req, res) => {
    const gestions = await Gestion.find({})
    res.json(gestions)
})

//getUserById function to retrieve user by id
export const getGestionById  = asyncHandler(async(req, res) => {
    const gestion = await Gestion.findById(req.params.id)

    //if user id match param id send user else throw error
    if(gestion){
        res.json(gestion)
    }else{
        res.status(404).json({message: "Gestion no encontrada"})
        res.status(404)
        throw new Error('Gestion no encontrada')
    }
})