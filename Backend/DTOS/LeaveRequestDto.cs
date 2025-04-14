namespace backend.DTOS
{
    public class LeaveRequestDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Reason { get; set; } = string.Empty;

        // Example: "Sick", "Casual", "Maternity", etc.
        public string LeaveType { get; set; } = string.Empty;
    }
}
