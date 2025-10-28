using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public class ReceivedNoteDetailEntity
{

    public required ReceivedNoteEntity ReceivedNoteEntity { get; set; }

    public required ProductVariantEntity ProductVariantEntity { get; set; }

    public required long ReceivedPrice { get; set; }
    public required long ReceivedQuality { get; set; }
}