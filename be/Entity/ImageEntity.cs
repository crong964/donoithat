using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public class ImageEntity
{
    [Key]
    public required string ImageFiles { get; set; }

    public required ProductEntity ProductEntity { get; set; }
}