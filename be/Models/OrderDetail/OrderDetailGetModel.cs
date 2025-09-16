using be.Entity;

namespace be.Models;


public class OrderDetailGetModel
{

    public required IEnumerable<OrderDetailModel> OrderDetails { get; set; }
    public required OrderGetModel Order { get; set; }

    public static OrderDetailGetModel ConvertEntityToModel(IEnumerable<OrderDetailEntity> orderDetailEntities, OrderEntity orderEntity)
    {
        return new OrderDetailGetModel
        {
            OrderDetails = orderDetailEntities.Select(OrderDetailModel.ConvertEntityToModel),
            Order = OrderGetModel.ConvertEntity(orderEntity)
        };
    }
}