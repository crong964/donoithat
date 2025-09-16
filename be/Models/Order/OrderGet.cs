using be.Entity;

namespace be.Models;

public class OrderGetModel
{

    public string OrderId { get; set; } = Guid.NewGuid().ToString();
    public long OrderTime { get; set; }
    public required float Lat { get; set; }
    public required float Lng { get; set; }
    public required string Note { get; set; }
    public required string Address { get; set; }
    public OrderStatus Status { get; set; }
    public PayStatus Pay { get; set; }

    public static OrderGetModel ConvertEntity(OrderEntity orderEntity)
    {
        return new OrderGetModel
        {
            OrderId = orderEntity.OrderId,
            OrderTime = orderEntity.OrderTime,
            Pay = orderEntity.Pay,
            Status = orderEntity.Status,
            Address = orderEntity.Address,
            Lat = orderEntity.Lat,
            Lng = orderEntity.Lng,
            Note = orderEntity.Note
        };
    }
}