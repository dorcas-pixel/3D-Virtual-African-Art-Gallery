"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const User_1 = __importDefault(require("../../services/User"));
exports.default = (app) => {
    app.post("/sign-up", base_1.default.wrap(User_1.default.createLocalUserAccount));
    app.post("/sign-in", base_1.default.wrap(User_1.default.authLocalUserAccount));
    app.post("/sign-out", base_1.default.signOut);
    app.post("/user/get/by/session", base_1.default.wrapWithUser(User_1.default.getUserSession));
};
//# sourceMappingURL=user.js.map