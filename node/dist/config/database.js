"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_ID_LEN = void 0;
const mongoose_1 = require("mongoose");
exports.default = async () => {
    await (0, mongoose_1.connect)(decodeURIComponent(process.env.NODE_ENV == "development"
        ? process.env.DATABASE_URL
        : process.env.CLOUD_DATABASE_URL));
};
exports.MONGO_ID_LEN = 24;
//# sourceMappingURL=database.js.map