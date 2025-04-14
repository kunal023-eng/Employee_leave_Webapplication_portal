using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class tableaddedmessagerequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MessageRequest_Employees_EmployeeId",
                table: "MessageRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageRequest_Employees_ManagerId",
                table: "MessageRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MessageRequest",
                table: "MessageRequest");

            migrationBuilder.RenameTable(
                name: "MessageRequest",
                newName: "MessageRequests");

            migrationBuilder.RenameIndex(
                name: "IX_MessageRequest_ManagerId",
                table: "MessageRequests",
                newName: "IX_MessageRequests_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_MessageRequest_EmployeeId",
                table: "MessageRequests",
                newName: "IX_MessageRequests_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MessageRequests",
                table: "MessageRequests",
                column: "MessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageRequests_Employees_EmployeeId",
                table: "MessageRequests",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmpId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageRequests_Employees_ManagerId",
                table: "MessageRequests",
                column: "ManagerId",
                principalTable: "Employees",
                principalColumn: "EmpId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MessageRequests_Employees_EmployeeId",
                table: "MessageRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageRequests_Employees_ManagerId",
                table: "MessageRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MessageRequests",
                table: "MessageRequests");

            migrationBuilder.RenameTable(
                name: "MessageRequests",
                newName: "MessageRequest");

            migrationBuilder.RenameIndex(
                name: "IX_MessageRequests_ManagerId",
                table: "MessageRequest",
                newName: "IX_MessageRequest_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_MessageRequests_EmployeeId",
                table: "MessageRequest",
                newName: "IX_MessageRequest_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MessageRequest",
                table: "MessageRequest",
                column: "MessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageRequest_Employees_EmployeeId",
                table: "MessageRequest",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmpId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageRequest_Employees_ManagerId",
                table: "MessageRequest",
                column: "ManagerId",
                principalTable: "Employees",
                principalColumn: "EmpId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
