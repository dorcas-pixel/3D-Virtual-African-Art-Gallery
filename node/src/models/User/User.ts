import Model from "../Model";

import { Types } from "mongoose";

export default class User extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      authType: { type: String, default: "local" },
      fullname: { type: String },
      username: { type: String },
      email: { type: String, required: true },
      picture: { type: String, default: "blank.jpg" },
      password: { type: String },
    });

    super(mongoose, "User", QueryBuilder, schema);
  }

  getByUsernameOrEmail(identifier: string) {
    return this.model.findOneWithOr({
      condition: [{ email: identifier }, { username: identifier }],
    });
  }
}
