"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaForLogin = exports.userSchemaForRegister = void 0;
const zod_1 = require("zod");
exports.userSchemaForRegister = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    name: zod_1.z.string().min(3).max(25),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4).max(20)
});
exports.userSchemaForLogin = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string().min(4).max(20)
});
