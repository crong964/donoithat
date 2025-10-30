using be.Entity;

namespace be.Models;

public class ProductVariantGetAdminModel
{
    public string? BrandId { get; set; } = "";
    public bool? Independent { get; set; } = true;
    public string? InventoryName { get; set; } = "";
    public int? CurPage { get; set; } = 1;
    public bool? OnSale { get; set; } = false;
}