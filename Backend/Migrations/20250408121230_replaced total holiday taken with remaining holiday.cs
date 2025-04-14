using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class replacedtotalholidaytakenwithremainingholiday : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalHolidayTaken",
                table: "Employees",
                newName: "RemainingHoliday");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RemainingHoliday",
                table: "Employees",
                newName: "TotalHolidayTaken");
        }
    }
}
