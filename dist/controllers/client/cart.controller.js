"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listJson = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng"
    });
});
exports.index = index;
const listJson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = req.body;
    let total = 0;
    for (const tour of tours) {
        const infoTour = yield tour_model_1.default.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: "active"
            },
            raw: true
        });
        tour["image"] = "";
        if (infoTour["images"]) {
            infoTour["images"] = JSON.parse(infoTour["images"]);
            tour["image"] = infoTour["images"][0];
        }
        tour["title"] = infoTour["title"];
        tour["slug"] = infoTour["slug"];
        tour["price"] = infoTour["price"];
        if (infoTour["discount"] > 0) {
            tour["price"] = (1 - infoTour["discount"] / 100) * infoTour["price"];
        }
        tour["total"] = tour["price"] * tour["quantity"];
        total += tour["total"];
    }
    res.json({
        tours: tours,
        total: total
    });
});
exports.listJson = listJson;
