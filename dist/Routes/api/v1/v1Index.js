"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/auth"));
const user_1 = __importDefault(require("./user/user"));
const post_1 = __importDefault(require("./post/post"));
const follow_1 = __importDefault(require("./follow/follow"));
const v1Router = (0, express_1.Router)();
v1Router.use('/auth', auth_1.default);
v1Router.use('/user', user_1.default);
v1Router.use('/post', post_1.default);
v1Router.use('/follow', follow_1.default);
exports.default = v1Router;
