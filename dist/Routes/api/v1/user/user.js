"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../../../Controllers/api/v1/user/userController");
const userRouter = (0, express_1.Router)();
// To get 10 registered users
userRouter.get('/get-10', userController_1.getAllUsersController);
// To update particular User
userRouter.post('/:id/update-user', userController_1.updateUserController);
// To fetch single User
userRouter.get('/:id/single-user', userController_1.getSingleUserController);
// to check that if this particular user has liked this post or Not;
userRouter.get("/:userId/:postId/check", userController_1.isLikedController);
// update like
userRouter.post("/:userId/:postId/:status", userController_1.updateLikeController);
exports.default = userRouter;
