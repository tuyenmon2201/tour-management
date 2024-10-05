import Tour from "../../models/tour.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
    // SELECT * FROM tours WHERE deleted = false AND status = "active";

    const tours = await Tour.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true
    });

    res.render("client/pages/tours/index", {
        pageTitle: "Trang danh sách tour",
        tours: tours
    });
}