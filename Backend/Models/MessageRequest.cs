using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class MessageRequest
    {
        [Key]
        public int MessageId { get; set; }

        [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }

        [ForeignKey(nameof(Manager))]
        public int ManagerId { get; set; }

        public string status { get; set; } = "Pending";

        public string Message { get; set; } = string.Empty;

        public Employee Employee { get; set; } = null!;
        public Employee Manager { get; set; } = null!;
        public DateTime? TimeStamp { get; set; } 
    }
}
