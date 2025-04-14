using backend.DTOS;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {       
        private readonly ApplicationDbContext _context;
        public ManagerController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPut("review")]
        public async Task<IActionResult> ReviewLeaveRequest([FromBody] ReviewLeaveRequestDto dto)
        {
            
            var leaveRequest = await _context.LeaveRequests.FindAsync(dto.RequestId);
            if (leaveRequest == null)
                return NotFound("Leave request not found.");

            var manager = await _context.Employees.FindAsync(dto.ManagerId);
            if (manager == null || manager.Role != "Manager")
                return BadRequest("Reviewer must be a valid manager.");

          
            var relationExists = await _context.EmployeeManagerRelations
                .AnyAsync(r => r.EmployeeId == leaveRequest.EmployeeId && r.ManagerId == dto.ManagerId);

            if (!relationExists)
                return BadRequest("You are not authorized to review this employee's leave request.");

           
            leaveRequest.Status = dto.Status;
            leaveRequest.ReviewedById = dto.ManagerId;

            
            if (dto.Status == "Approved")
            {
                var employee = await _context.Employees.FindAsync(leaveRequest.EmployeeId);
                if (employee != null)
                {    
                    
                    int totalLeaveDays = (leaveRequest.EndDate - leaveRequest.StartDate).Days + 1; // inclusive
                    if (totalLeaveDays > employee.RemainingHoliday)
                        return BadRequest("Not enough holiday balance.");
                    else{employee.RemainingHoliday -= totalLeaveDays;}

                   
                }
            }

            await _context.SaveChangesAsync();

            return Ok($"Leave request has been {dto.Status.ToLower()} by Manager {manager.FullName}.");
        }
        [HttpPut("message-update")]
        public async Task<IActionResult> send_msg(update_messageDTO dto)
        {
            if (dto.requestId == null)
            {
                return BadRequest();
            }
            var req = await _context.LeaveRequests.FindAsync(dto.requestId);
            req.Message = dto.message;
            await _context.SaveChangesAsync();
            return Ok("Message updated successfully.");
        }


        [HttpGet("manager/requests/{managerId}")]
        public async Task<IActionResult> GetLeaveRequestsForManager(int managerId)
        {
            var manager = await _context.Employees.FindAsync(managerId);
            if (manager == null || manager.Role != "Manager")
                return BadRequest("User is not a valid manager.");

            var employeeIds = await _context.EmployeeManagerRelations
                .Where(r => r.ManagerId == managerId)
                .Select(r => r.EmployeeId)
                .ToListAsync();

            // 3. Get leave requests of those employees
            var leaveRequests = await _context.LeaveRequests
                .Where(lr => employeeIds.Contains(lr.EmployeeId))
                .Include(lr => lr.Employee)         // optional: include employee details
                .Include(lr => lr.ReviewedBy)       // optional: include manager reviewer
                .ToListAsync();

            // 4. Return
            return Ok(leaveRequests.Select(lr => new
            {
                lr.RequestId,
                EmployeeName = lr.Employee.FullName,
                lr.StartDate,
                lr.EndDate,
                lr.LeaveType,
                lr.Reason,
                lr.Status,
                lr.Message,
                ReviewedBy = lr.ReviewedBy?.FullName
            }));
        }
        //[HttpGet("Get-messages")]
        //public async Task<ActionResult<IEnumerable<MessageRequest>>> GetNotification(int managerId)
        //{
        //    var notification = await _context.MessageRequests
        //        .Where(s => s.ManagerId == managerId)
        //       // .Include(s => s.Employee) // Corrected Include statement
        //        .Select(s => new
        //        {
        //            s.EmployeeId,
        //            s.Employee.FullName, // Accessing FullName directly from the included Employee
        //            s.Message
        //        })
        //        .ToListAsync();

        //    return Ok(notification);
        //}

        [HttpGet("Get-messages")]
        public async Task<ActionResult<IEnumerable<MessageRequest>>> GetNotification(int managerId)
        {
            var notifications = await _context.MessageRequests
                .Where(s => s.ManagerId == managerId)
                .Select(s => new
                {   s.status,
                    s.EmployeeId,
                    s.MessageId,
                    s.TimeStamp,
                    EmployeeFullName = _context.Employees
                        .Where(e => e.EmpId == s.EmployeeId)
                        .Select(e => e.FullName)
                        .FirstOrDefault(), // Fetching FullName separately
                    s.Message
                })
                .ToListAsync();

            return Ok(notifications);
        }
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatus( [FromBody] StatusUpdateDto statusUpdateDto)
        {
            var messageRequest = await _context.MessageRequests
                .Where(e => e.MessageId == statusUpdateDto.MessageId)
                .FirstOrDefaultAsync();

            if (messageRequest == null)
            {
                return NotFound();
            }

            messageRequest.status = statusUpdateDto.status;
            await _context.SaveChangesAsync();

            return Ok(statusUpdateDto);
        }


        //[HttpGet("Get-messages/{id:int}")]
        //public async Task<ActionResult<IEnumerable<MessageDto>>> GetNotification(int id)
        //{
        //    var notifications = await _context.MessageRequests
        //                .Where(m => m.ManagerId == id)
        //               .Include(m => m.Employee)
        //             .Select(m => new MessageDto
        //             {
        //                 Message = m.Message,
        //                 EmployeeName = m.Employee.FullName
        //             })
        //                            .ToListAsync();

        //    return Ok(notifications);
        //}

        //}
        //[HttpGet("Get-messages/{id:int}")]
        //public async Task<ActionResult<IEnumerable<MessageRequest>>> GetNotification(int id)
        //{
        //    var notifications = await _context.MessageRequests
        //        .Where(s => s.ManagerId == id)
        //        .ToListAsync();
        //    var not = new MessageDto()
        //    {

        //    }
        //    foreach(var n in notifications)
        //    {

        //    }

        //    return Ok(notifications);
        //}



        [HttpPost("manager/add-holiday")]
        public async Task<IActionResult> AddHolidayToEmployee([FromBody] AddHolidayDto dto)
        {
            // 1. Validate manager exists and is a manager
            var manager = await _context.Employees.FindAsync(dto.ManagerId);
            if (manager == null || manager.Role != "Manager")
                return BadRequest("Invalid manager credentials.");

            // 2. Check if this employee is a subordinate of the manager
            var relationExists = await _context.EmployeeManagerRelations
                .AnyAsync(r => r.ManagerId == dto.ManagerId && r.EmployeeId == dto.EmployeeId);

            if (!relationExists)
                return BadRequest("This employee does not report to you.");

            // 3. Get the employee to update
            var employee = await _context.Employees.FindAsync(dto.EmployeeId);
            if (employee == null)
                return NotFound("Employee not found.");

            // 4. Add holiday
            employee.RemainingHoliday += dto.DaysToAdd;

            await _context.SaveChangesAsync();

            return Ok($"{dto.DaysToAdd} holiday days added to {employee.FullName}. New total: {employee.RemainingHoliday}");
        }



    }
}
