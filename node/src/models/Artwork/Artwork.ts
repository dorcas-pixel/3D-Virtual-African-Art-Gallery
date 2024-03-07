import Model from "../Model";

import { Types } from "mongoose";

export default class Artwork extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      name: { type: String },
      user: { type: Types.ObjectId, ref: "User", required: true },
      room: { type: Types.ObjectId, ref: "Room" },
      image: { type: String },
      kind: { type: String },
      description: { type: String },
      model: {
        type: { type: String },
        file: { type: String },
        folder: { type: String },
        scale: { type: Number },
      },
      hasImage: { type: Boolean, default: false },
      hasModel: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
    });

    super(mongoose, "artwork", QueryBuilder, schema);
  }

  getNotReadyByUser = (user: Types.ObjectId | string, kind: string) =>
    this.model.findOne({
      condition: { user, kind, isDeleted: false, isReady: false },
    });

  getAllReady = () =>
    this.model.find({
      condition: { isDeleted: false, isReady: true },
      populate: [["user", "-password"]],
    });

  getAllReadyByKind = (kind: string) =>
    this.model.find({
      condition: { kind, isDeleted: false, isReady: true },
      populate: [["user", "-password"]],
    });

  getAllReadyByUser = (user: Types.ObjectId | string) =>
    this.model.find({
      condition: { user, isDeleted: false, isReady: true },
      populate: [["user", "-password"]],
    });

  getAllReadyByUserAndKind = (user: Types.ObjectId | string, kind: string) =>
    this.model.find({
      condition: { user, kind, isDeleted: false, isReady: true },
      populate: [["user", "-password"]],
    });

  getByRoomAndType = (room: Types.ObjectId | string, kind: string) =>
    this.model.find({
      condition: { room, kind, isDeleted: false, isReady: true },
    });

  getById = (_id: Types.ObjectId | string, select: string = "") =>
    this.model.findOne({
      condition: { _id, isDeleted: false, isReady: true },
      select,
    });

  getFeatured = () =>
    this.model.find({
      condition: {},
      limit: 8,
    });
}
