import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database";
sequelize

import { routesClient } from "./routes/client/index.route";
import { adminRoutes } from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;
routesClient(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});