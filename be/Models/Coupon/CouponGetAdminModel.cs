using be.Entity;

namespace be.Models;


public class CouponGetAdminModel
{
    public required string CouponEntityId { get; set; }
    public required string CouponName { get; set; }

    public required string CouponCode { get; set; }

    public required bool CouponStatus { get; set; }
    public required long DiscountAmount { get; set; }
    public required long MinimumOrderAmount { get; set; }

    public required string StartTime { get; set; }
    public required string ExpireTime { get; set; }

    public static CouponEntity Convert(CouponEntity couponEntity)
    {
        return new CouponEntity
        {
            CouponCode = couponEntity.CouponCode,
            CouponId = couponEntity.CouponId,
            CouponName = couponEntity.CouponName,
            CouponStatus = couponEntity.CouponStatus,
            DiscountAmount = couponEntity.DiscountAmount,
            ExpireTime = couponEntity.ExpireTime,
            MinimumOrderAmount = couponEntity.MinimumOrderAmount,
            StartTime = couponEntity.StartTime
        };
    }
}