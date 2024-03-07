import Model from "../Model";

const ROOM_LIMIT = 4;

export default class Room extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      name: { type: String },
      uniqueId: { type: String },
      count: { type: Number, default: 1 },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "room", QueryBuilder, schema);
  }

  getLatestRoom = () =>
    this.model.findOne({
      condition: { count: { $lte: ROOM_LIMIT } },
      sort: { createdAt: -1 },
    });

  getByUniqueId = (uniqueId: string) =>
    this.model.findOne({
      condition: { uniqueId },
    });
}
