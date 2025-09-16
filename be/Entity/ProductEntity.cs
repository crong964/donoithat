using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace be.Entity;


[Index("Slug", IsUnique = true)]
public class ProductEntity
{

    [Key]
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public required string Slug { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
    public required string ProductClassification { get; set; }
    public required string Suplier { get; set; }
    public required long MainPrice { get; set; }
    public int Status { get; set; } = 1;
    public required string NameProduct { get; set; }
    public required long Quality { get; set; } = 0;
    public ICollection<ProductVariantEntity>? ProductVariantEntities { get; set; }
    public required CategoryEntity? CategoryEntity { get; set; }
    public ICollection<ImageEntity> ImageEntities { get; set; } = [];

}