using System.ComponentModel.DataAnnotations;

namespace be.Entity;


public class AccountEntity
{
	[Key]
	public required string Account { get; set; }
	public required string Password { get; set; }
}