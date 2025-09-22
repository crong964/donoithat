using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be.Entity;

public class ImageEntity
{
    [Key]
    public required string ImageFiles { get; set; }

     public required string ImagePath { get; set; }

     public List<ProductEntity> ProductEntities { get; } = [];
}