"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../../../Controllers/api/v1/auth/authController");
const authRouter = (0, express_1.Router)();
// To Register New User
authRouter.post('/register', authController_1.userRegisterController);
// To Login into already existing Account
authRouter.post('/login', authController_1.userLoginController);
exports.default = authRouter;
