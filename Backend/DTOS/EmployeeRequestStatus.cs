namespace backend.DTOS
{
    public class EmployeeRequestStatus
    {

        public string LeaveType { get; set; } = string.Empty;

        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string? Message { get; set; }
         
        public int? ManagerId { get; set; }
        public string ManagerName { get; set; }
    }
}
