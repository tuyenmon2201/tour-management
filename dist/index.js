"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
database_1.default;
const index_route_1 = require("./routes/client/index.route");
const index_route_2 = require("./routes/admin/index.route");
const system_1 = require("./config/system");
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.routesClient)(app);
(0, index_route_2.adminRoutes)(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
