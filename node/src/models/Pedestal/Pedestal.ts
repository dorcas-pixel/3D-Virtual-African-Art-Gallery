import { Types } from "mongoose";
import Model from "../Model";

const ROOM_LIMIT = 4;

export default class Pedestal extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
      hasModel: { type: Boolean, default: false },
      model: { type: Types.ObjectId, ref: "artwork" },
      room: { type: Types.ObjectId, ref: "room" },
    });

    super(mongoose, "pedestal", QueryBuilder, schema);
  }

  getByRoom = (room: Types.ObjectId | string) =>
    this.model.find({
      condition: { room },
      populate: [["model"]],
    });
}
