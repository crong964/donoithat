using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class Cart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    UserEntityAccount = table.Column<string>(type: "TEXT", nullable: false),
                    ProductVariantEntityProductVariantId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
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

            migrationBuilder.CreateIndex(
                name: "IX_Cart_ProductVariantEntityProductVariantId",
                table: "Cart",
                column: "ProductVariantEntityProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserEntityAccount",
                table: "Cart",
                column: "UserEntityAccount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");
        }
    }
}
