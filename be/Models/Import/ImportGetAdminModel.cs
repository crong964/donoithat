using System.ComponentModel.DataAnnotations;
using SQLitePCL;

namespace be.Entity;


public class ImportGetAdminModel
{

	public required string ImportId { get; set; }
	public required SuplierEntity SuplierEntity { get; set; }
	public required long TotalMoney { get; set; }
	public required string ReceivedDate { get; set; }

	static public ImportGetAdminModel Convert(ImportEntity importEntity)
	{
		return new ImportGetAdminModel
		{
			ImportId = importEntity.ImportId,
			ReceivedDate = importEntity.ReceivedDate,
			SuplierEntity = importEntity.SuplierEntity,
			TotalMoney = importEntity.TotalMoney,

		};
	}
}