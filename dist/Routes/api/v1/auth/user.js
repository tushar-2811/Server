"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../../../Controllers/api/v1/auth/authController");
const userRouter = (0, express_1.Router)();
// To Register New User
userRouter.post('/register', authController_1.userRegisterController);
// To Login into already existing Account
userRouter.post('/login', authController_1.userLoginController);
exports.default = userRouter;
