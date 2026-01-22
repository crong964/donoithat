namespace be.Models.User.Employee;

public class EmployeeAddAdminModel
{

	public required string PhoneNumber { get; set; }
	public required string FullName { get; set; }
	public required string Account { get; set; }
	public required string Password { get; set; }
	public required string RoleId { get; set; }

}