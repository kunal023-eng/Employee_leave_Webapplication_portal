using backend.DTOS;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {   
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("submit/{employeeId}")]
        public async Task<IActionResult> SubmitLeaveRequest(int employeeId, [FromBody] LeaveRequestDto dto)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null)
                return NotFound("Employee not found.");

            if (dto.EndDate < dto.StartDate)
                return BadRequest("End date cannot be before start date.");

            var requestedDays = (dto.EndDate - dto.StartDate).Days + 1; // Including both start and end dates
            if (employee.RemainingHoliday < requestedDays)
            {
                return BadRequest($"Requesting more than assigned holiday. Requested: {requestedDays}, Remaining: {employee.RemainingHoliday}");
            }

            var leaveRequest = new LeaveRequest
            {
                EmployeeId = employeeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Reason = dto.Reason,
                LeaveType = dto.LeaveType,
                Status = "Pending"
            };

            _context.LeaveRequests.Add(leaveRequest);
            await _context.SaveChangesAsync();

            return Ok("Leave request submitted successfully.");
        }
        [HttpPost("Send request")]
        public async Task<IActionResult> send_request([FromBody] MessageRequestDto dto)
        {
            var employee = await _context.Employees.FindAsync(dto.EmployeeId);
            if (employee == null)
                return NotFound("Employee not found.");
            var relation = await _context.EmployeeManagerRelations.FirstOrDefaultAsync(s => s.EmployeeId == dto.EmployeeId);
                 var managerId = relation.ManagerId;  
            var message = new MessageRequest
            {
                EmployeeId = dto.EmployeeId,
                Message = dto.Message,
                ManagerId = managerId,
                TimeStamp = DateTime.UtcNow,

            };
                  
            _context.MessageRequests.Add(message);
            await _context.SaveChangesAsync();
            return Ok("Message request sent successfully.");
        }

        [HttpGet("Status")]
        public async Task<IActionResult> get_status(int employeeId)
        {
            var response = await _context.LeaveRequests
                .Where(a => a.EmployeeId == employeeId)
                .Select(a => new EmployeeRequestStatus
                {
                    LeaveType = a.LeaveType,
                    Reason = a.Reason,
                    Status = a.Status,
                    Message=a.Message,
                    ManagerId = a.ReviewedById,
                    ManagerName = _context.Employees
                        .Where(e => e.EmpId == a.ReviewedById)
                        .Select(e => e.FullName)
                        .FirstOrDefault()
                }).ToListAsync();
               return Ok(response);
        }

    }
}
