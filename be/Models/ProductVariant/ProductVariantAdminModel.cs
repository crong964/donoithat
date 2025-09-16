using be.Entity;

namespace be.Models;

public class ProductVariantAdminModel
{

    public string ProductVariantId { get; set; } = Guid.NewGuid().ToString();
    public required string VariantId { get; set; }
    public required string VariantName { get; set; }
    public required long Price { get; set; }
    public required long ImportPrice { get; set; }
    public required string Image { get; set; }
    public required int Position { get; set; }
    public required long Quality { get; set; } = 0;
    public required int Weight { get; set; }

    public static ProductVariantAdminModel ConvertModelToEntity(ProductVariantEntity item)
    {
        var productVariantModel = new ProductVariantAdminModel
        {
            Image = item.Image,
            Price = item.Price,
            Quality = item.Quality,
            VariantId = item.VariantId,
            VariantName = item.VariantName,
            Position = item.Position,
            Weight = item.Weight,
            ProductVariantId = item.ProductVariantId,
            ImportPrice = item.ImportPrice
        };
        return productVariantModel;
    }


}