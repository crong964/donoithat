using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_ProductVariant_ProductVariantEntityProductVariantId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_ProductVariantEntityProductVariantId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ProductVariantEntityProductVariantId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Quality",
                table: "Order");

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    OrderEntityOrderId = table.Column<string>(type: "TEXT", nullable: false),
                    ProductVariantEntityProductVariantId = table.Column<string>(type: "TEXT", nullable: false),
                    Quality = table.Column<int>(type: "INTEGER", nullable: false)
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
                name: "IX_OrderDetail_ProductVariantEntityProductVariantId",
                table: "OrderDetail",
                column: "ProductVariantEntityProductVariantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.AddColumn<long>(
                name: "Price",
                table: "Order",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ProductVariantEntityProductVariantId",
                table: "Order",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quality",
                table: "Order",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Order_ProductVariantEntityProductVariantId",
                table: "Order",
                column: "ProductVariantEntityProductVariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_ProductVariant_ProductVariantEntityProductVariantId",
                table: "Order",
                column: "ProductVariantEntityProductVariantId",
                principalTable: "ProductVariant",
                principalColumn: "ProductVariantId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
