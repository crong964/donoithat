using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;

public class ProductModel
{
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public required string Description { get; set; }


    public required long MainPrice { get; set; }

   
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;




    public required ICollection<ImageEntity>? ImageFiles { get; set; }


    static public ProductModel Converter(ProductEntity productEntity)
    {
        var productModel = new ProductModel
        {
            Description = productEntity.Description,
            ImageFiles = productEntity.ImageEntities,
            MainPrice = productEntity.MainPrice,

            NameProduct = productEntity.NameProduct,
            ProductId = productEntity.ProductId,
            Quality = productEntity.Quality,

        };
        return productModel;
    }
}