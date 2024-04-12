"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = __importDefault(require("../models/Cart"));
class CartServices {
    static async getAllByUser(_, userInfo) {
        try {
            this['works'] = [];
            if (!userInfo)
                return this;
            this['works'] = await Cart_1.default.getByUser(userInfo._id);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async add(body, userInfo) {
        const { artworkId } = body;
        try {
            await Cart_1.default.add({
                user: userInfo._id,
                artwork: artworkId
            });
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async removeItem(body, userInfo) {
        const { itemId } = body;
        try {
            await Cart_1.default.removeItem(itemId);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async removeAllItems(body, userInfo) {
        try {
            await Cart_1.default.removeAllByUser(userInfo._id);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = CartServices;
//# sourceMappingURL=Cart.js.map