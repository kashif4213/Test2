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
const Blog = require('../models/blogModel');
const { myAsyncHandler } = require('../../../asyncHandler');
const getModels = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let blogs = yield Blog.find().skip(req.body.pageNumber * 5).limit(5).sort({ title: 1 });
    return res.status(200).json(blogs);
}));
const createModel = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tempBlog = yield Blog.create(req.body.blog);
    return res.status(201).json(tempBlog);
}));
const updateModel = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield req.body.blog.save();
    return res.status(200).json(req.body.blog);
}));
const deleteModel = myAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield req.body.blog.remove();
    return res.status(200).json(req.params.id);
}));
module.exports = {
    getModels,
    createModel,
    updateModel,
    deleteModel
};
