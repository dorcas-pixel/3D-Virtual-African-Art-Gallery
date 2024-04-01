import { Application } from "express";

import baseController from "../controllers/base";
import standservices from "../../services/Stand";

export default (app: Application) => {
  app.post(
    "/stands/get/by/room",
    baseController.wrap(standservices.getStandsByRoom)
  );

  app.post(
    "/stands/update/model",
    baseController.wrap(standservices.setStandModel)
  );
};
