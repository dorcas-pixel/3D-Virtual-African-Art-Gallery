import { Application } from "express";

import baseController from "../controllers/base";
import roomServices from "../../services/Room";

export default (app: Application) => {
  app.post(
    "/rooms/add",
    baseController.wrapWithUser(roomServices.createRoom)
  );

  app.post(
    "/rooms/get/by/username",
    baseController.wrap(roomServices.getArtistRoomsByUsername)
  );
};
