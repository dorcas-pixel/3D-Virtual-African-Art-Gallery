import { Types } from "mongoose";
import Model from "../Model";

export default class Order extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      buyer: { type: Types.ObjectId, ref: "user" },
      sellers: [{ type: Types.ObjectId, ref: "User" }],
      cost: { type: Number },
      status: { type: String, default: 'pending' },
      transactionId: { type: String },
      artworks: [{ type: Types.ObjectId, ref: 'artwork' }],
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "order", QueryBuilder, schema);
  }

  getBySeller(seller: Types.ObjectId | string) {
    return this.model.find({
      condition: { 'sellers._id': seller },
    });
  }

  getByBuyer(buyer: Types.ObjectId | string) {
    return this.model.find({
      condition: { buyer },
      populate: [['artworks'], ['sellers']]
    });
  }

  updateByTransactionId(transactionId: string, details: any) {
    return this.model.updateOne({ transactionId }, details);
  }
}
