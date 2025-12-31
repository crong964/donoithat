using be.Entity;

namespace be.Models;

public class UserInforModel
{
    public required string UserId { get; set; }
    public required string PhoneNumber { get; set; }
    public required string FullName { get; set; }

    public static UserInforModel Convert(UserEntity userEntity)
    {
        return new UserInforModel
        {
            UserId = userEntity.UserId,
            FullName = userEntity.FullName,
            PhoneNumber = userEntity.PhoneNumber
        };
    }
}
