import { Application } from "express";

import baseController from "../controllers/base";
import frameServices from "../../services/Frame";

export default (app: Application) => {
  app.post(
    "/frames/get/by/room",
    baseController.wrap(frameServices.getFramesByRoom)
  );

  app.post(
    "/frames/update/portrait",
    baseController.wrap(frameServices.setFramePortrait)
  );
};
