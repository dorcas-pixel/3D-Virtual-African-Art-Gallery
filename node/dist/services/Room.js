"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../models/Room"));
const User_1 = __importDefault(require("../models/User"));
const String_1 = require("../helpers/String");
const Frame_1 = __importDefault(require("./Frame"));
class RoomServices {
    static async createRoom(body, user) {
        try {
            const { name } = body;
            const uniqueId = (0, String_1.makeId)(6);
            const room = await Room_1.default.add({
                name: name,
                uniqueId,
                artist: user._id
            });
            Frame_1.default.addFrameToRoom(room._id);
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async getArtistRoomsByUsername(body) {
        try {
            const user = await User_1.default.getByUsername(body.username);
            const rooms = await Room_1.default.getByArtist(user._id);
            this['rooms'] = rooms;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = RoomServices;
// export default class RoomServices {
//   static async createRoom(): Promise<any> {
//     try {
//       const uniqueId = makeId(6);
//       const room = await Room.add({
//         name: `Room ${uniqueId}`,
//         uniqueId,
//       });
//       frameServices.addFrameToRoom(room._id);
//       // standServices.addStandsToRoom(room._id)
//       return room;
//     } catch (e) {
//       throw e;
//     }
//   }
//   static async getRoom (kind?: string) : Promise<any> {
//     let room = await Room.getLatestRoom();
//     if (!room || (room && kind && kind == 'model' && room.modelCount >= 6) || 
//       (room && kind && kind == 'portrait' && room.portraitCount >= 11)) room = RoomServices.createRoom();
//     return room;
//   }
//   static async getRoomIdOrDefault(
//     roomUniqueId: string | null
//   ): Promise<string> {
//     if (!roomUniqueId) {
//       let room = await RoomServices.getRoom();
//       return room._id as string;
//     }
//     return (await Room.getByUniqueId(roomUniqueId))._id as string;
//   }
// }
//# sourceMappingURL=Room.js.map