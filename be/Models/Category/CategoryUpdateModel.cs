namespace be.Models;

public class CategoryUpdateModel
{
    public required string CategoryId { get; set; }
    public required string NameCategory { get; set; }
    public required string Slug { get; set; }
    public bool Status { get; set; } 
}