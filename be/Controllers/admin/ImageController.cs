using System.Threading.Tasks;
using be.Entity;
using be.Enums;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;



[ApiController]
[Route("api/admin/[controller]")]
public class ImageController(DatabaseContext context, ILogger<ImageController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<ImageController> _logger = logger;


    [HttpGet]
    public async Task<ActionResult> Get([FromQuery] ImageQueryGetAdminModel imageQuery)
    {
        var curPage = imageQuery.CurPage;
        var limit = 40;
        var images = await _context.Image.Skip((curPage - 1) * 40).Take(limit).ToListAsync();
        var totalPage = await _context.Image.CountAsync();
        return Ok(new { images, totalPage, curPage });
    }



    [HttpPost("upload")]
    [RequestSizeLimit(100_000_000_000_000)]
    [HasPermission(Permission.image, [ActionType.add])]
    public async Task<ActionResult<List<string>>> Upload(ImageModel imageModel)
    {
        List<string> ls = [];
        List<ImageEntity> images = [];
        var dir = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        int i = 0;
        foreach (var formFile in imageModel.ImageFiles)
        {
            if (formFile.Length > 0)
            {

                // var filePath = Path.GetTempFileName();
                var slip = formFile.FileName.Split(".");
                if (slip != null && slip.Length >= 2)
                {
                    var filename = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + i + Path.GetExtension(formFile.FileName);
                    var filePath = dir + filename;
                    ls.Add(filename);
                    i += 1;
                    images.Add(new ImageEntity
                    {
                        ImageFiles = filename,
                        ImagePath = "http://localhost:2000/sta/" + filename
                    });
                    using var stream = System.IO.File.Create(filePath);
                    await formFile.CopyToAsync(stream);
                }
            }
        }
        try
        {
            await _context.Image.AddRangeAsync(images);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            return BadRequest(new { message = "lỗi" });
        }
        return Ok(ls);
    }


    [HttpPost("remove")]
    [RequestSizeLimit(100_000_000_000_000)]
    [HasPermission(Permission.image, [ActionType.delete])]
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