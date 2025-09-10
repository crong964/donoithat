using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class latlng : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddressEntity_User_UserEntityAccount",
                table: "AddressEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AddressEntity",
                table: "AddressEntity");

            migrationBuilder.RenameTable(
                name: "AddressEntity",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "Lag",
                table: "Address",
                newName: "Lng");

            migrationBuilder.RenameIndex(
                name: "IX_AddressEntity_UserEntityAccount",
                table: "Address",
                newName: "IX_Address_UserEntityAccount");

            migrationBuilder.AddColumn<long>(
                name: "Lat",
                table: "Order",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Lng",
                table: "Order",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "UserEntityAccount",
                table: "Address",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Address",
                table: "Address",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_User_UserEntityAccount",
                table: "Address",
                column: "UserEntityAccount",
                principalTable: "User",
                principalColumn: "Account",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_User_UserEntityAccount",
                table: "Address");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Address",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "Address",
                newName: "AddressEntity");

            migrationBuilder.RenameColumn(
                name: "Lng",
                table: "AddressEntity",
                newName: "Lag");

            migrationBuilder.RenameIndex(
                name: "IX_Address_UserEntityAccount",
                table: "AddressEntity",
                newName: "IX_AddressEntity_UserEntityAccount");

            migrationBuilder.AlterColumn<string>(
                name: "UserEntityAccount",
                table: "AddressEntity",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AddressEntity",
                table: "AddressEntity",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_AddressEntity_User_UserEntityAccount",
                table: "AddressEntity",
                column: "UserEntityAccount",
                principalTable: "User",
                principalColumn: "Account");
        }
    }
}
