"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const decompress_1 = __importDefault(require("decompress"));
const Artwork_1 = __importDefault(require("./Artwork"));
class ArtModelServices {
    static async addModelThumbnail(body, req) {
        try {
            if (!req.files[0])
                throw "Please upload proper thumbnail";
            const artwork = await Artwork_1.default.getNotReadyOrMakeNew(req.store.userInfo._id, "model");
            artwork.image = req.files[0].filename;
            artwork.hasImage = true;
            artwork.save();
            req.success = true;
            req.thumbnail = req.files[0].filename;
        }
        catch (e) {
            throw e;
        }
    }
    static async addModelFile(body, req) {
        try {
            if (!req.files[0])
                throw "Please upload proper file";
            // unzip the folder
            const modelsPath = path_1.default.join(__dirname, `../../public/assets/uploads/artwork/models`);
            const zipFolder = req.files[0].filename;
            const folder = zipFolder.split(".zip");
            await (0, decompress_1.default)(`${modelsPath}/${zipFolder}`, `${modelsPath}/${folder[0]}`);
            const artwork = await Artwork_1.default.getNotReadyOrMakeNew(req.store.userInfo._id, "model");
            if (!artwork.model)
                artwork.model = {};
            artwork.model.folder = folder[0];
            artwork.hasModel = true;
            artwork.save();
            req.art = artwork.toJSON();
            req.success = true;
        }
        catch (e) {
            throw e;
        }
    }
    static async addModelDetails(body, userInfo) {
        try {
            const artwork = await Artwork_1.default.getNotReadyOrMakeNew(userInfo._id, "model");
            // if (!artwork.hasImage) throw 'Please upload a thumbnail first';
            if (!artwork.hasModel)
                throw "Please upload a model file first";
            // artwork.model.type = "gltf";
            // artwork.model.file = body.fileName;
            artwork.name = body.name;
            artwork.description = body.description;
            artwork.price = body.price;
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
exports.default = ArtModelServices;
//# sourceMappingURL=Model.js.map