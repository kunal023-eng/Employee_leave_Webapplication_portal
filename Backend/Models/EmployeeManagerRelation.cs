using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Models
{
    public class EmployeeManagerRelation
    {
        [Key]
        public int RelitionId { get; set; }
        public int EmployeeId { get; set; }
        public int ManagerId { get; set; }

        public Employee Employee { get; set; } = null!;
        public Employee Manager { get; set; } = null!;
    }
}
