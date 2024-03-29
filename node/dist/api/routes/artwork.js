"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Artwork_1 = __importDefault(require("../../services/Artwork"));
const Portrait_1 = __importDefault(require("../../services/Portrait"));
const Model_1 = __importDefault(require("../../services/Model"));
const multer_1 = require("../../config/multer");
exports.default = (app) => {
    app.post("/portrait/add/file", (req, res, next) => {
        (0, multer_1.anyFiles)("./public/assets/uploads/artwork/portraits", "image")(req, res, async (err) => {
            await Portrait_1.default.addPortrait(req.body, req);
            next();
        });
    }, base_1.default.wrapWithRequest(function (_, req) {
        this.successful = req["success"];
        this.portrait = req["portrait"];
        return this;
    }));
    app.post("/portrait/add/details", base_1.default.wrapWithUser(Portrait_1.default.addPortraitDetails));
    app.post("/model/add/thumbnail", (req, res, next) => {
        (0, multer_1.anyFiles)("./public/assets/uploads/artwork/thumbnails", "image")(req, res, async (err) => {
            await Model_1.default.addModelThumbnail(req.body, req);
            next();
        });
    }, base_1.default.wrapWithRequest(function (_, req) {
        this.successful = req["success"];
        this.thumbnail = req["thumbnail"];
        return this;
    }));
    app.post("/model/add/file", (req, res, next) => {
        (0, multer_1.anyFiles)("./public/assets/uploads/artwork/models", "zip")(req, res, async (err) => {
            await Model_1.default.addModelFile(req.body, req);
            next();
        });
    }, base_1.default.wrapWithRequest(function (_, req) {
        this.successful = req["success"];
        return this;
    }));
    // app.post(
    //   "/model/add/thumbnail",
    //   (req, res, next) => {
    //     anyFiles("./public/assets/uploads/artwork/thumbnails", "image")(
    //       req,
    //       res,
    //       async (err) => {
    //         await modelService.addModelThumbnail(req.body, req);
    //         next();
    //       }
    //     );
    //   },
    //   baseController.wrap_with_request((res_wrap, _, req) => {
    //     res_wrap.successful = req["success"];
    //     res_wrap.thumbnail = req["thumbnail"];
    //     return res_wrap;
    //   })
    // );
    // app.post(
    //   "/model/add/model-file",
    //   (req, res, next) => {
    //     anyFiles("./public/assets/uploads/artwork/models", "zip")(
    //       req,
    //       res,
    //       async (err) => {
    //         await modelService.addModelFile(req.body, req);
    //         next();
    //       }
    //     );
    //   },
    //   baseController.wrap_with_request((res_wrap, _, req) => {
    //     res_wrap.successful = req["success"];
    //     res_wrap.art = req["art"];
    //     return res_wrap;
    //   })
    // );
    app.post("/model/add/details", base_1.default.wrapWithUser(Model_1.default.addModelDetails));
    app.post("/works/get/all/by/artist", base_1.default.wrapWithUser(Artwork_1.default.getAllByUser));
    app.post("/works/get/all", base_1.default.wrap(Artwork_1.default.getAll));
    app.post("/works/get/featured", base_1.default.wrap(Artwork_1.default.getFeatured));
    app.post("/works/get/one", base_1.default.wrap(Artwork_1.default.getById));
    // app.post("/works/delete", baseController.wrap(artWorkService.removeById));
    // app.post(
    //   "/works/update/scale",
    //   baseController.wrap(artWorkService.updateArtworkScale)
    // );
};
//# sourceMappingURL=artwork.js.map