"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../../../../Controllers/api/v1/post/postController");
const postRouter = (0, express_1.Router)();
// create-post
postRouter.post('/:userId/create-post', postController_1.creatPostController);
// get-all-posts : for Home Page
postRouter.get('/all-posts', postController_1.getAllPostHomeController);
// get-all-post : for particular user
postRouter.get('/:userId', postController_1.getAllPostController);
exports.default = postRouter;
