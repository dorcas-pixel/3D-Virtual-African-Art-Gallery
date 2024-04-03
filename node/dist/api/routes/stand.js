"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Stand_1 = __importDefault(require("../../services/Stand"));
exports.default = (app) => {
    app.post("/stands/get/by/room", base_1.default.wrap(Stand_1.default.getStandsByRoom));
    app.post("/stands/update/model", base_1.default.wrap(Stand_1.default.setStandModel));
    app.post("/stands/update/model/position", base_1.default.wrap(Stand_1.default.adjustModelPosition));
    app.post("/stands/update/model/scale", base_1.default.wrap(Stand_1.default.adjustModelScale));
};
//# sourceMappingURL=stand.js.map