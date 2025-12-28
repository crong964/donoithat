using System.ComponentModel.DataAnnotations;


namespace be.Entity;

public class ImportEntity
{
    [Key]
    public string ImportId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
    public string PurchaseInvoiceId { get; set; } = "";
    public required UserEntity UserEntity { get; set; }

    public required SuplierEntity SuplierEntity { get; set; }
    public required long TotalMoney { get; set; }
    public required string ReceivedDate { get; set; }


    public List<ProductVariantEntity> ProductVariantEntities { get; } = [];
}