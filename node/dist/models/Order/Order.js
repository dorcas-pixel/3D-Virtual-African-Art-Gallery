"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = __importDefault(require("../Model"));
class Order extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            buyer: { type: mongoose_1.Types.ObjectId, ref: "user" },
            sellers: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
            cost: { type: Number },
            status: { type: String, default: 'pending' },
            transactionId: { type: String },
            artworks: [{ type: mongoose_1.Types.ObjectId, ref: 'artwork' }],
            createdAt: { type: Date, default: Date.now },
        });
        super(mongoose, "order", QueryBuilder, schema);
    }
    getBySeller(seller) {
        return this.model.find({
            condition: { 'sellers._id': seller },
        });
    }
    getByBuyer(buyer) {
        return this.model.find({
            condition: { buyer },
            populate: [['artworks'], ['sellers']]
        });
    }
    updateByTransactionId(transactionId, details) {
        return this.model.updateOne({ transactionId }, details);
    }
}
exports.default = Order;
//# sourceMappingURL=Order.js.map