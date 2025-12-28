using be.Models;

namespace be.Entity;


public class ImportAddAdminModel
{
	public string PurchaseInvoiceId { get; set; } = "";
	public required string SuplierId { get; set; }
	public required string ReceivedDate { get; set; }
	public required List<ImportProductAdmin> ImportVariantProducts { get; set; }
}