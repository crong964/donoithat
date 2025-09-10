using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class AddressEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AddressEntity",
                columns: table => new
                {
                    AddressId = table.Column<string>(type: "TEXT", nullable: false),
                    Lat = table.Column<long>(type: "INTEGER", nullable: false),
                    Lag = table.Column<long>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    UserEntityAccount = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressEntity", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_AddressEntity_User_UserEntityAccount",
                        column: x => x.UserEntityAccount,
                        principalTable: "User",
                        principalColumn: "Account");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AddressEntity_UserEntityAccount",
                table: "AddressEntity",
                column: "UserEntityAccount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddressEntity");
        }
    }
}
