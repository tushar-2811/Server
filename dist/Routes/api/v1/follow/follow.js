"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followController_1 = require("../../../../Controllers/api/v1/follow/followController");
const followRouter = (0, express_1.Router)();
followRouter.get('/:currId/:userId/check', followController_1.checkFollowingController);
followRouter.get('/:currId/:userId/:target', followController_1.followController);
// target == "add" || "remove"
exports.default = followRouter;
