import { Request, Response, NextFunction, RequestHandler } from "express"
import { Schema } from "joi"
let { myAsyncHandler } = require('../asyncHandler')
const {addBlogValidationSchema, getBlogsValidationSchema} = require('../validations/blogValidationSchema')
const Blog = require('../models/blogModel');


const getBlogsMiddleware: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const value = await getBlogsValidationSchema.validateAsync(req.body)
    if (value) {
    next()
    }
})



const addBlogMiddleware: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { title, description, nLikes, numComments, Author } = req.body
    const value = await addBlogValidationSchema.validateAsync(req.body)
    if (value) {
        req.body.blog = { title, description, nLikes, numComments, Author }
        next()
    }
})


const blogMiddlewareUpdateDelete: RequestHandler = myAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { title, description, nLikes, numComments, Author } = req.body
    req.body.blog = await Blog.findById(req.params.id)
    if (!req.body.blog) {
        return res.status(404).json({ message: 'No such Blog Exists.' })
    }
    if (req.method === 'DELETE') {
        next()
    }
    else {
        const value = await addBlogValidationSchema.validateAsync({ title, description, nLikes, numComments, Author })
        if (value) {
            req.body.blog.title = title
            req.body.blog.description = description
            req.body.blog.nLikes = nLikes
            req.body.blog.numComments = numComments
            req.body.blog.Author = Author
            next()
        }
    }
})

module.exports = {
    addBlogMiddleware,
    blogMiddlewareUpdateDelete,
    getBlogsMiddleware
}