using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class CategoryAddModel
{

    public int Index { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập tên")]
    [StringLength(50, ErrorMessage = "Tên không được dài quá 50 ký tự")]
    public string? NameCategory { get; set; }

    [Required(ErrorMessage = "Vui lòng slug")]
    [StringLength(50, ErrorMessage = "Tên không được dài quá 50 ký tự")]
    public string? Slug { get; set; }

    
    public string? CategoryParentId { get; set; }
    public string? CategoryImage { get; set; }

    public ICollection<CategoryModel2>? CategoryChidlren { get; set; }
}

public class CategoryModel2

{
    public required string Slug { get; set; }
    public required string NameCategory { get; set; }
}