using System.Collections.Immutable;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace be.Controllers.admin;

[ApiController]
[Route("api/admin/product")]
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
            Skip(productGetModel.Page * limit - limit).Take(limit).
            Select(x => x).ToListAsync();
        }
        else
        {
            productEntities = await _context.Product
                 .Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
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
    public async Task<ActionResult<ProductDetailModel>> GetProductById(string? slug)
    {

        if (slug == null)
        {
            throw new Exception("not found");
        }
        var productEntity = await _context.Product
        .Include(x => x.CategoryEntity)
        .Include(x => x.ProductVariantEntities)
        .Include(x => x.ImageEntities).
        Where(x => x.Slug == slug).FirstOrDefaultAsync();
        if (productEntity != null)
        {
            return ProductDetailModel.ConvertEntityToModel(productEntity);
        }
        throw new Exception("not found");
    }

    [HttpGet("getProductBySlugAndRelated")]
    public async Task<ActionResult<RelatedProductsModel>> GetProductBySlug(string? slug)
    {

        if (slug == null)
        {
            throw new Exception("not found");
        }
        var productEntity = await _context.Product
        .Include(x => x.CategoryEntity)
        .Include(x => x.ProductVariantEntities)
        .Include(x => x.ImageEntities).
        Where(x => x.Slug == slug).FirstOrDefaultAsync();


        if (productEntity != null)
        {
            var productEntities = await _context.Product.
            Where(x => x.CategoryEntity.Slug == productEntity.CategoryEntity.Slug && x.ProductId != productEntity.ProductId)
            .ToArrayAsync();



            return RelatedProductsModel.ConvertEntityToModel(productEntity, productEntities);
        }
        throw new Exception("not found");
    }

    [HttpPost]
    public async Task<ActionResult<string>> AddProduct(ProductAddModel productAddModel)
    {
        List<string> ls = [];

        var dir = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        var dirDs = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        foreach (var nameFiles in productAddModel.ImageFiles)
        {
            var sourceFileName = dir + nameFiles;
            var destFileName = dirDs + nameFiles;
            try
            {
                System.IO.File.Copy(sourceFileName, destFileName);
            }
            catch (System.Exception)
            {
            }
        }
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var categoryEntity = await _context.Category
            .Where(x => x.Slug == productAddModel.TypeProduct).SingleOrDefaultAsync() ?? throw new Exception("not found category");

            var mainProduct = new ProductEntity
            {
                Suplier = productAddModel.Suplier,
                ImageUrl = productAddModel.ImageFiles[0],
                CategoryEntity = categoryEntity,
                Description = productAddModel.Description,
                MainPrice = productAddModel.MainPrice,
                ProductClassification = productAddModel.ProductClassification,
                NameProduct = productAddModel.NameProduct,
                Quality = productAddModel.Quality,
                Slug = productAddModel.Slug
            };
            await _context.Product.AddAsync(mainProduct);
            foreach (var item in productAddModel.ImageFiles)
            {
                var imageEntity = new ImageEntity
                {
                    ImageFiles = item,
                    ProductEntity = mainProduct
                };
                await _context.Image.AddAsync(imageEntity);
            }
            foreach (var item in productAddModel.ProductVariants)
            {
                var productVariantEntity = new ProductVariantEntity
                {
                    ProductVariantName = mainProduct.NameProduct,
                    Image = item.Image,
                    Price = item.Price,
                    ProductEntity = mainProduct,
                    Quality = item.Quality,
                    VariantId = item.VariantId,
                    VariantName = item.VariantName,
                    Position = item.Position,
                    Weight = item.Weight,
                };
                _logger.LogInformation(productVariantEntity.ProductVariantId);
                await _context.ProductVariant.AddAsync(productVariantEntity);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (System.Exception e)
        {
            _logger.LogError(e.Message);
            await transaction.RollbackAsync();
            foreach (var file in ls)
            {
                _logger.LogError(e.Message);
                try
                {
                    System.IO.File.Delete(dir + file);
                }
                catch (System.Exception)
                {
                    _logger.LogError("không có url ảnh 2");

                }
            }

        }

        return "";
    }



    [HttpPost("addProducts_test")]
    public async Task<ActionResult<string>> AddProducts(IEnumerable<ProductAddModel> productAddModels)
    {

        foreach (var productAddModel in productAddModels)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var categoryEntity = await _context.Category
                .Where(x => x.Slug == productAddModel.TypeProduct).SingleOrDefaultAsync() ?? throw new Exception("not found category");

                var mainProduct = new ProductEntity
                {

                    Slug = productAddModel.Slug,
                    Suplier = productAddModel.Suplier,
                    CategoryEntity = categoryEntity,
                    Description = productAddModel.Description,
                    MainPrice = productAddModel.MainPrice,
                    ProductClassification = productAddModel.ProductClassification,
                    NameProduct = productAddModel.NameProduct,
                    Quality = productAddModel.Quality,
                    ImageUrl = productAddModel.ImageFiles[0]
                };
                await _context.Product.AddAsync(mainProduct);
                foreach (var item in productAddModel.ImageFiles)
                {
                    var imageEntity = new ImageEntity
                    {
                        ImageFiles = item,
                        ProductEntity = mainProduct
                    };
                    await _context.Image.AddAsync(imageEntity);
                }
                foreach (var item in productAddModel.ProductVariants)
                {
                    var productVariantEntity = new ProductVariantEntity
                    {
                        ProductVariantId = item.ProductVariantId,
                        ProductVariantName = mainProduct.NameProduct,
                        Image = item.Image,
                        Price = item.Price,
                        ProductEntity = mainProduct,
                        Quality = item.Quality,
                        VariantId = item.VariantId,
                        VariantName = item.VariantName,
                        Position = item.Position,
                        Weight = item.Weight,
                    };
                    await _context.ProductVariant.AddAsync(productVariantEntity);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (System.Exception e)
            {
                _logger.LogError(e.Message);
                await transaction.RollbackAsync();
            }

        }

        return "";
    }



}





