namespace be.Models;

public class CategoryAddChildrcModel
{
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }

    public required string ParentId { get; set; }
}
