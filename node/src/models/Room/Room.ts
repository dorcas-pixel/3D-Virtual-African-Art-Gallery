import { Types } from "mongoose";
import Model from "../Model";

export default class Room extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      name: { type: String },
      uniqueId: { type: String },
      artist: { type: Types.ObjectId, ref: "user" },
      portraitCount: { type: Number, default: 1 },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "room", QueryBuilder, schema);
  }

  getLatestRoom = () =>
    this.model.findOne({
      condition: { },
      sort: { createdAt: -1 },
    });

  getByUniqueId = (uniqueId: string) =>
    this.model.findOne({
      condition: { uniqueId },
    });

  getByArtist = (artist: Types.ObjectId | string) =>
    this.model.find({
      condition: { artist }
    });
}
