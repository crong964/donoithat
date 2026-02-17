using be.Entity;

namespace be.Models;

public class InventoryBackupAdminModel
{


    public required string ProductVariantId { get; set; }
    public required string ProductVariantName { get; set; }
    public required string VariantId { get; set; }
    public required string VariantName { get; set; }
    public required long Price { get; set; }
    public required long ImportPrice { get; set; } = 0;
    public required string Image { get; set; }
    public long Quality { get; set; } = 0;
    public int Position { get; set; }
    public int Weight { get; set; }


    public string ImageFiles { get; set; } = "";
    public string BrandId { get; set; } = "";
    public string ProductId { get; set; } = "";

}