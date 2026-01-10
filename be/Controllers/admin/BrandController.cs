using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/admin/brand")]
public class BrandController(DatabaseContext context, ILogger<BrandController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<BrandController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var ls = await _context.Brand.AsNoTracking().Select(x => BrandAdminGetModel.Covert(x)).ToArrayAsync();
        return Ok(ls);
    }

    [HttpGet("tobuy")]
    public async Task<ActionResult> GetAllBrandProductBuyYet()
    {
        var ls = await _context.Brand
         .Where(x => x.ProductVariantEntities != null && x.ProductVariantEntities.Any(x => x.ProductEntity == null))
         .AsNoTracking().Select(x => BrandAdminGetModel.Covert(x)).ToArrayAsync();
        return Ok(ls);
    }
    [HttpPost]
    public async Task<ActionResult> Add(BrandEntity brandEntity)
    {
        var ls = await _context.Brand.AddAsync(brandEntity);

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPatch]
    public async Task<ActionResult> Update(BrandEntity brandEntity)
    {
        _context.Brand.Update(brandEntity);
        await _context.SaveChangesAsync();
        return Ok();
    }
}