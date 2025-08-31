using be.Entity;

namespace be.Models;

public class OrderGetModel
{

    public string OrderId { get; set; } = Guid.NewGuid().ToString();

    public required string ProductVariantImage { get; set; }
    public required string ProductName { get; set; }
    public required string ProductVariantName { get; set; }
    public long ProductVariantPrice { get; set; }
    public long OrderTime { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public required int Quality { get; set; }



    public static OrderGetModel ConvertEntity(OrderEntity orderEntity)
    {
        return new OrderGetModel
        {
            OrderId = orderEntity.OrderId,
            Quality = orderEntity.Quality,
            ProductName=orderEntity.ProductVariantEntity.ProductVariantName,
            OrderTime = orderEntity.OrderTime,
            ProductVariantImage = orderEntity.ProductVariantEntity.Image,
            ProductVariantName = orderEntity.ProductVariantEntity.VariantName,
            ProductVariantPrice = orderEntity.ProductVariantEntity.Price,
            Status = orderEntity.Status
        };
    }
}