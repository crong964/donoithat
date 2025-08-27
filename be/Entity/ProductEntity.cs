using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace be.Entity;

public class ProductEntity
{

    [Key]
    public string ProductId { get; set; } = Guid.NewGuid().ToString();
    public required string Description { get; set; }

    public required string ProductClassification { get; set; }

    public required long MainPrice { get; set; }

    
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;
    public ICollection<ProductVariantEntity>? ProductVariantEntities { get; set; }


    public required CategoryEntity? CategoryEntity { get; set; }
    public ICollection<ImageEntity>? ImageEntities { get; set; }

}