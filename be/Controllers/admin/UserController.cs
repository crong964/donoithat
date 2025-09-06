using System.Threading.Tasks;
using be.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;


[ApiController]
[Route("api/admin/user")]
public class UserController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserEntity>>> GetAll()
    {

        var ls = await _context.User.Select(x => x).ToListAsync();
        return ls;
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateUser(UserEntity userEntity)
    {
        try
        {
            await _context.User.AddAsync(userEntity);
            await _context.SaveChangesAsync();
            return "ok";
        }
        catch (System.Exception)
        {

            throw new Exception("trùng tài khoản");
        }

    }
}