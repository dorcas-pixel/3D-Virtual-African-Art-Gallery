"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = __importDefault(require("../Model"));
const ROOM_LIMIT = 11;
class Frame extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            position: {
                x: { type: Number, required: true },
                y: { type: Number, required: true },
                z: { type: Number, required: true },
            },
            rotation: { type: Number },
            hasPortrait: { type: Boolean, default: false },
            portrait: { type: mongoose_1.Types.ObjectId, ref: "artwork" },
            room: { type: mongoose_1.Types.ObjectId, ref: "room" },
        });
        super(mongoose, "frame", QueryBuilder, schema);
    }
    getByRoom = (room) => this.model.find({
        condition: { room },
        populate: [["portrait"]],
    });
    getById = (_id) => this.model.findOne({
        condition: { _id },
    });
}
exports.default = Frame;
//# sourceMappingURL=Frame.js.map