"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = __importDefault(require("../models/Frame"));
const Room_1 = __importDefault(require("./Room"));
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
            this.frames = await Frame_1.default.getByRoom(await Room_1.default.getRoomIdOrDefault(body.uniqueId));
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async setFramePortrait(body) {
        try {
            Frame_1.default.updateDetails(body.frameId, {
                portrait: body.portraitId,
                hasPortrait: true
            });
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = FrameServices;
//# sourceMappingURL=Frame.js.map