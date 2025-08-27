using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;


public class ProductDetailModel
{
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public required string Description { get; set; }

    public required string ProductClassification { get; set; }

    public required long MainPrice { get; set; }

   
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;

    public ICollection<ProductVariantModel>? ProductVariantModels { get; set; }

    public ICollection<ImageEntity>? ImageEntities { get; set; }


    static public ProductDetailModel ConvertEntityToModel(ProductEntity productEntity)
    {
        var productModel = new ProductDetailModel
        {
            Description = productEntity.Description,
            ImageEntities = productEntity.ImageEntities,
            MainPrice = productEntity.MainPrice,

            NameProduct = productEntity.NameProduct,
            ProductId = productEntity.ProductId,
            Quality = productEntity.Quality,

            ProductClassification = productEntity.ProductClassification,
            ProductVariantModels = productEntity.ProductVariantEntities?.Select(ProductVariantModel.ConvertModelToEntity).ToArray()
        };
        return productModel;
    }

}