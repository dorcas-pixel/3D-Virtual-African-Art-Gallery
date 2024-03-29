import { Application } from "express";

import baseController from "../controllers/base";
import artWorkService from "../../services/Artwork";
import portraitService from "../../services/Portrait";
import modelService from "../../services/Model";

import { anyFiles } from "../../config/multer";

import { IAny, IResponse } from "../../interfaces";

export default (app: Application) => {
  app.post(
    "/portrait/add/file",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/portraits", "image")(
        req,
        res,
        async (err) => {
          await portraitService.addPortrait(req.body, req);

          next();
        }
      );
    },
    baseController.wrapWithRequest(function (_, req) {
      this.successful = req["success"];
      this.portrait = req["portrait"];

      return this;
    })
  );

  app.post(
    "/portrait/add/details",
    baseController.wrapWithUser(portraitService.addPortraitDetails)
  );

  app.post(
    "/model/add/thumbnail",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/thumbnails", "image")(
        req,
        res,
        async (err) => {
          await modelService.addModelThumbnail(req.body, req);

          next();
        }
      );
    },
    baseController.wrapWithRequest(function (_, req) {
      this.successful = req["success"];
      this.thumbnail = req["thumbnail"];

      return this;
    })
  );

  app.post(
    "/model/add/file",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/models", "zip")(
        req,
        res,
        async (err) => {
          await modelService.addModelFile(req.body, req);

          next();
        }
      );
    },
    baseController.wrapWithRequest(function (_, req) {
      this.successful = req["success"];

      return this;
    })
  );

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

  app.post(
    "/model/add/details",
    baseController.wrapWithUser(modelService.addModelDetails)
  );

  app.post(
    "/works/get/all/by/artist",
    baseController.wrapWithUser(artWorkService.getAllByUser)
  );

  app.post("/works/get/all", baseController.wrap(artWorkService.getAll));

  app.post(
    "/works/get/featured",
    baseController.wrap(artWorkService.getFeatured)
  );
  
  app.post("/works/get/one", baseController.wrap(artWorkService.getById));
  
  // app.post("/works/delete", baseController.wrap(artWorkService.removeById));

  // app.post(
  //   "/works/update/scale",
  //   baseController.wrap(artWorkService.updateArtworkScale)
  // );
};
