using be.Entity;

namespace be.Models;

public class UserInforModel
{
    public required string FullName { get; set; }
    public required string Account { get; set; }
    public required string PhoneNumber { get; set; }

    public static UserInforModel Convert(UserEntity userEntity)
    {
        return new UserInforModel
        {
            Account = userEntity.Account,
            FullName = userEntity.FullName,
            PhoneNumber = userEntity.PhoneNumber
        };
    }
}
