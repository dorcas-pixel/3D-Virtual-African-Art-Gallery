"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Frame_1 = __importDefault(require("../../services/Frame"));
exports.default = (app) => {
    app.post("/frames/get/by/room", base_1.default.wrap(Frame_1.default.getFramesByRoom));
    app.post("/frames/update/portrait", base_1.default.wrap(Frame_1.default.setFramePortrait));
};
//# sourceMappingURL=frame.js.map