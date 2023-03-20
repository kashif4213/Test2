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
const { myAsyncHandler } = require("../../../asyncHandler");
const User = require("../models/userModel");
const { addUserValidationSchema, loginUserValidationSchema, logoutUserValidationSchema } = require("../validations/userValidationSchema");
const jwt = require('jsonwebtoken');
const validateUser = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.path === '/register') {
        const value = yield addUserValidationSchema.validateAsync(req.body);
        if (value) {
            let registeredUser = yield User.find({ email: req.body.email });
            if (registeredUser.length > 0) {
                return res.status(404).json({ message: 'This User is already Registered.' });
            }
            if (req.body.confirmPassword && req.body.password === req.body.confirmPassword) {
                req.body.registeredUser = registeredUser[0];
                next();
            }
        }
    }
    else if (req.path === '/logout') {
        const value = yield logoutUserValidationSchema.validateAsync(req.body);
        if (value) {
            next();
        }
    }
    else if (req.path == '/resetPassword') {
        const value = yield addUserValidationSchema.validateAsync(req.body);
        if (value) {
            let registeredUser = yield User.find({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName });
            if (registeredUser.length < 0) {
                return res.status(404).json({ message: 'Sorry, No such User is found.' });
            }
            req.body.registeredUser = registeredUser[0];
            next();
        }
    }
    else if (req.path === '/login') {
        const value = yield loginUserValidationSchema.validateAsync(req.body);
        if (value) {
            let registeredUser = yield User.find({ email: req.body.email });
            if (registeredUser.length < 0) {
                return res.status(404).json({ message: 'Invalid Username or Password.' });
            }
            req.body.registeredUser = registeredUser[0];
            next();
        }
    }
}));
const verifyToken = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.jwt;
    if (accessToken) {
        if (yield jwt.verify(accessToken, 'mySecretKey')) {
            next();
        }
    }
    else {
        res.status(400).json({ message: 'Please Log In to Continue' });
    }
}));
module.exports = {
    validateUser,
    verifyToken
};
