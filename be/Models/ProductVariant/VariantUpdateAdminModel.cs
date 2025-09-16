using be.Entity;

namespace be.Models;

public class VariantUpdateAdminModel
{
    public string ProductVariantId { get; set; } = Guid.NewGuid().ToString();
    public required long Price { get; set; }
    public required long ImportPrice { get; set; }
    public long Quality { get; set; }

}