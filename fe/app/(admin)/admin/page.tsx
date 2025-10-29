import CategoryCombobox from "@/components/admin/category/category-combo-box";
import CardHome from "@/components/admin/home/card-home";
import OrderLink from "@/components/admin/home/order-link";
import ProductSaleChart from "@/components/chart/product-sale-chart";
import { getHomeAdmin } from "@/service/admin/home-service";
import { Fragment } from "react";

export default async function Admin() {
    let stat = await getHomeAdmin()
    if (stat == undefined) {
        return <><ProductSaleChart /></>
    }
    return (
        <Fragment>
            <div className="grid grid-cols-2 lg:grid-cols-4">
                <CardHome
                    count={stat.totalOrder}
                    des="Tổng đơn đặt hàng có trong của hàng"
                    title="Tổng đơn hàng" />
                <CardHome
                    count={stat.totalProduct}
                    des="Tổng sản phẩm có trong của hàng"
                    title="Tổng sản phẩm" />
                <CardHome
                    count={stat.totalOrder}
                    des="Tổng người dùng có trong của hàng"
                    title="Tổng người dùng" />
            </div>
            <ProductSaleChart />
        </Fragment>
    )
}