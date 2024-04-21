import { Application } from "express";

import BaseController from "../controllers/base";
import userService from "../../services/User";
import { anyFiles } from "../../config/multer";

export default (app: Application) => {
  app.post(
    "/sign-up",
    BaseController.wrap(userService.createLocalUserAccount)
  );

  app.post("/sign-in", BaseController.wrap(userService.authLocalUserAccount));
  app.post("/sign-out", BaseController.signOut);

  app.post(
    "/user/get/by/session",
    BaseController.wrapWithUser(userService.getUserSession)
  );

  app.post(
    "/user/get/by/username",
    BaseController.wrap(userService.getUserByUsername)
  );

  app.post("/user/update/details", BaseController.wrapWithUser(userService.updateBasicInfo))

  app.post(
    "/user/update/profile",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/profile", "image")(
        req,
        res,
        async (err) => {
          await userService.updateProfile(req.body, req, res);

          next();
        }
      );
    },
    BaseController.wrapWithRequest(function (_, req) {
      this.successful = req["success"];
      this.profile = req["profile"];

      return this;
    })
  );
};
