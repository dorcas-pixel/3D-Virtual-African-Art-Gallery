"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Model"));
const ROOM_LIMIT = 4;
class Room extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String },
            uniqueId: { type: String },
            count: { type: Number, default: 1 },
            createdAt: { type: Date, default: Date.now },
        });
        super(mongoose, "room", QueryBuilder, schema);
    }
    getLatestRoom = () => this.model.findOne({
        condition: { count: { $lte: ROOM_LIMIT } },
        sort: { createdAt: -1 },
    });
    getByUniqueId = (uniqueId) => this.model.findOne({
        condition: { uniqueId },
    });
}
exports.default = Room;
//# sourceMappingURL=Room.js.map