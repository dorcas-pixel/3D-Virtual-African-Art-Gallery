"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = __importDefault(require("../models/Frame"));
const Room_1 = __importDefault(require("../models/Room"));
const Artwork_1 = __importDefault(require("../models/Artwork"));
class FrameServices {
    static async addFrameToRoom(roomId) {
        try {
            const frames = [
                {
                    pos: {
                        x: 2,
                        y: 1,
                        z: -8,
                    },
                },
                {
                    pos: {
                        x: 0,
                        y: 1,
                        z: -8,
                    },
                },
                {
                    pos: {
                        x: -2,
                        y: 1,
                        z: -8,
                    },
                },
                {
                    rotation: 90,
                    pos: {
                        x: -4,
                        y: 1,
                        z: -6,
                    },
                },
                {
                    rotation: 90,
                    pos: {
                        x: -4,
                        y: 1,
                        z: -2,
                    },
                },
                {
                    rotation: 90,
                    pos: {
                        x: -4,
                        y: 1,
                        z: 2,
                    },
                },
                {
                    rotation: 90,
                    pos: {
                        x: -4,
                        y: 1,
                        z: 6,
                    },
                },
                {
                    rotation: -90,
                    pos: {
                        x: 4,
                        y: 1,
                        z: -6,
                    },
                },
                {
                    rotation: -90,
                    pos: {
                        x: 4,
                        y: 1,
                        z: -2,
                    },
                },
                {
                    rotation: -90,
                    pos: {
                        x: 4,
                        y: 1,
                        z: 2,
                    },
                },
                {
                    rotation: -90,
                    pos: {
                        x: 4,
                        y: 1,
                        z: 6,
                    },
                },
            ];
            for (let i = 0; i < frames.length; i++) {
                const { x, y, z } = frames[i].pos;
                await Frame_1.default.add({
                    position: {
                        x,
                        y,
                        z,
                    },
                    rotation: frames[i].rotation,
                    room: roomId,
                });
            }
        }
        catch (e) {
            throw e;
        }
    }
    static async getFramesByRoom(body) {
        try {
            if (!body.uniqueId)
                throw 'Could not find room';
            const room = await Room_1.default.getByUniqueId(body.uniqueId);
            if (!room)
                throw 'Could not find room';
            this.frames = await Frame_1.default.getByRoom(room._id);
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async setFramePortrait(body) {
        try {
            const frame = await Frame_1.default.getById(body.frameId);
            frame.portrait = body.portraitId;
            frame.hasPortrait = true;
            const portrait = await Artwork_1.default.getById(body.portraitId);
            portrait.room = frame.room;
            frame.save();
            portrait.save();
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = FrameServices;
//# sourceMappingURL=Frame.js.map