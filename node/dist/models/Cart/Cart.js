"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Model"));
const mongoose_1 = require("mongoose");
class Cart extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
            artwork: { type: mongoose_1.Types.ObjectId, ref: "artwork" }
        });
        super(mongoose, "cart", QueryBuilder, schema);
    }
    getByUser(user) {
        return this.model.find({
            condition: { user },
            populate: [["user", ""], ["artwork", ""]],
        });
    }
    removeItem(_id) {
        return this.model.deleteOne({
            _id
        });
    }
}
exports.default = Cart;
//# sourceMappingURL=Cart.js.map