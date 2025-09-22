using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[ApiController]
[Route("api/admin/variant")]
public class ProductVariantController(DatabaseContext context, ILogger<ProductVariantController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<ProductVariantController> _log = logger;

    [HttpPost]
    public async Task<ActionResult> UpdateVariant(VariantUpdateAdminModel variantUpdateAdminModel)
    {
        var productVariant = await _context.ProductVariant.FindAsync(variantUpdateAdminModel.ProductVariantId);
        if (productVariant == null)
        {
            return BadRequest(new { message = "Không có loại này" });
        }

        productVariant.Price = variantUpdateAdminModel.Price;
        productVariant.ImportPrice = variantUpdateAdminModel.ImportPrice;
        productVariant.Quality = variantUpdateAdminModel.Quality;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {
            _log.LogError("lỗi");
            return BadRequest(new { message = "Cập nhật Thất bại" });
        }
        return Ok(new { message = "Cập nhật thành công" });
    }
}