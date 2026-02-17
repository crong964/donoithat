using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be.Entity;

public class ImageEntity
{
    [Key]
    public string ImageFiles { get; set; } = Guid.NewGuid().ToString().Replace("-", "");

    public required string ImagePath { get; set; }

    public ICollection<ProductEntity> ProductEntities { get; } = [];
    public ICollection<PhotoGalleryEntity> PhotoGalleries { get; } = [];
}