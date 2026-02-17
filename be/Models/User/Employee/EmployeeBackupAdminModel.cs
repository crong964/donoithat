using be.Entity;

namespace be.Models.User.Employee;

public class EmployeeBackupAdminModel
{
	public required string Account { get; set; }
	public required string Password { get; set; }
	public required string RoleId { get; set; }
	public required string UserId { get; set; }
	public required string PhoneNumber { get; set; }
	public required string FullName { get; set; }


	public static EmployeeBackupAdminModel Convert(UserEntity userEntity)
	{
		return new EmployeeBackupAdminModel
		{
			Account = userEntity.AccountEntity.Account,
			FullName = userEntity.FullName,
			PhoneNumber = userEntity.PhoneNumber,
			Password = userEntity.AccountEntity.Password,
			RoleId = userEntity.RoleEntiry.RoleId,
			UserId = userEntity.UserId
		};
	}
}