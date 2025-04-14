using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HrController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HrController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("hr/leave-summary")]
        public async Task<IActionResult> GetLeaveSummaryForHR()
        {
            var employees = await _context.Employees
                .Include(e => e.LeaveRequests)
                    .ThenInclude(lr => lr.ReviewedBy)
                .ToListAsync();

            var summary = employees.Select(e => new
            {
                EmployeeName = e.FullName,
                Email = e.Email,
                TotalRequests = e.LeaveRequests.Count,
                ApprovedRequests = e.LeaveRequests.Count(lr => lr.Status == "Approved"),
                RejectedRequests = e.LeaveRequests.Count(lr => lr.Status == "Rejected"),
                RemainingHoliday = e.RemainingHoliday,
                ApprovedByManagers = e.LeaveRequests
                    .Where(lr => lr.Status == "Approved" && lr.ReviewedBy != null)
                    .Select(lr => lr.ReviewedBy!.FullName)
                    .Distinct()
                    .ToList()
            });

            return Ok(summary);
        }

    }
}
