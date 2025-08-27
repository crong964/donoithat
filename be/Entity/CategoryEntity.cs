using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be.Entity;

public class CategoryEntity
{
    [Key]
    public string CategoryId { get; set; } = Guid.NewGuid().ToString();

    public int Index { get; set; }

    [Length(maximumLength: 20, minimumLength: 1)]
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }
    public CategoryEntity? CategoryParent { get; set; }

    public ICollection<CategoryEntity>? CategoryChidlren { get; set; }
}