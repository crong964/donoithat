using be.Entity;

namespace be.Models;


public class CouponUpdateAdminModel
{
    public required string CouponId { get; set; }
    public required string CouponName { get; set; }

    public required string CouponCode { get; set; }

    public required bool CouponStatus { get; set; }
    public required long DiscountAmount { get; set; }
    public required long MinimumOrderAmount { get; set; }

    public required string StartTime { get; set; }
    public required string ExpireTime { get; set; }

    public static CouponEntity Convert(CouponUpdateAdminModel couponUpdate)
    {
        return new CouponEntity
        {
            CouponCode = couponUpdate.CouponCode,
            CouponId = couponUpdate.CouponId,
            CouponName = couponUpdate.CouponName,
            CouponStatus = couponUpdate.CouponStatus,
            DiscountAmount = couponUpdate.DiscountAmount,
            ExpireTime = couponUpdate.ExpireTime,
            MinimumOrderAmount = couponUpdate.MinimumOrderAmount,
            StartTime = couponUpdate.StartTime
        };
    }
}