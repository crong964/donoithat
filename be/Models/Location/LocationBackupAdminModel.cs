using be.Entity;

namespace be.Models.Location;

public class LocationBackupAdminModel
{
	public required string LocationId { get; set; }
	public required int Level { get; set; } = 1;
	public required string LocationName { get; set; }
	public required string ParentId { get; set; }


	static public LocationBackupAdminModel Convert(LocationEntity locationEntity)
	{
		return new LocationBackupAdminModel
		{
			Level = locationEntity.Level,
			LocationId = locationEntity.LocationId,
			LocationName = locationEntity.LocationName,
			ParentId = locationEntity.Parentlocation?.LocationId ?? ""
		};
	}
}