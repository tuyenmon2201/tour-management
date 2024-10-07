import Tour from "../../models/tour.model";
import { Request, Response } from "express";
import { QueryTypes } from 'sequelize';
import sequelize from "../../config/database";

export const index = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;

    // console.log(slugCategory);

    const tours = await sequelize.query(`
        SELECT tours.*, ROUND(price * (1 - discount/100)) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = '${slugCategory}'
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active';
    `, {
        type: QueryTypes.SELECT,
    });

    for (const item of tours) {
        if(item["images"]){
            const arrayImage = JSON.parse(item["images"]);
            if(arrayImage.length > 0){
                item["image"] = arrayImage[0];
            }
        }

        item["price_special"] = parseInt(item["price_special"]);
    }

    res.render("client/pages/tours/index", {
        pageTitle: "Trang danh sách tour",
        tours: tours
    });
}

export const detail = async (req: Request, res: Response) => {

    const slugTour = req.params.slugTour;

    // console.log(slugTour);

    const tour = await Tour.findOne({
        where: {
            slug: slugTour,
            deleted: false,
            status: "active"
        },
        raw: true
    });

    if(tour["images"]){
        tour["images"] = JSON.parse(tour["images"]);
    }

    tour["price_special"] = tour["price"] * (1 - tour["discount"]/100);
    tour["price_special"] = parseInt(tour["price_special"]);
    
    res.render("client/pages/tours/detail", {
        pageTitle: "Chi tiết tour",
        tour: tour
    });
}