namespace be.Models;

public class InventoryGetAdminModel
{
    public string BrandId { get; set; } = "";
    public bool Independent { get; set; } = true;
    public string ProductVariantName { get; set; } = "";
    public required int CurPage { get; set; } = 0;
}