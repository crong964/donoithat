using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models;
using be.Models.User.Employee;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;


[ApiController]
[Route("api/admin/employee")]
public class EmployeeController(DatabaseContext context, DbContextOptions<DatabaseContext> options, ILogger<EmployeeController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly DbContextOptions<DatabaseContext> _options = options;
    private readonly ILogger<EmployeeController> _logger = logger;

    [HttpGet]
    [HasPermission(Permission.employee, [ActionType.view])]
    public async Task<ActionResult> GetAll([FromQuery] EmployeeQueryAdminModel? queyModel)
    {
        var roleId = queyModel?.RoleId ?? "";
        _logger.LogInformation(roleId);
        var employee = await _context
        .User
        .Include(x => x.RoleEntiry)
        .Include(x => x.AccountEntity)
        .Where(x => !x.RoleEntiry.RoleId.Equals("user") && !x.RoleEntiry.RoleId.Equals("superadmin") &&
                EF.Functions.Like(x.RoleEntiry.RoleId, "%" + roleId + "%"))
        .Select(x => EmployeeGetAdminModel.Convert(x))
        .ToArrayAsync();

        return Ok(employee);
    }

    [HttpGet("{id}")]
    [HasPermission(Permission.employee, [ActionType.view])]
    public async Task<ActionResult> GetById(string id)
    {
        var employee = await _context
        .User
        .Include(x => x.RoleEntiry)
        .Include(x => x.AccountEntity)
        .AsNoTracking()
        .Where(x => x.UserId.Equals(id))
        .Select(x => EmployeePatchAdminModel.Convert(x))
        .FirstOrDefaultAsync();

        return Ok(employee);
    }


    [HttpGet("role")]
    [HasPermission(Permission.employee, [ActionType.view])]
    public async Task<ActionResult> GetAllRole()
    {
        var ls = await _context.Role.AsNoTracking()
        .Where(x => !x.RoleId.Equals("user") && !x.RoleId.Equals("superadmin"))
        .ToArrayAsync();
        return Ok(ls);
    }

    [HttpPost]
    [HasPermission(Permission.employee, [ActionType.add])]
    public async Task<ActionResult<string>> CreateUser(EmployeeAddAdminModel employeeAddAdmin)
    {
        var role = await _context.Role.Where(x => x.RoleId.Equals(employeeAddAdmin.RoleId)).FirstOrDefaultAsync();
        var acc = await _context.Account.Where(x => x.Account.Equals(employeeAddAdmin.Account)).FirstOrDefaultAsync();

        if (acc != null)
        {
            return BadRequest(new { message = "Có tài khoản này" });
        }
        if (role == null)
        {
            return BadRequest(new { message = "Không có role này" });
        }
        var trasaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var account = new AccountEntity
            {
                Account = employeeAddAdmin.Account,
                Password = employeeAddAdmin.Password
            };
            await _context.Account.AddAsync(account);

            var user = new UserEntity
            {
                AccountEntity = account,
                FullName = employeeAddAdmin.FullName,
                PhoneNumber = employeeAddAdmin.PhoneNumber,
                RoleEntiry = role,
            };
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            await trasaction.CommitAsync();
        }
        catch (System.Exception e)
        {
            _logger.LogError(e.Message);
            await trasaction.RollbackAsync();
            return BadRequest(new { message = "Thêm không thành công" });
        }
        return Ok(new { message = "Thêm thành công" });
    }


    [HttpPatch]
    [HasPermission(Permission.employee, [ActionType.update])]
    public async Task<ActionResult<string>> PatchUser(EmployeePatchAdminModel employeeAddAdmin)
    {
        var role = await _context.Role.Where(x => x.RoleId.Equals(employeeAddAdmin.RoleId)).FirstOrDefaultAsync();
        var acc = await _context.Account.Where(x => x.Account.Equals(employeeAddAdmin.Account)).FirstOrDefaultAsync();
        var user = await _context.User.Where(x => x.UserId.Equals(employeeAddAdmin.UserId)).FirstOrDefaultAsync();


        if (acc == null || user == null)
        {
            return BadRequest(new { message = "Không có tài khoản này" });
        }
        if (role == null)
        {
            return BadRequest(new { message = "Không có role này" });
        }

        if (employeeAddAdmin.Password.Length > 0)
        {
            acc.Password = employeeAddAdmin.Password;
        }
        user.PhoneNumber = employeeAddAdmin.PhoneNumber;
        user.FullName = employeeAddAdmin.FullName;
        user.RoleEntiry = role;

        await _context.SaveChangesAsync();
        return Ok();
    }




    [HttpGet("backup")]
    [HasPermission(Permission.employee, [ActionType.download])]
    public async Task<ActionResult> Download()
    {

        var employees = await _context
        .User
        .Include(x => x.RoleEntiry)
        .Include(x => x.AccountEntity)
        .Where(x => !x.RoleEntiry.RoleId.Equals("user"))
        .Select(x => EmployeeBackupAdminModel.Convert(x))
        .ToArrayAsync();
        return Ok(employees);
    }


    [HttpPost("backup")]
    [HasPermission(Permission.employee, [ActionType.upload])]
    public async Task<ActionResult> Upload(Collection<EmployeeBackupAdminModel> employees)
    {
        try
        {
            using var ctx = new DatabaseContext(_options);
            ctx.ChangeTracker.AutoDetectChangesEnabled = false;

            var roleIds = employees.Select(x => x.RoleId).Distinct().ToList();
            var roles = await ctx.Role
                .Where(r => roleIds.Contains(r.RoleId))
                .ToDictionaryAsync(r => r.RoleId);

            foreach (var item in employees)
            {
                if (!roles.TryGetValue(item.RoleId, out var role))
                    return BadRequest(new { message = "Thiếu dữ liệu phân quyền" });

                ctx.User.Add(new UserEntity
                {
                    UserId = item.UserId,
                    FullName = item.FullName,
                    PhoneNumber = item.PhoneNumber,
                    RoleEntiry = role,
                    AccountEntity = new AccountEntity
                    {
                        Account = item.Account,
                        Password = item.Password
                    }
                });
            }
            await ctx.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Backup employee failed");
            return BadRequest(new { message = "Backup thất bại" });
        }
    }

}