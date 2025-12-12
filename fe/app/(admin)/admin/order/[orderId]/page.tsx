import OrderDetailAdmin from "@/components/order/order-detail-admin";
import { getOrderById, getOrderStatus } from "@/service/admin/order-service";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const orderId = (await params).orderId;

  const data = await Promise.all([getOrderById(orderId), getOrderStatus()]);
  if (data[0] == undefined) {
    return notFound();
  }
  const orderStatus = data[1];
  const order = data[0].order;
  const items = data[0].orderDetails;

  return (
    <>
      <OrderDetailAdmin items={items} orderStatus={orderStatus} order={order} />
    </>
  );
}
