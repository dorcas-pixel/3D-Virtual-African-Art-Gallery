import { Application } from "express";

import baseController from "../controllers/base";
import orderService from "../../services/Order";
 
import { anyFiles } from "../../config/multer";

export default (app: Application) => {
  app.post(
    "/order/place",
    baseController.wrapWithUser(orderService.add)
  );

  app.post(
    "/order/finish",
    baseController.wrapWithUser(orderService.finish)
  );

  app.post(
    "/orders/get/by/buyer",
    baseController.wrapWithUser(orderService.getOrdersByUser)
  );
};
