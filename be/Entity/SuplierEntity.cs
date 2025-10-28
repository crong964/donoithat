using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace be.Entity;


[Index("SuplierId")]
public class SuplierEntity
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
    public required string SuplierId { get; set; }
    public required string SuplierName { get; set; }
    public required string SuplierPhoneNumber { get; set; }
    public required string SuplierEmail { get; set; }
    public required string SuplierAddress { get; set; }

    public List<ProductVariantEntity> ProductVariantEntities { get; } = [];
}