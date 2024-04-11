"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Model_1 = __importDefault(require("../Model"));
class Room extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String },
            uniqueId: { type: String },
            artist: { type: mongoose_1.Types.ObjectId, ref: "user" },
            portraitCount: { type: Number, default: 1 },
            createdAt: { type: Date, default: Date.now },
        });
        super(mongoose, "room", QueryBuilder, schema);
    }
    getLatestRoom = () => this.model.findOne({
        condition: {},
        sort: { createdAt: -1 },
    });
    getByUniqueId = (uniqueId) => this.model.findOne({
        condition: { uniqueId },
    });
    getByArtist = (artist) => this.model.find({
        condition: { artist }
    });
}
exports.default = Room;
//# sourceMappingURL=Room.js.map