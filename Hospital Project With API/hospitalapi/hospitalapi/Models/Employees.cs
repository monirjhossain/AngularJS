using System;
using System.Collections.Generic;

namespace hospitalapi.Models
{
    public partial class Employees
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Hospital { get; set; }
    }
}
