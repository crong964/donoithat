using be.Entity;

namespace be.Models;

public class CategoryBackupAdmin
{
    public required string CategoryId { get; set; }
    public string? CategoryImage { get; set; }
    public required string Slug { get; set; }
    public int Index { get; set; }
    public required string NameCategory { get; set; }
    public bool Status { get; set; } = true;
    public required string CategoryParentId { get; set; }
    public static CategoryBackupAdmin Convert(CategoryEntity categoryEntity)
    {
        return new CategoryBackupAdmin
        {
            CategoryId = categoryEntity.CategoryId,
            NameCategory = categoryEntity.NameCategory,
            Slug = categoryEntity.Slug,
            CategoryImage = categoryEntity.CategoryImage ?? "",
            Index = categoryEntity.Index,
            Status = categoryEntity.Status,
            CategoryParentId = categoryEntity.CategoryParent?.CategoryId ?? ""
        };
    }
}