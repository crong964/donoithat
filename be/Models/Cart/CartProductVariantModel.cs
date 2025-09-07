using be.Entity;

namespace be.Models;

public class CartProductVariantModel
{

    public required string ProductVariantId { get; set; }
    public required string ProductId { get; set; }
    public required string ProductVariantName { get; set; }
    public required string VariantName { get; set; }
    public required long Price { get; set; }
    public required string Image { get; set; }
    public required long Quality { get; set; }


    public static CartProductVariantModel ConvertModelToEntity(
        ProductVariantEntity item, long Quality)
    {
        var cartProductVariantModel = new CartProductVariantModel
        {
            Image = item.Image,
            Price = item.Price,
            Quality = Quality,
            ProductVariantName = item.ProductVariantName,
            VariantName = item.VariantName,
            ProductVariantId = item.ProductVariantId,
            ProductId = item.ProductEntity.Slug
        };
        return cartProductVariantModel;
    }
}