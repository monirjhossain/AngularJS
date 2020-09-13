using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospitalapi.Models
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string token { get; set; }
        public int statusCode { get; set; }
        public object data { get; set; }
        public string message { get; set; }
        public string errorMessage { get; set; }
    }
}
