namespace be.Models;

public class SuplierAdminUpdateModel
{
    public required string Id { get; set; }
    public required string SuplierId { get; set; }
    public required string SuplierName { get; set; }
    public required string SuplierPhoneNumber { get; set; }
    public required string SuplierEmail { get; set; }
    public required string SuplierAddress { get; set; }
}