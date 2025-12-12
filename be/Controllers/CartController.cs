using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;


[Authorize]
[ApiController]
[Route("/api/cart")]
public class CartController(
    DatabaseContext context,
IUserService userService, ILogger<CartController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly IUserService _userService = userService;
    private readonly ILogger<CartController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartProductVariantModel>>> GetAllProductCart()
    {

        var userId = _userService.GetUserId(HttpContext);

        if (userId == null)
        {
            return BadRequest(new { message = "Bạn chưa đăng nhập" });
        }

        var userEntity = await _context.User.FindAsync(userId);
        if (userEntity == null)
        {
            return BadRequest(new { message = "Không có  người dùng này" });
        }

        var ls = await _context.Cart
         .Include(x => x.ProductVariantEntity)
         .Include(x => x.ProductVariantEntity.ProductEntity)
        .Where(x => x.UserEntity.UserId == userId)
        .ToArrayAsync();



        return ls.Select(x => CartProductVariantModel.ConvertModelToEntity(x.ProductVariantEntity, x.Quality)).ToArray();
    }

    [HttpPost]
    public async Task<ActionResult> AddProductCart(CartProductAddModel cartProductAddModel)
    {

        var productVariant = await _context.ProductVariant.FindAsync(cartProductAddModel.ProductVariantId);
        var userId = _userService.GetUserId(HttpContext);

        if (userId == null)
        {
            return BadRequest(new { message = "Bạn chưa đăng nhập" });
        }

        var userEntity = await _context.User.FindAsync(userId);
        if (productVariant == null || userEntity == null)
        {
            return BadRequest(new { message = "Không có sản phẩm hoặc người dùng này" });
        }



        var cartEntity1 = await _context.Cart.
        Where(
              x => x.ProductVariantEntity.ProductVariantId == cartProductAddModel.ProductVariantId &&
              x.UserEntity.UserId == userId).FirstOrDefaultAsync();
        if (cartEntity1 == null)
        {
            var CartEntity = new CartEntity
            {
                ProductVariantEntity = productVariant,
                Quality = cartProductAddModel.Quality,
                UserEntity = userEntity
            };

            await _context.Cart.AddAsync(CartEntity);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Thêm thành công" });
        }

        cartEntity1.Quality += cartProductAddModel.Quality;

        _context.Cart.Update(cartEntity1);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Cập nhật thành công" });
    }


    [HttpDelete]
    public async Task<ActionResult> RemoveProductCart(CartProductRemoveModel cartProductRemoveModel)
    {

        var userId = _userService.GetUserId(HttpContext);

        if (userId == null)
        {
            return BadRequest(new { message = "Bạn chưa đăng nhập" });
        }
        _logger.LogInformation(userId + " " + cartProductRemoveModel.ProductVariantId);
        var cartEntity = await _context.Cart.Where(x =>
        x.ProductVariantEntity.ProductVariantId == cartProductRemoveModel.ProductVariantId &&
        x.UserEntity.UserId == userId
        ).FirstOrDefaultAsync();

        if (cartEntity == null)
        {
            return BadRequest(new { message = "Không có sản phẩm trong giỏ" });
        }
        _context.Cart.Remove(cartEntity);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPatch]
    public async Task<ActionResult> UpdateProductCart(CartProductUpdateModel cartProductUpdateModel)
    {

        var userId = _userService.GetUserId(HttpContext);

        if (userId == null)
        {
            return BadRequest(new { message = "Bạn chưa đăng nhập" });
        }
        _logger.LogInformation(userId + " " + cartProductUpdateModel.ProductVariantId);
        var cartEntity = await _context.Cart.Where(x =>
        x.ProductVariantEntity.ProductVariantId == cartProductUpdateModel.ProductVariantId &&
        x.UserEntity.UserId == userId
        ).FirstOrDefaultAsync();

        if (cartEntity == null)
        {
            return BadRequest(new { message = "Không có sản phẩm trong giỏ" });
        }
        _logger.LogInformation(cartProductUpdateModel.Quality + "");
        cartEntity.Quality = cartProductUpdateModel.Quality;
        _context.Cart.Update(cartEntity);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cập nhật thành công" });
    }

}