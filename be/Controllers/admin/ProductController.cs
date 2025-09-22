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
    public async Task<ActionResult<ProductListModelInAmin>> GetProductAll([FromQuery] ProductGetModel productGetModel)
    {

        int limit = 40;
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
            Total = await _context.Product
            .Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug))
           .AsNoTracking()
           .CountAsync();
        }

        if (productGetModel.Slug == null || productGetModel.Slug == "all")
        {

            productEntities = await _context.Product.
            Include(x => x.CategoryEntity).
            Include(x => x.ProductVariantEntities).
            Skip(productGetModel.Page * limit - limit).Take(limit).
            Select(x => x).AsNoTracking().ToListAsync();
        }
        else
        {
            productEntities = await _context.Product.
            Include(x => x.CategoryEntity).
            Include(x => x.ProductVariantEntities).
            Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).
                 Skip(productGetModel.Page * limit - limit).Take(limit).
                 Select(x => x).AsNoTracking().ToListAsync();
        }
        return new ProductListModelInAmin
        {
            TotalPage = Total / limit + (Total % limit == 0 ? 0 : 1),
            Page = productGetModel.Page,
            TotalItem = Total,
            ProductModels = [.. productEntities.Select(ProductModelInAdmin.Converter)],
            NameCate = categoryEntity == null ? "" : categoryEntity.NameCategory

        };
    }

    [HttpGet("getProductBySlug")]
    public async Task<ActionResult<ProductModelInAdmin>> GetProductById(string? slug)
    {

        if (slug == null)
        {
            return BadRequest(new { mess = "Thiếu slug" });
        }
        var productEntity = await _context.Product
        .AsNoTracking()
        .Include(x => x.CategoryEntity)
        .Include(x => x.ProductVariantEntities)
        .Include(x => x.ImageEntities).
        Where(x => x.Slug == slug).FirstOrDefaultAsync();
        if (productEntity != null)
        {
            return ProductModelInAdmin.Converter(productEntity);
        }
        return BadRequest(new { mess = "Không tim thấy" });
    }

    [HttpPost]
    public async Task<ActionResult<string>> AddProduct(ProductAddModel productAddModel)
    {
        List<string> ls = [];

        var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        foreach (var nameFiles in productAddModel.ImageFiles)
        {
            var sourceFileName = tmp + nameFiles;
            var destFileName = sta + nameFiles;
            try
            {
                System.IO.File.Move(sourceFileName, destFileName);
            }
            catch (System.Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(new { mess = "Chuyển thất bại" });
            }
        }
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var categoryEntity = await _context.Category
            .Where(x => x.Slug == productAddModel.TypeProduct).SingleOrDefaultAsync();

            var mainProduct = new ProductEntity
            {
                Suplier = productAddModel.Suplier,
                ImageUrl = "http://localhost:2000/sta/" + productAddModel.ImageFiles[0],
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
                var imageEntity = await _context.Image.FindAsync(item);

                if (imageEntity == null)
                {
                    continue;
                }
                var PhotoGallery = new PhotoGalleryEntity
                {
                    ImageEntity = imageEntity,
                    ProductEntity = mainProduct
                };
                await _context.PhotoGallery.AddAsync(PhotoGallery);
            }
            foreach (var item in productAddModel.ProductVariants)
            {
                var productVariantEntity = new ProductVariantEntity
                {
                    ProductVariantName = mainProduct.NameProduct,
                    Image = "http://localhost:2000/sta/" + item.Image,
                    Price = item.Price,
                    ProductEntity = mainProduct,
                    Quality = item.Quality,
                    VariantId = item.VariantId,
                    VariantName = item.VariantName,
                    Position = item.Position,
                    Weight = item.Weight,
                    ImportPrice = 0
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
                    System.IO.File.Delete(sta + file);
                }
                catch (System.Exception)
                {
                    _logger.LogError("không có url ảnh 2");

                }
            }
            return BadRequest(new { mess = "Thêm thất bại" });
        }

        return Ok(new { mess = "Thêm thành công" });
    }

    [HttpPatch]
    public async Task<ActionResult<string>> UpdateProduct(ProductUpdateModel productAddModel)
    {
        List<string> ls = [];

        var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        foreach (var nameFiles in productAddModel.ImageFiles)
        {
            var sourceFileName = tmp + nameFiles;
            var destFileName = sta + nameFiles;
            try
            {
                System.IO.File.Move(sourceFileName, destFileName);
            }
            catch (System.Exception e)
            {
                _logger.LogError(e.Message);
            }
        }
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var categoryEntity = await _context.Category
            .Where(x => x.Slug == productAddModel.TypeProduct).SingleOrDefaultAsync();

            var mainProduct = await _context.Product.FindAsync(productAddModel.ProductId);
            if (mainProduct == null)
            {
                return BadRequest(new { mess = "Không có sản phẩm này" });
            }

            mainProduct.Suplier = productAddModel.Suplier;
            mainProduct.ImageUrl = "http://localhost:2000/sta/" + productAddModel.ImageFiles[0];
            mainProduct.CategoryEntity = categoryEntity;
            mainProduct.Description = productAddModel.Description;
            mainProduct.MainPrice = productAddModel.MainPrice;
            mainProduct.ProductClassification = productAddModel.ProductClassification;
            mainProduct.NameProduct = productAddModel.NameProduct;
            mainProduct.Quality = productAddModel.Quality;
            mainProduct.Slug = productAddModel.Slug;

            var p = await _context.PhotoGallery.Where(x => x.ProductEntity == mainProduct).ToArrayAsync();
            _context.PhotoGallery.RemoveRange(p);

            foreach (var item in productAddModel.ImageFiles)
            {
                var imageEntity = await _context.Image.Where(x => x.ImageFiles == item).FirstOrDefaultAsync();


                if (imageEntity == null)
                {
                    continue;
                }
                var PhotoGallery = new PhotoGalleryEntity
                {
                    ImageEntity = imageEntity,
                    ProductEntity = mainProduct
                };
                await _context.PhotoGallery.AddAsync(PhotoGallery);
            }
            foreach (var item in productAddModel.ProductVariants)
            {

                var tmpProductVariant = await _context.ProductVariant.Where(x => x.ProductEntity == mainProduct && EF.Functions.Like(x.VariantId, "%" + item.VariantId + "%")).FirstOrDefaultAsync();
                if (tmpProductVariant == null)
                {
                    var productVariantEntity = new ProductVariantEntity
                    {
                        ProductVariantName = mainProduct.NameProduct,
                        Image = "http://localhost:2000/sta/" + item.Image,
                        Price = item.Price,
                        ProductEntity = mainProduct,
                        Quality = item.Quality,
                        VariantId = item.VariantId,
                        VariantName = item.VariantName,
                        Position = item.Position,
                        Weight = item.Weight,
                        ImportPrice = 0
                    };

                    await _context.ProductVariant.AddAsync(productVariantEntity);
                }
                else
                {
                    tmpProductVariant.ProductVariantName = mainProduct.NameProduct;
                    tmpProductVariant.Image = "http://localhost:2000/sta/" + item.Image;
                    tmpProductVariant.Price = item.Price;
                    tmpProductVariant.ProductEntity = mainProduct;
                    tmpProductVariant.Quality = item.Quality;
                    tmpProductVariant.VariantId = item.VariantId;
                    tmpProductVariant.VariantName = item.VariantName;
                    tmpProductVariant.Position = item.Position;
                    tmpProductVariant.Weight = item.Weight;
                    tmpProductVariant.ImportPrice = 0;
                }

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
                    System.IO.File.Delete(sta + file);
                }
                catch (System.Exception)
                {
                    _logger.LogError("không có url ảnh 2");

                }
            }
            return BadRequest(new { mess = "Thêm thất bại" });
        }

        return Ok(new { mess = "Thêm thành công" });
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
                    var imageEntity = await _context.Image.FindAsync(item);
                    if (imageEntity == null)
                    {
                        imageEntity = new ImageEntity
                        {
                            ImageFiles = item,
                            ImagePath = "http://localhost:2000/sta/" + item
                        };
                        await _context.Image.AddAsync(imageEntity);
                    }
                    var PhotoGallery = new PhotoGalleryEntity
                    {
                        ImageEntity = imageEntity,
                        ProductEntity = mainProduct
                    };
                    await _context.PhotoGallery.AddAsync(PhotoGallery);
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
                        ImportPrice = 0
                    };
                    await _context.ProductVariant.AddAsync(productVariantEntity);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (System.Exception e)
            {
                _logger.LogInformation(productAddModel.NameProduct);
                await transaction.RollbackAsync();
            }

        }

        return "";
    }



}





