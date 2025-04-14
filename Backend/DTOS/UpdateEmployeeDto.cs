using backend.Models;

namespace backend.DTOS
{
    public class UpdateEmployeeDto
    {
        public int Id { get; set; }                       // Employee to update

        public string? FullName { get; set; }             // Optional new name
        public string? Email { get; set; }                // Optional new email
        public string? Password { get; set; }             // Optional new password
        public DateTime? DateOfBirth { get; set; }        // Optional new DOB
    }

}
