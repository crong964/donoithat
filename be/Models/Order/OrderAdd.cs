using System.ComponentModel.DataAnnotations;

using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace be.Models;

public class OrderAdd
{

    public required List<ProductVariant> ProductVariants { get; set; }

    [Required(ErrorMessage ="Cần có addressId")]
    public required string AddressId { get; set; }
    public required string Note { get; set; }
}

public class ProductVariant
{
    public required string ProductVariantId { get; set; }
    public required int Quality { get; set; }
}