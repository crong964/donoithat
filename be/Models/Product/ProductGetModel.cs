using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace be.Models;

public class ProductGetModel
{
    [FromQuery(Name = "slug")]
    public string? Slug { get; set; }

    [FromQuery(Name = "page")]
    public int Page { get; set; } = 1;
}