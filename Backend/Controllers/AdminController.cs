using System.Collections;
using backend.DTOS;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    { private readonly ApplicationDbContext _context;
        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-user-data")]
        public async Task<ActionResult<IEnumerable<UpdateEmployeeDto>>> GetUserData()
        {
            var employees = await _context.Employees
                .Select(e => new UpdateEmployeeDto
                {
                    Id = e.EmpId,
                    FullName = e.FullName,
                    Email = e.Email,
                    Password = e.Password, 
                    DateOfBirth = e.DateOfBirth
                })
                .ToListAsync();

            return Ok(employees);
        }


        [HttpPut("update-personal-data")]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeDto dto)
        {
            var employee = await _context.Employees.FindAsync(dto.Id);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }
            if (!string.IsNullOrEmpty(dto.FullName))
            {
                employee.FullName = dto.FullName;
            }
            if (!string.IsNullOrEmpty(dto.Email))
            {
                employee.Email = dto.Email;
            }
            if (!string.IsNullOrEmpty(dto.Password))
            {
                employee.Password = dto.Password;
            }
            if (dto.DateOfBirth != null)
            {
                employee.DateOfBirth = dto.DateOfBirth.Value;
            }
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();


            return Ok("Employee updated successfully");
        }
        [HttpGet("get-department-role-manager")]
        public async Task<ActionResult<IEnumerable<EmpOrgDetailsDTO>>> GetEmployeeOrgDetails()
        {
            var employeeDetails = await _context.Employees
                .Select(emp => new EmpOrgDetailsGetDTO
                {
                    EmpId = emp.EmpId,
                    FullName = emp.FullName,
                    DepartmentId = emp.DepartmentId,
                    DeptName = _context.Departments
                        .Where(d => d.DeptId == emp.DepartmentId)
                        .Select(d => d.DeptName)
                        .FirstOrDefault(),
                    Role = emp.Role,
                    ManagerId = _context.EmployeeManagerRelations
                        .Where(rel => rel.EmployeeId == emp.EmpId)
                        .Select(rel => (int?)rel.ManagerId)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(employeeDetails);
        }

        [HttpPut("update-department-role-manager")]
        public async Task<IActionResult> UpdateEmployeeDetails([FromBody] EmpOrgDetailsDTO dto)
        {
            var employee = await _context.Employees
                .Include(e => e.AsManager) 
                .FirstOrDefaultAsync(e => e.EmpId == dto.EmployeeId);

            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            if (dto.EmployeeId == dto.ManagerId)
            {
                return BadRequest("An employee cannot be their own manager");
            }

            if (dto.DepartmentId.HasValue)
            {
                employee.DepartmentId = dto.DepartmentId.Value;
            }

            if (!string.IsNullOrEmpty(dto.Role))
            {
                var oldRole = employee.Role;
                employee.Role = dto.Role;

             
                if (oldRole == "Manager" && dto.Role == "Employee")
                {
                    var subordinates = await _context.EmployeeManagerRelations
                        .Where(r => r.ManagerId == dto.EmployeeId)
                        .ToListAsync();

                    foreach (var subordinate in subordinates)
                    {
                        subordinate.ManagerId = 1; 
                    }
                }

              
            }

            if (dto.ManagerId.HasValue)
            {
                var manager = await _context.Employees.FindAsync(dto.ManagerId.Value);
                if (manager == null)
                    return NotFound("Manager not found");

                var existingRelation = await _context.EmployeeManagerRelations
                    .FirstOrDefaultAsync(r => r.EmployeeId == dto.EmployeeId);

                if (existingRelation != null)
                {
                    existingRelation.ManagerId = dto.ManagerId.Value;

                    if (manager.Role != "Admin")
                    {
                        manager.Role = "Manager";
                    }
                }
                else
                {
                    var newRelation = new EmployeeManagerRelation
                    {
                        EmployeeId = dto.EmployeeId,
                        ManagerId = dto.ManagerId.Value
                    };
                    _context.EmployeeManagerRelations.Add(newRelation);
                }
            }

            await _context.SaveChangesAsync();
            return Ok("Employee details updated successfully");
        }


        [HttpGet("GetDepartments")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            var departments = await _context.Departments.ToListAsync();

            if (departments == null || departments.Count == 0)
            {
                return NotFound("No departments found.");
            }

            return Ok(departments);
        }

        [HttpPost("AddDepartment/{DepName:alpha}")]
        public async Task<IActionResult> AddDepartment(string DepName)
        {
            if (string.IsNullOrEmpty(DepName))
            {
                return NotFound("Not allowed null name");
            }

            var newDepartment = new Department
            {
                DeptName = DepName
            };
            await _context.Departments.AddAsync(newDepartment);
            await _context.SaveChangesAsync();

            return Ok(newDepartment);
        }




    }




}
