using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ProductAddModel
{
    public required string Description { get; set; }
    public required string ProductClassification { get; set; }

    public required long MainPrice { get; set; }

    [StringLength(30, ErrorMessage = "quá dài")]
    public required string NameProduct { get; set; }

    public required long Quality { get; set; } = 0;
    public required int Measure { get; set; }
    public required int Value { get; set; }



    public required List<ProductVariantModel> ProductVariants { get; set; }
    public required Guid TypeProduct { get; set; }
    public required List<IFormFile> ImageFiles { get; set; }
}