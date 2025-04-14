namespace backend.DTOS
{
    public class RegisterDto
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string ConfirmPassword { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        
        
    }
}
