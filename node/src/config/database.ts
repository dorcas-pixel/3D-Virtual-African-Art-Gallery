import { connect } from "mongoose";

export default async () => {
  await connect(
    decodeURIComponent(
      process.env.DATABASE_URL
    )
  );
};

export const MONGO_ID_LEN = 24;
