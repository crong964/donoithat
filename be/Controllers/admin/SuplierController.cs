using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/admin/suplier")]
public class SuplierController(DatabaseContext context, ILogger<SuplierController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<SuplierController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<SuplierGetAdminModel[]>> GetAll()
    {
        var ls = await _context.Suplier.AsNoTracking().Select(x => SuplierGetAdminModel.Convert(x)).ToArrayAsync();
        return Ok(ls);
    }

    [HttpGet("suplierbyid")]
    public async Task<ActionResult<SuplierGetAdminModel>> GetByid(string suplierId)
    {
        var suplier = await _context.Suplier.FindAsync(suplierId);
        if (suplier == null)
        {
            return BadRequest();
        }
        return Ok(SuplierGetAdminModel.Convert(suplier));
    }
    [HttpPost]
    public async Task<ActionResult<SuplierGetAdminModel[]>> Post(SuplierAddAdminModel suplierAddAdminModel)
    {
        var suplierTmp = await _context.Suplier.Where(x => x.SuplierId == suplierAddAdminModel.SuplierId).FirstOrDefaultAsync();
        if (suplierTmp != null)
        {
            return BadRequest(new { message = "Trùng mã nhà cung cấp" });
        }
        var suplier = new SuplierEntity
        {
            SuplierEmail = suplierAddAdminModel.SuplierEmail,
            SuplierAddress = suplierAddAdminModel.SuplierAddress,
            SuplierId = suplierAddAdminModel.SuplierId,
            SuplierName = suplierAddAdminModel.SuplierName,
            SuplierPhoneNumber = suplierAddAdminModel.SuplierPhoneNumber
        };

        try
        {
            await _context.Suplier.AddAsync(suplier);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "Thêm không được hay thử lại" });
        }

    }

    [HttpPatch]
    public async Task<ActionResult> Patch(SuplierAdminUpdateModel suplierAdminUpdateModel)
    {
        var suplier = await _context.Suplier.FindAsync(suplierAdminUpdateModel.Id);
        var suplierTmp = await _context.Suplier.Where(x => x.SuplierId == suplierAdminUpdateModel.SuplierId).FirstOrDefaultAsync();
        if (suplierTmp != null)
        {
            return BadRequest(new { message = "Trùng mã nhà cung cấp" });
        }
        if (suplier == null)
        {
            return BadRequest(new { message = "Không có nhà cung cấp này" });
        }

        try
        {
            suplier.SuplierEmail = suplierAdminUpdateModel.SuplierEmail;
            suplier.SuplierAddress = suplierAdminUpdateModel.SuplierAddress;
            suplier.SuplierName = suplierAdminUpdateModel.SuplierName;
            suplier.SuplierPhoneNumber = suplierAdminUpdateModel.SuplierPhoneNumber;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "" });
        }
    }


    [HttpGet("search")]
    public async Task<ActionResult> Search([FromQuery] SuplierAdminQueryModel quey)
    {
        var limit = 10;
        if (quey.Name == null)
        {
            return BadRequest(new { message = "Không có tên" });
        }
        var page2 = quey.Page;
        var ls = await _context
        .Suplier
        .AsNoTracking()
        .Where(item => EF.Functions.Like(item.SuplierName, "%" + quey.Name.ToUpper().Replace(" ", "%") + "%"))
        .Skip((page2 - 1) * limit)
        .Take(page2 * limit)
        .Select(x => SuplierGetAdminModel.Convert(x))
        .ToArrayAsync();

        return Ok(ls);
    }







    [HttpPost("backup")]
    public async Task<ActionResult<SuplierGetAdminModel[]>> AddList(List<SuplierAddAdminModel> suplierAddAdminModels)
    {
        foreach (var suplierAddAdminModel in suplierAddAdminModels)
        {
            var suplierTmp = await _context.Suplier.Where(x => x.SuplierId == suplierAddAdminModel.SuplierId).FirstOrDefaultAsync();

            if (suplierTmp != null)
            {
                continue;
            }
            var brand = new BrandEntity
            {
                BrandName = suplierAddAdminModel.SuplierName,
                BrandId = suplierAddAdminModel.SuplierId
            };
            var suplier = new SuplierEntity
            {
                SuplierEmail = suplierAddAdminModel.SuplierEmail,
                SuplierAddress = suplierAddAdminModel.SuplierAddress,
                SuplierId = suplierAddAdminModel.SuplierId,
                SuplierName = suplierAddAdminModel.SuplierName,
                SuplierPhoneNumber = suplierAddAdminModel.SuplierPhoneNumber
            };

            try
            {
                await _context.Suplier.AddAsync(suplier);
                await _context.SaveChangesAsync();

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
    public async Task<ActionResult<SuplierAdminBackupModel[]>> Backup()
    {
        var ls = await _context.Suplier.Select(x => SuplierAdminBackupModel.Convert(x)).ToArrayAsync();
        return Ok(ls);
    }

}