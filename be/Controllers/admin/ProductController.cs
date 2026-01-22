using System.Data;
using be.Entity;
using be.Enums;
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
        string nameProduct = productGetModel.NameProduct ?? "";

        if (nameProduct != "")
        {
            Total = await _context
            .Product
            .Where(x => EF.Functions.Like(x.NameProduct, "%" + productGetModel.NameProduct + "%"))
            .CountAsync();

            productEntities = await _context.Product.
            Include(x => x.ImageEntities).
            Include(x => x.CategoryEntity).
            Include(x => x.ProductVariantEntities).
            Where(x => EF.Functions.Like(x.NameProduct, "%" + nameProduct + "%")).
            Skip(productGetModel.Page * limit - limit).Take(limit).
            Select(x => x).AsNoTracking().ToListAsync();

            return new ProductListModelInAmin
            {
                TotalPage = Total / limit + (Total % limit == 0 ? 0 : 1),
                Page = productGetModel.Page,
                TotalItem = Total,
                Products = [.. productEntities.Select(ProductModelInAdmin.Converter)],
                NameCate = "",
                NameProduct = nameProduct
            };

        }
        if (productGetModel.Slug == null || productGetModel.Slug == "all")
        {
            Total = await _context.Product.CountAsync();
        }
        else
        {
            categoryEntity = await _context.Category.Where(x => x.Slug == productGetModel.Slug).FirstOrDefaultAsync();
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            Total = await _context.Product
            .Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug))
           .AsNoTracking()
           .CountAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }

        if (productGetModel.Slug == null || productGetModel.Slug == "all")
        {

            productEntities = await _context.Product.
            Include(x => x.ImageEntities).
            Include(x => x.CategoryEntity).
            Include(x => x.ProductVariantEntities).
            Skip(productGetModel.Page * limit - limit).Take(limit).
            Select(x => x).AsNoTracking().ToListAsync();
        }
        else
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            productEntities = await _context.Product.
            Include(x => x.ImageEntities).
            Include(x => x.CategoryEntity).
            Include(x => x.ProductVariantEntities).
            Where(x => x.CategoryEntity.Slug == productGetModel.Slug ||
           (x.CategoryEntity.CategoryParent != null && x.CategoryEntity.CategoryParent.Slug == productGetModel.Slug)).
                 Skip(productGetModel.Page * limit - limit).Take(limit).
                 Select(x => x).AsNoTracking().ToListAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }
        return new ProductListModelInAmin
        {
            TotalPage = Total / limit + (Total % limit == 0 ? 0 : 1),
            Page = productGetModel.Page,
            TotalItem = Total,
            Products = [.. productEntities.Select(ProductModelInAdmin.Converter)],
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

    [HttpGet("brand")]
    public async Task<ActionResult> GetAllBrandProductBuyYet()
    {
        var ls = await _context.Brand
         .Where(x => x.ProductVariantEntities != null && x.ProductVariantEntities.Any(x => x.ProductEntity == null))
         .AsNoTracking().Select(x => BrandAdminGetModel.Covert(x)).ToArrayAsync();
        return Ok(ls);
    }

    [HttpGet("category")]
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
    [HasPermission(Permission.product, [ActionType.add])]
    public async Task<ActionResult<string>> AddProduct(ProductAddModel productAddModel)
    {
        List<string> ls = [];

        var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";

        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            List<ImageEntity> images = [];
            HashSet<string> urlsSet = [];
            var categoryEntity = await _context.Category
            .Where(x => x.Slug == productAddModel.CategorySlug).SingleOrDefaultAsync();
            var brandEntity = await _context.Brand
            .Where(x => x.BrandId == productAddModel.BrandId).SingleOrDefaultAsync();
            var mainProduct = new ProductEntity
            {

                CategoryEntity = categoryEntity,
                Description = productAddModel.Description,
                MainPrice = productAddModel.MainPrice,
                ProductClassification = productAddModel.ProductClassification,
                NameProduct = productAddModel.NameProduct,
                Quality = productAddModel.Quality,
                Slug = productAddModel.Slug,
                BrandEntity = brandEntity
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
                images.Add(imageEntity);
            }


            foreach (var item in productAddModel.ProductVariants)
            {

                if (item.ProductVariantId == null)
                {
                    continue;
                }
                var productVariantEntity = await _context.ProductVariant.
                Include(x => x.ImageEntity)
                .Where(x => x.ProductVariantId.Equals(item.ProductVariantId)).FirstOrDefaultAsync();

                if (productVariantEntity == null)
                {
                    continue;
                }

                if (mainProduct.MainPrice < productVariantEntity.Price)
                {
                    mainProduct.MainPrice = productVariantEntity.Price;
                }
                mainProduct.Quality += productVariantEntity.Quality;


                productVariantEntity.VariantName = item.VariantName;
                productVariantEntity.ProductEntity = mainProduct;
                productVariantEntity.VariantId = item.VariantId;
                productVariantEntity.Price = item.Price;



                var imageFiles = productVariantEntity.ImageEntity;

                if (imageFiles != null)
                {
                    if (!urlsSet.Contains(imageFiles.ImageFiles))
                    {
                        urlsSet.Add(imageFiles.ImageFiles);
                        var PhotoGallery = new PhotoGalleryEntity
                        {
                            ImageEntity = imageFiles,
                            ProductEntity = mainProduct
                        };
                        await _context.PhotoGallery.AddAsync(PhotoGallery);
                    }

                    images.Add(imageFiles);
                    productVariantEntity.Position = images.Count;
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


    [HttpPatch]
    [HasPermission(Permission.product, [ActionType.update])]
    public async Task<ActionResult<string>> UpdateProduct(ProductUpdateModel productAddModel)
    {
        List<string> ls = [];

        var sta = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        // var tmp = System.IO.Directory.GetCurrentDirectory() + "/Tmp/";
        // foreach (var nameFiles in productAddModel.ImageFiles)
        // {
        //     var sourceFileName = tmp + nameFiles;
        //     var destFileName = sta + nameFiles;
        //     try
        //     {
        //         System.IO.File.Move(sourceFileName, destFileName);
        //     }
        //     catch (System.Exception e)
        //     {
        //         _logger.LogError(e.Message);
        //     }
        // }
        List<ImageEntity> images = [];
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
            mainProduct.CategoryEntity = categoryEntity;
            mainProduct.Description = productAddModel.Description;
            mainProduct.MainPrice = productAddModel.MainPrice;
            mainProduct.ProductClassification = productAddModel.ProductClassification;
            mainProduct.NameProduct = productAddModel.NameProduct;
            mainProduct.Quality = productAddModel.Quality;
            mainProduct.Slug = productAddModel.Slug;

            var p = await _context.PhotoGallery.Where(x => x.ProductEntity == mainProduct).ToArrayAsync();
            _context.PhotoGallery.RemoveRange(p);

            var BrandEntity = await _context.Brand
                       .Where(x => x.BrandId == productAddModel.BrandId).SingleOrDefaultAsync();
            foreach (var item in productAddModel.ImageFiles)
            {
                var imageEntity = await _context.Image.Where(x => x.ImageFiles == item).FirstOrDefaultAsync();


                if (imageEntity == null)
                {
                    continue;
                }
                images.Add(imageEntity);
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
                        ImageEntity = images[item.Position],
                        BrandEntity = BrandEntity,
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
            return BadRequest(new { mess = "Cập nhật thất bại" });
        }

        return Ok(new { mess = "Cập nhật thành công" });
    }




    [HttpPatch("status")]
    [HasPermission(Permission.product, [ActionType.update])]
    public async Task<ActionResult> UpdateStatus(ProductUpdateStatusModel statusModel)
    {
        _logger.LogInformation(statusModel.ProductId);
        var productEntity = await _context.Product.FindAsync(statusModel.ProductId);
        if (productEntity == null)
        {
            return BadRequest(new { Message = "not found" });
        }
        productEntity.Status = productEntity.Status == 0 ? 1 : 0;
        await _context.SaveChangesAsync();
        return Ok(new { newValue = productEntity.Status });
    }



    [HttpDelete]
    [HasPermission(Permission.product, [ActionType.delete])]
    public async Task<ActionResult<string>> DeleteProduct(ProductDeleteModel productDelete)
    {
        var ProductId = productDelete.ProductId;

        var pro = await _context.Product.Where(x => x.ProductId.Equals(ProductId)).FirstOrDefaultAsync();
        if (pro != null)
        {
            try
            {
                _context.Product.Remove(pro);
                _context.SaveChanges();
            }
            catch (System.Exception)
            {

                return BadRequest(new
                {
                    message = "Xóa không dc"
                });
            }
        }
        return Ok();
    }










    [HttpPost("addProducts_test")]
    public async Task<ActionResult<string>> AddProducts(IEnumerable<ProductAddModel> productAddModels)
    {

        foreach (var productAddModel in productAddModels)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var BrandEntity = await _context.Brand
           .Where(x => x.BrandId == productAddModel.BrandId).SingleOrDefaultAsync();
                var categoryEntity = await _context.Category
                .Where(x => x.Slug == productAddModel.CategorySlug).SingleOrDefaultAsync() ?? throw new Exception("not found category");

                var mainProduct = new ProductEntity
                {
                    Slug = productAddModel.Slug,
                    CategoryEntity = categoryEntity,
                    Description = productAddModel.Description,
                    MainPrice = productAddModel.MainPrice,
                    ProductClassification = productAddModel.ProductClassification,
                    NameProduct = productAddModel.NameProduct,
                    Quality = productAddModel.Quality + 20,
                    BrandEntity = BrandEntity,
                };
                List<ImageEntity> images = [];
                await _context.Product.AddAsync(mainProduct);
                foreach (var item in productAddModel.ImageFiles)
                {
                    var imageEntity = await _context.Image.Where(x => x.ImagePath.Equals(item)).FirstOrDefaultAsync();
                    if (imageEntity == null)
                    {
                        imageEntity = new ImageEntity
                        {
                            ImagePath = item
                        };
                        await _context.Image.AddAsync(imageEntity);

                    }
                    images.Add(imageEntity);
                    var PhotoGallery = new PhotoGalleryEntity
                    {
                        ImageEntity = imageEntity,
                        ProductEntity = mainProduct
                    };
                    await _context.PhotoGallery.AddAsync(PhotoGallery);
                }

                foreach (var item in productAddModel.ProductVariants)
                {
                    var imagesi = item.Position - 1;
                    var productVariantEntity = new ProductVariantEntity
                    {
                        ImageEntity = images[imagesi < 0 ? 0 : imagesi],
                        BrandEntity = BrandEntity,
                        ProductVariantId = item.ProductVariantId,
                        ProductVariantName = $@"{mainProduct.NameProduct} {item.VariantName}",
                        Image = item.Image,
                        Price = item.Price,
                        ProductEntity = mainProduct,
                        Quality = item.Quality + 20,
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
                _logger.LogError(e.Message);
                await transaction.RollbackAsync();
            }

        }

        return "";
    }



}





