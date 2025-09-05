
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace be.Controllers.admin;


[ApiController]
[Route("api/admin/category")]
public class CategoryController(ILogger<CategoryController> logger, DatabaseContext context)
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<CategoryController> _logger = logger;


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
                Slug = item.Id
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
            ls = await _context.Category
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

    [HttpPost]
    public async Task<ActionResult<string>> Add(CategoryAddModel categoryModel)
    {
        if (categoryModel == null)
        {
            return "";
        }
        var count = await _context.Category.Where(x => x.CategoryParent == null).CountAsync();
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var category = new CategoryEntity
            {
                NameCategory = categoryModel.NameCategory,
                Index = count,
                Slug = categoryModel.Slug
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
        catch (System.Exception)
        {

            await transaction.RollbackAsync();
        }
        return "";
    }

    [HttpPatch]
    public async Task<ActionResult<string>> Update(CategoryUpdateModel categoryUpdateModel)
    {
        var category = await _context.Category.FindAsync(new Guid(categoryUpdateModel.CategoryId)) ?? throw new Exception("not found");
        category.NameCategory = categoryUpdateModel.NameCategory;
        category.Slug = categoryUpdateModel.Slug;
        category.CategoryId = categoryUpdateModel.CategoryId;
        category.Status = categoryUpdateModel.Status;
        _context.Update(category);
        await _context.SaveChangesAsync();
        return "ok";
    }

    [HttpPatch("swap")]
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
    public async Task<ActionResult<string>> Add(CategoryAddChildrcModel categoryAddChidlren)
    {
        var category = await _context.Category
        .Include(x => x.CategoryChidlren)
        .Where(x => x.Slug.Equals(categoryAddChidlren.ParentSlug) && x.CategoryParent == null)
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
    public async Task<ActionResult<CategoryModel>> Delete(CategoryDeleteModel CategorySlug)
    {
        var category = await _context.Category.Where(x => x.Slug.Equals(CategorySlug.Slug)).FirstOrDefaultAsync();
        if (category == null)
        {
            throw new Exception("not found");
        }
        return ConvertEntityToModel.Converter(category);
    }



}

