using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ImportProductAdmin
{
	[Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn 0")]
	required public int Quality { get; set; }
	public required long ImportPrice { get; set; } = 0;
	public required string ProductVariantId { get; set; }
}