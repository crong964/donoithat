using System.ComponentModel.DataAnnotations;

namespace be.Entity;


public class RoleEntiry
{
	[Key]
	public string RoleId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
	public required string RoleName { get; set; }

	public required string Permission { get; set; }
}

