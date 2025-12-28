using System.Collections.Immutable;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/product")]
public class ProductController(DatabaseContext context, ILogger<ProductController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<ProductController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<ProductListModel>> GetProductAll([FromQuery] ProductGetModel productGetModel)
    {

        int limit = 20;
        IEnumerable<ProductEntity>? productEntities = null;
        CategoryEntity? categoryEntity = null;

        int Total = 0;

        if (productGetModel.Slug == null || productGetModel.Slug == "all")
        {
            Total = await _context.Product.CountAsync();

        }
        else
        {
            categoryEntity = await _context.Category.Where(x => x.Slug == productGetModel.Slug).FirstOrDefaultAsync();
            Total = await _context.Product.Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).CountAsync();
        }

        if (productGetModel.Slug == null || productGetModel.Slug == "all")
        {

            productEntities = await _context.Product.
            Include(x => x.ImageEntities).
            Skip(productGetModel.Page * limit - limit).Take(limit).
            Select(x => x).ToListAsync();
        }
        else
        {
            productEntities = await _context.Product.
            Include(x => x.ImageEntities).
            Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).
                 Skip(productGetModel.Page * limit - limit).Take(limit).
                 Select(x => x).ToListAsync();
        }
        return new ProductListModel
        {
            TotalPage = Total / limit + (Total % limit == 0 ? 0 : 1),
            Page = productGetModel.Page,
            TotalItem = Total,
            ProductModels = [.. productEntities.Select(ProductModel.Converter)],
            NameCate = categoryEntity == null ? "" : categoryEntity.NameCategory

        };
    }


    [HttpGet("getProductBySlug")]
    public async Task<ActionResult<RelatedProductsModel>> GetProductBySlug(string? slug)
    {

        if (slug == null)
        {
            return BadRequest(new { mess = "Thiếu slug" });
        }
        var productEntity = await _context.Product
        .Include(x => x.CategoryEntity)
        .Include(x => x.ProductVariantEntities)
        .Include(x => x.ImageEntities).
        Where(x => x.Slug == slug).FirstOrDefaultAsync();


        if (productEntity != null)
        {
            var productEntities = await _context.Product
            .Include(x => x.ImageEntities).
            Where(x => x.CategoryEntity.Slug == productEntity.CategoryEntity.Slug && x.ProductId != productEntity.ProductId)
            .ToArrayAsync();



            return RelatedProductsModel.ConvertEntityToModel(productEntity, productEntities);
        }
        return BadRequest(new { mess = "Không có sản phẩm này" });
    }


    [HttpGet("searchQuickly")]
    public async Task<ActionResult<ProductListModel>> SearchQuicklyProduct(string? name)
    {

        if (name == null)
        {
            return BadRequest(new { mess = "Thiếu name" });
        }

        var productEntities = await _context.Product
        .Include(x => x.ImageEntities).
        Where(x => EF.Functions.Like(x.NameProduct, "%" + name.Replace(" ", "%") + "%"))
        .Take(20)
        .ToArrayAsync();

        var count = await _context.Product.
               Where(x => EF.Functions.Like(x.NameProduct, "%" + name.Replace(" ", "%") + "%"))
               .CountAsync();

        return new ProductListModel
        {
            ProductModels = [.. productEntities.Select(ProductModel.Converter)],
            NameCate = "",
            TotalItem = count
        };

    }

    [HttpGet("search")]
    public async Task<ActionResult<ProductListModel>> SearchProduct(string? title, int page = 1)
    {

        int limit = 20;
        IEnumerable<ProductEntity>? productEntities = null;
        if (title == null)
        {
            return BadRequest(new { mess = "Thiếu name" });
        }

        productEntities = await _context.Product
        .Include(x => x.ImageEntities)
        .Where(x => EF.Functions.Like(x.NameProduct, "%" + title.Replace(" ", "%") + "%"))
        .Skip(page * limit - limit).Take(limit)
        .ToArrayAsync();

        var count = await _context.Product
        .Where(x => EF.Functions.Like(x.NameProduct, "%" + title.Replace(" ", "%") + "%"))
        .CountAsync();

        return new ProductListModel
        {
            ProductModels = [.. productEntities.Select(ProductModel.Converter)],
            NameCate = "",
            TotalItem = count,
            Page = page
        };

    }

}





