namespace be.Models;


public class CategoryTest
{
    public required string Name { get; set; }
    public required string Id { get; set; }

    public ICollection<CategoryTest2>? Con { get; set; }
}


public class CategoryTest2
{
    public required string Name { get; set; }
    public required string Id { get; set; }
}