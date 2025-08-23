using System.ComponentModel.DataAnnotations;

namespace be.Entity
{
    //    variantId: string
    //    variantName: string
    //    price: number
    //    quality: string
    //    image: number
    public class ProductVariantEntity
    {
        [Key]
        public Guid ProductVariantId { get; set; } = new Guid();
        public required string VariantId { get; set; }
        public required string VariantName { get; set; }
        public required long Price { get; set; }
        public required int Image { get; set; }
        public long Quality { get; set; } = 0;



        public required ProductEntity ProductEntity { set; get; }
    }
}