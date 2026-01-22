
using be.Entity;
using be.Models;
using be.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace be.Controllers.admin;

[Authorize]
[ApiController]
[Route("api/admin/order")]
public class OrderController(DatabaseContext context,
IUserService userService, ILogger<OrderController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly IUserService _userService = userService;
    private readonly ILogger<OrderController> _logger = logger;


    [HttpGet]
    public async Task<IEnumerable<OrderAdminGet>> Orders(OrderStatus? orderStatus)
    {
        OrderAdminGet[] ls = [];
        if (orderStatus == null)
        {
            ls = await _context.Order.
                       Include(x => x.UserEntity).
                         Select(x => OrderAdminGet.ConvertEntity(x))
                       .ToArrayAsync();
            return ls;
        }
        ls = await _context.Order.
        Include(x => x.UserEntity).
        Where(x => x.Status == orderStatus).
          Select(x => OrderAdminGet.ConvertEntity(x))
        .ToArrayAsync();
        return ls;
    }

    [HttpGet("status")]
    public ActionResult Status()
    {
        OrderStatus[] home = {
            OrderStatus.Processing,
            OrderStatus.Shipped,
             OrderStatus.Delivered,
              OrderStatus.Cancelled,OrderStatus.Complete
               };
        return Ok(home);
    }


    [HttpGet("detail")]
    public async Task<ActionResult<OrderDetailGetModel>> Detail(string? orderId)
    {

        var order = await _context.Order
        .Include(x => x.UserEntity)
        .Where(x => x.OrderId == orderId).FirstOrDefaultAsync();

        if (order == null)
        {
            return BadRequest(new { message = "Không có hóa đơn này" });
        }
        var orderDetails = await _context.OrderDetail
        .Include(x => x.ProductVariantEntity)
        .Where(x => x.OrderEntity.OrderId == orderId).ToArrayAsync();

        var data = OrderDetailGetModel.ConvertEntityToModel(orderDetails, order);
        return Ok(data);
    }


    [HttpPatch("updateStatus")]
    public async Task<ActionResult> OrderUpdate(OrderUpdate orderUpdate)
    {

        var orderEntity = await _context.Order.FindAsync(orderUpdate.OrderId);

        if (orderEntity == null)
        {
            return BadRequest(new { message = "Không có hóa đơn này" });
        }
        if (orderEntity.Pay != PayStatus.Yes && orderUpdate.Status == OrderStatus.Complete)
        {
            return BadRequest(new { message = "Đơn này chưa thành toán không thể hoàn thành" });
        }
        if (orderEntity.Pay == PayStatus.Yes && orderUpdate.Status == OrderStatus.Cancelled)
        {
            return BadRequest(new { message = "Đơn này đã thanh toán không thể huy" });
        }
        if (orderEntity.Status == OrderStatus.Complete)
        {
            return BadRequest(new { message = "Đơn này đã hoàn thành không thể thay đổi" });
        }
        try
        {
            await _context
            .Order.
            Where(x => x.OrderId == orderUpdate.OrderId && x.Status == orderEntity.Status)
            .ExecuteUpdateAsync((setters) =>
            setters.SetProperty(b => b.Status, orderUpdate.Status));

            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "Không có hóa đơn này" });
        }

        return Ok(new { message = "Cập nhật thành công" });
    }

    [HttpPatch("payorder")]
    public async Task<ActionResult> OrderPay(OrderPay orderPay)
    {


        var orderEntity = await _context.Order.FindAsync(orderPay.OrderId);
        if (orderEntity == null)
        {
            return BadRequest(new { message = "Không có hóa đơn này" });
        }
        if (orderEntity.Status == OrderStatus.Complete)
        {
            return BadRequest(new { message = "Đơn này đã hoàn thành không thể thay đổi" });
        }
        try
        {
            await _context
            .Order.
            Where(x => x.OrderId == orderPay.OrderId)
            .ExecuteUpdateAsync((setters) =>
            setters.SetProperty(b => b.Pay, orderPay.Pay));

            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "Không có thanh toán dc" });
        }

        return Ok(new { message = "Cập nhật tc" });
    }


}