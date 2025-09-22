using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;



[Authorize]
[ApiController]
[Route("/api/address")]
public class AddressController(DatabaseContext context,
IUserService userService, ILogger<AddressController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly IUserService _userService = userService;
    private readonly ILogger<AddressController> _logger = logger;

    /// <summary>
    /// Lấy danh sách địa chỉ của người dùng
    /// </summary>
    /// <remarks>
    /// API này trả về toàn bộ danh sách địa chỉ của người dùng
    /// </remarks>
    /// <response code="200">Danh sách sản phẩm</response>
    /// <response code="404">Không tìm thấy dữ liệu</response>
    [HttpGet]
    public async Task<ActionResult> Get()
    {
        var id = _userService.GetUserId(HttpContext);
        var ls = await _context.Address.Where(x => x.UserEntity.Account == id).ToListAsync();
        return Ok(ls);
    }

    [HttpPost]
    public async Task<ActionResult> Add(AddressAddModel addressAddModel)
    {
        var id = _userService.GetUserId(HttpContext);
        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
            return BadRequest(new { message = "Không có người dùng này" });
        }
        var addressEntity = new AddressEntity
        {
            Address = addressAddModel.Address,
            Lng = addressAddModel.Lng,
            Lat = addressAddModel.Lat,
            Title = addressAddModel.Title,
            UserEntity = user
        };

        try
        {
            await _context.Address.AddAsync(addressEntity);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            return BadRequest(new { message = "Không có người dùng này" });
        }
        return Ok(new { message = "ok" });
    }



    [HttpPatch]
    public async Task<ActionResult> Patch(AddressPatchModel addressPatchModel)
    {
        var id = _userService.GetUserId(HttpContext);
        var user = await _context.User.FindAsync(id);

        if (user == null)
        {
            return BadRequest(new { message = "Không có người dùng này" });
        }
        var address = await _context.Address.FindAsync(addressPatchModel.AddressId);

        if (address == null || address.UserEntity.Account != id)
        {
            return BadRequest(new { message = "Không có địa chỉ này" });
        }

        address.Address = addressPatchModel.Address;
        address.Lng = addressPatchModel.Lng;
        address.Lat = addressPatchModel.Lat;
        address.Title = addressPatchModel.Title;
        _context.Address.Update(address);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(AddressDeleteModel addressDeleteModel)
    {
        var id = _userService.GetUserId(HttpContext);
        var user = await _context.User.FindAsync(id);

        if (user == null)
        {
            return BadRequest(new { message = "Không có người dùng này" });
        }
        var address = await _context.Address.FindAsync(addressDeleteModel.AddressId);

        if (address == null || address.UserEntity.Account != id)
        {
            return BadRequest(new { message = "Không có địa chỉ này" });
        }

        _context.Address.Remove(address);
        await _context.SaveChangesAsync();
        return Ok();
    }


}