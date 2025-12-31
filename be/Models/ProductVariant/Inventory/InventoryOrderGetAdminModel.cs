using be.Entity;

namespace be.Models;

public class InventoryOrderGetAdminModel
{
	public required string ImagePath { get; set; }
	public required string SuplierId { get; set; }
	public required string SuplierName { get; set; }
	public required string SuplierPhoneNumber { get; set; }
	public required string ProductVariantName { get; set; }
	public required string InventoryId { get; set; }
	public int ReceiedQuality { get; set; }

	static public InventoryOrderGetAdminModel Convert(ProvideEntity provideEntity)
	{
		return new InventoryOrderGetAdminModel
		{
			ProductVariantName = provideEntity.ProductVariantEntity.ProductVariantName,
			InventoryId = provideEntity.ProductVariantEntity.ProductVariantId,
			ImagePath = provideEntity.ProductVariantEntity.Image,
			SuplierId = provideEntity.SuplierEntity.SuplierId,
			SuplierName = provideEntity.SuplierEntity.SuplierName,
			SuplierPhoneNumber = provideEntity.SuplierEntity.SuplierPhoneNumber,
			ReceiedQuality = provideEntity.ReceiedQuality,
		};
	}


}