using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models.Location;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;


[ApiController]
[Route("/api/admin/location")]
public class LocationController(DatabaseContext context, ILogger<LocationController> logger) : ControllerBase
{
	private readonly DatabaseContext _context = context;
	private readonly ILogger<LocationController> _logger = logger;

	[HttpGet]
	[HasPermission(Permission.location, [ActionType.view])]
	public async Task<ActionResult> Get([FromQuery] string? locationId)
	{
		if (locationId == null)
		{
			var data = await _context
			.Location
			.AsNoTracking()
			.Where(x => x.Level.Equals(1))
			.OrderBy(x => x.LocationName)
			.ToArrayAsync();

			return Ok(data.Select(LocationGetAdminModel.Convert));
		}


		var children = await _context
			.Location
			.AsNoTracking()
			.Where(x => x.Parentlocation != null && x.Parentlocation.LocationId.Equals(locationId))
			.OrderBy(x => x.LocationName)
			.ToArrayAsync();

		return Ok(children.Select(LocationGetAdminModel.Convert));
	}





	[HttpPost]
	[HasPermission(Permission.location, [ActionType.add])]
	public async Task<ActionResult> Post(LocationPostAdminModel locationPost)
	{

		return Ok();
	}

	[HttpGet("Backup")]
	public async Task<ActionResult> Download()
	{
		var data = await _context
		.Location
		.AsNoTracking()
		.Include(x => x.Parentlocation)
		.OrderBy(x => x.LocationName)
		.ToArrayAsync();

		return Ok(data.Select(LocationBackupAdminModel.Convert));
	}



	[HttpPost("backupnew")]
	public async Task<ActionResult> ActionResult(List<LocationAdmin> locationAdmins)
	{
		foreach (var Itemlocation in locationAdmins)
		{
			var Parentlocation = await _context
				.Location
				.Where(x => x.LocationId.Equals(Itemlocation.ProvinceId))
				.FirstOrDefaultAsync();
			var Chilrenlocation = await _context
				.Location
				.Where(x => x.LocationId.Equals(Itemlocation.WardId))
				.FirstOrDefaultAsync();


			if (Parentlocation == null)
			{
				var tem = new LocationEntity
				{
					Level = 1,
					LocationName = Itemlocation.ProvinceName,
					LocationType = "Province",
					LocationId = Itemlocation.ProvinceId
				};
				await _context.Location.AddAsync(tem);
				await _context.SaveChangesAsync();
				continue;
			}
			if (Chilrenlocation == null)
			{
				var tem = new LocationEntity
				{
					Level = 2,
					LocationName = Itemlocation.WardName,
					LocationType = "Ward",
					LocationId = Itemlocation.WardId,
					Parentlocation = Parentlocation
				};
				await _context.Location.AddAsync(tem);
				await _context.SaveChangesAsync();
				continue;
			}
		}
		return Ok();
	}
}


