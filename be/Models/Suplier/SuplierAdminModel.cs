using be.Entity;

namespace be.Models;

public class SuplierGetAdminModel
{
    public required string Id { get; set; }
    public required string SuplierId { get; set; }
    public required string SuplierName { get; set; }
    public required string SuplierPhoneNumber { get; set; }
    public required string SuplierEmail { get; set; }
    public required string SuplierAddress { get; set; }

    public static SuplierGetAdminModel Convert(SuplierEntity suplierEntity)
    {
        return new SuplierGetAdminModel
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