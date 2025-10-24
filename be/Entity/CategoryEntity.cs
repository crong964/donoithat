using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace be.Entity;


[Index("Slug")]
public class CategoryEntity
{
    [Key]

    public string CategoryId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");

    public string? CategoryImage { get; set; }
    public required string Slug { get; set; }
    public int Index { get; set; }


    public required string NameCategory { get; set; }

    public bool Status { get; set; } = true;
    public CategoryEntity? CategoryParent { get; set; }

    public ICollection<CategoryEntity>? CategoryChidlren { get; set; }
}