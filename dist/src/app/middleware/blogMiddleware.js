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
let { myAsyncHandler } = require('../../../asyncHandler');
const { addBlogValidationSchema, getBlogsValidationSchema } = require('../validations/blogValidationSchema');
const Blog = require('../models/blogModel');
const getBlogsMiddleware = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield getBlogsValidationSchema.validateAsync(req.body);
    if (value) {
        next();
    }
}));
const addBlogMiddleware = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, nLikes, numComments, Author } = req.body;
    const value = yield addBlogValidationSchema.validateAsync(req.body);
    if (value) {
        req.body.blog = { title, description, nLikes, numComments, Author };
        next();
    }
}));
const blogMiddlewareUpdateDelete = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, nLikes, numComments, Author } = req.body;
    req.body.blog = yield Blog.findById(req.params.id);
    if (!req.body.blog) {
        return res.status(404).json({ message: 'No such Blog Exists.' });
    }
    if (req.method === 'DELETE') {
        next();
    }
    else {
        const value = yield addBlogValidationSchema.validateAsync({ title, description, nLikes, numComments, Author });
        if (value) {
            req.body.blog.title = title;
            req.body.blog.description = description;
            req.body.blog.nLikes = nLikes;
            req.body.blog.numComments = numComments;
            req.body.blog.Author = Author;
            next();
        }
    }
}));
module.exports = {
    addBlogMiddleware,
    blogMiddlewareUpdateDelete,
    getBlogsMiddleware
};
