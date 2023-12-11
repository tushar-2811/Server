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
exports.getAllPostHomeController = exports.getAllPostController = exports.creatPostController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// to create Post
const creatPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (req.params.userId);
        const { body } = req.body;
        const newPost = yield prisma.post.create({
            data: {
                body,
                userId
            }
        });
        const Posts = yield prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                id: "desc"
            }
        });
        return res.status(201).json({
            ok: "true",
            msg: "New Post Published",
            post: Posts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: 'false',
            msg: "error in creating post",
            error
        });
    }
});
exports.creatPostController = creatPostController;
// to get posts for particular user
const getAllPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (req.params.userId);
        const userPosts = yield prisma.post.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(201).json({
            ok: true,
            posts: userPosts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            msg: "error in getting posts",
            error
        });
    }
});
exports.getAllPostController = getAllPostController;
// get all posts for home page
const getAllPostHomeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(201).json({
            ok: true,
            posts: allPosts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            msg: "error in fetching posts"
        });
    }
});
exports.getAllPostHomeController = getAllPostHomeController;
