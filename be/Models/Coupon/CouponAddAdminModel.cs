namespace be.Models;


public class CouponAddAdminModel
{
    public required string CouponName { get; set; }

    public required string CouponCode { get; set; }

    public required bool CouponStatus { get; set; }
    public required long DiscountAmount { get; set; }
    public required long MinimumOrderAmount { get; set; }

    public required string StartTime { get; set; }
    public required string ExpireTime { get; set; }
}