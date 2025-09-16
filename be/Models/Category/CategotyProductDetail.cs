using be.Entity;

namespace be.Models;

public class CategotyProductDetail
{
    public required string Slug { get; set; }

    public required string NameCategory { get; set; }


    public static CategotyProductDetail? ConvertEntityToModel(CategoryEntity? categoryEntity)
    {
        if (categoryEntity == null)
        {
            return null;
        }
        return new CategotyProductDetail
        {
            NameCategory = categoryEntity.NameCategory,
            Slug = categoryEntity.Slug
        };
    }
}