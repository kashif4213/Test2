import  { Request, Response, NextFunction, RequestHandler } from 'express';

const { myAsyncHandler } = require('../asyncHandler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Register a new User
const registerUser: RequestHandler = myAsyncHandler(async (req : Request, res : Response, next :NextFunction) => {
        let { firstName, lastName, email, password } = req.body
        let registeredUser  = await User.create({ firstName, lastName, email, password })
        if (registeredUser){
            let accessToken: String| undefined =createToken(registeredUser._id.toString(),'mySecretKey', res, next)
            return res.status(201).json({accessToken,registeredUser})
        }
})



// Verifying to login the Existing User
const loggedInUser : RequestHandler = myAsyncHandler(async (req :Request, res: Response, next :NextFunction) => {
        if (! await bcrypt.compare(req.body.password, req.body.registeredUser.password)) {
            return res.status(404).json({ message: 'Invalid Username or Password.' })
        }
        let accessToken: String| undefined =createToken(req.body.registeredUser._id.toString(),'mySecretKey', res, next)
       return res.status(200).json({accessToken, message: req.body.registeredUser.firstName+ req.body.registeredUser.lastName + ' Logged In Successfully' })
})


//Reset Password for the User
const resetPassword : RequestHandler = myAsyncHandler(async (req :Request, res: Response, next :NextFunction) => {
      let {password } = req.body
      req.body.registeredUser.password = password
      await req.body.registeredUser.save()
      return res.status(200).json({ message:  'Password Changed Successfully', user :  req.body.registeredUser})
})


// Logout the current User
const loggedOutUser : RequestHandler = (req : Request, res : Response, next : NextFunction) => {
        res.clearCookie("jwt")
        return res.status(200).json({ message: 'User Logged Out Successfully.' })    
}


// Create a unique token if login or register
const createToken=(_id : String ,sk : String, res: Response, next : NextFunction)=>{
        let token : String = jwt.sign({_id},sk)
        res.cookie("jwt",token ,{ expires : new Date (Date.now()+ 600000), httpOnly : true })
        return token.toString()
    } 
    


module.exports = {
    registerUser, loggedInUser, resetPassword, loggedOutUser
}