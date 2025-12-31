using System.Threading.Tasks;
using Azure;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SQLitePCL;

namespace be.Controllers;


[ApiController]
[Route("api/admin/inventory")]
public class InventoryController(DatabaseContext context, ILogger<InventoryController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<InventoryController> _log = logger;


    [HttpGet]
    public async Task<ActionResult> GetAll([FromQuery] ProductVariantGetAdminModel get)
    {
        var OnSale = get.OnSale == null || get.OnSale.Equals("all") ? "" : get.OnSale;
        var BrandId = get.BrandId == null || get.BrandId.Equals("all") ? "" : get.BrandId;
        var CurPage = get.CurPage ?? 1;
        var InventoryName = get.InventoryName ?? "";

#pragma warning disable CS8602 // Dereference of a possibly null reference.
        var query = from item in _context.ProductVariant
                    join Product in _context.Product on
                    item.ProductEntity.ProductId equals Product.ProductId into gj
                    from x in gj.DefaultIfEmpty()

                    join Brand in _context.Brand on
                    item.BrandEntity.BrandId equals Brand.BrandId into brands
                    from brand in brands.DefaultIfEmpty()

                    select new
                    {
                        item.ImportPrice,
                        OnSale = item.ProductEntity == null ? "false" : "true",
                        item.ProductVariantName,
                        item.Image,
                        item.Price,
                        brand.BrandName,
                        brand.BrandId,
                        item.Quality,
                        item.Weight,
                        item.ProductVariantId
                    };
#pragma warning restore CS8602 // Dereference of a possibly null reference.


        var limit = 40;

        var ls = await query.AsNoTracking().
        Where(x =>
            EF.Functions.Like(x.OnSale, "%" + OnSale + "%") &&
            EF.Functions.Like(x.ProductVariantName, "%" + get.InventoryName + "%") &&
            EF.Functions.Like(x.BrandId, "%" + BrandId + "%")).
        Skip((CurPage - 1) * limit).Take(limit).ToArrayAsync();


        var count = await query.AsNoTracking().Where(x =>
            EF.Functions.Like(x.OnSale, "%" + OnSale + "%") &&
            EF.Functions.Like(x.ProductVariantName, "%" + get.InventoryName + "%") &&
            EF.Functions.Like(x.BrandId, "%" + BrandId + "%")).CountAsync();

        var page = count / 40;
        var du = count % 40;

        if (du > 0)
        {
            page += 1;
        }

        return Ok(new
        {
            Data = ls,
            TotalPage = page,
            CurPage
        }
        );
    }

    [HttpGet("{ProductVariantId}")]
    public async Task<ActionResult> GetId(string productVariantId)
    {
        var productVariant = await _context.ProductVariant
        .Include(x => x.ImageEntity)
        .Include(x => x.BrandEntity)
        .Where(x => x.ProductVariantId.Equals(productVariantId))
        .FirstOrDefaultAsync();

        if (productVariant == null)
        {
            return BadRequest(new { message = "Không có sản phẩm này" });
        }

        return Ok(InventoryGetIdAdminModel.Convert(productVariant));
    }


    [HttpPost]
    public async Task<ActionResult> Post(InventoryPostAdminModel post)
    {
        var imageEntity = await _context.Image.FindAsync(post.ImageFile);
        var brandEntity = await _context.Brand.FindAsync(post.BrandId);
        var productVariant = new ProductVariantEntity
        {
            BrandEntity = brandEntity,
            ImageEntity = imageEntity,
            Image = imageEntity?.ImagePath ?? "",
            ImportPrice = post.ImportPrice,
            Price = post.Price,
            Position = 0,
            ProductVariantName = post.ProductVariantName,
            Quality = post.Quality,
            ProductEntity = null,
            VariantId = "",
            VariantName = "",
            Weight = post.Weight,
        };

        try
        {
            _context.ProductVariant.Add(productVariant);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (System.Exception)
        {
            _log.LogError("ddddddddđ đậksjdkádklạdlkạdlk");
            return BadRequest(new { message = "thêm không dc" });
        }
    }


    [HttpPatch]
    public async Task<ActionResult> Patch(InventoryPatchAdminModel post)
    {
        var imageEntity = await _context.Image.FindAsync(post.ImageFile);
        var brandEntity = await _context.Brand.FindAsync(post.BrandId);
        var productVariant = await _context.ProductVariant
       .Include(x => x.ImageEntity)
       .Include(x => x.BrandEntity)
       .Where(x => x.ProductVariantId.Equals(post.ProductVariantId))
       .FirstOrDefaultAsync();


        if (productVariant == null)
        {
            return BadRequest(new { message = "Không có sản phẩm này" });
        }
        if (imageEntity != null)
        {
            productVariant.ImageEntity = imageEntity;
            productVariant.Image = imageEntity.ImagePath;
        }
        if (brandEntity != null)
        {
            productVariant.BrandEntity = brandEntity;
        }


        productVariant.ImportPrice = post.ImportPrice;
        productVariant.Price = post.Price;
        productVariant.ProductVariantName = post.ProductVariantName;
        productVariant.Quality = post.Quality;
        productVariant.Weight = post.Weight;

        try
        {
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "chỉnh sửa không dc" });
        }
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(InventoryDeleteAdminModel delete)
    {
        var productVariant = await _context.ProductVariant.FindAsync(delete.ProductVariantId);
        if (productVariant == null)
        {
            return BadRequest(new { message = "Không xóa được" });
        }
        try
        {
            _context.ProductVariant.Remove(productVariant);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            return BadRequest(new { message = "Không xóa được" });
        }
        return Ok();
    }


    [HttpGet("search")]
    public async Task<ActionResult> SearchInventotyName([FromQuery] ImportQueryProductAdmin importQuery)
    {
        var page = importQuery.Page;
        var name = importQuery.Name;
        var limit = 10;
        if (name == null)
        {
            return BadRequest(new { mess = "Thiếu tên" });
        }

        var query = from productVariant in _context.ProductVariant
                    join image in _context.Image on
                    productVariant.ImageEntity equals image into temptImages
                    from temptImage in temptImages.DefaultIfEmpty()
                    select new
                    {
                        temptImage.ImagePath,
                        productVariant.ProductVariantName,
                        productVariant.ProductVariantId,
                    };

        var productVariants = await query
        .Where(item => EF.Functions.Like(item.ProductVariantName, "%" + name.Replace(" ", "%") + "%"))
        .Skip((page - 1) * limit)
        .Take(limit)
        .ToArrayAsync();


        return Ok(productVariants);
    }

    [HttpGet("suplier")]
    public async Task<ActionResult> Suplier(string productVariantId)
    {
        var productVariant = await _context
        .ProductVariant
        .Where(x => x.ProductVariantId.Equals(productVariantId))
        .FirstOrDefaultAsync();

        if (productVariant == null)
        {
            return BadRequest(new { message = "Không có sản phẩm này" });
        }
        var ls = _context.ImportDetailEntity.AsNoTracking()
            .Where(importDetail => importDetail.ProductVariantEntity.ProductVariantId == productVariantId)
            .Select(importDetail => new
            {
                importPrice = importDetail.Price,
                importDetail.ImportEntity.SuplierEntity.SuplierId,
                importDetail.ImportEntity.SuplierEntity.SuplierEmail,
                importDetail.ImportEntity.SuplierEntity.SuplierName,
                importDetail.ImportEntity.SuplierEntity.SuplierPhoneNumber,
                importDetail.ImportEntity.ReceivedDate
            })
            .GroupBy(x => x.SuplierId)
            .Select(g => g.OrderBy(x => x.ReceivedDate).First())
            .ToList();



        return Ok(new
        {
            inventory = productVariant,
            supliers = ls
        });
    }


    [HttpGet("order")]
    public async Task<ActionResult> OrderGet()
    {
        var ls = await _context
        .Provide
       .Select(i => new ProvideEntity
       {
           ProductVariantEntity = i.ProductVariantEntity,
           SuplierEntity = i.SuplierEntity,
           ReceiedQuality = i.ReceiedQuality
       })
        .Select(provide => InventoryOrderGetAdminModel.Convert(provide)).ToArrayAsync();
        return Ok(ls);
    }
    [HttpPost("order")]
    public async Task<ActionResult> OrderPost(InventoryOrderPostAdminModel inventory)
    {
        var suplier = await _context.Suplier.Where(x => x.SuplierId == inventory.SuplierId).FirstOrDefaultAsync();
        var product = await _context.ProductVariant.Where(x => x.ProductVariantId == inventory.InventoryId).FirstOrDefaultAsync();
        if (suplier == null || product == null)
        {
            return BadRequest(new { message = "Không tồn tại" });
        }
        var provide = await _context.Provide.Where(x => x.ProductVariantEntity == product).FirstOrDefaultAsync();

        if (provide != null)
        {
            return BadRequest(new { message = "Đã đặt ở rồi" });
        }
        var prodive = new ProvideEntity
        {
            ProductVariantEntity = product,
            SuplierEntity = suplier,
        };

        try
        {
            await _context.Provide.AddAsync(prodive);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
        return Ok();
    }

    [HttpDelete("order")]
    public async Task<ActionResult> OrderDelete(InventoryOrderPostAdminModel inventory)
    {
        var provide = await _context.Provide
        .Where(x => x.ProductVariantEntity.ProductVariantId == inventory.InventoryId && x.SuplierEntity.SuplierId == inventory.SuplierId)
        .FirstOrDefaultAsync();

        if (provide == null)
        {
            return Ok();
        }
        try
        {
            _context.Provide.Remove(provide);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {


        }
        return Ok();
    }
}