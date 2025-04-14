namespace backend.DTOS
{
    public class TransferDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Id { get; set; }
        public string Role { get; set; } = "Employee";


    }
}
