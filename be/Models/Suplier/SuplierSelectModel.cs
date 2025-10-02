using be.Entity;

namespace be.Models;

public class SuplierSelectModel
{
    public required string Id { get; set; }
    public required string SuplierId { get; set; }
    public required string SuplierName { get; set; }


    public static SuplierSelectModel Convert(SuplierEntity suplierEntity)
    {
        return new SuplierSelectModel
        {
            Id = suplierEntity.Id,
            SuplierId = suplierEntity.SuplierId,
            SuplierName = suplierEntity.SuplierName,
        };
    }
}