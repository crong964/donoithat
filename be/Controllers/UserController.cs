using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/user")]
public class UserController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;



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
                Address = userCreateModel.Address,
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
}