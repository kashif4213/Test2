"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    if (err.message) {
        res.json({ message: err.message });
    }
};
module.exports = {
    errorHandler
};
