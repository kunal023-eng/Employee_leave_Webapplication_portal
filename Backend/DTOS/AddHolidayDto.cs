namespace backend.DTOS
{
    public class AddHolidayDto
    {
        public int ManagerId { get; set; }         // The manager performing the action
        public int EmployeeId { get; set; }        // The employee receiving extra holidays
        public int DaysToAdd { get; set; }         // Number of holiday days to add
    }
}
