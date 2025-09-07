
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace be.Controllers;


[ApiController]
[Route("api/category")]
public class CategoryController(ILogger<CategoryController> logger, DatabaseContext context)
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<CategoryController> _logger = logger;


    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryModel>>> GetAll(CategoryGet? categoryGet)
    {
        IEnumerable<CategoryEntity>? ls = null;
        if (categoryGet == null)
        {
            ls = await _context.Category
                               .Where(x => x.CategoryParent == null)
                               .Include(x => x.CategoryChidlren)
                                .OrderBy(x => x.Index)
                                .ToListAsync();
        }
        else
        {
            ls = await _context.Category.
            Where(x => x.CategoryParent == null && x.Status == categoryGet.Status).
            Include(x => x.CategoryChidlren)
                      .OrderBy(x => x.Index)
                      .ToListAsync();
        }


        var lsmodel = new List<CategoryModel>();

        foreach (var item in ls)
        {
            var categoryModel = ConvertEntityToModel.Converter(item);
            lsmodel.Add(categoryModel);

        }
        return lsmodel;
    }



}

