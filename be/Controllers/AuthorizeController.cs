using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace be.Controllers;

[Authorize]
[ApiController]
[Route("/api/token")]
public class AuthorizeController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<string>> Login(LoginModel loginModel)
    {
        var domain = "https://localhost:2000";
        var key = "ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM";


        var account = await _context.Account.
        Where(x => x.Account == loginModel.Account
        ).FirstOrDefaultAsync();

        if (account == null)
        {
            return BadRequest(new { message = "Tài khoản không tồn tại" });
        }
        if (!account.Password.Equals(loginModel.Password))
        {
            return BadRequest(new { message = "Mật khẩu không đúng" });
        }
        var user = await _context.User.Where(x => x.AccountEntity == account).FirstOrDefaultAsync();

        if (user == null || !account.Account.Equals("admin"))
        {
            return BadRequest(new { message = "Tài khoản không tồn tại" });
        }
        var id = user.UserId ?? account.Account;
        var role = user.Role ?? "admin";
        var authClaims = new List<Claim>
           {
              new("id", id),
              new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
              new(ClaimTypes.Role,role),
           };
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = domain,
            Audience = domain,
            Expires = DateTime.UtcNow.AddHours(24 * 7),
            SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
            Subject = new ClaimsIdentity(authClaims)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }


    [HttpGet("infor")]
    public async Task<ActionResult> UserInfor()
    {

        var tokenStorage = HttpContext.Request.Headers.Authorization;
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(tokenStorage[0]?.Replace("Bearer ", ""));
        var id = token.Claims.First(claim => claim.Type == "id").Value;

        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "" });
        }
        return Ok(UserInforModel.Convert(user));
    }
}


public class HasPermissionAttribute : TypeFilterAttribute
{
    public HasPermissionAttribute(string permission)
        : base(typeof(PermissionFilter))
    {
        Arguments = [permission];
    }
}


public class PermissionFilter(string permission) : IAuthorizationFilter
{
    private readonly string _permission = permission;

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        // Chưa đăng nhập
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        if (!user.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        // Không có quyền
        if (!user.HasClaim("Permission", _permission))
        {
            context.Result = new ForbidResult();
        }
    }
}