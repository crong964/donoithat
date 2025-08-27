using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}
public class OrderEntity
{
    [Key]
    public required string OrderId { get; set; } = Guid.NewGuid().ToString();
    public required UserEntity userEntity;
    public required ProductVariantEntity productVariantEntity;


    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public required int Quality { get; set; }
}