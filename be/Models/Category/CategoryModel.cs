namespace be.Models;

public class CategoryModel
{
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }
    public Guid CategoryId { get; set; }
    public ICollection<CategoryModel>? CategoryChidlren { get; set; }
}
