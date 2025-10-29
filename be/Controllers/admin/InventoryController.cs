using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SQLitePCL;

namespace be.Controllers;


[ApiController]
[Route("api/admin/inventory")]
public class InventoryController(DatabaseContext context, ILogger<InventoryController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<InventoryController> _log = logger;


    [HttpGet]
    public async Task<ActionResult> GetAll([FromQuery] ProductVariantGetAdminModel get)
    {

        var query = from item in _context.ProductVariant
                    join Product in _context.Product on
                    item.ProductEntity.ProductId equals Product.ProductId into gj
                    from x in gj.DefaultIfEmpty()

                    select new
                    {
                        item.ImportPrice,
                        Show = item.ProductEntity != null ? "Đang bán" : "Chưa bán",
                        item.ProductVariantName,
                        item.Image,
                        item.Price,
                        BrandName = "",
                        item.Quality,
                        item.Weight,
                        item.ProductVariantId
                    };


        return Ok(new
        {
            Data = await query.Take(20).ToArrayAsync(),
            Tottal = (await query.CountAsync()) / 20,
            get.CurPage
        }
        );
    }

}