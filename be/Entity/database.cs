using Microsoft.EntityFrameworkCore;

namespace be.Entity;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecastItems { get; set; } = null!;
    public DbSet<ProductEntity> Product { get; set; } = null!;
    public DbSet<ProductVariantEntity> ProductVariant { get; set; } = null!;
    public DbSet<ImageEntity> Image { get; set; } = null!;
    public DbSet<CategoryEntity> Category { get; set; } = null!;
    public DbSet<UserEntity> User { get; set; } = null!;
    public DbSet<OrderEntity> Order { get; set; } = null!;

    

}