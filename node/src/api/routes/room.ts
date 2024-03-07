import { Application } from "express";

import baseController from "../controllers/base";
import roomService from "../../services/Room";

export default (app: Application) => {
  app.post(
    "/pedestals/get/by/room",
    baseController.wrap(roomService.getPedestalsByRoom)
  );

  app.post(
    "/pedestals/update/model",
    baseController.wrap(roomService.updatePedestalModel)
  );
};
