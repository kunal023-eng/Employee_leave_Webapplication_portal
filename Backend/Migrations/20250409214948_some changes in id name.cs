using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class somechangesinidname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "LeaveRequests",
                newName: "RequestId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Employees",
                newName: "EmpId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "EmployeeManagerRelations",
                newName: "RelitionId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Departments",
                newName: "DeptName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Departments",
                newName: "DeptId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequestId",
                table: "LeaveRequests",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "EmpId",
                table: "Employees",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "RelitionId",
                table: "EmployeeManagerRelations",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DeptName",
                table: "Departments",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "DeptId",
                table: "Departments",
                newName: "Id");
        }
    }
}
