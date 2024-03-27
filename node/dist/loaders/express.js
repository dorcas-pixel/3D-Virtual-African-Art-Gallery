"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const database_1 = __importDefault(require("../config/database"));
const routes_1 = __importDefault(require("../api/routes"));
exports.default = async (app) => {
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.resolve(`${__dirname}/../../src/views`));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_ejs_layouts_1.default);
    // app.use(cors());
    await (0, database_1.default)();
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../../react/dist')));
    [
        '/',
        '/sign-in',
        '/sign-up',
        '/gallery',
        '/marketplace',
        '/marketplace/:artworkId',
        '/cart',
        '/u/:username'
    ].forEach((url) => {
        app.get(url, function (_, res) {
            res.sendFile(path_1.default.join(__dirname, '../../../react/dist', 'index.html'));
        });
    });
    (0, routes_1.default)(app);
};
//# sourceMappingURL=express.js.map