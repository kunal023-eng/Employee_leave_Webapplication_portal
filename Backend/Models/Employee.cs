using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Employee
{
    [Key]
    public int EmpId { get; set; }

    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public string Role { get; set; } = "Employee";
    public int Age { get; set; }
    public int? DepartmentId { get; set; }
    public int AnnualLeaveLimit { get; set; } = 28;
    public int RemainingHoliday { get; set; } = 28;

    public Department? Department { get; set; }

    // Leave request relationships
    public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
    public ICollection<LeaveRequest> ReviewedRequests { get; set; } = new List<LeaveRequest>();

    // Manager-employee relationships
    public EmployeeManagerRelation? AsEmployee { get; set; }
    public ICollection<EmployeeManagerRelation> AsManager { get; set; } = new List<EmployeeManagerRelation>();

    // Message request relationships
    public ICollection<MessageRequest> SentMessages { get; set; } = new List<MessageRequest>();
    public ICollection<MessageRequest> ReceivedMessages { get; set; } = new List<MessageRequest>();
}
