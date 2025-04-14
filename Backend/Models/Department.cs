using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Department
    {
        [Key]
        public int DeptId { get; set; }
        public string DeptName { get; set; } = string.Empty;

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
