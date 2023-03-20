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
const mongoose_1 = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email.']
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
module.exports = (0, mongoose_1.model)('User', userSchema);
