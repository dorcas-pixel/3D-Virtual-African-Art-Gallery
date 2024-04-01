"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Model"));
class User extends Model_1.default {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            authType: { type: String, default: "local" },
            fullname: { type: String },
            username: { type: String },
            email: { type: String, required: true },
            picture: { type: String, default: "blank.jpg" },
            credit: { type: Number, default: 0 },
            password: { type: String },
        });
        super(mongoose, "User", QueryBuilder, schema);
    }
    getByUsernameOrEmail(identifier) {
        return this.model.findOneWithOr({
            condition: [{ email: identifier }, { username: identifier }],
        });
    }
    getById(id) {
        return this.model.findOne({
            condition: { _id: id }
        });
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map