using be.Entity;

namespace be.Models.Location;

public class LocationPostAdminModel
{
	public required string ParentId { get; set; }
	public required string Name { get; set; }

	public required string Type { get; set; }
}