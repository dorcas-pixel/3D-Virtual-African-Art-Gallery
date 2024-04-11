import { Application } from "express";

import BaseController from "../controllers/base";
import userService from "../../services/User";

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
  
};
