
using be.Entity;
using be.Enums;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace be.Controllers.admin;


[ApiController]
[Route("api/admin/category")]
public class CategoryController(ILogger<CategoryController> logger, DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<CategoryController> _logger = logger;




    [HttpGet]
    [HasPermission(Permission.category, [ActionType.view])]
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
            ls = await _context
                    .Category
                    .Where(x => x.CategoryParent == null && x.Status == categoryGet.Status)
                    .Include(x => x.CategoryChidlren)
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

    [HttpGet("id")]
    [HasPermission(Permission.category, [ActionType.view])]
    public async Task<ActionResult> GetById(string categoryId)
    {
        var category = await _context.Category.Include(x => x.CategoryChidlren).

        Where(x => x.CategoryId == categoryId).FirstOrDefaultAsync();
        if (category == null)
        {
            return NotFound();
        }

        return Ok(ConvertEntityToModel.Converter(category));
    }


    [HttpGet("product")]
    [HasPermission(Permission.product, [ActionType.view])]
    public async Task<ActionResult<IEnumerable<CategoryModel>>> GetProductAll()
    {
        IEnumerable<CategoryEntity>? ls = null;
        ls = await _context.Category.ToListAsync();
        var lsmodel = new List<CategoryModel>();

        foreach (var item in ls)
        {
            var categoryModel = ConvertEntityToModel.Converter(item);
            lsmodel.Add(categoryModel);

        }
        return lsmodel;
    }

    [HttpPost]
    [HasPermission(Permission.category, [ActionType.add])]
    public async Task<ActionResult> Add(CategoryAddModel categoryModel)
    {
        if (categoryModel.CategoryImage != null)
        {
            categoryModel.CategoryImage = "http://localhost:2000/sta/" + categoryModel.CategoryImage;
        }
        // if (categoryModel.CategoryImage != null)
        // {
        //     var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        //     var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        //     var sourceFileName = tmp + categoryModel.CategoryImage;
        //     var destFileName = sta + categoryModel.CategoryImage;
        //     try
        //     {
        //         System.IO.File.Move(sourceFileName, destFileName);
        //         categoryModel.CategoryImage = "http://localhost:2000/sta/" + categoryModel.CategoryImage;
        //     }
        //     catch (System.Exception e)
        //     {
        //         _logger.LogError(e.Message);

        //     }
        // }

        if (categoryModel == null)
        {
            return BadRequest(new { mess = "Chuyển thất bại" });
        }
        var count = await _context.Category.Where(x => x.CategoryParent == null).CountAsync();
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var category = new CategoryEntity
            {
                NameCategory = categoryModel.NameCategory,
                Index = count,
                Slug = categoryModel.Slug,
                CategoryImage = categoryModel.CategoryImage
            };
            await _context.Category.AddAsync(category);
            if (categoryModel.CategoryChidlren != null)
            {
                int i = 0;
                foreach (var item in categoryModel.CategoryChidlren)
                {
                    var categorychi = new CategoryEntity
                    {
                        NameCategory = item.NameCategory,
                        Slug = item.Slug,
                        Index = i,
                        CategoryParent = await _context.Category.FindAsync(category.CategoryId)
                    };
                    await _context.Category.AddAsync(categorychi);
                    i++;
                }
            }
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (System.Exception e)
        {
            await transaction.RollbackAsync();
            return BadRequest(new { message = e.Message });
        }
        return Ok();
    }


    [HttpPatch]
    [HasPermission(Permission.category, [ActionType.update])]
    public async Task<ActionResult<string>> Update(CategoryUpdateModel categoryUpdateModel)
    {
        var category = await _context.Category.FindAsync(categoryUpdateModel.CategoryId);
        if (category == null)
        {
            return NotFound();
        }
        if (categoryUpdateModel.CategoryImage != null)
        {
            // try
            // {
            //     var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
            //     var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
            //     var sourceFileName = tmp + categoryUpdateModel.CategoryImage;
            //     var destFileName = sta + categoryUpdateModel.CategoryImage;
            //     System.IO.File.Move(sourceFileName, destFileName);
            // }
            // catch (System.Exception)
            // {


            // }
            categoryUpdateModel.CategoryImage = "http://localhost:2000/sta/" + categoryUpdateModel.CategoryImage;
            var image = category.CategoryImage?.Replace("http://localhost:2000/sta/", "");
            try
            {
                // if (image != null && image.Length > 0)
                // {
                //     var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
                //     var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
                //     var sourceFileName = tmp + image;
                //     var destFileName = sta + image;
                //     System.IO.File.Move(destFileName, sourceFileName);
                // }

                var imageEntity = await _context.Image.FindAsync(image);
                if (imageEntity != null)
                {
                    _context.Remove(imageEntity);
                    await _context.SaveChangesAsync();
                }

            }
            catch (System.Exception)
            {


            }
        }

        category.NameCategory = categoryUpdateModel.NameCategory;
        category.Slug = categoryUpdateModel.Slug;
        category.CategoryImage = categoryUpdateModel.CategoryImage == null ? category.CategoryImage : categoryUpdateModel.CategoryImage;



        await _context.SaveChangesAsync();
        return "ok";
    }

    [HttpPatch("swap")]
    [HasPermission(Permission.category, [ActionType.update])]
    public async Task<ActionResult<string>> SwapCategory(CategorySwap categorySwap)
    {
        var category1 = await _context.Category
        .Include(x => x.CategoryParent)
        .Where(x => x.CategoryId.Equals(categorySwap.CategoryId1))
        .FirstOrDefaultAsync();

        var category2 = await _context
        .Category.Include(x => x.CategoryParent)
        .Where(x => x.CategoryId.Equals(categorySwap.CategoryId2))
        .FirstOrDefaultAsync();


        if (category1 == null || category2 == null)
        {
            throw new Exception("not found");
        }
        if (category1.CategoryParent == category2.CategoryParent)
        {
            (category2.Index, category1.Index) = (category1.Index, category2.Index);
            _context.Category.Update(category2);
            _context.Category.Update(category1);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("not same level");
        }
        return "ok";
    }


    [HttpPost("addchilred")]
    [HasPermission(Permission.category, [ActionType.add])]
    public async Task<ActionResult<string>> Add(CategoryAddChildrcModel categoryAddChidlren)
    {
        var category = await _context.Category
        .Include(x => x.CategoryChidlren)
        .Where(x => x.CategoryId == categoryAddChidlren.ParentId && x.CategoryParent == null)
        .FirstOrDefaultAsync();
        if (category == null)
        {
            throw new Exception("not found");

        }
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        var categoryChidlren = new CategoryEntity
        {
            NameCategory = categoryAddChidlren.NameCategory,
            Slug = categoryAddChidlren.Slug,
            Index = category.CategoryChidlren.Count,
            CategoryParent = category
        };
        if (categoryChidlren != null)
        {
            await _context.Category.AddAsync(categoryChidlren);
            await _context.SaveChangesAsync();
        }
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        return "ok";
    }

    [HttpDelete]
    [HasPermission(Permission.category, [ActionType.delete])]
    public async Task<ActionResult> Delete(CategoryDeleteModel CategorySlug)
    {

        var transaction = await _context.Database.BeginTransactionAsync();
        var category = await _context.Category
        .Where(x => x.CategoryId == CategorySlug.categoryId)
        .FirstOrDefaultAsync();

        var image = "";
        try
        {
            if (category != null)
            {
                var categorys = await _context.Category
                .Where(x => x.CategoryParent != null && x.CategoryParent.CategoryId == category.CategoryId)
                .ToArrayAsync();
                image = category.CategoryImage?.Replace("http://localhost:2000/sta/", "");

                _context.RemoveRange(categorys);
                _context.Remove(category);
                await _context.SaveChangesAsync();

            }
            await transaction.CommitAsync();
        }
        catch (System.Exception)
        {
            await transaction.RollbackAsync();
            return BadRequest();
        }
        try
        {
            if (image != null && image.Length > 0)
            {
                var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
                var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
                var sourceFileName = tmp + image;
                var destFileName = sta + image;
                System.IO.File.Move(destFileName, sourceFileName);
            }

            var imageEntity = await _context.Image.FindAsync(image);
            if (imageEntity != null)
            {
                _context.Remove(imageEntity);
                await _context.SaveChangesAsync();
            }

        }
        catch (System.Exception)
        {


        }
        return Ok();
    }


    [HttpPost("data_test")]
    public async Task<string> DataTestAsync(ICollection<CategoryTest> categoryTests)
    {
        int i = 0;
        foreach (var item in categoryTests)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var categoryParent = new CategoryEntity
            {
                NameCategory = item.Name,
                Index = i += 1,
                Slug = item.Id,
                CategoryImage = item.Image
            };
            await _context.Category.AddAsync(categoryParent);
            var j = 0;
            if (item.Con != null)
            {
                foreach (var itemCon in item.Con)
                {
                    var categoryChild = new CategoryEntity
                    {
                        NameCategory = itemCon.Name,
                        Index = j += 1,
                        Slug = itemCon.Id,
                        CategoryParent = categoryParent
                    };
                    await _context.Category.AddAsync(categoryChild);
                }
            }
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

        }
        return "";
    }


    [HttpGet("backup")]
    [HasPermission(Permission.category, [ActionType.download])]
    public async Task<ActionResult<CategoryBackupAdmin[]>> Backup()
    {
        var ls = await _context.Category
        .Include(x => x.CategoryParent)
        .Select(x => CategoryBackupAdmin.Convert(x)).ToArrayAsync();
        return Ok(ls);
    }


    [HttpPost("backup")]
    [HasPermission(Permission.category, [ActionType.upload])]
    public async Task<ActionResult> AddList(CategoryBackupAdmin[] categoryBackupAdmins)
    {

        int i = 0;
        try
        {

            foreach (var item in categoryBackupAdmins)
            {
                var transaction = await _context.Database.BeginTransactionAsync();

                var categoryParent = await _context.Category.Where(x => x.CategoryId == item.CategoryParentId).FirstOrDefaultAsync();
                var category = new CategoryEntity
                {
                    NameCategory = item.NameCategory,
                    Index = i += 1,
                    Slug = item.Slug,
                    CategoryImage = item.CategoryImage,
                    CategoryId = item.CategoryId,
                    Status = item.Status,
                    CategoryParent = categoryParent
                };
                await _context.Category.AddAsync(category);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }

        }
        catch (System.Exception)
        {

            return BadRequest();
        }
        return Ok();
    }
}

