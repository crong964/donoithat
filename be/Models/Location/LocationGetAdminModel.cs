using be.Entity;

namespace be.Models.Location;

public class LocationGetAdminModel
{
	public required string LocationId { get; set; }

	public required string LocationName { get; set; }

	static public LocationGetAdminModel Convert(LocationEntity locationEntity)
	{
		return new LocationGetAdminModel
		{
			LocationId = locationEntity.LocationId,
			LocationName = locationEntity.LocationName
		};
	}
}