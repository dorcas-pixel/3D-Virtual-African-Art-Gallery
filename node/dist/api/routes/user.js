"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const User_1 = __importDefault(require("../../services/User"));
const multer_1 = require("../../config/multer");
exports.default = (app) => {
    app.post("/sign-up", base_1.default.wrap(User_1.default.createLocalUserAccount));
    app.post("/sign-in", base_1.default.wrap(User_1.default.authLocalUserAccount));
    app.post("/sign-out", base_1.default.signOut);
    app.post("/user/get/by/session", base_1.default.wrapWithUser(User_1.default.getUserSession));
    app.post("/user/get/by/username", base_1.default.wrap(User_1.default.getUserByUsername));
    app.post("/user/update/details", base_1.default.wrapWithUser(User_1.default.updateBasicInfo));
    app.post("/user/update/profile", (req, res, next) => {
        (0, multer_1.anyFiles)("./public/assets/uploads/profile", "image")(req, res, async (err) => {
            await User_1.default.updateProfile(req.body, req, res);
            next();
        });
    }, base_1.default.wrapWithRequest(function (_, req) {
        this.successful = req["success"];
        this.profile = req["profile"];
        return this;
    }));
};
//# sourceMappingURL=user.js.map