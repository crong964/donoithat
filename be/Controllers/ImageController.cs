using be.Entity;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers;



[ApiController]
[Route("api/admin/image")]
public class ImageController(DatabaseContext context, ILogger<ImageController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<ImageController> _logger = logger;


    [HttpPost("upload")]
    [RequestSizeLimit(100_000_000_000_000)]
    public async Task<ActionResult<List<string>>> Upload(List<IFormFile> ImageFiles)
    {
        List<string> ls = [];
        var dir = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        foreach (var formFile in ImageFiles)
        {
            if (formFile.Length > 0)
            {
                // var filePath = Path.GetTempFileName();
                var slip = formFile.FileName.Split(".");
                if (slip != null && slip.Length >= 2)
                {
                    var filename = DateTime.Now.Ticks + Path.GetExtension(formFile.FileName);
                    var filePath = dir + filename;
                    ls.Add(filename);

                    using var stream = System.IO.File.Create(filePath);
                    await formFile.CopyToAsync(stream);
                }
            }
        }

        return ls;
    }


    [HttpPost("remove")]
    [RequestSizeLimit(100_000_000_000_000)]
    public ActionResult<string> Remove(string nameFiles)
    {
        var dir = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        var dirDs = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        var sourceFileName = dir + nameFiles;
        var destFileName = dirDs + nameFiles;
        try
        {
            System.IO.File.Copy(sourceFileName, destFileName);
        }
        catch (System.Exception)
        {
        }
        return "";
    }


}