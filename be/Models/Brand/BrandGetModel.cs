using be.Entity;

namespace be.Models;


public class BrandGetModel
{
	public required string BrandId { get; set; }
	public required string BrandName { get; set; }

	static public BrandGetModel Covert(BrandEntity brandEntity)
	{
		return new BrandGetModel
		{
			BrandId = brandEntity.BrandId,
			BrandName = brandEntity.BrandName
		};
	}
}