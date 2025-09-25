namespace be.Models;

public class CategoryAddModel
{

    public int Index { get; set; }
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }
    public string? CategoryParentId { get; set; }
    public string? CategoryImage { get; set; }

    public ICollection<CategoryModel2>? CategoryChidlren { get; set; }
}

public class CategoryModel2

{
    public required string Slug { get; set; }
    public required string NameCategory { get; set; }
}