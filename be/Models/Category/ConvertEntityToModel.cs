using be.Entity;

namespace be.Models;

class ConvertEntityToModel
{
    static public CategoryModel Converter(CategoryEntity categoryEntity)
    {

        var ls = new List<CategoryModel>();
        if (categoryEntity.CategoryChidlren != null)
        {
            foreach (var item in categoryEntity.CategoryChidlren)
            {
                ls.Add(new CategoryModel
                {
                    NameCategory = item.NameCategory,
                    Slug = item.Slug,
                    CategoryId = item.CategoryId

                });
            }
        }
        var categoryModel = new CategoryModel
        {
            NameCategory = categoryEntity.NameCategory,
            Slug = categoryEntity.Slug,
            CategoryId = categoryEntity.CategoryId,
            CategoryImage = categoryEntity.CategoryImage,
            CategoryChidlren = ls
        };

        return categoryModel;
    }
}