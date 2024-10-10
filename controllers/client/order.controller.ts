import { Request, Response } from "express";

// [GET] /cart/
export const index = async (req: Request, res: Response) => {
    res.json({
        code: 200,
        message: "Đặt hàng thành công"
    })
};
