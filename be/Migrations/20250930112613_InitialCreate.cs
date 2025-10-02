using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryId = table.Column<string>(type: "TEXT", nullable: false),
                    CategoryImage = table.Column<string>(type: "TEXT", nullable: true),
                    Slug = table.Column<string>(type: "TEXT", nullable: false),
                    Index = table.Column<int>(type: "INTEGER", nullable: false),
                    NameCategory = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<bool>(type: "INTEGER", nullable: false),
                    CategoryParentCategoryId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
                    table.ForeignKey(
                        name: "FK_Category_Category_CategoryParentCategoryId",
                        column: x => x.CategoryParentCategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId");
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ImageFiles = table.Column<string>(type: "TEXT", nullable: false),
                    ImagePath = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ImageFiles);
                });

            migrationBuilder.CreateTable(
                name: "Suplier",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    SuplierId = table.Column<string>(type: "TEXT", nullable: false),
                    SuplierName = table.Column<string>(type: "TEXT", nullable: false),
                    SuplierPhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    SuplierEmail = table.Column<string>(type: "TEXT", nullable: false),
                    SuplierAddress = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suplier", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Account = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Account);
                });

            migrationBuilder.CreateTable(
                name: "WeatherForecastItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    TemperatureC = table.Column<int>(type: "INTEGER", nullable: false),
                    Summary = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherForecastItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductId = table.Column<string>(type: "TEXT", nullable: false),
                    Slug = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    ProductClassification = table.Column<string>(type: "TEXT", nullable: false),
                    Suplier = table.Column<string>(type: "TEXT", nullable: false),
                    MainPrice = table.Column<long>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    NameProduct = table.Column<string>(type: "TEXT", nullable: false),
                    Quality = table.Column<long>(type: "INTEGER", nullable: false),
                    SuplierEntityId = table.Column<string>(type: "TEXT", nullable: true),
                    CategoryEntityCategoryId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Product_Category_CategoryEntityCategoryId",
                        column: x => x.CategoryEntityCategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId");
                    table.ForeignKey(
                        name: "FK_Product_Suplier_SuplierEntityId",
                        column: x => x.SuplierEntityId,
                        principalTable: "Suplier",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<string>(type: "TEXT", nullable: false),
                    Lat = table.Column<float>(type: "REAL", nullable: false),
                    Lng = table.Column<float>(type: "REAL", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    UserEntityAccount = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_Address_User_UserEntityAccount",
                        column: x => x.UserEntityAccount,
                        principalTable: "User",
                        principalColumn: "Account",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<string>(type: "TEXT", nullable: false),
                    OrderTime = table.Column<long>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Pay = table.Column<int>(type: "INTEGER", nullable: false),
                    Lat = table.Column<float>(type: "REAL", nullable: false),
                    Lng = table.Column<float>(type: "REAL", nullable: false),
                    Note = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    UserEntityAccount = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Order_User_UserEntityAccount",
                        column: x => x.UserEntityAccount,
                        principalTable: "User",
                        principalColumn: "Account",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhotoGallery",
                columns: table => new
                {
                    ImageEntityImageFiles = table.Column<string>(type: "TEXT", nullable: false),
                    ProductEntityProductId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoGallery", x => new { x.ImageEntityImageFiles, x.ProductEntityProductId });
                    table.ForeignKey(
                        name: "FK_PhotoGallery_Image_ImageEntityImageFiles",
                        column: x => x.ImageEntityImageFiles,
                        principalTable: "Image",
                        principalColumn: "ImageFiles",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PhotoGallery_Product_ProductEntityProductId",
                        column: x => x.ProductEntityProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductVariant",
                columns: table => new
                {
                    ProductVariantId = table.Column<string>(type: "TEXT", nullable: false),
                    ProductVariantName = table.Column<string>(type: "TEXT", nullable: false),
                    VariantId = table.Column<string>(type: "TEXT", nullable: false),
                    VariantName = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<long>(type: "INTEGER", nullable: false),
                    ImportPrice = table.Column<long>(type: "INTEGER", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Quality = table.Column<long>(type: "INTEGER", nullable: false),
                    Position = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductEntityProductId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductVariant", x => x.ProductVariantId);
                    table.ForeignKey(
                        name: "FK_ProductVariant_Product_ProductEntityProductId",
                        column: x => x.ProductEntityProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    ProductVariantEntityProductVariantId = table.Column<string>(type: "TEXT", nullable: false),
                    UserEntityAccount = table.Column<string>(type: "TEXT", nullable: false),
                    Quality = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => new { x.ProductVariantEntityProductVariantId, x.UserEntityAccount });
                    table.ForeignKey(
                        name: "FK_Cart_ProductVariant_ProductVariantEntityProductVariantId",
                        column: x => x.ProductVariantEntityProductVariantId,
                        principalTable: "ProductVariant",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cart_User_UserEntityAccount",
                        column: x => x.UserEntityAccount,
                        principalTable: "User",
                        principalColumn: "Account",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    OrderEntityOrderId = table.Column<string>(type: "TEXT", nullable: false),
                    ProductVariantEntityProductVariantId = table.Column<string>(type: "TEXT", nullable: false),
                    Quality = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => new { x.OrderEntityOrderId, x.ProductVariantEntityProductVariantId });
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_OrderEntityOrderId",
                        column: x => x.OrderEntityOrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetail_ProductVariant_ProductVariantEntityProductVariantId",
                        column: x => x.ProductVariantEntityProductVariantId,
                        principalTable: "ProductVariant",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_UserEntityAccount",
                table: "Address",
                column: "UserEntityAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserEntityAccount",
                table: "Cart",
                column: "UserEntityAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Category_CategoryParentCategoryId",
                table: "Category",
                column: "CategoryParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Slug",
                table: "Category",
                column: "Slug");

            migrationBuilder.CreateIndex(
                name: "IX_Order_UserEntityAccount",
                table: "Order",
                column: "UserEntityAccount");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_ProductVariantEntityProductVariantId",
                table: "OrderDetail",
                column: "ProductVariantEntityProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoGallery_ProductEntityProductId",
                table: "PhotoGallery",
                column: "ProductEntityProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryEntityCategoryId",
                table: "Product",
                column: "CategoryEntityCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Slug",
                table: "Product",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_SuplierEntityId",
                table: "Product",
                column: "SuplierEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariant_ProductEntityProductId",
                table: "ProductVariant",
                column: "ProductEntityProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Suplier_SuplierId",
                table: "Suplier",
                column: "SuplierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "PhotoGallery");

            migrationBuilder.DropTable(
                name: "WeatherForecastItems");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "ProductVariant");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Suplier");
        }
    }
}
