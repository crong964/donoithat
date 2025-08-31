using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace be.Service.Implement;


public class UserService : IUserService
{
    public string GetUserId(HttpContext context)
    {
        var tokenStorage = context.Request.Headers.Authorization;
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(tokenStorage[0]?.Replace("Bearer ", ""));

        return token.Claims.First(claim => claim.Type == "id").Value;
    }
}



