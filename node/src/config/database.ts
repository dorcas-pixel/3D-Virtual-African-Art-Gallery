import { connect } from "mongoose";

import RoomServices from "../services/Room";

export default async () => {
  await connect(
    decodeURIComponent(
      process.env.NODE_ENV == "development"
        ? process.env.DATABASE_URL
        : process.env.CLOUD_DATABASE_URL
    )
  );
};

export const MONGO_ID_LEN = 24;
