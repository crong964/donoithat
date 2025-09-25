using System.ComponentModel;
using System.Text.Json;
using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;
using be.Service.Implement;
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




    [HttpPatch("updateStatus")]
    public async Task<string> OrderUpdate(OrderUpdate orderUpdate)
    {

        var orderEntity = await _context.Order.FindAsync(orderUpdate.OrderId);

        if (orderEntity == null)
        {
            throw new Exception("");
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

            throw;
        }

        return "ok";
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
            Where(x => x.OrderId == orderPay.OrderId && x.UserEntity.Account == id)
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


}