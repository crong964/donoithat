using System.ComponentModel.DataAnnotations;

namespace be.Entity;


public class CouponEntity
{

    [Key]
    public string CouponId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");

    public required string CouponName { get; set; }

    public required string CouponCode { get; set; }

    public required bool CouponStatus { get; set; }
    public required long DiscountAmount { get; set; }
    public required long MinimumOrderAmount { get; set; }

    public required string StartTime { get; set; }
    public required string ExpireTime { get; set; }

}
