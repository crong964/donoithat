namespace be.Models;

public class ProductVariantModel
{


    public required string VariantId { get; set; }
    public required string VariantName { get; set; }
    public required long Price { get; set; }
    public required int Image { get; set; }
    public required long Quality { get; set; } = 0;



}