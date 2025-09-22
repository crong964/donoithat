using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;

public class ProductModel

{
    public string Slug { get; set; } = Guid.NewGuid().ToString();
    public required string Suplier { get; set; }
    public required long MainPrice { get; set; }
    public required string NameProduct { get; set; }
    public required long Quality { get; set; } = 0;
    public required string ImageUrl { get; set; }
    public required ICollection<string> ImageUrls { get; set; }
    static public ProductModel Converter(ProductEntity productEntity)
    {
        var productModel = new ProductModel
        {
            Suplier = productEntity.Suplier,
            ImageUrl = productEntity.ImageUrl,
            MainPrice = productEntity.MainPrice,
            NameProduct = productEntity.NameProduct,
            Slug = productEntity.Slug,
            Quality = productEntity.Quality,
            ImageUrls = [.. productEntity.ImageEntities.Select(x => x.ImagePath).Take(2)]
        };
        return productModel;
    }
}

public class ProductListModel
{
    public required IEnumerable<ProductModel> ProductModels { get; set; }
    public int TotalPage { get; set; }
    public int Page { get; set; }
    public int TotalItem { get; set; }
    public required string NameCate { get; set; }
}