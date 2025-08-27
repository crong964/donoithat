using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/admin/product")]
public class ProductController(DatabaseContext context, ILogger<ProductController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<ProductController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductModel>>> GetProductAll()
    {
        var productModels = await _context.Product.Select(x => ProductModel.Converter(x)).ToListAsync();
        return productModels;
    }

    [HttpGet("getid")]
    public async Task<ActionResult<ProductDetailModel?>?> GetProductById(string? id)
    {
        if (id == null)
        {
            throw new Exception("not found");
        }
        var productEntity = await _context.Product
        .Include(x => x.ImageEntities)
        .Include(x => x.ProductVariantEntities).
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
                _logger.LogError("không có url ảnh");

            }
        }
        var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var categoryEntity = await _context.Category
            .FindAsync(productAddModel.TypeProduct) ?? throw new Exception("not found category");

            var mainProduct = new ProductEntity
            {
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
            _logger.LogInformation(productAddModel.ProductVariants.Count + "");
            foreach (var item in productAddModel.ProductVariants)
            {

                _logger.LogInformation(item.VariantName);
                var productVariantEntity = new ProductVariantEntity
                {
                    
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

    [HttpPost("image")]
    [RequestSizeLimit(100_000_000_000_000)]
    public async Task<ActionResult<List<string>>> Patch(List<IFormFile> ImageFiles)
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


}





