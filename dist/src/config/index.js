"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    DB_URL: process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY
};
