using System.ComponentModel.DataAnnotations;

namespace be.Entity;


public class BrandEntity
{
    [Key]
    public string BrandId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
    public required string BrandName { get; set; }
    public ICollection<ProductVariantEntity>? ProductVariantEntities { get; } = [];
}