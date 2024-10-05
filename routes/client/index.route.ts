import { tourRoute } from "./tour.route";
import { Express } from "express";

export const routesClient = (app: Express) => {

    app.use("/tours", tourRoute);

}