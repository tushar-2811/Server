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
exports.updateLikeController = exports.isLikedController = exports.updateUserController = exports.getSingleUserController = exports.getAllUsersController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// To get max-10 registered users
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield prisma.user.findMany({
            take: 10
        });
        return res.status(201).json({
            ok: true,
            msg: "registered users",
            users: Users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "failed to fetch users",
            error: error
        });
    }
});
exports.getAllUsersController = getAllUsersController;
// To get single User
const getSingleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (userId === "") {
            return res.json({
                ok: false
            });
        }
        const singleUser = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        const followersCount = yield prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        });
        return res.status(201).json({
            ok: true,
            msg: "user found",
            user: singleUser,
            followers: followersCount
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            msg: "error in fetching user",
            error: error
        });
    }
});
exports.getSingleUserController = getSingleUserController;
// To update a single user
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, username, bio, profileImage, coverImage } = req.body;
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name, username, bio, profileImage, coverImage
            }
        });
        return res.status(201).json({
            ok: true,
            msg: "Updated Successfully",
            user: updatedUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            msg: "something went wrong",
            error
        });
    }
});
exports.updateUserController = updateUserController;
// check is LIked
const isLikedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const post = yield prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        const isPresent = post === null || post === void 0 ? void 0 : post.likedIds.find((likedUserId) => {
            return likedUserId === userId;
        });
        if (!isPresent) {
            return res.status(201).json({
                ok: true,
                isLiked: false
            });
        }
        return res.status(201).json({
            ok: true,
            isLiked: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            error
        });
    }
});
exports.isLikedController = isLikedController;
// update-like
const updateLikeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const status = Number(req.params.status);
        const post = yield prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        if (status === 0) {
            const newIds = post === null || post === void 0 ? void 0 : post.likedIds.filter(id => id !== userId);
            const updatedPost = yield prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: newIds
                }
            });
            return res.status(201).json({
                ok: true,
                msg: "removed Like"
            });
        }
        else {
            post === null || post === void 0 ? void 0 : post.likedIds.push(userId);
            const updatedPost = yield prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: post === null || post === void 0 ? void 0 : post.likedIds
                }
            });
            return res.status(201).json({
                ok: true,
                msg: "added like"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            error
        });
    }
});
exports.updateLikeController = updateLikeController;
