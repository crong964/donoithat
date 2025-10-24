
using System.Threading.Tasks;
using be.Entity;
using be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("/api/admin/coupon")]
public class CouponController(DatabaseContext context, ILogger<CouponController> logger) : ControllerBase
{
    private readonly DatabaseContext _context = context;
    private readonly ILogger<CouponController> _logger = logger;


    [HttpGet]
    public async Task<ActionResult<CouponEntity[]>> Get()
    {
        var ls = await _context.Coupon.AsNoTracking().Select(x => CouponGetAdminModel.Convert(x)).ToArrayAsync();
        return Ok(ls);
    }

    [HttpGet("valid")]
    public async Task<ActionResult<CouponEntity[]>> GetValidCoupon(string expireTime)
    {
        var ls = await _context.Coupon.AsNoTracking()
        .Where(x => x.ExpireTime.CompareTo(expireTime)<=0)
        .Select(x => CouponGetAdminModel.Convert(x)).ToArrayAsync();
        return Ok(ls);
    }


    [HttpPost]
    public async Task<ActionResult> Add(CouponAddAdminModel couponAddAdminModel)
    {
        var cou = await _context.Coupon.Where(x => x.CouponCode == couponAddAdminModel.CouponCode).FirstOrDefaultAsync();
        if (cou != null)
        {
            return BadRequest(new { message = "Có mã này" });
        }
        var couponEntity = new CouponEntity
        {
            CouponCode = couponAddAdminModel.CouponCode,
            CouponName = couponAddAdminModel.CouponName,
            CouponStatus = couponAddAdminModel.CouponStatus,
            DiscountAmount = couponAddAdminModel.DiscountAmount,
            ExpireTime = couponAddAdminModel.ExpireTime,
            MinimumOrderAmount = couponAddAdminModel.MinimumOrderAmount,
            StartTime = couponAddAdminModel.StartTime,
        };
        try
        {
            await _context.Coupon.AddAsync(couponEntity);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception)
        {

            return BadRequest(new { message = "Có lỗi" });
        }
        return Ok();
    }


    [HttpPatch]
    public async Task<ActionResult> Patch(CouponUpdateAdminModel couponUpdateAdminModel)
    {
        var cou = await _context.Coupon.Where(x => x.CouponId == couponUpdateAdminModel.CouponId).FirstOrDefaultAsync();
        if (cou == null)
        {
            return BadRequest(new { message = "Không có mã này" });
        }

        cou.CouponCode = couponUpdateAdminModel.CouponCode;
        cou.CouponName = couponUpdateAdminModel.CouponName;
        cou.CouponStatus = couponUpdateAdminModel.CouponStatus;
        cou.StartTime = couponUpdateAdminModel.StartTime;
        cou.ExpireTime = couponUpdateAdminModel.ExpireTime;
        cou.MinimumOrderAmount = couponUpdateAdminModel.MinimumOrderAmount;
        cou.DiscountAmount = couponUpdateAdminModel.DiscountAmount;
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(CouponDeleteAdminModel couponUpdateAdminModel)
    {
        var cou = await _context.Coupon.Where(x => x.CouponId == couponUpdateAdminModel.CouponId).FirstOrDefaultAsync();
        if (cou == null)
        {
            return BadRequest(new { message = "Không có mã này" });
        }


        return Ok();
    }
}