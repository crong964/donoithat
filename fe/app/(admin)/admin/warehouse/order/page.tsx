import InventoryOrderAdmin from "@/components/inventory/inventory-order-admin";
import ProtectAction from "@/components/permission/protect-action";
import { Checkbox } from "@/components/ui/checkbox";
import { getInventoryOrderAdmin } from "@/service/admin/inventory-order-service";

const OrderInvetoryPage = async () => {
  const inventoryOrders = await getInventoryOrderAdmin();

  return (
    <ProtectAction permission="follower.inventory.view">
      <div className="p-3">
        <h1 className="text-2xl font-bold mt-3 mb-9">Danh sách hàng đã đặt</h1>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <tr>
              <th className="px-5">
                <Checkbox id="terms" className="border-black" />
              </th>
              <th className="w-100">Tên sản phẩm</th>
              <th className="w-60">Tên nhà cung cấp</th>
              <th className="w-60">Điện thoại</th>
              <th className="w-60">Số lượng đã nhận</th>
              <th className="w-30"></th>
            </tr>
            {inventoryOrders.map((inventoryOrder) => {
              return (
                <InventoryOrderAdmin
                  key={inventoryOrder.inventoryId}
                  {...inventoryOrder}
                />
              );
            })}
          </table>
        </div>
      </div>
    </ProtectAction>
  );
};

export default OrderInvetoryPage;
