using be.Entity;

namespace be.Models;

public class InventorySearchAdminModel
{

    public required string ProductVariantId { get; set; }

    public required string ProductVariantName { get; set; }
    public required string ImagePath { get; set; }



    public static InventorySearchAdminModel ConvertModelToEntity(ProductVariantEntity item)
    {

        var inventory = new InventorySearchAdminModel
        {
            ProductVariantName = item.ProductVariantName,
            ImagePath = item.ImageEntity?.ImagePath ?? "",
            ProductVariantId = item.ProductVariantId
        };
        return inventory;
    }
}