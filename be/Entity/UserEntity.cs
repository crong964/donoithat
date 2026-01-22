using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public class UserEntity
{
    [Key]
    public string UserId { get; set; } = "U" + Guid.NewGuid().ToString().Replace("-", "");
    public required string PhoneNumber { get; set; }
    public required string FullName { get; set; }
    public required AccountEntity AccountEntity { get; set; }
    public required RoleEntiry RoleEntiry { get; set; }
    public List<ProductVariantEntity> ProductVariantEntities { get; } = [];
    public List<AddressEntity>? AddressEntities { get; set; }
}