using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ProductUpdateModel
{
    public required string ProductId { get; set; }
    public required string Description { get; set; }
    public required string ProductClassification { get; set; }
    public required string Slug { get; set; }
    public required long MainPrice { get; set; }

    public required string Suplier { get; set; }
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;

    public required List<ProductVariantModel> ProductVariants { get; set; }

    public required string TypeProduct { get; set; }


    [Required(ErrorMessage = "Tên sản phẩm bắt buộc phải nhập")]
    public required List<string> ImageFiles { get; set; }




}