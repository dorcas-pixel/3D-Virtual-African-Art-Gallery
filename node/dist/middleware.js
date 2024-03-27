"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserInfo = exports.sanitizeBody = void 0;
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
const Jwt_1 = __importDefault(require("./helpers/Jwt"));
const String_1 = require("./helpers/String");
const sanitizeBody = (req, res, next) => {
    req.body = (0, mongo_sanitize_1.default)(req.body);
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key))
            req.body[key] = (0, String_1.cleanHTMLEntities)(req.body[key]);
    }
    next();
};
exports.sanitizeBody = sanitizeBody;
const loadUserInfo = (req, res, next) => {
    const auth = req.get('Authorization');
    if (!auth)
        return next();
    const tokenArr = auth.split(' ');
    if (tokenArr.length != 2)
        return next();
    const jwtPair = JSON.parse(decodeURIComponent(tokenArr[1]));
    Jwt_1.default.verify(jwtPair.jwtAccess, (userInfo, isExpired) => {
        req['store'] = req['store'] || {};
        res.locals.userInfo = userInfo;
        req['store'].userInfo = userInfo;
        if (isExpired) {
            Jwt_1.default.verify_refresh(jwtPair.jwtRefresh, (userInfo) => {
                delete userInfo.iat;
                const tokens = Jwt_1.default.get_cookie_tokens(userInfo);
                res.locals.userInfo = userInfo;
                req['store'].userInfo = userInfo;
            });
        }
    });
    next();
};
exports.loadUserInfo = loadUserInfo;
//# sourceMappingURL=middleware.js.map