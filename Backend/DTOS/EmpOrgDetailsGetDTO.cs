namespace backend.DTOS
{
    public class EmpOrgDetailsGetDTO
    {
        public int EmpId { get; set; }                // Employee to update
        public string FullName { get; set; }
        public int? DepartmentId { get; set; }// Optional new department ID
        public string DeptName { get; set; }
        public string? Role { get; set; }          // Optional new role (e.g., "Manager", "Admin")
        public int? ManagerId { get; set; }        // Optional new manager ID
    }
}
