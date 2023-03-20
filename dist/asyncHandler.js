"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function myAsyncHandler(asyncFunction) {
    return (req, res, next) => {
        asyncFunction(req, res, next).catch(next);
    };
}
module.exports = { myAsyncHandler };
