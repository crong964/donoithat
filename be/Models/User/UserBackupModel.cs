using be.Entity;

namespace be.Models;

public class UserBackupModel
{
	public string UserId { get; set; } = "U" + Guid.NewGuid().ToString().Replace("-", "");
	public required string Account { get; set; }
	public required string Password { get; set; }
	public required string FullName { get; set; }
	public required string PhoneNumber { get; set; }

	public required string Role { get; set; } = "user";

	public static UserBackupModel Convert(UserEntity userEntity, AccountEntity accountEntity)
	{
		return new UserBackupModel
		{
			Account = userEntity.AccountEntity.Account,
			Password = accountEntity.Password,
			FullName = userEntity.FullName,
			PhoneNumber = userEntity.PhoneNumber,
			Role = userEntity.Role,
			UserId = userEntity.UserId,
		};
	}
}