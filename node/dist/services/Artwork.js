"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artwork_1 = __importDefault(require("../models/Artwork"));
const User_1 = __importDefault(require("../models/User"));
class ArtWorkServices {
    static async getNotReadyOrMakeNew(user, kind) {
        let artwork = await Artwork_1.default.getNotReadyByUser(user, kind);
        if (!artwork) {
            artwork = await Artwork_1.default.add({
                user,
                kind
            });
        }
        return artwork;
    }
    static async getAll(body) {
        try {
            if (!body.kind)
                this['works'] = await Artwork_1.default.getAllReady();
            else
                this['works'] = await Artwork_1.default.getAllReadyByKind(body.kind);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async getAllByUser(body, userInfo) {
        const { kind } = body;
        try {
            this['works'] = [];
            if (!userInfo)
                return this;
            if (!kind)
                this['works'] = await Artwork_1.default.getAllReadyByUser(userInfo._id);
            else
                this['works'] = await Artwork_1.default.getAllReadyByUserAndKind(userInfo._id, kind);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async getAllByUsername(body) {
        const { kind, username } = body;
        try {
            this['works'] = [];
            const user = await User_1.default.getByUsername(username);
            if (!user)
                return this;
            ;
            if (!kind)
                this['works'] = await Artwork_1.default.getAllReadyByUser(user._id);
            else
                this['works'] = await Artwork_1.default.getAllReadyByUserAndKind(user._id, kind);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async getFeatured(body) {
        try {
            this['works'] = await Artwork_1.default.getFeatured();
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    static async getById(body) {
        try {
            this['art'] = await Artwork_1.default.getById(body.id);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
    // static async updateArtworkScale(wrapRes: IResponse, body: IAny) {
    //   try {
    //     Artwork.updateDetails(body.artworkId, {
    //       "model.scale": body.scale,
    //     });
    //     return wrapRes;
    //   } catch (e) {
    //     throw e;
    //   }
    // }
    static async removeById(body) {
        try {
            await Artwork_1.default.delete(body.artworkId);
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = ArtWorkServices;
//# sourceMappingURL=Artwork.js.map