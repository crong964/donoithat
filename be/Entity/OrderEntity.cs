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
    public required float Lat { get; set; }
    public required float Lng { get; set; }
    public required string Note { get; set; }
    public required string Address { get; set; }
    public required UserEntity UserEntity { get; set; }
    public List<ProductVariantEntity> ProductVariantEntities { get; } = [];
}