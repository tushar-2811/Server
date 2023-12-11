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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginController = exports.userRegisterController = void 0;
const userSchema_1 = require("../../../../zod/userSchema");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = __importDefault(require("../../../../config/envConfig"));
const prisma = new client_1.PrismaClient();
// To Register a New User --- Create New Account
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password } = req.body;
        const parsedInput = userSchema_1.userSchemaForRegister.safeParse({
            name, username, email, password
        });
        if (!parsedInput.success) {
            return res.status(401).json({
                ok: false,
                msg: "Please Provide valid credentials",
                error: parsedInput.error
            });
        }
        // Check if there exist any user by this username or email
        const existingUserByEmail = yield prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUserByEmail) {
            return res.status(401).json({
                ok: false,
                msg: "user already exist with this email"
            });
        }
        const exisingUserByUsername = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (exisingUserByUsername) {
            return res.status(401).json({
                ok: false,
                msg: "user already exist with this username"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const newUser = yield prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                hashedPassword: hashedPassword
            }
        });
        return res.status(201).json({
            ok: true,
            msg: "Account Created",
            user: newUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            msg: "error",
            error
        });
    }
});
exports.userRegisterController = userRegisterController;
// To Login -- Sign In into Existing Account
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const parsedInput = userSchema_1.userSchemaForLogin.safeParse({
            username, password
        });
        if (!parsedInput.success) {
            return res.status(401).json({
                ok: false,
                msg: "Please Enter Valid Credentials",
                error: parsedInput.error
            });
        }
        const exisingUserByUsername = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (!exisingUserByUsername || !exisingUserByUsername.hashedPassword) {
            return res.status(401).json({
                ok: false,
                msg: "User Not Found"
            });
        }
        const isPasswordSame = yield bcrypt_1.default.compare(password, exisingUserByUsername.hashedPassword);
        if (!isPasswordSame) {
            return res.status(401).json({
                ok: false,
                msg: "Wrong Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: exisingUserByUsername.id }, envConfig_1.default.jwt_secret, { expiresIn: '24h' });
        return res.status(201).json({
            ok: true,
            token: token,
            msg: "Successful",
            user: exisingUserByUsername
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "error",
            error: error
        });
    }
});
exports.userLoginController = userLoginController;
