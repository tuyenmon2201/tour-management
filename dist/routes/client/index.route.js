"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesClient = void 0;
const cart_route_1 = require("./cart.route");
const category_route_1 = require("./category.route");
const order_route_1 = require("./order.route");
const tour_route_1 = require("./tour.route");
const routesClient = (app) => {
    app.use("/tours", tour_route_1.tourRoute);
    app.use("/categories", category_route_1.categoryRoute);
    app.use("/cart", cart_route_1.cartRoute);
    app.use("/order", order_route_1.orderRoute);
};
exports.routesClient = routesClient;
