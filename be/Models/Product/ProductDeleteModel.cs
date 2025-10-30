using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ProductDeleteModel
{
    public required string ProductId { get; set; }
}