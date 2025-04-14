namespace backend.DTOS
{
    public class EmpOrgDetailsDTO
    {
        public int EmployeeId { get; set; }        public int? DepartmentId { get; set; }    
        public string? Role { get; set; }         
        public int? ManagerId { get; set; }       
    }
}
