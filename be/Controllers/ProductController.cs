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

        IEnumerable<ProductEntity>? productEntities = null;
        int Total = 0;

        if (productGetModel.Slug == null)
        {
            Total = await _context.Product.CountAsync();
        }
        else
        {
            Total = await _context.Product.Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).CountAsync();
        }

        if (productGetModel.Slug == null)
        {
            productEntities = await _context.Product.
            Skip(productGetModel.Page * 20 - 20).
            Select(x => x).ToListAsync();

        }
        else
        {
            productEntities = await _context.Product
                 .Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).
                 Skip(productGetModel.Page * 20 - 20).
                 Select(x => x).ToListAsync();
        }



        return new ProductListModel
        {
            TotalPage = Total / 20 + (Total % 20 == 0 ? 0 : 1),
            Page = productGetModel.Page,
            ProductModels = [.. productEntities.Select(ProductModel.Converter)]
        };
    }

    [HttpGet("getid")]
    public async Task<ActionResult<ProductDetailModel?>?> GetProductById(string? id)
    {
        if (id == null)
        {
            throw new Exception("not found");
        }
        var productEntity = await _context.Product
        .Include(x => x.ProductVariantEntities)
        .Include(x => x.ImageEntities).
        Where(x => x.ProductId == id).FirstOrDefaultAsync();
        if (productEntity != null)
        {

            return ProductDetailModel.ConvertEntityToModel(productEntity);
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
                ImageUrl = productAddModel.ImageFiles[0],
                CategoryEntity = categoryEntity,
                Description = productAddModel.Description,
                MainPrice = productAddModel.MainPrice,
                ProductClassification = productAddModel.ProductClassification,
                NameProduct = productAddModel.NameProduct,
                Quality = productAddModel.Quality
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





