"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = __importDefault(require("../Model"));
class Stand extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            position: {
                x: { type: Number, required: true },
                y: { type: Number, required: true },
                z: { type: Number, required: true },
            },
            hasModel: { type: Boolean, default: false },
            model: { type: mongoose_1.Types.ObjectId, ref: "artwork" },
            room: { type: mongoose_1.Types.ObjectId, ref: "room" },
        });
        super(mongoose, "stand", QueryBuilder, schema);
    }
    getByRoom = (room) => this.model.find({
        condition: { room },
        populate: [["model"]],
    });
}
exports.default = Stand;
//# sourceMappingURL=Stand.js.map