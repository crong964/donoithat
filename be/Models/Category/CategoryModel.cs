namespace be.Models;

public class CategoryModel
{
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }
    public string? CategoryId { get; set; }
    public string? CategoryImage { get; set; }
    public ICollection<CategoryModel>? CategoryChidlren { get; set; }
}
