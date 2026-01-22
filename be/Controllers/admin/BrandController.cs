using System.Threading.Tasks;
using be.Entity;
using be.Enums;
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
    [HasPermission(Permission.brand, [ActionType.view])]
    public async Task<ActionResult> GetAll()
    {
        var ls = await _context.Brand.AsNoTracking().Select(x => BrandAdminGetModel.Covert(x)).ToArrayAsync();
        return Ok(ls);
    }


    [HttpPost]
    [HasPermission(Permission.brand, [ActionType.add])]
    public async Task<ActionResult> Add(BrandEntity brandEntity)
    {
        var ls = await _context.Brand.AddAsync(brandEntity);

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPatch]
    [HasPermission(Permission.brand, [ActionType.update])]
    public async Task<ActionResult> Update(BrandEntity brandEntity)
    {
        _context.Brand.Update(brandEntity);
        await _context.SaveChangesAsync();
        return Ok();
    }


    [HttpDelete]
    [HasPermission(Permission.brand, [ActionType.delete])]
    public async Task<ActionResult> Delete(BrandEntity brandEntity)
    {
        _context.Brand.Update(brandEntity);
        await _context.SaveChangesAsync();
        return Ok();
    }









    [HttpPost("backup")]
    [HasPermission(Permission.brand, [ActionType.upload])]
    public async Task<ActionResult<SuplierGetAdminModel[]>> AddList(List<BrandAdminPostModel> brands)
    {
        foreach (var brand1 in brands)
        {

            var brand = new BrandEntity
            {
                BrandName = brand1.BrandName,
                BrandId = brand1.BrandId
            };

            try
            {
                await _context.Brand.AddAsync(brand);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception)
            {
            }

        }
        return Ok();
    }

    [HttpGet("backup")]
    [HasPermission(Permission.brand, [ActionType.download])]
    public async Task<ActionResult<BrandEntity[]>> Backup()
    {
        var ls = await _context.Brand.ToArrayAsync();
        return Ok(ls);
    }
}