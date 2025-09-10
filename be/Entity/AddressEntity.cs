using System.ComponentModel.DataAnnotations;

namespace be.Entity;

public class AddressEntity
{
    [Key]
    public string AddressId { get; set; } = Guid.NewGuid().ToString();
    public required float Lat { get; set; }
    public required float Lng { get; set; }
    public required string Title { get; set; }
    public required string Address { get; set; }
    public required UserEntity UserEntity { get; set; }
}