using be.Entity;

namespace be.Models.User.Employee;

public class EmployeeGetAdminModel
{

	public required string PhoneNumber { get; set; }
	public required string FullName { get; set; }
	public required string Account { get; set; }
	public required string RoleName { get; set; }
	public required string UserId { get; set; }
	static public EmployeeGetAdminModel Convert(UserEntity userEntity)
	{
		return new EmployeeGetAdminModel
		{
			Account = userEntity.AccountEntity.Account,
			FullName = userEntity.FullName,
			PhoneNumber = userEntity.PhoneNumber,
			RoleName = userEntity.RoleEntiry.RoleName,
			UserId = userEntity.UserId
		};
	}
}