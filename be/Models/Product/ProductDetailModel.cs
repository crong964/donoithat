using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;


public class ProductDetailModel
{

    public required string Description { get; set; }
    public required string Slug { get; set; }
    public required string ProductClassification { get; set; }
    public required long MainPrice { get; set; }
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;

    public ICollection<ProductVariantModel>? ProductVariantModels { get; set; }
    public CategotyProductDetail? CategotyProductDetail { get; set; }

    public ICollection<string>? ImageEntities { get; set; }


    static public ProductDetailModel ConvertEntityToModel(ProductEntity productEntity)
    {

        var productModel = new ProductDetailModel
        {
            Description = productEntity.Description,
            ImageEntities = productEntity.ImageEntities?.Select(x => x.ImagePath).ToArray(),
            MainPrice = productEntity.MainPrice,
            NameProduct = productEntity.NameProduct,
            Slug = productEntity.Slug,

            Quality = productEntity.Quality,
            ProductClassification = productEntity.ProductClassification,
            ProductVariantModels = productEntity.ProductVariantEntities?.Select(ProductVariantModel.ConvertModelToEntity).ToArray(),
            CategotyProductDetail = CategotyProductDetail.ConvertEntityToModel(productEntity.CategoryEntity)
        };
        return productModel;
    }

}