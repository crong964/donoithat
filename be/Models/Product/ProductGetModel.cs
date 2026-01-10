using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace be.Models;

public class ProductGetModel
{
    public string? Slug { get; set; }
    public int Page { get; set; } = 1;
    public string? NameProduct { get; set; } = "";
}