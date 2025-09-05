using System.ComponentModel.DataAnnotations;
using be.Entity;
using Microsoft.AspNetCore.Mvc;

namespace be.Models;


public class RelatedProductsModel
{

    public required ProductDetailModel ProductDetail{ get; set; }
    public required IEnumerable<ProductModel> RelatedProducts { get; set; }


    public static RelatedProductsModel ConvertEntityToModel(
        ProductEntity productEntity,
     IEnumerable<ProductEntity> productEntities)
    {
        return new RelatedProductsModel
        {
            ProductDetail = ProductDetailModel.ConvertEntityToModel(productEntity),
            RelatedProducts = productEntities.Select(ProductModel.Converter)
        };
    }

    internal static ActionResult<RelatedProductsModel> ConvertEntityToModel(ProductEntity productEntity, object productEntities)
    {
        throw new NotImplementedException();
    }
}