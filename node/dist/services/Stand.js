"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __importDefault(require("../models/Stand"));
const Room_1 = __importDefault(require("./Room"));
class StandServices {
    static async addStandsToRoom(roomId) {
        const stands = [
            {
                position: {
                    x: -3.4,
                    y: 0,
                    z: 4
                }
            },
            {
                position: {
                    x: -3.4,
                    y: 0,
                    z: 0
                }
            },
            {
                position: {
                    x: -3.4,
                    y: 0,
                    z: -4
                }
            },
            {
                position: {
                    x: 3.4,
                    y: 0,
                    z: 4
                }
            },
            {
                position: {
                    x: 3.4,
                    y: 0,
                    z: 0
                }
            },
            {
                position: {
                    x: 3.4,
                    y: 0,
                    z: -4
                }
            },
        ];
        try {
            for (let i = 0; i < stands.length; i++) {
                const { x, y, z } = stands[i].position;
                await Stand_1.default.add({
                    position: {
                        x,
                        y,
                        z,
                    },
                    room: roomId,
                });
            }
        }
        catch (e) {
            throw e;
        }
    }
    static async getStandsByRoom(body) {
        try {
            this.stands = await Stand_1.default.getByRoom(await Room_1.default.getRoomIdOrDefault(body.uniqueId));
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async setStandModel(body) {
        try {
            Stand_1.default.updateDetails(body.standId, {
                model: body.modelId,
                hasModel: true
            });
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = StandServices;
//# sourceMappingURL=Stand.js.map