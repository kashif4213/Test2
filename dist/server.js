"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { connectDB } = require('./src/config/db');
const { errorHandler } = require('./src/app/middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const apiCache = require('apicache');
const cache = apiCache.middleware;
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cache('2 minutes'));
connectDB();
app.use('/user', require('./src/app/routes/userRoutes'));
app.use('/blog', require('./src/app/routes/blogRoutes'));
app.use(errorHandler);
app.listen(port, () => {
    console.log('app is listening at port ' + port);
});
