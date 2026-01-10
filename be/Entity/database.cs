using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace be.Entity;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<AccountEntity> Account { get; set; } = null!;
    public DbSet<ProductEntity> Product { get; set; } = null!;
    public DbSet<ProductVariantEntity> ProductVariant { get; set; } = null!;
    public DbSet<ImageEntity> Image { get; set; } = null!;
    public DbSet<CategoryEntity> Category { get; set; } = null!;
    public DbSet<UserEntity> User { get; set; } = null!;
    public DbSet<OrderEntity> Order { get; set; } = null!;
    public DbSet<CartEntity> Cart { get; set; } = null!;
    public DbSet<OrderDetailEntity> OrderDetail { get; set; } = null!;
    public DbSet<AddressEntity> Address { get; set; } = null!;
    public DbSet<PhotoGalleryEntity> PhotoGallery { get; set; } = null!;
    public DbSet<SuplierEntity> Suplier { get; set; } = null!;
    public DbSet<ProvideEntity> Provide { get; set; } = null!;
    public DbSet<ImportEntity> ImportEntity { get; set; } = null!;
    public DbSet<BrandEntity> Brand { get; set; } = null!;
    public DbSet<ImportDetailEntity> ImportDetailEntity { get; set; } = null!;
    public DbSet<CouponEntity> Coupon { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserEntity>()
       .HasMany(e => e.ProductVariantEntities)
       .WithMany(e => e.UserEntities)
       .UsingEntity<CartEntity>();

        modelBuilder.Entity<OrderEntity>()
       .HasMany(e => e.ProductVariantEntities)
       .WithMany(e => e.OrderEntities)
       .UsingEntity<OrderDetailEntity>();

        modelBuilder.Entity<ProductEntity>()
        .HasMany(e => e.ImageEntities)
        .WithMany(e => e.ProductEntities)
        .UsingEntity<PhotoGalleryEntity>();


        modelBuilder.Entity<ImportEntity>()
        .HasMany(e => e.ProductVariantEntities)
        .WithMany(e => e.ImportEntities)
        .UsingEntity<ImportDetailEntity>();


        modelBuilder.Entity<SuplierEntity>()
        .HasMany(e => e.ProductVariantEntities)
        .WithMany(e => e.SuplierEntities)
        .UsingEntity<ProvideEntity>();


        modelBuilder
        .Entity<ProductVariantEntity>()
        .HasOne(e => e.ProductEntity)
        .WithMany(e => e.ProductVariantEntities)
        .OnDelete(DeleteBehavior.SetNull);

        modelBuilder
        .Entity<ProductEntity>()
        .HasOne(e => e.CategoryEntity)
        .WithMany()
        .OnDelete(DeleteBehavior.SetNull);

        modelBuilder
        .Entity<ProductEntity>()
        .HasOne(e => e.BrandEntity)
        .WithMany()
        .OnDelete(DeleteBehavior.SetNull);

        modelBuilder
        .Entity<ProductVariantEntity>()
        .HasOne(e => e.ImageEntity)
        .WithMany()
        .OnDelete(DeleteBehavior.SetNull);
    }

}