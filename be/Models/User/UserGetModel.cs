using be.Entity;
using Microsoft.AspNetCore.Mvc;

namespace be.Models;

public class UserGetModel
{
    [FromQuery(Name = "query")]
    public string? Query { get; set; }

    [FromQuery(Name = "page")]
    public int Page { get; set; } = 1;
}