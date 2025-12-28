using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public class ImportDetailEntity
{

    public required ImportEntity ImportEntity { get; set; }

    public required ProductVariantEntity ProductVariantEntity { get; set; }

    public required long Price { get; set; }
    public required long Quality { get; set; }
}