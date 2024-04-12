"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Cart_1 = __importDefault(require("../../services/Cart"));
exports.default = (app) => {
    app.post("/cart/get/by/user", base_1.default.wrapWithUser(Cart_1.default.getAllByUser));
    app.post("/cart/add", base_1.default.wrapWithUser(Cart_1.default.add));
    app.post("/cart/remove", base_1.default.wrapWithUser(Cart_1.default.removeItem));
    app.post("/cart/remove/all", base_1.default.wrapWithUser(Cart_1.default.removeAllItems));
};
//# sourceMappingURL=cart.js.map