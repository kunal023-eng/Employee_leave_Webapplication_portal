using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTOS
{
    public class MessageRequestDto
    {
        public int EmployeeId { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}
