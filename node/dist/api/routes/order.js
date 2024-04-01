"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Order_1 = __importDefault(require("../../services/Order"));
exports.default = (app) => {
    app.post("/order/place", base_1.default.wrapWithUser(Order_1.default.add));
    app.post("/order/finish", base_1.default.wrapWithUser(Order_1.default.finish));
    app.post("/orders/get/by/buyer", base_1.default.wrapWithUser(Order_1.default.getOrdersByUser));
};
//# sourceMappingURL=order.js.map