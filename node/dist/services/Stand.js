"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = __importDefault(require("../models/Stand"));
const Artwork_1 = __importDefault(require("../models/Artwork"));
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
            const stand = await Stand_1.default.getById(body.standId);
            stand.model = body.modelId;
            stand.hasModel = true;
            const model = await Artwork_1.default.getById(body.modelId);
            model.room = stand.room;
            stand.save();
            model.save();
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async adjustModelScale(body) {
        try {
            const { standId, scale } = body;
            await Stand_1.default.updateDetails(standId, {
                'modelScale': scale
            });
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async adjustModelPosition(body) {
        try {
            const { standId, x, y, z } = body;
            await Stand_1.default.updateDetails(standId, {
                'modelPosition': {
                    x,
                    y,
                    z
                }
            });
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = StandServices;
//# sourceMappingURL=Stand.js.map