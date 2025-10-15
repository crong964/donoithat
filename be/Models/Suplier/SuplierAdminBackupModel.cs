using be.Entity;

namespace be.Models;

public class SuplierAdminBackupModel
{
    public required string Id { get; set; }
    public required string SuplierId { get; set; }
    public required string SuplierName { get; set; }
    public required string SuplierPhoneNumber { get; set; }
    public required string SuplierEmail { get; set; }
    public required string SuplierAddress { get; set; }

    public static SuplierAdminBackupModel Convert(SuplierEntity suplierEntity)
    {
        return new SuplierAdminBackupModel
        {
            Id = suplierEntity.Id,
            SuplierAddress = suplierEntity.SuplierAddress,
            SuplierEmail = suplierEntity.SuplierEmail,
            SuplierId = suplierEntity.SuplierId,
            SuplierName = suplierEntity.SuplierName,
            SuplierPhoneNumber = suplierEntity.SuplierPhoneNumber
        };
    }
}