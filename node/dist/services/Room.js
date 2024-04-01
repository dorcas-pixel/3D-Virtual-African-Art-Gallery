"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../models/Room"));
const String_1 = require("../helpers/String");
const Frame_1 = __importDefault(require("./Frame"));
const Stand_1 = __importDefault(require("./Stand"));
class RoomServices {
    static async createRoom() {
        try {
            const uniqueId = (0, String_1.makeId)(6);
            const room = await Room_1.default.add({
                name: `Room ${uniqueId}`,
                uniqueId,
            });
            Frame_1.default.addFrameToRoom(room._id);
            Stand_1.default.addStandsToRoom(room._id);
            return room;
        }
        catch (e) {
            throw e;
        }
    }
    static async getRoom(kind) {
        let room = await Room_1.default.getLatestRoom();
        if (!room || (room && kind && kind == 'model' && room.modelCount >= 6) ||
            (room && kind && kind == 'portrait' && room.portraitCount >= 11))
            room = RoomServices.createRoom();
        return room;
    }
    static async getRoomIdOrDefault(roomUniqueId) {
        if (!roomUniqueId) {
            let room = await RoomServices.getRoom();
            return room._id;
        }
        return (await Room_1.default.getByUniqueId(roomUniqueId))._id;
    }
}
exports.default = RoomServices;
//# sourceMappingURL=Room.js.map