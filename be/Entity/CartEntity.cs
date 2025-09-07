using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace be.Entity;


public class CartEntity
{
    public required UserEntity UserEntity { get; set; }
    public required ProductVariantEntity ProductVariantEntity { get; set; }
    public required long Quality { get; set; }
}