using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospitalapi.Models
{
    public class PasswordReset
    {
        public string CurrentPassword { get; set; }
        public string Password { get; set; }
    }
}
