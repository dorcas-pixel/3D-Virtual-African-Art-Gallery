import { Application } from "express";

import baseController from "../controllers/base";
import cartServices from "../../services/Cart";

export default (app: Application) => {
  app.post(
    "/cart/get/by/user",
    baseController.wrapWithUser(cartServices.getAllByUser)
  );

  app.post(
    "/cart/add",
    baseController.wrapWithUser(cartServices.add)
  );

  app.post(
    "/cart/remove",
    baseController.wrapWithUser(cartServices.removeItem)
  );
};
