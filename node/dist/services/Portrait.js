"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = __importDefault(require("../helpers/Validation"));
const Artwork_1 = __importDefault(require("./Artwork"));
class PortraitServices {
    static async addPortrait(body, req) {
        try {
            if (!req.files[0])
                throw "Please upload proper thumbnail";
            const artwork = await Artwork_1.default.getNotReadyOrMakeNew(req.store.userInfo._id, "portrait");
            artwork.image = req.files[0].filename;
            artwork.hasImage = true;
            artwork.save();
            req.success = true;
            req.portrait = req.files[0].filename;
        }
        catch (e) {
            throw e;
        }
    }
    static async addPortraitDetails(body, userInfo) {
        try {
            const { name, description, price } = body;
            Validation_1.default.validate({
                'Name': { value: name, min: 3, max: 50 },
                'Description': { value: description, min: 3, max: 2000 },
                'Price': { value: price, min: 1, max: 8 }
            });
            if (!(/^[0-9]+$/.test(price)))
                throw 'Price must be a number, 0-9';
            const artwork = await Artwork_1.default.getNotReadyOrMakeNew(userInfo._id, "portrait");
            if (!artwork.hasImage)
                throw "Please upload a portrait first";
            artwork.name = name;
            artwork.price = price;
            artwork.description = description;
            artwork.isReady = true;
            artwork.save();
            this['successful'] = true;
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = PortraitServices;
//# sourceMappingURL=Portrait.js.map