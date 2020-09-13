using System;
using System.Collections.Generic;

namespace hospitalapi.Models
{
    public partial class Appointments
    {
        public int AppointmentId { get; set; }
        public string Customer { get; set; }
        public string Doctor { get; set; }
        public string Date { get; set; }
        public string SlotDate { get; set; }
        public string SlotStartTime { get; set; }
        public string SlotEndTime { get; set; }
        public int? EmployeeId { get; set; }
        public string Department { get; set; }
        public double? Payment { get; set; }
    }
}
