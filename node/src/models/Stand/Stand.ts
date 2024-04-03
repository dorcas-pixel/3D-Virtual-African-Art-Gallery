import { Types } from "mongoose";
import Model from "../Model";

export default class Stand extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
      },
      modelScale: { type: Number },
      modelPosition: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number }
      },
      hasModel: { type: Boolean, default: false },
      model: { type: Types.ObjectId, ref: "artwork" },
      room: { type: Types.ObjectId, ref: "room" },
    });

    super(mongoose, "stand", QueryBuilder, schema);
  }

  getByRoom = (room: Types.ObjectId | string) =>
    this.model.find({
      condition: { room },
      populate: [["model"]],
    });

  getById = (_id: Types.ObjectId | string) => this.model.findOne({
    condition: { _id },
  });
}
