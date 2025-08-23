using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;


public class ProductDetailModel
{
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public required string Description { get; set; }

    public required string ProductClassification { get; set; }

    public required long MainPrice { get; set; }

    [StringLength(30, ErrorMessage = "quá dài")]
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;
    public required int Measure { get; set; }
    public required int Value { get; set; }

    public ICollection<ProductVariantEntity>? ProductVariantEntities { get; set; }

    public ICollection<ImageEntity>? ImageEntities { get; set; }


    static public ProductDetailModel ConvertEntityToModel(ProductEntity productEntity)
    {
        var productModel = new ProductDetailModel
        {
            Description = productEntity.Description,
            ImageEntities = productEntity.ImageEntities,
            MainPrice = productEntity.MainPrice,
            Measure = productEntity.Measure,
            NameProduct = productEntity.NameProduct,
            ProductId = productEntity.ProductId,
            Quality = productEntity.Quality,
            Value = productEntity.Value,
            ProductClassification = productEntity.ProductClassification,
            ProductVariantEntities = productEntity.ProductVariantEntities
        };
        return productModel;
    }

}