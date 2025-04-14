using System.ComponentModel.DataAnnotations;

public class LeaveRequest
{
    [Key]
    public int RequestId { get; set; }
    public int EmployeeId { get; set; }
    public int? ReviewedById { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string LeaveType { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public string Message { get; set; } = string.Empty;

    public Employee Employee { get; set; } = null!;
    public Employee? ReviewedBy { get; set; }
}
