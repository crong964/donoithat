using System.ComponentModel.DataAnnotations;

namespace be.Models;

public class ProductGetModel
{
    public string? Slug { get; set; }
    public int Page { get; set; } = 1;
}