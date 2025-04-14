using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
//using backend.DataAccess;
using backend.DTOS;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context,IConfiguration config )
        {
            _config = config;
            _context = context;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var user = await _context.Employees.FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            
            // Generate JWT token here
            var token = GenerateJwtToken(user);

            var response = new
            {
                user.EmpId,
                user.FullName,
                user.Email,
                user.Role,
                user.DateOfBirth,
                token,
                tokenExpiry = DateTime.UtcNow.AddMinutes(60).Ticks
            };
            return Ok(new {response  });
        }
       
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto request)
        {
            if (_context.Employees.Any(u => u.Email == request.Email))
            {
                return BadRequest("Email already exists");
            }
            var user = new Employee
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password,
                DateOfBirth=request.DateOfBirth
            };
            _context.Employees.Add(user);
            _context.SaveChanges();
            return Ok("User registered successfully");
        }
        private string GenerateJwtToken(Employee user)
        {
            var claims = new[]
            {
                new Claim("Id", user.EmpId.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.GivenName, user.FullName),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT key is not configured.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
