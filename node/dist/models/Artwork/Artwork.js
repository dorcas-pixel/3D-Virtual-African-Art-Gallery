"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Model"));
const mongoose_1 = require("mongoose");
class Artwork extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String },
            user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
            room: { type: mongoose_1.Types.ObjectId, ref: "room" },
            image: { type: String },
            kind: { type: String },
            description: { type: String },
            price: { type: Number },
            model: {
                type: { type: String },
                file: { type: String },
                folder: { type: String }
            },
            hasImage: { type: Boolean, default: false },
            hasModel: { type: Boolean, default: false },
            isReady: { type: Boolean, default: false },
            isDeleted: { type: Boolean, default: false },
        });
        super(mongoose, "artwork", QueryBuilder, schema);
    }
    getNotReadyByUser = (user, kind) => this.model.findOne({
        condition: { user, kind, isDeleted: false, isReady: false },
    });
    getAllReady = () => this.model.find({
        condition: { isDeleted: false, isReady: true },
        populate: [["user", "-password"]],
    });
    getAllReadyByKind = (kind) => this.model.find({
        condition: { kind, isDeleted: false, isReady: true },
        populate: [["user", "-password"]],
    });
    getAllReadyByUser = (user) => this.model.find({
        condition: { user, isDeleted: false, isReady: true },
        populate: [["user", "-password"]],
    });
    getAllReadyByUserAndKind = (user, kind) => this.model.find({
        condition: { user, kind, isDeleted: false, isReady: true },
        populate: [["user", "-password"]],
    });
    getByRoomAndType = (room, kind) => this.model.find({
        condition: { room, kind, isDeleted: false, isReady: true },
    });
    getById = (_id, select = "") => this.model.findOne({
        condition: { _id, isDeleted: false, isReady: true },
        select,
        populate: [["user", "-password"], ['room', 'uniqueId']],
    });
    getFeatured = () => this.model.find({
        condition: {},
        limit: 8,
    });
}
exports.default = Artwork;
//# sourceMappingURL=Artwork.js.map