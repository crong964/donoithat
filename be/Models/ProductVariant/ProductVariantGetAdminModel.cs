using be.Entity;

namespace be.Models;

public class ProductVariantGetAdminModel
{
    public string BrandId { get; set; } = "";
    public bool Independent { get; set; } = true;
    public string ProductVariantName { get; set; } = "";
    public required int CurPage { get; set; } = 0;
}