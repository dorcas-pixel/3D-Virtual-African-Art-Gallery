import { Application } from "express";

import userRoutes from "./user";
import artworkRoutes from "./artwork";
import frameRoutes from "./frame";
import cartRoutes from "./cart";

export default (app: Application): void => {
  userRoutes(app);
  artworkRoutes(app);
  frameRoutes(app);
  cartRoutes(app);
};
