using be.Entity;

namespace be.Models;

public class InventoryAdminModel
{

    public required string ProductVariantId { get; set; }
    public required string BrandName { get; set; }
    public required bool Show { get; set; }
    public required string ProductVariantName { get; set; }
    public required long Price { get; set; }
    public required long ImportPrice { get; set; } = 0;
    public required string Image { get; set; }
    public long Quality { get; set; } = 0;
    public int Weight { get; set; }

    public static InventoryAdminModel ConvertModelToEntity(ProductVariantEntity item)
    {

#pragma warning disable CS8601 // Possible null reference assignment.
        var inventory = new InventoryAdminModel
        {
            ImportPrice = item.ImportPrice,
            Show = item.ProductEntity != null,
            ProductVariantName = item.ProductVariantName,
            Image = item.Image,
            Price = item.Price,
            BrandName = item.BrandEntity?.BrandName,
            Quality = item.Quality,
            Weight = item.Weight,
            ProductVariantId = item.ProductVariantId
        };
#pragma warning restore CS8601 // Possible null reference assignment.
        return inventory;
    }
}