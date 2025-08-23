using be.Entity;
using be.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/[controller]")]

public class WeatherForecastController(ILogger<WeatherForecastController> logger,
DatabaseContext context, IProductService productService) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<WeatherForecastController> _logger = logger;
    private readonly IProductService _productService = productService;

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<WeatherForecast>>> Get()
    {

        return await _context.WeatherForecastItems
            .Select(x => x).ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<WeatherForecast>> GetById(int id)
    {

        var item = await _context.WeatherForecastItems.FindAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        return item;
    }



    [HttpPost("dsd")]
    [RequestSizeLimit(100_000_000_000_000)]
    public async Task<ActionResult<string>> Post(List<IFormFile> files)
    {
        // _context.WeatherForecastItems.Add(todoItem);
        // _logger.LogInformation("vào");
        // await _context.SaveChangesAsync();
        // return CreatedAtAction(nameof(Get), new { id = todoItem.Id }, todoItem);

        List<string> ls = [];
        foreach (var formFile in files)
        {
            if (formFile.Length > 0)
            {
                // var filePath = Path.GetTempFileName();
                var slip = formFile.FileName.Split(".");
                if (slip != null && slip.Length >= 2)
                {
                    var filename = DateTime.Now.Ticks + "." + Path.GetExtension(formFile.FileName);
                    var filePath = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/" + filename;
                    ls.Add(filename);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }
        }

        return "";
    }


    [HttpGet("test")]
    public int GetTest()
    {
        return _productService.GetProduct();
    }

    
    // [HttpPost(Name = "upload")]
    // [RequestSizeLimit(100_000_000_000_000)]
    // public async Task<ActionResult<string>> Uploadfile(List<IFormFile> files)
    // {

    //     List<string> ls = [];
    //     foreach (var formFile in files)
    //     {
    //         if (formFile.Length > 0)
    //         {
    //             // var filePath = Path.GetTempFileName();
    //             var slip = formFile.FileName.Split(".");
    //             if (slip != null && slip.Length >= 2)
    //             {
    //                 var filename = DateTime.Now.Ticks + "." + Path.GetExtension(formFile.FileName);
    //                 var filePath = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/" + filename;
    //                 ls.Add(filename);

    //                 using (var stream = System.IO.File.Create(filePath))
    //                 {
    //                     await formFile.CopyToAsync(stream);
    //                 }
    //             }
    //         }
    //     }

    //     return "";
    // }
}
