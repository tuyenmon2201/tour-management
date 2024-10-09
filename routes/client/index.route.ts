import { cartRoute } from "./cart.route";
import { categoryRoute } from "./category.route";
import { tourRoute } from "./tour.route";
import { Express } from "express";

export const routesClient = (app: Express) => {

    app.use("/tours", tourRoute);

    app.use("/categories", categoryRoute);

    app.use("/cart", cartRoute);

}