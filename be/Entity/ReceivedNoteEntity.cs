using System.ComponentModel.DataAnnotations;


namespace be.Entity;

public class ReceivedNoteEntity
{

    [Key]
    public required string ReceivedNoteId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");

    public required UserEntity UserEntity { get; set; }

    public required SuplierEntity SuplierEntity { get; set; }

    public required string ReceivedDate { get; set; }


    public List<ProductVariantEntity> ProductVariantEntities { get; } = [];
}