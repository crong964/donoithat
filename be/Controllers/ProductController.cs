using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/admin/product")]
public class ProductController(DatabaseContext context) : ControllerBase
{
    private readonly DatabaseContext _context = context;

    [HttpGet("get")]
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


    [HttpPost("add")]
    [RequestSizeLimit(100_000_000_000_000)]
    public async Task<ActionResult<string>> AddProduct(ProductAddModel productAddModel)
    {
        List<string> ls = [];
        var dir = System.IO.Directory.GetCurrentDirectory() + "/StaticFiles/";
        foreach (var formFile in productAddModel.ImageFiles)
        {
            if (formFile.Length > 0)
            {
                // var filePath = Path.GetTempFileName();
                var slip = formFile.FileName.Split(".");
                if (slip != null && slip.Length >= 2)
                {
                    var filename = DateTime.Now.Ticks + "." + Path.GetExtension(formFile.FileName);
                    var filePath = dir + filename;
                    ls.Add(filename);

                    using var stream = System.IO.File.Create(filePath);
                    await formFile.CopyToAsync(stream);
                }
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
                Measure = productAddModel.Measure,
                Value = productAddModel.Value,
                ProductClassification = productAddModel.ProductClassification,
                NameProduct = productAddModel.NameProduct,
                Quality = productAddModel.Quality
            };
            await _context.Product.AddAsync(mainProduct);
            foreach (var item in ls)
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
                    Image = item.Image,
                    Price = item.Price,
                    ProductEntity = mainProduct,
                    Quality = item.Quality,
                    VariantId = item.VariantId,
                    VariantName = item.VariantName
                };
                await _context.ProductVariant.AddAsync(productVariantEntity);
            }

            await transaction.CommitAsync();
        }
        catch (System.Exception)
        {
            await transaction.RollbackAsync();
            foreach (var file in ls)
            {
                try
                {
                    System.IO.File.Delete(dir + file);
                }
                catch (System.Exception)
                {


                }
            }

        }

        return "";
    }


}





