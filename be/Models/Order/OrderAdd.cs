namespace be.Models;

public class OrderAdd
{

    public required List<ProductVariant> ProductVariants { get; set; }
    public required string Address { get; set; }
    public required string Note { get; set; }
    public required long Lat { get; set; }
    public required long Lng { get; set; }
}

public class ProductVariant
{
    public required string ProductVariantId { get; set; }
    public required int Quality { get; set; }
}