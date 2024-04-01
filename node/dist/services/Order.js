"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const User_1 = __importDefault(require("../models/User"));
async function add(body, user) {
    try {
        const { transactionId } = body;
        const items = await Cart_1.default.getByUser(user._id);
        const artworks = [];
        const sellers = [];
        let cost = 0;
        items.forEach((item) => {
            artworks.push(item.artwork._id);
            sellers.push(item.user._id);
            cost += item.artwork.price;
        });
        Order_1.default.add({
            buyer: user._id,
            sellers,
            artworks,
            transactionId,
            cost
        });
        return this;
    }
    catch (e) {
        throw e;
    }
}
async function finish(body, user) {
    try {
        const { transactionId } = body;
        Order_1.default.updateByTransactionId(transactionId, {
            status: 'completed'
        })(await Cart_1.default.getByUser(user._id)).forEach(async (item) => {
            const user = await User_1.default.getById(item.artwork.user);
            user.credit += item.artwork.price;
            user.save();
        });
        Cart_1.default.removeAll(user._id);
        return this;
    }
    catch (e) {
        throw e;
    }
}
async function getOrdersByUser(body, user) {
    try {
        this.orders = await Order_1.default.getByBuyer(user._id);
        return this;
    }
    catch (e) {
        throw e;
    }
}
exports.default = {
    add,
    finish,
    getOrdersByUser
};
//# sourceMappingURL=Order.js.map