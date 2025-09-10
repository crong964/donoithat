using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class AddressAddModel
{
    [Required(ErrorMessage = "UserId bắt buộc nhập")]
    public required float Lat { get; set; }
    [Required(ErrorMessage = "UserId bắt buộc nhập")]
    public required float Lng { get; set; }
    public required string Title { get; set; }
    public required string Address { get; set; }
}