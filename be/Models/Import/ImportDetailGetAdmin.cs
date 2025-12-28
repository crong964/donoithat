using be.Models;

namespace be.Entity;


public class ImportDetailGetAdmin
{
	public required string UserId { get; set; }
	public required string FullName { get; set; }
	public required string ImportId { get; set; }
	public required string PurchaseInvoiceId { get; set; }
	public required long TotalMoney { get; set; }
	public required string ReceivedDate { get; set; }
	public required string SuplierId { get; set; }
	public required string SuplierName { get; set; }

	static public ImportDetailGetAdmin Convert(ImportEntity import, UserEntity? user, SuplierEntity? suplier)
	{
		return new ImportDetailGetAdmin
		{

			ImportId = import.ImportId,
			ReceivedDate = import.ReceivedDate,
			PurchaseInvoiceId = import.PurchaseInvoiceId,
			TotalMoney = import.TotalMoney,

			FullName = user?.FullName ?? "",
			UserId = user?.UserId ?? "",

			SuplierId = suplier?.Id ?? "",
			SuplierName = suplier?.SuplierName ?? "",
		};
	}
}