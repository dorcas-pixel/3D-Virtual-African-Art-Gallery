"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Room_1 = __importDefault(require("../../services/Room"));
exports.default = (app) => {
    app.post("/rooms/add", base_1.default.wrapWithUser(Room_1.default.createRoom));
    app.post("/rooms/get/by/username", base_1.default.wrap(Room_1.default.getArtistRoomsByUsername));
};
//# sourceMappingURL=room.js.map