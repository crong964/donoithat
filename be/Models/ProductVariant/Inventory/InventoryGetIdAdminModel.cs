using be.Entity;

namespace be.Models;

public class InventoryGetIdAdminModel
{
    public required string ProductVariantId { get; set; }
    public required string ProductVariantName { get; set; }
    public required long Price { get; set; }
    public required long ImportPrice { get; set; }
    public required string Image { get; set; }
    public long Quality { get; set; }
    public int Weight { get; set; }
    public required string BrandId { get; set; }

    public static InventoryGetIdAdminModel Convert(ProductVariantEntity variantEntity)
    {
        return new InventoryGetIdAdminModel
        {
            Image = variantEntity.ImageEntity?.ImagePath ?? "",
            ImportPrice = variantEntity.ImportPrice,
            Price = variantEntity.Price,
            ProductVariantId = variantEntity.ProductVariantId,
            ProductVariantName = variantEntity.ProductVariantName,
            Quality = variantEntity.Quality,
            BrandId = variantEntity.BrandEntity?.BrandId ?? "",
            Weight = variantEntity.Weight
        };
    }

}