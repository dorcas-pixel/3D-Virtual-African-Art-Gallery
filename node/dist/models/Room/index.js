"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Query_builder_1 = __importDefault(require("../../helpers/Query-builder"));
const Room_1 = __importDefault(require("./Room"));
exports.default = new Room_1.default(mongoose_1.default, Query_builder_1.default);
//# sourceMappingURL=index.js.map