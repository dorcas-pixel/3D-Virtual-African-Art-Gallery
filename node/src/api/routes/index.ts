import { Application } from "express";

import userRoutes from "./user";
import artworkRoutes from "./artwork";
import roomRoutes from "./room";

export default (app: Application): void => {
  userRoutes(app);
  artworkRoutes(app);
  // roomRoutes(app);
};
