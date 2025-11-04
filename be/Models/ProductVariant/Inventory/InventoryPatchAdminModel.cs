using be.Entity;

namespace be.Models;

public class InventoryPatchAdminModel
{
    public required string ProductVariantId { get; set; }
    public required string ProductVariantName { get; set; }
    public required long Price { get; set; }
    public required long ImportPrice { get; set; } = 0;
    public long Quality { get; set; } = 0;
    public int Weight { get; set; }

    public required string? ImageFile { set; get; }
    public required string? BrandId { set; get; }
}