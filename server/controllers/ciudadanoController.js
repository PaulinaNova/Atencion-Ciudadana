import Ciudadano from '../models/ciudadanoModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getCiudadanos = asyncHandler(async(req, res) => {
    const ciudadanos = await Ciudadano.find({})
    res.json(ciudadanos)
})

//getUserById function to retrieve user by id
export const getCiudadanoById  = asyncHandler(async(req, res) => {
    const ciudadano = await Ciudadano.findById(req.params.id)

    //if user id match param id send user else throw error
    if(ciudadano){
        res.json(ciudadano)
    }else{
        res.status(404).json({message: "No se encontró este ciudadano"})
        res.status(404)
        throw new Error('No se encontró este ciudadano')
    }
})

 // To Add New Ciudadano
 export const addCiudadano = asyncHandler(async(req, res) => {
    const ciudadano = await Ciudadano.create(req.body) 
    //if user id match param id send ciudadano else throw error
    ciudadano.save().then(()=>{
    res.json("Gestion añadida")
    }).catch((err)=>{
        console.log(err);
        res.json(err)
        console.log("reg err");
    })
});