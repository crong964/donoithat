using be.Entity;

namespace be.Models;


public class ProductImportDetailAdminModel
{
	public required string ProductVariantId { get; set; }
	public required string ProductVariantName { get; set; }
	public required long ImportPrice { get; set; }
	public required string Image { get; set; }
	public long Quality { get; set; }

	static public ProductImportDetailAdminModel Convert(ImportDetailEntity importDetail)
	{
		return new ProductImportDetailAdminModel
		{
			Image = importDetail.ProductVariantEntity.Image,
			ImportPrice = importDetail.Price,
			ProductVariantId = importDetail.ProductVariantEntity.ProductVariantId,
			ProductVariantName = importDetail.ProductVariantEntity.ProductVariantName,
			Quality = importDetail.Quality
		};
	}
}