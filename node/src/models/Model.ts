import { Types } from "mongoose";

export default class Model {
  private _schema: object;
  protected model;

  constructor(mongoose, name: string, QueryBuilder, schema: object) {
    this._schema = schema;

    this._createModel(mongoose.model, name, QueryBuilder);
  }

  _createModel = (createModel, modelName: string, QueryBuilder) =>
    (this.model = new QueryBuilder(createModel(modelName, this._schema)));

  add = (data: object) => this.model.add(data);

  exists = (condition: object) => this.model.exists(condition);

  delete = (_id: Types.ObjectId | string) =>
    this.model.updateOne({ _id }, { isDeleted: true });

  updateDetails = (_id: Types.ObjectId | string, details) =>
    this.model.updateOne({ _id }, details);
}
