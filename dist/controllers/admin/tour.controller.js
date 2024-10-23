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
exports.createPost = exports.create = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const tour_category_model_1 = __importDefault(require("../../models/tour-category.model"));
const system_1 = require("../../config/system");
const generate_helper_1 = require("../../helpers/generate.helper");
const slugify_1 = __importDefault(require("slugify"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = yield tour_model_1.default.findAll({
        where: {
            deleted: false,
        },
        raw: true
    });
    tours.forEach(item => {
        if (item["images"]) {
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    });
    res.render("admin/pages/tours/index", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false,
            status: 'active',
        },
        raw: true
    });
    res.render("admin/pages/tours/create", {
        pageTitle: "Thêm mới tour",
        categories: categories
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const countTour = yield tour_model_1.default.count();
        req.body.position = countTour + 1;
    }
    const slug = (0, slugify_1.default)(`${req.body.title}-${Date.now()}`, {
        lower: true
    });
    const dataTour = {
        title: req.body.title,
        code: "",
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        images: JSON.stringify(req.body.images),
        information: req.body.information,
        schedule: req.body.schedule
    };
    const tour = yield tour_model_1.default.create(dataTour);
    const tourId = tour.dataValues.id;
    const code = (0, generate_helper_1.generateTourCode)(tourId);
    yield tour_model_1.default.update({
        code: code
    }, {
        where: {
            id: tourId
        }
    });
    const dataTourCategory = {
        tour_id: tourId,
        category_id: parseInt(req.body.category_id)
    };
    yield tour_category_model_1.default.create(dataTourCategory);
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/tours`);
});
exports.createPost = createPost;
