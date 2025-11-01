using System.Threading.Tasks;
using Azure;
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
        var OnSale = get.OnSale == null || get.OnSale.Equals("all") ? "" : get.OnSale;
        var BrandId = get.BrandId == null || get.BrandId.Equals("all") ? "" : get.BrandId;
        var CurPage = get.CurPage ?? 1;
        var InventoryName = get.InventoryName ?? "";


#pragma warning disable CS8602 // Dereference of a possibly null reference.
        var query = from item in _context.ProductVariant
                    join Product in _context.Product on
                    item.ProductEntity.ProductId equals Product.ProductId into gj
                    from x in gj.DefaultIfEmpty()

                    join Brand in _context.Brand on
                    item.BrandEntity.BrandId equals Brand.BrandId into brands
                    from brand in brands.DefaultIfEmpty()

                    select new
                    {
                        item.ImportPrice,
                        OnSale = item.ProductEntity == null ? "false" : "true",
                        item.ProductVariantName,
                        item.Image,
                        item.Price,
                        brand.BrandName,
                        brand.BrandId,
                        item.Quality,
                        item.Weight,
                        item.ProductVariantId
                    };
#pragma warning restore CS8602 // Dereference of a possibly null reference.


        var limit = 40;

        var ls = await query.
        Where(x =>
            EF.Functions.Like(x.OnSale, "%" + OnSale + "%") &&
            EF.Functions.Like(x.ProductVariantName, "%" + get.InventoryName + "%") &&
            EF.Functions.Like(x.BrandId, "%" + BrandId + "%")).
        Skip((CurPage - 1) * limit).Take(limit).ToArrayAsync();


        var count = await query.Where(x =>
            EF.Functions.Like(x.OnSale, "%" + OnSale + "%") &&
            EF.Functions.Like(x.ProductVariantName, "%" + get.InventoryName + "%") &&
            EF.Functions.Like(x.BrandId, "%" + BrandId + "%")).CountAsync();

        var page = count / 40;
        var du = count % 40;

        if (du > 0)
        {
            page += 1;
        }

        return Ok(new
        {
            Data = ls,
            TotalPage = page,
            CurPage
        }
        );
    }


}