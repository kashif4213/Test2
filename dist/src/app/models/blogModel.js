"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require('validator');
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        validate: [validator.isAlphanumeric, 'Title may only have letters and numbers.']
    },
    description: {
        type: String,
        required: true,
        validate: [(value) => {
                if (value.length > 100) {
                    return false;
                }
                return true;
            },
            'Description is too Long']
    },
    nLikes: {
        type: Number,
        required: true
    },
    numComments: {
        type: Number,
        required: true
    },
    Author: {
        user: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
}, {
    timestamps: true
});
module.exports = (0, mongoose_1.model)('Blog', blogSchema);
