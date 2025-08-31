using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;

public class ProductModel

{
    public string ProductId { get; set; } = Guid.NewGuid().ToString();

    public required long MainPrice { get; set; }
    public required string NameProduct { get; set; }
    public required long Quality { get; set; } = 0;
    public required string ImageUrl { get; set; }
    static public ProductModel Converter(ProductEntity productEntity)
    {
        var productModel = new ProductModel
        {
            ImageUrl = productEntity.ImageUrl,
            MainPrice = productEntity.MainPrice,
            NameProduct = productEntity.NameProduct,
            ProductId = productEntity.ProductId,
            Quality = productEntity.Quality,

        };
        return productModel;
    }
}

public class ProductListModel
{
    public required IEnumerable<ProductModel> ProductModels { get; set; }
    public int TotalPage { get; set; }
    public int Page { get; set; }
}