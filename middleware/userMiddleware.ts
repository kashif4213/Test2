import {Request, Response, NextFunction, RequestHandler } from "express"

const { myAsyncHandler } = require("../asyncHandler")
const User = require("../models/userModel")
const { addUserValidationSchema, loginUserValidationSchema, logoutUserValidationSchema } = require("../validations/userValidationSchema")
const jwt = require('jsonwebtoken')


const validateUser: RequestHandler = myAsyncHandler(async (req :Request, res : Response, next :NextFunction) => {
    
        if (req.path === '/register') {
            const value = await addUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length > 0) {
                    return res.status(404).json({ message: 'This User is already Registered.' })
                }
                if (req.body.confirmPassword && req.body.password === req.body.confirmPassword){
                    req.body.registeredUser = registeredUser[0]
                    next()
                }
            }
        }
        else if (req.path === '/logout') {
            const value = await logoutUserValidationSchema.validateAsync(req.body)
            if (value) {
                next()        
            }
        }
        else if (req.path == '/resetPassword'){
            const value = await addUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email, firstName: req.body.firstName, lastName : req.body.lastName })
                if (registeredUser.length < 0) {
                    return res.status(404).json({ message: 'Sorry, No such User is found.' })
                }
                req.body.registeredUser= registeredUser[0]
                next()     
            } 
        }
        else if (req.path === '/login') {
            const value = await loginUserValidationSchema.validateAsync(req.body)
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length < 0) {
                    return res.status(404).json({ message: 'Invalid Username or Password.' })
                }
                req.body.registeredUser = registeredUser[0]
                next()
            }
        }
})


const verifyToken : RequestHandler = myAsyncHandler( async (req : Request, res :Response, next :NextFunction) => {
        const accessToken = req.cookies.jwt
        if (accessToken){
            if (await jwt.verify(accessToken, 'mySecretKey')){
                next()
            }
        }
        else{ 
            res.status(400).json({message : 'Please Log In to Continue'})
        }     
})


module.exports = {
    validateUser,
    verifyToken
}