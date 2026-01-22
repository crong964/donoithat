using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;


[ApiController]
[Route("api/admin/user")]
public class UserController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    [HttpGet]
    [HasPermission(Permission.user, [ActionType.view])]
    public async Task<ActionResult> GetAll(UserGetModel? userGetModel)
    {

        var Query = userGetModel?.Query ?? "";
        var page = userGetModel?.Page ?? 1;
        var limit = 20;

        var query = from user in _context.User

                    join role in _context.Role on
                    user.RoleEntiry equals role into tempRoles
                    from tempRole in tempRoles

                    join order in _context.Order on
                    user.UserId equals order.UserEntity.UserId into tempOrders
                    from tempOrder in tempOrders.DefaultIfEmpty()

                    join account in _context.Account on
                    user.AccountEntity equals account into tempAccounts
                    from acc in tempAccounts.DefaultIfEmpty()

                    group tempOrder by new
                    {
                        user.UserId,
                        user.FullName,
                        user.PhoneNumber,
                        tempRole.RoleId,
                        acc.Account
                    } into Result

                    where Result.Key.RoleId.Equals("user")
                    && (EF.Functions.Like(Result.Key.FullName, "%" + Query + "%") ||
                    EF.Functions.Like(Result.Key.Account, "%" + Query + "%"))
                    select new
                    {
                        Result.Key.FullName,
                        Result.Key.PhoneNumber,
                        Result.Key.UserId,
                        Result.Key.Account,
                        CountOrder = Result.Count(x => x != null)
                    };
        var Total = await query.CountAsync();
        var TotalPage = Total / limit + (Total % limit == 0 ? 0 : 1);
        var Page = page;
        var TotalItem = Total;

        return Ok(new
        {
            Data = query.Skip(page * limit - limit).Take(limit),
            TotalPage,
            Page,
            Query
        });
    }


    [HttpPost]
    [HasPermission(Permission.user, [ActionType.add])]
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



    [HttpGet("backup")]
    [HasPermission(Permission.user, [ActionType.download])]
    public async Task<ActionResult> GetBackupUser()
    {
        var uses = await _context.User
        .AsNoTracking()
        .Include(x => x.AccountEntity)
        .Include(x => x.RoleEntiry)
        .Select(x => UserBackupModel.Convert(x, x.AccountEntity))
        .ToArrayAsync();

        return Ok(uses);
    }

    [HttpPost("backup")]
    [HasPermission(Permission.user, [ActionType.upload])]
    public async Task<ActionResult> PostBackupUser(List<UserBackupModel> userBackupModels)
    {
        var roleUser = await _context.Role.Where(x => x.RoleId.Equals("user")).FirstOrDefaultAsync();
        if (roleUser == null)
        {
            return BadRequest(new { message = "Ko có role user" });
        }
        foreach (var item in userBackupModels)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var accountEntity = await _context.Account.Where(x => x.Account.Equals(item.Account)).FirstOrDefaultAsync();
                if (accountEntity != null)
                {
                    await transaction.CommitAsync();
                    continue;
                }

                accountEntity = new AccountEntity
                {
                    Account = item.Account,
                    Password = item.Password
                };

                await _context.Account.AddAsync(accountEntity);
                var user = new UserEntity
                {
                    UserId = item.UserId,
                    AccountEntity = accountEntity,
                    FullName = item.FullName,
                    PhoneNumber = item.PhoneNumber,
                    RoleEntiry = roleUser
                };
                await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (System.Exception)
            {

                await transaction.RollbackAsync();
            }

        }
        return Ok();
    }

}