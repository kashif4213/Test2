"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { myAsyncHandler } = require('../../../asyncHandler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Register a new User
const registerUser = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, password } = req.body;
    let registeredUser = yield User.create({ firstName, lastName, email, password });
    if (registeredUser) {
        let accessToken = createToken(registeredUser._id.toString(), 'mySecretKey', res, next);
        return res.status(201).json({ accessToken, registeredUser });
    }
}));
// Verifying to login the Existing User
const loggedInUser = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield bcrypt.compare(req.body.password, req.body.registeredUser.password))) {
        return res.status(404).json({ message: 'Invalid Username or Password.' });
    }
    let accessToken = createToken(req.body.registeredUser._id.toString(), 'mySecretKey', res, next);
    return res.status(200).json({ accessToken, message: req.body.registeredUser.firstName + req.body.registeredUser.lastName + ' Logged In Successfully' });
}));
//Reset Password for the User
const resetPassword = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { password } = req.body;
    req.body.registeredUser.password = password;
    yield req.body.registeredUser.save();
    return res.status(200).json({ message: 'Password Changed Successfully', user: req.body.registeredUser });
}));
// Logout the current User
const loggedOutUser = (req, res, next) => {
    res.clearCookie("jwt");
    return res.status(200).json({ message: 'User Logged Out Successfully.' });
};
// Create a unique token if login or register
const createToken = (_id, sk, res, next) => {
    let token = jwt.sign({ _id }, sk);
    res.cookie("jwt", token, { expires: new Date(Date.now() + 600000), httpOnly: true });
    return token.toString();
};
module.exports = {
    registerUser, loggedInUser, resetPassword, loggedOutUser
};
