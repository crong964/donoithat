using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/admin/role")]
public class RoleController(DatabaseContext context, ILogger<RoleController> logger) : ControllerBase
{
	private readonly DatabaseContext _context = context;
	private readonly ILogger<RoleController> _logger = logger;


	[HttpGet]
	[HasPermission(Permission.role, [ActionType.view])]
	public async Task<ActionResult> Get()
	{
		var roleEntiries = await _context
		.Role
		.Where(x => !x.RoleId.Equals("user") && !x.RoleId.Equals("superadmin"))
		.ToListAsync();
		return Ok(roleEntiries);
	}

	[HttpGet("{id}")]
	[HasPermission(Permission.role, [ActionType.view])]
	public async Task<ActionResult> GetById(string id)
	{
		var roleEntiry = await _context.Role.Where(x => x.RoleId == id).FirstOrDefaultAsync();
		return Ok(roleEntiry);
	}

	[HttpPost]
	[HasPermission(Permission.role, [ActionType.add])]
	public async Task<ActionResult> Add(RoleEntiry roleEntiry)
	{
		await _context.Role.AddAsync(roleEntiry);
		await _context.SaveChangesAsync();

		return Ok();
	}


	[HttpPatch]
	[HasPermission(Permission.role, [ActionType.update])]
	public async Task<ActionResult> Update(RoleEntiry roleEntiry)
	{

		_context.Role.Update(roleEntiry);
		await _context.SaveChangesAsync();
		return Ok();
	}


	[HttpDelete]
	public async Task<ActionResult> Delete(RoleEntiry roleEntiry)
	{
		_context.Role.Remove(roleEntiry);
		await _context.SaveChangesAsync();
		return Ok();
	}
}