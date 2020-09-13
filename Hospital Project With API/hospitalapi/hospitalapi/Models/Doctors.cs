using System;
using System.Collections.Generic;

namespace hospitalapi.Models
{
    public partial class Doctors
    {
        public int DoctorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Speciality { get; set; }
        public string Availability { get; set; }
        public string Hospital { get; set; }
        public string Department { get; set; }
    }
}
