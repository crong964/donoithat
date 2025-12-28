using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ImportQueryProductAdmin
{
	public int Page { get; set; } = 1;
	public required string Name { get; set; }
}