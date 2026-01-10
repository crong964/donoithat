using be.Entity;

namespace be.Models;


public class BrandAdminGetModel
{
	public required string BrandId { get; set; }
	public required string BrandName { get; set; }

	static public BrandAdminGetModel Covert(BrandEntity brandEntity)
	{
		return new BrandAdminGetModel
		{
			BrandId = brandEntity.BrandId,
			BrandName = brandEntity.BrandName
		};
	}
}