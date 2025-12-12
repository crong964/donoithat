using System.ComponentModel;
using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
namespace be.Controllers;

[ApiController]
[Route("api/order")]
public class OrderController(DatabaseContext context,
IUserService userService, ILogger<OrderController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly IUserService _userService = userService;
    private readonly ILogger<OrderController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderGetModel>>> Orders()
    {
        var id = _userService.GetUserId(HttpContext);
        if (id == null)
        {
            return BadRequest(new { message = "Chưa đăng nhập" });
        }

        var userEntity = await _context.User.FindAsync(id);
        if (userEntity == null)
        {
            return BadRequest(new { message = "Không tìm thấy người dùng này" });
        }
        var ls = await _context.Order.
        Where(x => x.UserEntity.UserId == id).
           Select(x => OrderGetModel.ConvertEntity(x))
         .ToArrayAsync();
        return Ok(ls);
    }

    [HttpGet("detail")]
    public async Task<ActionResult<OrderDetailGetModel>> Detail(string? orderId)
    {
        _logger.LogInformation(orderId);
        var userId = _userService.GetUserId(HttpContext);
        if (orderId == null || userId == null)
        {
            return BadRequest(new { message = "Không có hóa đơn này" });
        }
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
        if (userId != order.UserEntity.UserId)
        {
            return BadRequest(new { message = "Không có hóa đơn này" });
        }
        var data = OrderDetailGetModel.ConvertEntityToModel(orderDetails, order);
        return Ok(data);
    }


    [HttpPatch("updateStatus")]
    public async Task<ActionResult> OrderUpdate(OrderUpdate orderUpdate)
    {

        var orderEntity = await _context.Order.FindAsync(orderUpdate.OrderId);

        if (orderEntity == null)
        {
            return BadRequest(new { message = "Đặt hàng chưa tồn tại " });
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

            return BadRequest(new { message = "Có lỗi " });
        }

        return Ok(new { message = "Cập nhật thành công" });
    }

    [HttpPatch("payorder")]
    public async Task<string> OrderPay(OrderPay orderPay)
    {
        var id = _userService.GetUserId(HttpContext) ?? throw new Exception("chưa đăng nhập");

        var userEntity = await _context.User.FindAsync(id) ?? throw new Exception("không tìm thấy người dùng này");

        var orderEntity = await _context.Order.FindAsync(orderPay.OrderId) ?? throw new Exception("");

        try
        {
            await _context
            .Order.
            Where(x => x.OrderId == orderPay.OrderId && x.UserEntity.UserId == id)
            .ExecuteUpdateAsync((setters) =>
            setters.SetProperty(b => b.Pay, orderPay.Pay));

            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {

            throw;
        }

        return "ok";
    }

    [HttpPost]
    public async Task<ActionResult> OrderAdd(OrderAdd orderAdds)
    {
        var productVariant = orderAdds.ProductVariants;
        var id = _userService.GetUserId(HttpContext);
        if (id == null)
        {
            return BadRequest(new { message = "Chưa đăng nhập" });
        }

        var userEntity = await _context.User.FindAsync(id);
        if (userEntity == null)
        {
            return BadRequest(new { message = "Không tìm thấy người dùng này" });
        }
        var addressEntity = await _context.Address.
        Where(x => x.UserEntity == userEntity && x.AddressId == orderAdds.AddressId).FirstOrDefaultAsync();

        if (addressEntity == null)
        {
            return BadRequest(new { message = "Không tìm thấy địa chỉ" });
        }

        var transaction = await _context.Database.BeginTransactionAsync();

        var orderEntity = new OrderEntity
        {
            Status = OrderStatus.Processing,
            UserEntity = userEntity,
            Address = addressEntity.Address,
            Note = orderAdds.Note,
            Lat = addressEntity.Lat,
            Lng = addressEntity.Lng
        };

        await _context.Order.AddAsync(orderEntity);
        try
        {
            foreach (var item in productVariant)
            {
                var productVariantEntity = await _context
                .ProductVariant
                .SingleOrDefaultAsync(x => x.ProductVariantId == item.ProductVariantId);
                if (productVariantEntity == null)
                {
                    continue;
                }
                if (productVariantEntity.Quality < item.Quality)
                {
                    continue;
                }

                await _context.ProductVariant.
                 Where(x => x.ProductVariantId == item.ProductVariantId &&
                 x.Quality == productVariantEntity.Quality)
                 .ExecuteUpdateAsync(setters => setters
                 .SetProperty(b => b.Quality, productVariantEntity.Quality - item.Quality));

                var orderDetailEntity = new OrderDetailEntity
                {
                    OrderEntity = orderEntity,
                    ProductVariantEntity = productVariantEntity,
                    Quality = item.Quality,
                    Price = productVariantEntity.Price
                };
                await _context.OrderDetail.AddAsync(orderDetailEntity);


            }
            var ls = await _context.Cart.Where(x => x.UserEntity.UserId == id).ToArrayAsync();
            _context.Cart.RemoveRange(ls);

            await _context.SaveChangesAsync();
            await _context.Database.CommitTransactionAsync();
        }
        catch (System.Exception e)
        {
            await transaction.RollbackAsync();
            if (e != null)
            {
                _logger.LogError(e.Message);
            }

            return BadRequest(new { message = "có lỗi" });
        }

        return Ok("");
    }


}