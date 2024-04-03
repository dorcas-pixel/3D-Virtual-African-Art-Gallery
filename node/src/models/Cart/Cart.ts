import Model from "../Model";

import { Types } from "mongoose";

export default class Cart extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      user: { type: Types.ObjectId, ref: "User", required: true },
      artwork: { type: Types.ObjectId, ref: "artwork" }
    });

    super(mongoose, "cart", QueryBuilder, schema);
  }

  getByUser(user: string | Types.ObjectId) {
    return this.model.find({
      condition: { user },
      populate: [["user", ""], ["artwork", ""]],
    });
  }

  removeItem(_id: string | Types.ObjectId) {
    return this.model.deleteOne({
      _id
    });
  }

  removeAllByUser(user: string | Types.ObjectId){
    return this.model.deleteMany({
      user
    })
  }
}
