import { Types } from "mongoose";
import Model from "../Model";

const ROOM_LIMIT = 11;

export default class Frame extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
      rotation: { type: Number },
      hasPortrait: { type: Boolean, default: false },
      portrait: { type: Types.ObjectId, ref: "artwork" },
      room: { type: Types.ObjectId, ref: "room" },
    });

    super(mongoose, "frame", QueryBuilder, schema);
  }

  getByRoom = (room: Types.ObjectId | string) =>
    this.model.find({
      condition: { room },
      populate: [["portrait"]],
    });
}
