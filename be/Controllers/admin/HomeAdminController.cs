using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("/api/admin/home")]
public class HomeController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    [HttpGet]
    public async Task<ActionResult> Home()
    {
        var totalUser = await _context.User.CountAsync();
        var totalProduct = await _context.Product.CountAsync();
        var totalOrder = await _context.Order.CountAsync();
        var home = new HomeAdminGetModel
        {
            TotalOrder = totalOrder,
            TotalProduct = totalProduct,
            TotalUser = totalUser,
            Status = [OrderStatus.Processing, OrderStatus.Shipped, OrderStatus.Delivered, OrderStatus.Cancelled],
        };
        return Ok(home);
    }
}