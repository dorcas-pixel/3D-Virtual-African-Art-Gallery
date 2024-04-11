"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
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
        Validation_1.default.validate({
            'Full name': { value: body.fullname, min: 3, max: 50 },
            'Username': { value: body.username, min: 3, max: 50 },
            'Email address': { value: body.email, min: 3, max: 50 },
            'Password': { value: body.password, min: 8, max: 50 },
            'Password again': { value: body.passwordAgain, is: ['Password', 'Passwords don\'t match'] }
        });
        if (await User_1.default.exists({ username: body.username }))
            throw 'Username is already in use';
        if (await User_1.default.exists({ email: body.email }))
            throw 'Email address is already in use';
        const newUser = await User_1.default.add({
            fullname: body.fullname,
            username: body.username,
            email: body.email,
            password: await Hasher_1.default.hash(body.password),
        });
        saveSession.call(this, removePassword(newUser.toJSON()));
        this.successful = true;
        this.user = newUser.toObject();
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
        this.user = user.toObject();
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
async function getUserByUsername(body) {
    const user = await User_1.default.getByUsername(body.username);
    this.user = user;
    return this;
}
exports.default = { getUserSession, createLocalUserAccount, authLocalUserAccount, getUserByUsername };
//# sourceMappingURL=User.js.map