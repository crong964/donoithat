namespace be.Models;

public class AddressPatchModel
{
    public required string AddressId { get; set; }
    public required float Lat { get; set; }
    public required float Lng { get; set; }
    public required string Title { get; set; }
    public required string Address { get; set; }
}