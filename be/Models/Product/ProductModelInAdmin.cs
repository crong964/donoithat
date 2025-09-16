using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;

public class ProductModelInAdmin

{
    public string Slug { get; set; } = Guid.NewGuid().ToString();
    public required string Suplier { get; set; }
    public required long MainPrice { get; set; }
    public required string NameProduct { get; set; }
    public required long Quality { get; set; } = 0;
    public required string ImageUrl { get; set; }
    public int Status { get; set; }
    public required string CategoryName { get; set; }
    public required string CategorySlug { get; set; }
    public required ICollection<string> ImageUrls { get; set; }
    public required ICollection<ProductVariantAdminModel> Variants { get; set; }
    static public ProductModelInAdmin Converter(ProductEntity productEntity)
    {
        var productModel = new ProductModelInAdmin
        {
            Suplier = productEntity.Suplier,
            ImageUrl = productEntity.ImageUrl,
            MainPrice = productEntity.MainPrice,
            NameProduct = productEntity.NameProduct,
            Slug = productEntity.Slug,
            Quality = productEntity.Quality,
            ImageUrls = [.. productEntity.ImageEntities.Select(x => x.ImageFiles).Take(2)],
            CategoryName = productEntity.CategoryEntity != null ? productEntity.CategoryEntity.NameCategory : "",
            Status = productEntity.Status,
            CategorySlug = productEntity.CategoryEntity != null ? productEntity.CategoryEntity.Slug : "",
            Variants = productEntity.ProductVariantEntities != null ? productEntity.ProductVariantEntities.Select(x => ProductVariantAdminModel.ConvertModelToEntity(x)).ToArray() : []
        };
        return productModel;
    }
}

public class ProductListModelInAmin
{
    public required IEnumerable<ProductModelInAdmin> ProductModels { get; set; }
    public int TotalPage { get; set; }
    public int Page { get; set; }
    public int TotalItem { get; set; }
    public required string NameCate { get; set; }
}