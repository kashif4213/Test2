import { Request, Response, NextFunction, RequestHandler } from "express";

const Blog = require('../models/blogModel');
const { myAsyncHandler } = require('../../../asyncHandler');

const getModels: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let blogs = await Blog.find().skip(req.body.pageNumber * 5 ).limit(5).sort({title : 1})
    return res.status(200).json(blogs)
})


const createModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let tempBlog = await Blog.create(req.body.blog)
    return res.status(201).json(tempBlog)
})


const updateModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await req.body.blog.save()
    return res.status(200).json(req.body.blog)
})

const deleteModel: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await req.body.blog.remove()
    return res.status(200).json(req.params.id)
})

module.exports = {
    getModels,
    createModel,
    updateModel,
    deleteModel
}

