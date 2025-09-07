namespace be.Entity;


public class OrderDetailEntity
{
    public required OrderEntity OrderEntity { get; set; }
    public required ProductVariantEntity ProductVariantEntity { get; set; }
    public int Quality { get; set; }

}