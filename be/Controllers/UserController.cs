using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/user")]
public class UserController(DatabaseContext context, IUserService userService) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly IUserService _userService = userService;


    [HttpPost("create")]
    public async Task<ActionResult> CreateUser(UserCreateModel userCreateModel)
    {
        var s = await _context.User.FindAsync(userCreateModel.Account);
        if (s != null)
        {
            return BadRequest(new { message = "Tài khoản đã tồn tại" });
        }
        try
        {
            await _context.User.AddAsync(new UserEntity
            {
                Account = userCreateModel.Account,
                FullName = userCreateModel.FullName,
                Password = userCreateModel.Password,
                PhoneNumber = userCreateModel.PhoneNumber

            });
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đăng ký thành công" });
        }
        catch (System.Exception)
        {
            return BadRequest(new { message = "Tài khoản đã tồn tại" });
        }

    }

    [HttpPatch]
    public async Task<ActionResult> UpdateUser(UserUpdateModel userUpdateModel)
    {
        var id = _userService.GetUserId(HttpContext);
        if (id == null)
        {
            return BadRequest(new { message = "Chưa đăng nhập" });
        }
        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
            return BadRequest(new { message = "Tài khoản đã tồn tại" });
        }

        try
        {
            user.FullName = userUpdateModel.FullName;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đăng ký thành công" });
        }
        catch (System.Exception)
        {
            return BadRequest(new { message = "Tài khoản đã tồn tại" });
        }

    }


}