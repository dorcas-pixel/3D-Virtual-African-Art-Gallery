"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    _schema;
    model;
    constructor(mongoose, name, QueryBuilder, schema) {
        this._schema = schema;
        this._createModel(mongoose.model, name, QueryBuilder);
    }
    _createModel = (createModel, modelName, QueryBuilder) => (this.model = new QueryBuilder(createModel(modelName, this._schema)));
    add = (data) => this.model.add(data);
    exists = (condition) => this.model.exists(condition);
    delete = (_id) => this.model.updateOne({ _id }, { isDeleted: true });
    updateDetails = (_id, details) => this.model.updateOne({ _id }, details);
}
exports.default = Model;
//# sourceMappingURL=Model.js.map