using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models.Location;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("/api/location")]
public class LocationController(DatabaseContext context, ILogger<LocationController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<LocationController> _logger = logger;

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
}


