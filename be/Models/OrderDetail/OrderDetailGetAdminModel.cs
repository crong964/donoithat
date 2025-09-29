using be.Entity;

namespace be.Models;


public class OrderDetailGetAdminModel
{

    public required IEnumerable<OrderDetailModel> OrderDetails { get; set; }
    public required OrderGetModel Order { get; set; }
    public required UserInforAdminModel UserInfor { get; set; }

    public static OrderDetailGetAdminModel ConvertEntityToModel(IEnumerable<OrderDetailEntity>
     orderDetailEntities,
      OrderEntity orderEntity, UserEntity userEntity)
    {
        return new OrderDetailGetAdminModel
        {
            OrderDetails = orderDetailEntities.Select(OrderDetailModel.ConvertEntityToModel),
            Order = OrderGetModel.ConvertEntity(orderEntity),
            UserInfor = UserInforAdminModel.Convert(userEntity)
        };
    }
}