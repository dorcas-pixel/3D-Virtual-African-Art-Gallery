import Model from "../Model";

export default class Room extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      name: { type: String },
      uniqueId: { type: String },
      portraitCount: { type: Number, default: 1 },
      modelCount: { type: Number, default: 1 },
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
}
