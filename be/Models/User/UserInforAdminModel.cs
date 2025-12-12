using be.Entity;

namespace be.Models;

public class UserInforAdminModel
{
    public required string FullName { get; set; }
    public required string Account { get; set; }
    public required string PhoneNumber { get; set; }
    public required string UserId { get; set; }


    public static UserInforAdminModel Convert(UserEntity userEntity)
    {
        return new UserInforAdminModel
        {
            Account = userEntity.AccountEntity.Account,
            FullName = userEntity.FullName,
            PhoneNumber = userEntity.PhoneNumber,
            UserId = userEntity.UserId
        };
    }
}
