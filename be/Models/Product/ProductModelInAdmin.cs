using System.ComponentModel.DataAnnotations;
using be.Entity;

namespace be.Models;

public class ProductModelInAdmin

{
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public string Slug { get; set; } = Guid.NewGuid().ToString();

    public required long MainPrice { get; set; }
    public required string NameProduct { get; set; }
    public required string ProductClassification { get; set; }
    public required long Quality { get; set; } = 0;
    public int Status { get; set; }
    public required string CategoryName { get; set; }
    public required string CategorySlug { get; set; }
    public required string BrandId { get; set; }
    public required string BrandName { get; set; }
    public required ICollection<string> ImageUrls { get; set; }
    public required ICollection<ProductVariantAdminModel> ProductVariants { get; set; }
    static public ProductModelInAdmin Converter(ProductEntity productEntity)
    {
        var productModel = new ProductModelInAdmin
        {
            ProductId = productEntity.ProductId,
            MainPrice = productEntity.MainPrice,
            NameProduct = productEntity.NameProduct,
            Slug = productEntity.Slug,
            Quality = productEntity.Quality,
            ImageUrls = [.. productEntity.ImageEntities.Select(x => x.ImagePath)],
            CategoryName = productEntity.CategoryEntity != null ? productEntity.CategoryEntity.NameCategory : "",
            Status = productEntity.Status,
            CategorySlug = productEntity.CategoryEntity != null ? productEntity.CategoryEntity.Slug : "",
            ProductVariants = productEntity.ProductVariantEntities != null ? productEntity.ProductVariantEntities.Select(x => ProductVariantAdminModel.ConvertModelToEntity(x)).ToArray() : [],
            ProductClassification = productEntity.ProductClassification,
            BrandId = productEntity.BrandEntity?.BrandId ?? "",
            BrandName = productEntity.BrandEntity?.BrandName ?? ""
        };
        return productModel;
    }
}

public class ProductListModelInAmin
{
    public required IEnumerable<ProductModelInAdmin> Products { get; set; }
    public int TotalPage { get; set; }
    public int Page { get; set; }
    public int TotalItem { get; set; }
    public required string NameCate { get; set; }
    public string NameProduct { get; set; } = "";
}