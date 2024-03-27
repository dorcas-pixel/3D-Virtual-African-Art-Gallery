"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Hasher_1 = __importDefault(require("../helpers/Hasher"));
const Jwt_1 = __importDefault(require("../helpers/Jwt"));
function saveSession(user) {
    const tokens = Jwt_1.default.get_cookie_tokens(user);
    // gallery ression
    this.set_cookie("_gallery_sesh", JSON.stringify(tokens));
}
function removePassword(user) {
    delete user.password;
    return user;
}
async function createLocalUserAccount(body) {
    try {
        const newUser = await User_1.default.add({
            fullname: body.fullname,
            username: body.username,
            email: body.email,
            password: await Hasher_1.default.hash(body.password),
        });
        saveSession.call(this, removePassword(newUser.toJSON()));
        this.successful = true;
        this.username = body.username;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function authLocalUserAccount(body) {
    try {
        const user = await User_1.default.getByUsernameOrEmail(body.identifier);
        if (!user || (user && !(await Hasher_1.default.isSame(user.password, body.password))))
            throw "Email address, username, or password is incorrect";
        else if (user.authType != "local")
            throw `Email address, username, already registered with ${user.authType}`;
        saveSession.call(this, removePassword(user.toJSON()));
        this.successful = true;
        this.username = user.username;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function getUserSession(_, user) {
    this.user = user;
    return this;
}
exports.default = { getUserSession, createLocalUserAccount, authLocalUserAccount };
//# sourceMappingURL=User.js.map