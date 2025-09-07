using be.Entity;

namespace be.Models;

public class OrderGetModel
{

    public string OrderId { get; set; } = Guid.NewGuid().ToString();


    public long OrderTime { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Pending;



    public static OrderGetModel ConvertEntity(OrderEntity orderEntity)
    {
        return new OrderGetModel
        {
            OrderId = orderEntity.OrderId,

            OrderTime = orderEntity.OrderTime,

            Status = orderEntity.Status
        };
    }
}