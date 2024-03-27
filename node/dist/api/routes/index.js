"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const artwork_1 = __importDefault(require("./artwork"));
const frame_1 = __importDefault(require("./frame"));
const cart_1 = __importDefault(require("./cart"));
exports.default = (app) => {
    (0, user_1.default)(app);
    (0, artwork_1.default)(app);
    (0, frame_1.default)(app);
    (0, cart_1.default)(app);
};
//# sourceMappingURL=index.js.map