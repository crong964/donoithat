using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/brand")]
public class BrandController(DatabaseContext context, ILogger<BrandController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<BrandController> _logger = logger;

    [HttpGet]

    public async Task<ActionResult> GetAll()
    {
        var ls = await _context
        .Brand
        .AsNoTracking()
        .Select(x => BrandGetModel.Covert(x))
        .ToArrayAsync();
        return Ok(ls);
    }
}