using be.Entity;

namespace be.Models;


public class OrderDetailModel
{

    public required string ProductVariantId { get; set; }
    public required string VariantId { get; set; }
    public required string VariantName { get; set; }
    public required long Price { get; set; }
    public required string Image { get; set; }
    public required string ProductName { get; set; }
    public required long Quality { get; set; }
    public required int Weight { get; set; }


    public static OrderDetailModel ConvertEntityToModel(OrderDetailEntity orderDetailEntity)
    {
        var item = orderDetailEntity.ProductVariantEntity;
        var l = new OrderDetailModel
        {
            Image = item.Image,
            Price = item.Price,
            Quality = orderDetailEntity.Quality,
            VariantId = item.VariantId,
            VariantName = item.VariantName,
            ProductName = item.ProductVariantName,
            Weight = item.Weight,
            ProductVariantId = item.ProductVariantId
        };
        return l;
    }
}