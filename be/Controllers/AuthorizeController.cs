using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using NuGet.Protocol;

namespace be.Controllers;

[Authorize]
[ApiController]
[Route("/api/token")]
public class AuthorizeController(DatabaseContext context, ILogger<AuthorizeController> logger,
IConfiguration config) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<AuthorizeController> _logger = logger;
    private readonly IConfiguration _config = config;


    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<string>> Login(LoginModel loginModel)
    {
        var domain = _config.GetValue<string>("JWT:Web") ?? "";
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
        var user = await _context.User.Include(x => x.RoleEntiry)
        .Where(x => x.AccountEntity == account).FirstOrDefaultAsync();

        if (user == null)
        {
            return BadRequest(new { message = "Tài khoản không tồn tại" });
        }
        var id = user.UserId;

        var authClaims = new List<Claim>
           {
              new("id", id),
              new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
              new("permissionUser",user.RoleEntiry.Permission),
              new("role",user.RoleEntiry.RoleId),
           };
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("JWT:Secret") ?? ""));
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
        _logger.LogInformation(id);
        var user = await _context.User.Where(x => x.UserId == id).FirstOrDefaultAsync();

        var permissionUser = token.Claims.First(claim => claim.Type == "permissionUser").Value;
        if (user == null)
        {
            return NotFound(new { message = "không có" });
        }
        return Ok(UserInforModel.Convert(user));
    }


    [HttpGet("d")]
    [HasPermission(Permission.category, [ActionType.add, ActionType.add])]
    public async Task<ActionResult> G()
    {
        var tokenStorage = HttpContext.Request.Headers.Authorization;
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(tokenStorage[0]?.Replace("Bearer ", ""));
        var id = token.Claims.First(claim => claim.Type == "id").Value;
        var role = token.Claims.First(claim => claim.Type == "role").Value;

        var user = await _context.User.Where(x => x.UserId == id).FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound(new { message = "" });
        }
        return Ok(UserInforModel.Convert(user));
    }
}


public class HasPermissionAttribute : TypeFilterAttribute
{
    public HasPermissionAttribute(string function, string[] permissions)
        : base(typeof(PermissionFilter))
    {
        Arguments = [function, permissions];
    }
}


public class PermissionFilter(string function, string[] permissions) : IAuthorizationFilter
{
    private readonly string[] _permissions = permissions;
    private readonly string _function = function;
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        // Chưa đăng nhập
        if (user is null || user.Identity is null || !user.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        var role = context.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
        var permissionUser = context.HttpContext.User.FindFirst("permissionUser")?.Value;
        var exp = context.HttpContext.User.FindFirst("exp")?.Value;
        if (role is null || role.Equals("user") || permissionUser is null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        if (role.Equals("superadmin"))
        {
            return;
        }
        var permissionDis = new HashSet<string>();
        foreach (var item in _permissions)
        {
            permissionDis.Add(_function + "." + item);
        }
        var permissionUserLs = permissionUser.Split(" ");

        foreach (var item in permissionUserLs)
        {
            if (permissionDis.Contains(item))
            {
                return;
            }
        }

        context.Result = new UnauthorizedResult();
        return;

    }
}