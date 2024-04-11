import { Application } from "express";

import userRoutes from "./user";
import artworkRoutes from "./artwork";
import frameRoutes from "./frame";
import roomRoutes from "./room";
import cartRoutes from "./cart";
import orderRoutes from "./order";

export default (app: Application): void => {
  userRoutes(app);
  artworkRoutes(app);
  frameRoutes(app);
  roomRoutes(app);
  cartRoutes(app);
  orderRoutes(app);
};
