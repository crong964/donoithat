
import CardHome from "@/components/admin/home/card-home"
import { getHomeAdmin } from "@/service/admin/home-Service"
import { Fragment } from "react"


const IndexAdminPage = async () => {
    let s = await getHomeAdmin()
    if (s == undefined) {
        return <></>
    }
    return (
        <Fragment>
            <div className="grid grid-cols-4">
                <CardHome
                    count={s.totalOrder}
                    des="Tổng đơn đặt hàng có trong của hàng"
                    title="Tổng đơn hàng" />
                <CardHome
                    count={s.totalProduct}
                    des="Tổng sản phẩm có trong của hàng"
                    title="Tổng sản phẩm" />
                <CardHome
                    count={s.totalOrder}
                    des="Tổng người dùng có trong của hàng"
                    title="Tổng người dùng" />
            </div>

        </Fragment>
    )
}


export default IndexAdminPage

