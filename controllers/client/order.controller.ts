import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate.helper";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

// [GET] /cart/
export const index = async (req: Request, res: Response) => {
    const data = req.body;

    // Lưu data vào bảng orders
    const dataOrders = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial",
    };

    const order = await Order.create(dataOrders);
    const orderId = order.dataValues.id;
    const code = generateOrderCode(orderId);

    await Order.update({
        code: code
    }, {
        where: {
            id: orderId
        }
    });
    // Het Lưu data vào bảng orders

    // Lưu data vào bảng orders_item
    for (const item of data.cart) {
        const dataItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity,
        };

        const tourInfo = await Tour.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: 'active',
            },
            raw: true,
        });

        dataItem["price"] = tourInfo["price"];
        dataItem["discount"] = tourInfo["discount"];
        dataItem["timeStart"] = tourInfo["timeStart"];

        await OrderItem.create(dataItem);
    }
    // Hết Lưu data vào bảng orders_item

    res.json({
        code: 200,
        message: "Đặt hàng thành công",
        orderCode: code
    })
};

export const success = async (req: Request, res: Response) => {
    const orderCode = req.params.orderCode;

    const order = await Order.findOne({
        where: {
          code: orderCode,
          deleted: false,
        },
        raw: true,
    });

    const ordersItem = await OrderItem.findAll({
        where: {
          orderId: order["id"],
        },
        raw: true,
    });

    let total = 0;

    for (const item of ordersItem) {
        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
        item["total"] = item["price_special"] * item["quantity"];
        total += item["total"];

        const tourInfo = await Tour.findOne({
            where: {
                id: item["tourId"],
            },
            raw: true,
        });

        tourInfo["images"] = JSON.parse(tourInfo["images"]);
        item["image"] = tourInfo["images"][0];
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];
    }

    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        ordersItem: ordersItem,
        total: total
    });
};