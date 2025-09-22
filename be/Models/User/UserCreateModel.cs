using be.Entity;

namespace be.Models;

public class UserCreateModel
{
    public required string Account { get; set; }
    public required string Password { get; set; }
    public required string PhoneNumber { get; set; }
    public required string FullName { get; set; }




}