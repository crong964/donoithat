using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace be.Entity;

[JsonConverter(typeof(JsonStringEnumConverter<OrderStatus>))]
public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}


[JsonConverter(typeof(JsonStringEnumConverter<PayStatus>))]
public enum PayStatus
{
    No, Yes
}
public class OrderEntity
{
    [Key]
    public string OrderId { get; set; } = Guid.NewGuid().ToString();

    public long OrderTime { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public PayStatus Pay { get; set; } = PayStatus.No;

    public required ProductVariantEntity ProductVariantEntity { get; set; }
    public int Quality { get; set; }

    public required string Address { get; set; }
    public long Price { get; set; }
    public required UserEntity UserEntity { get; set; }

}