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
        public string ProductVariantId { get; set; } = Guid.NewGuid().ToString().Replace("-", "");
        public required string ProductVariantName { get; set; }
        public required string VariantId { get; set; }
        public required string VariantName { get; set; }
        public required long Price { get; set; }
        public required long ImportPrice { get; set; } = 0;
        public required string Image { get; set; }
        public long Quality { get; set; } = 0;
        public int Position { get; set; }
        public int Weight { get; set; }

        public required ImageEntity? ImageEntity { set; get; }
        public required BrandEntity? BrandEntity { set; get; }
        public required ProductEntity? ProductEntity { set; get; }


        public List<SuplierEntity> SuplierEntities { get; } = [];
        public List<UserEntity> UserEntities { get; } = [];

        public List<OrderEntity> OrderEntities { get; } = [];
        public List<ImportEntity> ImportEntities { get; } = [];
    }
}