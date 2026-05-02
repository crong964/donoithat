using System.ComponentModel.DataAnnotations;

namespace be.Entity;


public class LocationEntity
{
	[Key]
	public string LocationId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
	public required int Level { get; set; } = 1;
	public required string LocationName { get; set; }
	public required string LocationType { get; set; }

	public LocationEntity? Parentlocation { get; set; } = null;
}