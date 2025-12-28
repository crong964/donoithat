import { getOrders } from "@/service/admin/order-service";
import dateFormat from "@/util/date";
import Link from "next/link";
import { Fragment } from "react";
const IndexAdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: number | undefined }>;
}) => {
  let s = (await searchParams).type;
  let orders = await getOrders(s);

  return (
    <Fragment>
      <div className="overflow-x-auto mt-3.75">
        <table className="table-auto w-max lg:w-full">
          <thead>
            <tr>
              <th className="pl-3 pb-2">Mã số đơn hàng</th>
              <th className="pl-3 pb-2">Tên khác hàng</th>
              <th className="pl-3 pb-2">Địa chỉ nhận</th>
              <th className="pl-3 pb-2 w-30">Ngày đặt</th>
              <th className="pl-3 pb-2">Trạng thái vận chuyên</th>
              <th className="pl-3 pb-2">Trạng thái thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((v) => {
              return (
                <tr>
                  <td className="pl-3 pb-2 text-center">
                    <Link
                      className="hover:text-red-400"
                      href={`/admin/order/${v.orderId}` as any}
                    >
                      {v.orderId}
                    </Link>
                  </td>
                  <td className="pl-3 pb-2 text-center">{v.userName}</td>
                  <td className="pl-3 pb-2 text-center">{v.address}</td>
                  <td className="text-center pl-3 pb-2 w-max">
                    {dateFormat(v.orderTime)}
                  </td>
                  <td className="text-center pl-3 pb-2">{v.status}</td>
                  <td className="text-center pl-3 pb-2">{v.pay}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default IndexAdminPage;
